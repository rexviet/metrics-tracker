import { Injectable, Inject } from '@nestjs/common';
import { IRepository } from '../shared/shared.type';
import { IMetricChartDatasource } from './metric-chart.datasource';
import { MetricChart } from './metric-chart.entity';
import {
  IGetMetricsChartPayload,
  IMetricChart,
  IUpsertMetricChartPayload,
} from './metric-chart.type';

@Injectable()
export class MetricChartRepository implements IRepository {
  constructor(
    @Inject('IMetricChartDatasource')
    private readonly metricChartDatasource: IMetricChartDatasource,
  ) {}

  documentToObject(document: MetricChart): IMetricChart {
    return (document.toObject({ getters: true }) as unknown) as IMetricChart;
  }

  public async upsertMetricChart(
    payload: IUpsertMetricChartPayload,
  ): Promise<void> {
    return this.metricChartDatasource.upsertMetricChart(payload);
  }

  public async getMetricsChart(
    payload: IGetMetricsChartPayload,
  ): Promise<IMetricChart[]> {
    const metricsChart = await this.metricChartDatasource.getMetricsChart(
      payload,
    );
    return metricsChart.map(this.documentToObject);
  }
}
