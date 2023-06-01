import type { NextApiRequest, NextApiResponse } from 'next';
import { StoreType } from '@/interface';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreType[]>
) {
  const { id }: any = req.query;
  const stores = await prisma.store.findMany({
    orderBy: { id: 'asc' },
    where: {
      id: id ? parseInt(id) : {},
    },
  });
  console.log(stores);

  res.status(200).json(id ? stores[0] : stores);
}
