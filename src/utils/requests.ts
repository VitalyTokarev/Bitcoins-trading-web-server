import { IsDefined, IsEmail, IsString, MinLength, IsOptional, IsNumber, Min, IsIn } from 'class-validator';

export class PutUser {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;
}

export class PostUserUsd {
  @IsDefined()
  @IsString()
  @IsIn(['withdraw', 'deposit'])
  action: string;

  @IsDefined()
  @IsNumber()
  @Min(0)
  amount: number;
}

export class PostUserBitcoins {
  @IsDefined()
  @IsString()
  @IsIn(['sell', 'buy'])
  action: string;

  @IsDefined()
  @IsNumber()
  @Min(0)
  amount: number;
}
