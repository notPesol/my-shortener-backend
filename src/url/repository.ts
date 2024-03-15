import { Injectable } from '@nestjs/common';
import { DataTypes } from 'sequelize';
import { BaseRepoSitory } from 'src/common/repository/base.repositoty';
import { SequelizeService } from 'src/common/sequelize/service';

@Injectable()
export class UrlRepository extends BaseRepoSitory {
  constructor(private readonly sequelizeService: SequelizeService) {
    super();
  }
  protected init(): void {
    this.model = this.sequelizeService.defineModel(
      'url',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        urlId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        originUrl: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        shortUrl: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        click: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: () => new Date(),
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: () => new Date(),
        },
      },
      { tableName: 'url' },
    );
  }
}
