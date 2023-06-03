import type { NextApiRequest, NextApiResponse } from 'next';
import { LikeApiResponse } from '@/interface';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LikeApiResponse>
) {
  const session = await getServerSession(req, res, authOptions);
  const { id, page, limit = '10' }: any = req.query;

  if (!session?.user) {
    return res.status(401);
  }

  if (req.method === 'POST') {
    const { storeId }: any = req.body;
    let like = await prisma.like.findFirst({
      where: {
        storeId,
        userId: parseInt(session?.user?.id),
      },
    });
    let message = '';

    if (like) {
      like = await prisma.like.delete({
        where: {
          id: like.id,
        },
      });
      return res.status(204).json(like);
    } else {
      like = await prisma.like.create({
        data: {
          storeId,
          userId: parseInt(session?.user?.id),
        },
      });
      return res.status(201).json(like);
    }
  } else {
    const count = await prisma.like.count({});
    const likes = await prisma.like.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        userId: parseInt(session?.user?.id),
      },
      skip: page === undefined ? 0 : parseInt(page) * parseInt(limit),
      take: limit === undefined ? {} : parseInt(limit),
      include: {
        store: true,
      },
    });
    return res.status(200).json({
      page: parseInt(page),
      data: likes,
      totalCount: count,
      totalPage: Math.ceil(count / limit),
    });
  }
}
