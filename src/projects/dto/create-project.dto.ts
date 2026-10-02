import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional() 
  @IsString() 
  subTitle?: string;

  @IsOptional() 
  @IsString()
   description?: string;

  @IsOptional() 
  @IsString()
   main_image?: string;

  @IsOptional() 
  @IsString()
   sub_image_1?: string;

  @IsOptional() 
  @IsString()
   sub_image_2?: string;

  @IsOptional() 
  @IsString()
   sub_image_3?: string;

  @IsOptional() 
  @IsString()
   github_url?: string;

  @IsOptional() 
  @IsString()
   live_url?: string;



  // accepts [1,2,3] or "1,2,3", like the old handler
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.map(Number)
      : String(value).split(',').filter(Boolean).map(Number),
  )
  @IsArray()
  @IsInt({ each: true })
  frameworks?: number[];
}