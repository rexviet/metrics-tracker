import { Injectable } from '@nestjs/common';
import { MetricService } from '../metric/metric.service';
import { IMetric } from '../metric/metric.type';
import { MetricValidator } from '../metric/metric.validator';
import { DateUtils } from '../shared/utils/date.utils';
import { MongoUtils } from '../shared/utils/mongo.utils';
import { MetricChartRepository } from './metric-chart.repository';
import {
  GetMetricsChartPayload,
  IGetMetricChartViewReq,
  IMetricChart,
  INewMetric,
  UpsertMetricChartPayload,
} from './metric-chart.type';

@Injectable()
export class MetricChartService {
  constructor(
    private readonly metricChartRepository: MetricChartRepository,
    private readonly metricService: MetricService,
  ) {}

  public async upsertMetricChart(metric: INewMetric): Promise<void> {
    const payload = new UpsertMetricChartPayload(
      MongoUtils.stringToObjectId(metric.id),
      DateUtils.dateToKey(metric.createdAt),
      metric.userId,
      metric.type,
    );
    return await this.metricChartRepository.upsertMetricChart(payload);
  }

  public async getMetricsChart(
    getMetricsChartReq: IGetMetricChartViewReq,
  ): Promise<IMetricChart[]> {
    MetricValidator.validFormatUnit(getMetricsChartReq);
    const datesArray = DateUtils.getDatesInRange(
      getMetricsChartReq.from,
      getMetricsChartReq.to,
    );

    const payload = new GetMetricsChartPayload(
      datesArray.map(DateUtils.dateToKey),
      getMetricsChartReq.userId,
      getMetricsChartReq.type,
    );
    const metricsChart = await this.metricChartRepository.getMetricsChart(
      payload,
    );

    const metrics = metricsChart.map((metricChart) => metricChart.metric);
    const formatedMetrics = this.metricService.formatMetrics(
      metrics,
      payload.type,
      getMetricsChartReq.formatUnit,
    );
    const metricsMapper: { [key: string]: IMetric } = {};
    formatedMetrics.forEach((metric) => {
      metricsMapper[metric.id] = metric;
    });

    return metricsChart.map((metricChart) => {
      return {
        metric: metricsMapper[metricChart.metric.id],
        key: metricChart.key,
        userId: metricChart.userId,
        type: metricChart.type,
      };
    });
  }
}
