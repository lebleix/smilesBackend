import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBestPriceDto } from './dto/create-best-price.dto';
import { UpdateBestPriceDto } from './dto/update-best-price.dto';

@Injectable()
export class BestPriceService {
  constructor(private prisma: PrismaService) {}
  async createBestPrice(id: number, bestMiles: number, bestMilesdate: string,airline :string,duration :string,stop: number) {
    const obj = {
      notified: false,
      bestMiles: bestMiles,
      bestMilesdate: bestMilesdate,
      airline :airline,
      duration :duration,
      stop: stop,
      searchId: id,
    };
    try {
      const result = await this.prisma.bestPrice.create({
        data: obj,
        include: { search: true },
      });
      if (result) {
        return result;
      } else {
        console.log('Search Data with ID does not exists');
        return false;
      }
    } catch (error) {
      console.log('recieved error', error);
    }
  }

  async updateNotified(id) {
    return await this.prisma.bestPrice.update({
      where: { id: id },
      data: { notified: true },
    });
  }

  async findBestPriceBySearchId(id) {
    return await this.prisma.bestPrice.findMany({
      where: { searchId: id,expired:false },
      include: { search: true },
    });
  }

  async updateExpire(searchId: number,date) {
    try {
      const search = await this.prisma.bestPrice.findFirst({
        where: {
          searchId:searchId,
          bestMilesdate:date
        },
      });
      if(search){
      const update = await this.prisma.bestPrice.update({
        where: {
          id: search.id,
        },
        data: {
          expired: true,
        },
      });
      if (update) {
        return update;
      } else {
        console.log('unable to update expire');
        return false;
      }
    }
    } catch (error) {
      console.log('recieved error', error);
    }
  }

  async findExistingBestPrice(id, bestMiles, bestMilesDate) {
    const result = await this.prisma.bestPrice.findFirst({
      where: {
        searchId: id,
        bestMiles: bestMiles,
        bestMilesdate: bestMilesDate,
      },
    });

    if (result) {
      console.log('result of existing best price', result);
      return result;
    } else {
      return false;
    }
  }
}
