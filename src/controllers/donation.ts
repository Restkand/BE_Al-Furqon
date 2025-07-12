import { Request, Response, NextFunction } from 'express';
import { prisma } from '../models/prisma';
import { responseHelper } from '../utils/responseHelper';
import { AuthRequest } from '../middleware/auth';

export const DonationController = {
  getAllDonations: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Add pagination
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      // Add filtering options
      const filter: any = {};
      if (req.query.title) {
        filter.title = { contains: req.query.title as string, mode: 'insensitive' };
      }

      const [donations, totalCount] = await Promise.all([
        prisma.donation.findMany({
          where: filter,
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit
        }),
        prisma.donation.count({ where: filter })
      ]);

      const totalPages = Math.ceil(totalCount / limit);

      responseHelper(res, 200, 'Success get all donations', {
        data: donations,
        pagination: {
          page,
          limit,
          totalItems: totalCount,
          totalPages
        }
      });
    } catch (error) {
      next(error);
    }
  },

  getDonationById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      
      if (!id) {
        responseHelper(res, 400, 'Invalid donation ID', null);
        return;
      }
      
      const donation = await prisma.donation.findUnique({
        where: { id },
        include: {
          transactions: {
            where: { status: 'paid' },
            select: {
              id: true,
              donorName: true,
              amount: true,
              message: true,
              isAnonymous: true,
              paidAt: true
            },
            orderBy: { paidAt: 'desc' }
          }
        }
      });
      
      if (!donation) {
        responseHelper(res, 404, 'Donation not found', null);
        return;
      }

      responseHelper(res, 200, 'Success get donation', donation);
    } catch (error) {
      next(error);
    }
  },

  createDonation: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { title, description, targetAmount, detail } = req.body;
      const image = req.file?.filename;

      // Validate required fields
      if (!title || !description || !targetAmount) {
        responseHelper(res, 400, 'Title, description, and targetAmount are required', null);
        return;
      }

      // Validate target amount is a positive number
      const parsedTargetAmount = parseFloat(targetAmount);
      if (isNaN(parsedTargetAmount) || parsedTargetAmount <= 0) {
        responseHelper(res, 400, 'Target amount must be a positive number', null);
        return;
      }

      // Generate slug from title
      const slug = title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-') + '-' + Date.now();

      const donation = await prisma.donation.create({
        data: {
          title,
          slug,
          description,
          detail: detail || '',
          targetAmount: parsedTargetAmount,
          image: image || undefined
        }
      });

      responseHelper(res, 201, 'Success create donation', donation);
    } catch (error) {
      next(error);
    }
  },

  updateDonation: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      
      if (!id) {
        responseHelper(res, 400, 'Invalid donation ID', null);
        return;
      }
      
      // Check if donation exists
      const existingDonation = await prisma.donation.findUnique({ where: { id } });
      if (!existingDonation) {
        responseHelper(res, 404, 'Donation not found', null);
        return;
      }
      
      const { title, description, targetAmount, detail, collectedAmount } = req.body;
      const image = req.file?.filename;

      // Prepare data for update, only including fields that are provided
      const updateData: any = {};
      
      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (detail !== undefined) updateData.detail = detail;
      
      if (collectedAmount !== undefined) {
        const parsedAmount = parseFloat(collectedAmount);
        if (isNaN(parsedAmount) || parsedAmount < 0) {
          responseHelper(res, 400, 'Collected amount must be a non-negative number', null);
          return;
        }
        updateData.collectedAmount = parsedAmount;
      }
      
      if (targetAmount !== undefined) {
        const parsedTargetAmount = parseFloat(targetAmount);
        if (isNaN(parsedTargetAmount) || parsedTargetAmount <= 0) {
          responseHelper(res, 400, 'Target amount must be a positive number', null);
          return;
        }
        updateData.targetAmount = parsedTargetAmount;
      }
      
      if (image) updateData.image = image;

      const donation = await prisma.donation.update({
        where: { id },
        data: updateData
      });

      responseHelper(res, 200, 'Success update donation', donation);
    } catch (error) {
      next(error);
    }
  },

  deleteDonation: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      
      if (!id) {
        responseHelper(res, 400, 'Invalid donation ID', null);
        return;
      }
      
      // Check if donation exists before deletion
      const existingDonation = await prisma.donation.findUnique({ where: { id } });
      if (!existingDonation) {
        responseHelper(res, 404, 'Donation not found', null);
        return;
      }
      
      await prisma.donation.delete({ where: { id } });
      responseHelper(res, 200, 'Success delete donation', null);
    } catch (error) {
      next(error);
    }
  }
};
