import { InjectModel } from "@nestjs/mongoose";
import { Metric } from "./metric.entity";
import { IAddMetricPayload } from "./metric.type";
import { Model } from 'mongoose';
import { Injectable } from "@nestjs/common";

export interface IMetricDatasource {
  addMetric(payload: IAddMetricPayload): Promise<Metric>; 
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
  
}