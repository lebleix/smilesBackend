import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as moment from 'moment';
import { BestPriceService } from 'src/best-price/best-price.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SmilesService } from 'src/smiles/smiles.service';
import { CreateMileDto } from './dto/create-mile.dto';
import { SearchMileDto } from './dto/search-mile.dto';
import { UpdateMileDto } from './dto/update-mile.dto';

@Injectable()
export class MilesService {
  constructor(
    private prisma: PrismaService,
    private bestPriceService: BestPriceService,
    private smilesService: SmilesService,
  ) { }
  async saveDataByDestination(smileDto: CreateMileDto) {
    const parseDate = (str) => {
      const [year, month, day] = str.split('-');

      const newDat = month + '-' + day + '-' + year;
      return newDat;
    };

    const newDateFrom = parseDate(smileDto.dateFrom);
    const newDateTo = parseDate(smileDto.dateTo);
    const obj = {
      flight: null,
      destination: smileDto.destination,
      adults: smileDto.adults,
      class: smileDto.class,
      notification:smileDto.notification,
  stop:smileDto.stop,
      origin: smileDto.origin,
      dateFrom: newDateFrom,
      dateTo: newDateTo,
      min_miles: null,
    };
    console.log('obj', obj);

    const result = await this.prisma.search.create({
      data: obj,
    });
    return result;
  }

  async findWithoutMinMiles() {
    return await this.prisma.search.findMany({
      where: { min_miles: null },
      include: { BestPrice: true },
    });
  }

  // async searchByDestination(smileDto: SearchMileDto) {
  //   const arr = [];
  //   const days = await this.smilesService.getDays(
  //     smileDto.dateFrom,
  //     smileDto.dateTo,
  //   );
  //   console.log('DAYS=', days);
  //   let date = smileDto.dateFrom;
  //   let response;
  //   let bestprice;
  //   let priceDate;

  //   // const date_now = Date.now();
  //   // console.log('date now', date_now);
  //   const date_now = new Date();
  //   console.log('date now', date_now);
  //   const newDate_now = moment(date_now).format('MM-DD-yyyy');
  //   console.log('newDate_now', newDate_now);
  //   // const datenow = Date.now();
  //   for (let i = 0; i <= days; i++) {
  //     console.log('value of i in start', i);

  //     const newDate = moment(date).format('yyyy-MM-DD');
  //     console.log('newDate', newDate);
  //     //to check if the date is expired
  //     console.log('date', date);
  //     console.log('newDate_now', newDate_now);
  //     if (date < newDate_now) {
  //       console.log('date expired');
  //       const expire = await this.smilesService.updateExpire(smileDto.id);

  //       response = expire;
  //     } else {
  //       const result = await this.smilesService.findOneByDestination(
  //         smileDto,
  //         newDate,
  //       );
  //       console.log('results recieved ', result);
  //       if (result) {
  //         const update = await this.smilesService.updateSearch(
  //           smileDto.id,
  //           result.data,
  //           result.departure_Date,
  //           result.airline,
  //           result.duration,
  //           1
  //         );
  //         if (update) {
  //           console.log('updated result in search By destination');
  //           response = update;
  //         } else {
  //           console.log('nothing to Update');
  //         }
  //       }
  //     }
  //     console.log('value of i', i);

  //     date = moment(date).add(1, 'day').format('MM-DD-yyyy');
  //   }
  //   console.log('checked all');

  //   return { message: 'checked all' };
  // }

  async searchByDestination(smileDto: SearchMileDto) {}



  async  SearchSave(smile: SearchMileDto) {
    await await this.prisma.bestPrice.deleteMany();
    console.log("class",smile.class.toUpperCase());
     
    let arr = [];
    let dateArray = [];
    let findBusiness;
    let miles;
    let stop;
    let response
    let duration;
    let airline
    const days = this.getDays(smile.dateFrom, smile.dateTo);
    console.log("days to calculate", days);
    let date = smile.dateFrom;

    for (let i = 0; i <= days; i++) {
      
      const newDate = moment(date).format('yyyy-MM-DD');
      dateArray.push(newDate);
      date = moment(date).add(1, 'day').format('yyyy-MM-DD');
    }
    console.log("dates",dateArray);
    let k ;
    const responses = await Promise.allSettled(
      dateArray.map(async departure_Date => {
        const date_now = new Date();
        const newDate_now = moment(date_now).format('yyyy-MM-DD');
    console.log("new date now",newDate_now);

    if (departure_Date < newDate_now) {
            console.log('date expired');
            const expire = await this.bestPriceService.updateExpire(smile.id,departure_Date);
    
            response = expire;
          } else {
        const xApiKey = 'aJqPU7xNHl9qN3NVZnPaJ208aPo2Bh2p2ZV844tw';
        const url =
          'https://api-air-flightsearch-prd.smiles.com.br/v1/airlines/search?adults=' +
          smile.adults +
          '&cabinType=' +
          smile.class +
          '&children=0&currencyCode=ARS&departureDate=' +
          departure_Date +
          '&destinationAirportCode=' +
          smile.destination +
          '&infants=0&isFlexibleDateChecked=false&originAirportCode=' +
          smile.origin +
          '&tripType=2&forceCongener=false&r=ar';

        const res = await axios.get(url, {
          headers: {
            'x-api-key': 'aJqPU7xNHl9qN3NVZnPaJ208aPo2Bh2p2ZV844tw',
            region: 'ARGENTINA',
            // 'Authorization': `Bearer ${xApiKey}`
          },
        }); 
       
       
      //   console.log("departure date index",departure_Date );
       
      //  console.log("departure date index",dateArray.indexOf(departure_Date) );
     
 
       const y= res.data.requestedFlightSegmentList[0].flightList;
       
         
       if (y) {
         findBusiness= this.findBothSmiles(y,departure_Date,smile.class.toUpperCase());
         
         if(findBusiness.mile){
          miles=findBusiness.mile;
          if(smile.stop===true){
            if(findBusiness.stop===0){

           
          const parseDate = (str) => {
            const [year, month, day] = str.split('-');

            const newDat = month + '-' + day + '-' + year;
            return newDat;
          };

          const newDepDate = parseDate(departure_Date);


        
                  
                  const update = await this.smilesService.updateSearch(                    
                    smile.id,
                    miles,
                    newDepDate,
                    findBusiness.airline,
                    findBusiness.duration,
                    findBusiness.stop
                  )
                  
                  if (update) {
                    console.log('updated result in search By destination');
                    response = update;
                  } else {
                    console.log('nothing to Update');
                  }
                }         
      }
      else{
        
        const parseDate = (str) => {
          const [year, month, day] = str.split('-');

          const newDat = month + '-' + day + '-' + year;
          return newDat;
        };

        const newDepDate = parseDate(departure_Date);


       
                const update = await this.smilesService.updateSearch(                    
                  smile.id,
                  miles,
                  newDepDate,
                  findBusiness.airline,
                  findBusiness.duration,
                  findBusiness.stop
                )
                
                if (update) {
                  console.log('updated result in search By destination');
                  response = update;
                } else {
                  console.log('nothing to Update');
                }
      }
    }
      }}
	 })
);
    return {message:"Checked All"};
}

  findBothSmiles(abc,date,cabin){
    try {
      let i;
      let j;
      let x;
      let y;
      let stop;
      let duration;
      let airline;
      const arr = [];
      const arr2 = [];
      const minValue = [];
      const fareList = [];
      

     let fun=0;
      abc.forEach((element) => {
        if(cabin==="BOTH"){
          const newTestDate = element.departure.date;
          fun=fun+1; 
          if (newTestDate.slice(0, 10) === date)
          {  
            // console.log( "element"+fun );
            // console.log(element);
            
      const obj={
        farelist:element.fareList,
       MainId: element.uid
      }      
          fareList.push(obj);
          console.log("farelist",fareList);
          
          
          stop=element.stops;
          duration = element.duration.hours+ ":" + element.duration.minutes;
            airline=element.airline.code;
       }       
        }
        else{
        if (element.cabin === cabin) {
          const newTestDate = element.departure.date;
          fun=fun+1; 
          if (newTestDate.slice(0, 10) === date)
          {  
            // console.log( "element"+fun );
            // console.log(element);
            
      const obj={
        farelist:element.fareList,
       MainId: element.uid
      }      
          fareList.push(obj);
          console.log("farelist",fareList);
          
          
          stop=element.stops;
          duration = element.duration.hours+ ":" + element.duration.minutes;
            airline=element.airline.code;
       }       
      }
    }
      });

      fareList.forEach((element1) => {
     let newfarelist=element1.farelist;

        newfarelist.forEach((element2) => {
          if (element2.type === 'SMILES_CLUB') {
            console.log('found smiles club', element2);
            const obj={
              miles:element2.miles,
              mainId:element1.MainId,
            }
            minValue.push(obj);
          }
        });
      });

      if(minValue.length===0){
    }
    else{
let IDFound;

      let mile = minValue[0].miles; 
      IDFound=minValue[0].mainId;
      console.log("minvalue",minValue);
      
      minValue.forEach((element) => {
        console.log('mainID found ', element.mainId)
        if (element.miles < mile) {
          mile = element.miles;
          IDFound=element.mainId;
        }
      });
      
if(IDFound){
      abc.forEach((element) => {
        if (element.uid === IDFound) {
          stop=element.stops;
          duration = element.duration.hours+ ":" + element.duration.minutes;
            airline=element.airline.code;
      }
      });
    }

      return {mile,airline,duration,stop}
  } 
 } catch (err) {
      console.log('error', err);
    }
  }

  async  findOnly(smile: SearchMileDto) {
    console.log("class",smile.class.toUpperCase());
     
    let arr = [];
    let dateArray = [];
    let findBusiness;
    let miles;
    let stop;
    let response;
    let duration;
    let airline
    const days = this.getDays(smile.dateFrom, smile.dateTo);
    console.log("days to calculate", days);
    let date = smile.dateFrom;

    for (let i = 0; i <= days; i++) {
      
      const newDate = moment(date).format('yyyy-MM-DD');
      dateArray.push(newDate);
      date = moment(date).add(1, 'day').format('yyyy-MM-DD');
    }
    console.log("dates",dateArray);
    let k ;
    const responses = await Promise.allSettled(
      dateArray.map(async departure_Date => {
    
        const xApiKey = 'aJqPU7xNHl9qN3NVZnPaJ208aPo2Bh2p2ZV844tw';
        const url =
          'https://api-air-flightsearch-prd.smiles.com.br/v1/airlines/search?adults=' +
          smile.adults +
          '&cabinType=' +
          smile.class +
          '&children=0&currencyCode=ARS&departureDate=' +
          departure_Date +
          '&destinationAirportCode=' +
          smile.destination +
          '&infants=0&isFlexibleDateChecked=false&originAirportCode=' +
          smile.origin +
          '&tripType=2&forceCongener=false&r=ar';

        const res = await axios.get(url, {
          headers: {
            'x-api-key': 'aJqPU7xNHl9qN3NVZnPaJ208aPo2Bh2p2ZV844tw',
            region: 'ARGENTINA',
            // 'Authorization': `Bearer ${xApiKey}`
          },
        }); 
       
       
      //   console.log("departure date index",departure_Date );
       
      //  console.log("departure date index",dateArray.indexOf(departure_Date) );
     
 
       const y= res.data.requestedFlightSegmentList[0].flightList;
       
         
       if (y) {
         findBusiness= this.findBothSmiles(y,departure_Date,smile.class.toUpperCase());
         if(findBusiness.mile){
          miles=findBusiness.mile;
          if(smile.stop===true){
            if(findBusiness.stop===0){

           
          const parseDate = (str) => {
            const [year, month, day] = str.split('-');

            const newDat = month + '-' + day + '-' + year;
            return newDat;
          };

          const newDepDate = parseDate(departure_Date);


                  
                  const Obj = {
                    bestMiles: miles,
                    bestMilesdate: newDepDate,
                    stop:findBusiness.stop,
              duration :findBusiness.duration,
                airline:findBusiness.airline,
                    search:  {
                      destination: smile.destination,
                      origin: smile.origin
                    }
                  };
                   arr.push(Obj);
                } 

              
        
      }
      else{
        
        const parseDate = (str) => {
          const [year, month, day] = str.split('-');

          const newDat = month + '-' + day + '-' + year;
          return newDat;
        };

        const newDepDate = parseDate(departure_Date);

        const Obj = {
                  bestMiles: miles,
                  bestMilesdate: newDepDate,
                  stop:findBusiness.stop,
            duration :findBusiness.duration,
              airline:findBusiness.airline,
                  search:  {
                    destination: smile.destination,
                    origin: smile.origin
                  }
                };
                 arr.push(Obj);
              } 

      
    }
      }
	 })
);
    console.log("array", arr);
    return arr;
}





getDays(dateFrom, dateTo) {
  const parseDate = (str) => {
    const [month, day, year] = str.split('-');
    return new Date(year, month - 1, day);
  };
  const datediff = (first, second) => {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  };
  const diff =  datediff(parseDate(dateFrom), parseDate(dateTo));

  return diff;
}

}
