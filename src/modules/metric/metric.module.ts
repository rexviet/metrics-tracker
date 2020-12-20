import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricService } from './metric.service';
import { MetricRepository } from './metric.repository';
import { MetricController } from './metric.controller';
import { Metric, MetricSchema } from './metric.entity';
import { MetricMongoDS } from './metric.datasource';
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
