import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchMileDto {
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  dateFrom: string;

  @IsNotEmpty()
  @ApiProperty()
  dateTo: string;

  @IsOptional()
  @ApiProperty()
  adults: string;
  
  @IsOptional()
  @ApiProperty()
  class: string;
  
  @IsOptional()
  @ApiProperty()
  notification: boolean;
  
  
  @IsOptional()
  @ApiProperty()
  stop: boolean;

  @IsString()
  @ApiProperty()
  @IsOptional()
  destination: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  origin: string;
}
