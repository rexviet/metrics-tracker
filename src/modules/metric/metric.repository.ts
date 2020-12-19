import { Inject, Injectable } from '@nestjs/common';
import { IListModels } from '../shared/response';
import { IRepository } from '../shared/shared.type';
import { IMetricDatasource } from './metric.datasource';
import { Metric } from './metric.entity';
import { IAddMetricPayload, IGetMetricsPayload, IMetric } from './metric.type';

@Injectable()
export class MetricRepository implements IRepository {
  constructor(
    @Inject('IMetricDatasource')
    private readonly metricDatasource: IMetricDatasource,
  ) {}

  documentToObject(document: Metric): IMetric {
    return document.toObject({ getters: true }) as IMetric;
  }

  public async addMetric(payload: IAddMetricPayload): Promise<IMetric> {
    const metric = await this.metricDatasource.addMetric(payload);
    return this.documentToObject(metric);
  }

  public async getMetrics(
    payload: IGetMetricsPayload,
  ): Promise<IListModels<IMetric>> {
    const listMetrics = await this.metricDatasource.getMetrics(payload);
    return {
      data: listMetrics.data.map(this.documentToObject),
      total: listMetrics.total,
    };
  }
}
