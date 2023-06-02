import type { NextApiRequest, NextApiResponse } from 'next';
import { StoreApiResponse } from '@/interface';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse>
) {
  const { id, page, limit = '10', q, district }: any = req.query;

  if (req.method === 'POST') {
    const data = req.body;

    const result = await prisma.store.create({
      data: { ...data },
    });

    return res.status(200).json(result);
  } else {
    let stores;

    const count = await prisma.store.count({});

    if (page) {
      stores = await prisma.store.findMany({
        orderBy: { id: 'asc' },
        where: {
          id: id ? parseInt(id) : {},
          district: district ? district : {},
          ...(q ? { name: { contains: q } } : {}),
        },
        skip: page === undefined ? 0 : parseInt(page) * parseInt(limit),
        take: limit === undefined ? {} : parseInt(limit),
      });

      return res.json({
        page: parseInt(page),
        data: stores,
        totalCount: count,
        totalPage: Math.ceil(count / limit),
      });
    } else {
      stores = await prisma.store.findMany({
        orderBy: { id: 'asc' },
        where: {
          id: id ? parseInt(id) : {},
          district: district ? district : {},
          ...(q ? { name: { contains: q } } : {}),
        },
      });
    }

    return res.status(200).json(id ? stores[0] : stores);
  }
}
