import { ObjectId } from 'mongodb';
import {
  DistanceUnit,
  MetricType,
  TemperatureUnit,
} from '../metric/metric.enum';
import { IMetric, IValidFormatUnitPayload } from '../metric/metric.type';

export interface IUpsertMetricChartPayload {
  readonly metric: ObjectId;
  readonly key: string;
  readonly userId: string;
  readonly type: MetricType;
}
export class UpsertMetricChartPayload implements IUpsertMetricChartPayload {
  constructor(
    readonly metric: ObjectId,
    readonly key: string,
    readonly userId: string,
    readonly type: MetricType,
  ) {}
}

export interface IMetricChart {
  readonly metric: IMetric;
  readonly key: string;
  readonly userId: string;
  readonly type: MetricType;
}

export interface INewMetric extends IMetric {}

export interface IGetMetricChartViewReq extends IValidFormatUnitPayload {
  readonly userId: string;
  readonly from: Date;
  readonly to: Date;
}
export class GetMetricChartViewReq implements IGetMetricChartViewReq {
  constructor(
    readonly userId: string,
    readonly from: Date,
    readonly to: Date,
    readonly type: MetricType,
    readonly formatUnit?: DistanceUnit | TemperatureUnit,
  ) {}
}

export interface IGetMetricsChartPayload {
  readonly keys: string[];
  readonly userId: string;
  readonly type: MetricType;
}
export class GetMetricsChartPayload implements IGetMetricsChartPayload {
  constructor(
    readonly keys: string[],
    readonly userId: string,
    readonly type: MetricType,
  ) {}
}

export class MetricChartViewRes implements IMetricChart {
  constructor(
    readonly metric: IMetric,
    readonly key: string,
    readonly userId: string,
    readonly type: MetricType,
  ) {}
}
