import { IsDate, IsNumber, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';

export class UrlDTO extends BaseDTO {
  @IsNumber()
  id: number;

  @IsString()
  urlId: string;

  @IsString()
  originUrl: string;

  @IsString()
  shortenUrl: string;

  @IsNumber()
  click: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
