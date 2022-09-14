import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SmilesService } from './smiles.service';
import { CreateSmileDto } from './dto/create-smile.dto';
import { UpdateSmileDto } from './dto/update-smile.dto';
import { ApiRequestTimeoutResponse, ApiTags } from '@nestjs/swagger';
import { SearchSmileDto } from './dto/search.dto';
import { BestPriceService } from 'src/best-price/best-price.service';

@ApiTags('smiles')
@Controller('smiles')
export class SmilesController {
  constructor(
    private readonly smilesService: SmilesService,
    private bestPriceService: BestPriceService,
  ) {}

  @Get('findall')
  findAll() {
    return this.smilesService.findAll();
  }
//to show all search 
  @Get('findByDestination')
  async findByDestination() {
    return await this.smilesService.findByDestination();
  }

  //to show only with min miles
  @Get('findByDestinationWithMiles')
  async findByDestinationWithMiles() {
    return await this.smilesService.findByDestinationWithNotMiles();
  }


  @Post('updateNotified/:id')
  async updateNotified(@Param('id') id: number) {
    return await this.bestPriceService.updateNotified(+id);
  }

  @Post('updateNotifiedTrue/:id')
  async updateNotifiedTrue(@Param('id') id: number) {
    return await this.smilesService.updateNotifyTrue(+id);
  }

  @Post('updateNotifiedFalse/:id')
  async updateNotifiedFalse(@Param('id') id: number) {
    return await this.smilesService.updateNotifyTrue(+id);
  }

  @Get(':id')
  async findBestPriceBySearchId(@Param('id') id: number) {
    return await this.bestPriceService.findBestPriceBySearchId(+id);
  }

  @Post('search')
  async findOneByDestination(@Body() smileDto: SearchSmileDto) {
    
    return await this.smilesService.SearchSave(smileDto);
  }
  // @Get(':flight')
  // async findOneByFlight(@Param('flight') flight: string) {
  //   console.log('flight', flight);

  //   return await this.smilesService.findOneByDestination();
  // }
  @Post('searchOnly')
  async findOnly(@Body() smileDto: SearchSmileDto) {
    return await this.smilesService.findOnly(smileDto);
  }



  @Post('addByDestination')
  async saveDataByDestination(@Body() smile: CreateSmileDto) {
    return await this.smilesService.saveDataByDestination(smile);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.smilesService.remove(+id);
  }
}
