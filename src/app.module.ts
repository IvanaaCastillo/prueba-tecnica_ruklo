import { CustomersModule } from './customers/customers.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, CustomersModule],
})
export class AppModule {}