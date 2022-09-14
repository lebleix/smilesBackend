import { PartialType } from '@nestjs/swagger';
import { CreateBestPriceDto } from './create-best-price.dto';

export class UpdateBestPriceDto extends PartialType(CreateBestPriceDto) {}
