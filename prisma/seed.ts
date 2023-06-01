const { PrismaClient } = require('@prisma/client');
import * as data from '../data/store.json';

const prisma = new PrismaClient();

async function createStores() {
  data?.['DATA']?.map(async (store) => {
    const storeData = {
      phone: store?.tel_no,
      address: store?.rdn_code_nm,
      lat: store?.y_dnts,
      lng: store?.x_cnts,
      name: store?.upso_nm,
      category: store?.bizcnd_code_nm,
      storeType: store?.cob_code_nm,
      foodCertifyName: store?.crtfc_gbn_nm,
    };
    const result = await prisma.store.create({ data: storeData });
    console.log(result);
  });
}

async function main() {
  await prisma.store.deleteMany({});
  await createStores();
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
