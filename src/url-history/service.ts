import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from 'src/common/service/base.service';
import { UrlDTO } from './dto/url.dto';
import { UrlRepository } from './repository';
import { CreateUrlDTO } from './dto/create-url.dto';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService extends BaseService<UrlDTO> {
  private readonly baseUrl: string;
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly configService: ConfigService,
  ) {
    super(urlRepository);
    this.baseUrl = configService.get<string>('baseUrl');
  }

  async click(urlId: string) {
    let result = await this.findOne({
      where: {
        urlId: urlId,
      },
      raw: true,
    });

    if (!result.id) {
      throw new NotFoundException();
    }    

    result = await this.update(result.id, {
      click: result.click + 1,
      updatedAt: new Date(),
    });

    return result;
  }

  async short(body: CreateUrlDTO): Promise<UrlDTO> {
    const { originUrl } = body;

    if (!this.validateUrl(originUrl)) {
      throw new BadRequestException('Invalid original url.');
    }

    const result = await this.findOne({
      where: {
        originUrl: originUrl,
      },
      raw: true,
    });

    if (result.id) {
      return new UrlDTO(result);
    }

    const urlId = nanoid();

    const shortUrl = `${this.baseUrl}/${urlId}`;
    const model = await this.urlRepository.create({
      urlId,
      originUrl,
      shortUrl,
    });

    return new UrlDTO(model);
  }

  validateUrl(value: string): boolean {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    );

    return !!urlPattern.test(value);
  }
}
