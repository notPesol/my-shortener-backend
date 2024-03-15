import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/config/configuration';
import { SequelizeModule } from './common/sequelize/module';
import { UrlModule } from './url/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule,
    UrlModule,
  ],
})
export class AppModule {}
