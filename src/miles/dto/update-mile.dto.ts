import { PartialType } from '@nestjs/swagger';
import { CreateMileDto } from './create-mile.dto';

export class UpdateMileDto extends PartialType(CreateMileDto) {}
