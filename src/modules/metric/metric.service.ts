import { Injectable } from '@nestjs/common';
import { IListModels } from '../shared/response';
import { DistanceUnit, MetricType, TemperatureUnit } from './metric.enum';
import { MetricRepository } from './metric.repository';
import {
  AddDistanceMetric,
  AddTemperatureMetric,
  DistanceMetric,
  GetMetricsPayload,
  IAddMetricPayload,
  IAddMetricViewReq,
  IGetMetricsViewReq,
  IMetric,
  TemperatureMetric,
} from './metric.type';

@Injectable()
export class MetricService {
  constructor(private readonly metricRepository: MetricRepository) {}

  public async addMetric(addMetricReq: IAddMetricViewReq): Promise<IMetric> {
    let payload: IAddMetricPayload;

    switch (addMetricReq.type) {
      case MetricType.DISTANCE:
        payload = this.getAddDistanceMetricPayload(addMetricReq);
        break;
      case MetricType.TEMPERATURE:
        payload = this.getAddTemperatureMetricPayload(addMetricReq);
        break;
    }

    return await this.metricRepository.addMetric(payload);
  }

  private getAddDistanceMetricPayload(
    addMetricReq: IAddMetricViewReq,
  ): IAddMetricPayload {
    return new AddDistanceMetric(
      addMetricReq.userId,
      addMetricReq.value,
      addMetricReq.createdAt || new Date(),
      addMetricReq.unit as DistanceUnit,
    );
  }

  private getAddTemperatureMetricPayload(
    addMetricReq: IAddMetricViewReq,
  ): IAddMetricPayload {
    return new AddTemperatureMetric(
      addMetricReq.userId,
      addMetricReq.value,
      addMetricReq.createdAt || new Date(),
      addMetricReq.unit as TemperatureUnit,
    );
  }

  public async getMetrics(
    getMetricsReq: IGetMetricsViewReq,
  ): Promise<IListModels<IMetric>> {
    const payload = new GetMetricsPayload(
      getMetricsReq.userId,
      getMetricsReq.sortField,
      getMetricsReq.order,
      getMetricsReq.offset,
      getMetricsReq.limit,
      getMetricsReq.type,
      getMetricsReq.from,
      getMetricsReq.to,
      getMetricsReq.formatUnit,
    );
    const listMetrics = await this.metricRepository.getMetrics(payload);

    let metrics: IMetric[];
    switch (getMetricsReq.type) {
      case MetricType.DISTANCE:
        metrics = listMetrics.data.map((metric) => {
          return new DistanceMetric(
            metric.id,
            metric.userId,
            metric.value,
            metric.createdAt,
            metric.unit as DistanceUnit,
            getMetricsReq.formatUnit as DistanceUnit,
          );
        });
        break;
      case MetricType.TEMPERATURE:
        metrics = listMetrics.data.map((metric) => {
          return new TemperatureMetric(
            metric.id,
            metric.userId,
            metric.value,
            metric.createdAt,
            metric.unit as TemperatureUnit,
            getMetricsReq.formatUnit as TemperatureUnit,
          );
        });
        break;
    }

    return {
      data: metrics,
      total: listMetrics.total,
    };
  }
}
