import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Articles endpoints
router.get('/articles', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, category, published } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const limitNum = Number(limit);

    const where: any = {};
    if (category) where.category = category;
    if (published !== undefined) where.status = published === 'true' ? 'published' : 'draft';

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          image: true,
          category: true,
          status: true,
          publishedAt: true,
          createdAt: true,
          views: true,
          likes: true
        }
      }),
      prisma.article.count({ where })
    ]);

    res.json({
      success: true,
      data: articles,
      pagination: {
        page: Number(page),
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Articles error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil artikel'
    });
  }
});

router.post('/articles', async (req: Request, res: Response) => {
  try {
    const { title, content, excerpt, imageUrl, published = false } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title dan content harus diisi'
      });
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        description: excerpt || content.substring(0, 200) + '...',
        image: imageUrl,
        category: 'kegiatan',
        status: published ? 'published' : 'draft',
        slug: title.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
        publishedAt: published ? new Date() : null
      }
    });

    res.status(201).json({
      success: true,
      message: 'Artikel berhasil dibuat',
      data: article
    });
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal membuat artikel'
    });
  }
});

// Donations endpoints
router.get('/donations', async (req: Request, res: Response) => {
  try {
    const { status = 'active' } = req.query;

    const where: any = { status };

    const donations = await prisma.donation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        image: true,
        targetAmount: true,
        collectedAmount: true,
        status: true,
        endDate: true,
        createdAt: true,
        totalDonors: true
      }
    });

    const donationsWithProgress = donations.map(donation => ({
      ...donation,
      progress: Math.round((donation.collectedAmount / donation.targetAmount) * 100),
      remainingAmount: donation.targetAmount - donation.collectedAmount
    }));

    res.json({
      success: true,
      data: donationsWithProgress
    });
  } catch (error) {
    console.error('Donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil donasi'
    });
  }
});

router.post('/donations', async (req: Request, res: Response) => {
  try {
    const { title, description, targetAmount, collectedAmount = 0, imageUrl, endDate } = req.body;

    if (!title || !description || !targetAmount) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, dan targetAmount harus diisi'
      });
    }

    const donation = await prisma.donation.create({
      data: {
        title,
        description,
        targetAmount: Number(targetAmount),
        collectedAmount: Number(collectedAmount),
        image: imageUrl,
        status: 'active',
        endDate: endDate ? new Date(endDate) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        slug: title.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      }
    });

    res.status(201).json({
      success: true,
      message: 'Donasi berhasil dibuat',
      data: donation
    });
  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal membuat donasi'
    });
  }
});

// News endpoints
router.get('/news', async (req: Request, res: Response) => {
  try {
    const { priority, limit } = req.query;
    const limitNum = parseInt(limit as string) || 10;

    const where: any = { publishedAt: { not: null } };
    if (priority) {
      where.priority = priority;
    }

    const news = await prisma.news.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: limitNum,
      select: {
        id: true,
        title: true,
        content: true,
        priority: true,
        publishedAt: true,
        createdAt: true
      }
    });

    res.json({
      success: true,
      data: news
    });
  } catch (error) {
    console.error('News error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil berita'
    });
  }
});

router.post('/news', async (req: Request, res: Response) => {
  try {
    const { title, content, excerpt, imageUrl } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title dan content harus diisi'
      });
    }

    const news = await prisma.news.create({
      data: {
        title,
        content,
        description: excerpt || content.substring(0, 200) + '...',
        image: imageUrl,
        priority: 'medium',
        publishedAt: new Date(),
        slug: title.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      }
    });

    res.status(201).json({
      success: true,
      message: 'Berita berhasil dibuat',
      data: news
    });
  } catch (error) {
    console.error('Create news error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal membuat berita'
    });
  }
});

export default router;
