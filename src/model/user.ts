import { IsDefined, IsEmail, Min, IsNumber, IsString, MinLength, IsOptional } from 'class-validator';
import moment from 'moment';
import { v4 as uuid4 } from 'uuid';

export class User {
  id: string = uuid4();
  @IsDefined()
  @IsString()
  @MinLength(3)
  name: string;

  @IsDefined()
  @IsString()
  @MinLength(3)
  userName: string;

  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @Min(0)
  @IsNumber()
  bitcoinAmount: number = 0;

  @IsOptional()
  @Min(0)
  @IsNumber()
  usdBalance: number = 0;

  @IsOptional()
  @IsString()
  createdAt: string = moment().format();

  @IsOptional()
  @IsString()
  updatedAt: string;
}
