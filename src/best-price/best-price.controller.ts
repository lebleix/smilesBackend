import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BestPriceService } from './best-price.service';
import { CreateBestPriceDto } from './dto/create-best-price.dto';
import { UpdateBestPriceDto } from './dto/update-best-price.dto';

@Controller('best-price')
export class BestPriceController {
  constructor(private readonly bestPriceService: BestPriceService) {}
}
