import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import config from './common/configs';
import { MetricModule } from './modules/metric/metric.module';
import { DatabaseConfig, MongoUtils } from './modules/shared/utils/mongo.utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<MongooseModuleOptions> => {
        try {
          const mongoConfig = new DatabaseConfig(
            configService.get('DB_NAME', ''),
            configService.get('DB_HOSTS') || '',
            configService.get('DB_USER'),
            configService.get('DB_PASSWORD'),
          );
          
          const dbUri = MongoUtils.getMongoUri(mongoConfig);
          
          return {
            uri: dbUri,
            useCreateIndex: true,
            useFindAndModify: true,
          };
        } catch (err) {
          console.error(err);
          throw new Error('Cannot connect DB');
        }
      },

      inject: [ConfigService],
    }),
    MetricModule,
  ],
})
export class AppModule {}
