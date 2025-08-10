import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateChildDto {
  @IsString()
  gender: string;

  @IsString()
  age: number | string;
}
export class CreateVacancyDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  residency: string;

  @IsArray()
  @IsBoolean({ each: true })
  charts: boolean[];

  @IsArray()
  @IsBoolean({ each: true })
  occupation: boolean[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateChildDto)
  childrens: CreateChildDto[];

  @IsString()
  description: string;

  @IsString()
  question: string;

  @IsArray()
  @IsBoolean({ each: true })
  duties: boolean[];

  @IsString()
  payType: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pay?: string[];
}