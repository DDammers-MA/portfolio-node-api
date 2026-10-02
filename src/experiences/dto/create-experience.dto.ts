import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsDateString()
  start_date: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

      @IsOptional()
      current: number;

  @IsOptional()
  @IsString()
  description?: string;

  
}