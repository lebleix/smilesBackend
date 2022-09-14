import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MilesService } from './miles.service';
import { CreateMileDto } from './dto/create-mile.dto';
import { UpdateMileDto } from './dto/update-mile.dto';
import { BestPriceService } from 'src/best-price/best-price.service';
import { ApiTags } from '@nestjs/swagger';
import { SearchMileDto } from './dto/search-mile.dto';
@ApiTags('miles')
@Controller('miles')
export class MilesController {
  constructor(
    private readonly milesService: MilesService,
    private bestPriceService: BestPriceService,
  ) {}
  @Post('addByDestination')
  async saveDataByDestination(@Body() createMileDto: CreateMileDto) {
    return await this.milesService.saveDataByDestination(createMileDto);
  }
  @Post('searchAllMiles')
  async findOneByDestination(@Body() mileDto: SearchMileDto) {
    return await this.milesService.SearchSave(mileDto);
  }
  
  @Post('searchOnly')
  async findOnly(@Body() smileDto: SearchMileDto) {
    return await this.milesService.findOnly(smileDto);
  }



  @Get('findWithoutMinMiles')
  async findWithoutMinMiles() {
    return await this.milesService.findWithoutMinMiles();
  }
}
