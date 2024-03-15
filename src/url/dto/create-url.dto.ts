import { IsString } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';

export class CreateUrlDTO extends BaseDTO {
  @IsString()
  originUrl: string;
}
