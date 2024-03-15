import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BaseController } from 'src/common/controller/base.controller';
import { UrlDTO } from './dto/url.dto';
import { UrlService } from './service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { CreateUrlDTO } from './dto/create-url.dto';
import { HttpExceptionFilter } from 'src/common/exception-filter/http-exception.filter';
import { Response } from 'express';

@Controller('/url')
export class UrlController extends BaseController<UrlDTO> {
  constructor(private readonly urlService: UrlService) {
    super(urlService);
  }

  @UseFilters(HttpExceptionFilter)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('/:urlId')
  async redirect(
    @Param('urlId') urlId: string,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.urlService.click(urlId);
    response.redirect(result.originUrl);
  }

  @UseFilters(HttpExceptionFilter)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/short')
  async short(@Body() body: CreateUrlDTO): Promise<ResponseDTO<UrlDTO>> {
    const result = await this.urlService.short(body);
    const responseDTO = new ResponseDTO<UrlDTO>();
    responseDTO.data = result;
    return responseDTO;
  }
}
