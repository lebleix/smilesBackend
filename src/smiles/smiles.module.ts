import { Module } from '@nestjs/common';
import { SmilesService } from './smiles.service';
import { SmilesController } from './smiles.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BestPriceService } from 'src/best-price/best-price.service';

@Module({
  controllers: [SmilesController],
  providers: [SmilesService, PrismaService, BestPriceService],
})
export class SmilesModule {}
