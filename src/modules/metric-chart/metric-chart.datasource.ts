import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MetricChart } from './metric-chart.entity';
import { MetricChartPopulate } from './metric-chart.enum';
import {
  IGetMetricsChartPayload,
  IUpsertMetricChartPayload,
} from './metric-chart.type';

export interface IMetricChartDatasource {
  upsertMetricChart(payload: IUpsertMetricChartPayload): Promise<void>;
  getMetricsChart(payload: IGetMetricsChartPayload): Promise<MetricChart[]>;
}

export class MetricChartMongoDS implements IMetricChartDatasource {
  constructor(
    @InjectModel(MetricChart.name)
    private readonly metricChartModel: Model<MetricChart>,
  ) {}

  public async upsertMetricChart(
    payload: IUpsertMetricChartPayload,
  ): Promise<void> {
    await this.metricChartModel
      .findOneAndUpdate(
        { userId: payload.userId, key: payload.key, type: payload.type },
        payload,
        {
          new: true,
          upsert: true,
        },
      )
      .exec();

    return;
  }

  public async getMetricsChart(
    payload: IGetMetricsChartPayload,
  ): Promise<MetricChart[]> {
    return await this.metricChartModel
      .find({
        key: { $in: payload.keys },
        userId: payload.userId,
        type: payload.type,
      })
      .populate({
        path: MetricChartPopulate.METRIC,
        select: 'id userId type value createdAt unit',
      });
  }
}
