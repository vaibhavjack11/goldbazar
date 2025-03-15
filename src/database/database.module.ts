import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from 'src/models';
import { configuration } from 'src/utils';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: configuration.host || 'localhost',
      port: configuration.port || 5432,
      username: configuration.username || 'postgres',
      password: configuration.password || 'password',
      database: configuration.database || 'goldbazar',
      autoLoadModels: true,
      synchronize: true,
      models
    })
  ],
  exports: [SequelizeModule]
})
export class DatabaseModule {}
