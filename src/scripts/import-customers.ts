import fs from 'fs';
import csvParser from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const normalizeName = (name: string) => (name ? name.trim() : '');
const normalizeEmail = (email: string) => (email ? email.trim().toLowerCase() : '');
const normalizePhone = (phone: string) =>
  phone ? phone.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '') : '';
const normalizeDni = (dni: string) => (dni ? dni.trim().toUpperCase() : '');

async function importCSV() {
  const results: any[] = [];

  fs.createReadStream('src/data/customers.csv')
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
for (const row of results) {
  try {
    const email = normalizeEmail(row.email);
    const dni = normalizeDni(row.dni);
    const phone = normalizePhone(row.phone);

    const existing = await prisma.customer.findFirst({
      where: {
        OR: [
          { email },
          { dni },
          { phone },
        ],
      },
    });

    if (existing) {
      console.log(`⚠️ Duplicado detectado: ${row.name}`);
      continue;
    }

    await prisma.customer.create({
      data: {
        name: normalizeName(row.name),
        email,
        phone,
        dni,
      },
    });

    console.log(`✔ Insertado: ${row.name}`);
  } catch (error) {
    console.log(`❌ Error con: ${row.name}`, error.message);
  }
}

      await prisma.$disconnect();
      console.log('🎉 Importación finalizada');
    });
}

importCSV();