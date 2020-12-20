import {
  // MiddlewareConsumer,
  Module,
  // NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricService } from './metric.service';
import { MetricRepository } from './metric.repository';
import { MetricController } from './metric.controller';
import { Metric, MetricSchema } from './metric.entity';
import { MetricMongoDS } from './metric.datasource';
// import { ValidFormatUnitMiddleware } from './metric.middleware';
import { MetricProducer } from './metric.producer';

const metricDSProvider = {
  provide: 'IMetricDatasource',
  useClass: MetricMongoDS,
};

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Metric.name, schema: MetricSchema }]),
  ],
  providers: [
    MetricRepository,
    MetricService,
    metricDSProvider,
    MetricProducer,
  ],
  exports: [MetricModule, MetricService],
  controllers: [MetricController],
})
export class MetricModule {}
// export class MetricModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(ValidFormatUnitMiddleware)
//       .forRoutes({ path: '/metrics*', method: RequestMethod.GET });
//   }
// }
