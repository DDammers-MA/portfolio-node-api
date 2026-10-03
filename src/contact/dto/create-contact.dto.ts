import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateContactDto {
  @IsString() @IsNotEmpty() @MaxLength(100)
  naam: string;

  @IsEmail()
  email: string;

  @IsString() @IsNotEmpty() @MaxLength(150)
  subject: string;

  @IsString() @IsNotEmpty() @MaxLength(5000)
  msg: string;

  @IsOptional() @IsString() @MaxLength(30)
  mv?: string; // aanhef

  @IsOptional() @IsString() @MaxLength(30)
  tel?: string;
}