import { prisma } from './prisma';

export const DonationModel = {
  findAll: () => {
    return prisma.donation.findMany({
      orderBy: { createdAt: 'desc' }
    });
  },

  findById: (id: number) => {
    return prisma.donation.findUnique({
      where: { id }
    });
  },

  create: (data: {
    title: string;
    description: string;
    targetAmount: number;
    image?: string;
  }) => {
    return prisma.donation.create({
      data
    });
  },

  update: (id: number, data: {
    title?: string;
    description?: string;
    amount?: number;
    targetAmount?: number;
    image?: string;
  }) => {
    return prisma.donation.update({
      where: { id },
      data
    });
  },

  delete: (id: number) => {
    return prisma.donation.delete({
      where: { id }
    });
  }
};
