import { InjectModel } from '@nestjs/mongoose';
import { Metric } from './metric.entity';
import { IAddMetricPayload, IGetMetricsPayload } from './metric.type';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { IListModels } from '../shared/response';

export interface IMetricDatasource {
  addMetric(payload: IAddMetricPayload): Promise<Metric>;
  getMetrics(payload: IGetMetricsPayload): Promise<IListModels<Metric>>;
}

@Injectable()
export class MetricMongoDS implements IMetricDatasource {
  constructor(
    @InjectModel(Metric.name)
    private readonly metricModel: Model<Metric>,
  ) {}

  public async addMetric(payload: IAddMetricPayload): Promise<Metric> {
    return new this.metricModel(payload).save();
  }

  private buildGetMetricsBody(payload: IGetMetricsPayload): any {
    const body: any = { userId: payload.userId };

    if (payload.type) {
      body.type = payload.type;
    }

    const range: any = {};

    if (payload.from) {
      range['$gte'] = payload.from;
    }

    if (payload.to) {
      range['$lte'] = payload.to;
    }

    if (Object.keys(range).length) {
      body.createdAt = range;
    }

    return body;
  }
  public async getMetrics(
    payload: IGetMetricsPayload,
  ): Promise<IListModels<Metric>> {
    const body = this.buildGetMetricsBody(payload);

    const [metrics, count] = await Promise.all([
      this.metricModel
        .find(body)
        .sort({ [payload.sortField]: payload.order })
        .skip(payload.offset)
        .limit(payload.limit),
      this.metricModel.count(body),
    ]);

    return {
      data: metrics,
      total: count,
    };
  }
}
