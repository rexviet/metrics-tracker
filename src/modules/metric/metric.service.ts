import { Injectable } from "@nestjs/common";
import { DistanceUnit, MetricType, TemperatureUnit } from "./metric.enum";
import { MetricRepository } from "./metric.repository";
import { AddDistanceMetric, AddTemperatureMetric, IAddMetricPayload, IAddMetricViewReq, IMetric } from "./metric.type";

@Injectable()
export class MetricService {
  constructor(
    private readonly metricRepository: MetricRepository,
  ) {}

  public async addMetric(addMetricReq: IAddMetricViewReq): Promise<IMetric> {
    let payload: IAddMetricPayload;

    switch(addMetricReq.type) {
      case MetricType.DISTANCE:
        payload = this.getAddDistanceMetricPayload(addMetricReq);
        break;
      case MetricType.TEMPERATURE:
        payload = this.getAddTemperatureMetricPayload(addMetricReq);
        break;
    }

    return await this.metricRepository.addMetric(payload);
  }

  private getAddDistanceMetricPayload(addMetricReq: IAddMetricViewReq): IAddMetricPayload {
    return new AddDistanceMetric(addMetricReq.value, addMetricReq.createdAt || new Date(), addMetricReq.unit as DistanceUnit);
  }

  private getAddTemperatureMetricPayload(addMetricReq: IAddMetricViewReq): IAddMetricPayload {
    return new AddTemperatureMetric(addMetricReq.value, addMetricReq.createdAt || new Date(), addMetricReq.unit as TemperatureUnit);
  }
}