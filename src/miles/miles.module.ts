import { Module } from '@nestjs/common';
import { MilesService } from './miles.service';
import { MilesController } from './miles.controller';
import { BestPriceService } from 'src/best-price/best-price.service';
import { SmilesService } from 'src/smiles/smiles.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MilesController],
  providers: [MilesService, BestPriceService, SmilesService, PrismaService],
})
export class MilesModule {}
