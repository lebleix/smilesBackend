import { PartialType } from '@nestjs/mapped-types';
import { CreateSmileDto } from './create-smile.dto';

export class UpdateSmileDto extends PartialType(CreateSmileDto) {}
