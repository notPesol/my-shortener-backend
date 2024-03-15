import { Module } from '@nestjs/common';
import { UrlController } from './controller';
import { SequelizeModule } from 'src/common/sequelize/module';
import { UrlRepository } from './repository';
import { UrlService } from './service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SequelizeModule, ConfigModule],
  providers: [UrlRepository, UrlService],
  controllers: [UrlController],
})
export class UrlModule {}
