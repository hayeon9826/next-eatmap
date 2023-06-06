import type { NextApiRequest, NextApiResponse } from 'next';
import { StoreApiResponse } from '@/interface';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse>
) {
  const { id, page, limit = '10', q, district }: any = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'POST') {
    const formData = req.body;
    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address
      )}`,
      { headers }
    );

    const result = await prisma.store.create({
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });

    return res.status(200).json(result);
  } else if (req.method === 'PUT') {
    const formData = req.body;
    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address
      )}`,
      { headers }
    );

    const result = await prisma.store.update({
      where: { id: formData.id },
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });

    return res.status(200).json(result);
  } else if (req.method === 'DELETE') {
    const result = await prisma.store.delete({ where: { id: parseInt(id) } });

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
        include: {
          likes: {
            where: session?.user
              ? { userId: parseInt(session?.user?.id) }
              : { userId: 0 },
          },
        },
      });
    }

    return res.status(200).json(id ? stores[0] : stores);
  }
}
