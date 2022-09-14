import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmilesModule } from './smiles/smiles.module';
import { BestPriceModule } from './best-price/best-price.module';
import { MilesModule } from './miles/miles.module';

@Module({
  imports: [SmilesModule, BestPriceModule, MilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
