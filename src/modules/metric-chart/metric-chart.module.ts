import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MetricChartService } from './metric-chart.service';
import { MetricChartRepository } from './metric-chart.repository';
import { MetricChartMongoDS } from './metric-chart.datasource';
import { MetricChart, MetricChartSchema } from './metric-chart.entity';
import { MetricChartConsumer } from './metric-chart.consumer';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricChartController } from './metric-chart.controller';
import { MetricModule } from '../metric/metric.module';

const metricChartDSProvider = {
  provide: 'IMetricChartDatasource',
  useClass: MetricChartMongoDS,
};

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MetricChart.name, schema: MetricChartSchema },
    ]),
    MetricModule,
  ],
  providers: [
    ConfigService,
    MetricChartService,
    MetricChartRepository,
    metricChartDSProvider,
  ],
  exports: [MetricChartModule, MetricChartService],
  controllers: [MetricChartController, MetricChartConsumer],
})
export class MetricChartModule {}
