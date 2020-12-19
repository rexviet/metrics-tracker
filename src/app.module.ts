import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { Connection } from 'amqp-ts';
import config from './common/configs';
import { MetricChartModule } from './modules/metric-chart/metric-chart.module';
import { MetricModule } from './modules/metric/metric.module';
import { QueueModule } from './modules/shared/queue/queue.module';
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
    QueueModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const queueURL = configService.get('QUEUE_URL' || 'amqp://localhost');
        return new Connection(queueURL);
      },
      inject: [ConfigService],
    }),
    MetricModule,
    MetricChartModule,
  ],
})
export class AppModule {}
