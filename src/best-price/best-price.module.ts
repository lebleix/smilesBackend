import { Module } from '@nestjs/common';
import { BestPriceService } from './best-price.service';
import { BestPriceController } from './best-price.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BestPriceController],
  providers: [BestPriceService, PrismaService],
})
export class BestPriceModule {}
