import type { NextApiRequest, NextApiResponse } from 'next';
import { CommentApiResponse } from '@/interface';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentApiResponse>
) {
  const session = await getServerSession(req, res, authOptions);
  const { id, page, limit = '10', storeId, user }: any = req.query;

  if (req.method === 'POST') {
    if (!session?.user) {
      return res.status(401);
    }
    const { storeId, body }: any = req.body;

    const comment = await prisma.comment.create({
      data: {
        storeId,
        userId: parseInt(session?.user?.id),
        body,
      },
    });
    return res.status(200).json(comment);
  } else if (req.method === 'DELETE') {
    if (!session?.user) {
      return res.status(401);
    }
    const result = await prisma.comment.delete({ where: { id: id } });

    return res.status(200).json(result);
  } else {
    const count = await prisma.comment.count({
      where: {
        userId: user && session?.user ? parseInt(session?.user?.id) : {},
        storeId: storeId ? parseInt(storeId) : {},
      },
    });
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        userId: user && session?.user ? parseInt(session?.user?.id) : {},
        storeId: storeId ? parseInt(storeId) : {},
      },
      skip: page === undefined ? 0 : parseInt(page) * parseInt(limit),
      take: limit === undefined ? {} : parseInt(limit),
      include: {
        store: true,
        user: true,
      },
    });

    return res.status(200).json({
      page: parseInt(page),
      data: comments,
      totalCount: count,
      totalPage: Math.ceil(count / limit),
    });
  }
}
