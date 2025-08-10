import { IsOptional, IsString, IsBoolean, IsArray } from 'class-validator';

export class UpdateNannyDto {
  @IsOptional()
  @IsBoolean()
  isValidated?: boolean;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  education?: string;

  @IsOptional()
  @IsString()
  jobs?: string;

  @IsOptional()
  @IsString()
  occupancy?: string;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  agesBaby?: string[];

  @IsOptional()
  @IsString()
  duties?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  advantages?: string[];
}
