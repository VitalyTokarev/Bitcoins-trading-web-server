import { IsNumber, IsString, Min, IsOptional } from 'class-validator';

export class Bitcoin {
  @IsNumber()
  @Min(0)
  price: number = 100;

  @IsOptional()
  @IsString()
  updatedAt: string;
}
