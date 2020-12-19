import { DistanceUnit, MetricType, TemperatureUnit } from "./metric.enum";

export interface IAddMetricPayload {
  readonly type: MetricType;
  readonly value: number;
  readonly createdAt: Date;
  readonly unit: DistanceUnit | TemperatureUnit;
}
export class AddDistanceMetric implements IAddMetricPayload {
  readonly type: MetricType;

  constructor(
    readonly value: number,
    readonly createdAt: Date,
    readonly unit: DistanceUnit,
  ) {
    this.type = MetricType.DISTANCE;
  }
}
export class AddTemperatureMetric implements IAddMetricPayload {
  readonly type: MetricType;

  constructor(
    readonly value: number,
    readonly createdAt: Date,
    readonly unit: TemperatureUnit,
  ) {
    this.type = MetricType.TEMPERATURE;
  }
}

export interface IMetric {
  readonly id: string;
  readonly type: MetricType;
  readonly value: number;
  readonly createdAt: Date;
  readonly unit: DistanceUnit | TemperatureUnit;
}

export interface IAddMetricViewReq {
  readonly type: MetricType;
  readonly value: number;
  readonly createdAt?: Date;
  readonly unit: DistanceUnit | TemperatureUnit;
}
export class AddMetricViewReq implements IAddMetricViewReq {
  constructor(
    readonly type: MetricType,
    readonly value: number,
    readonly unit: DistanceUnit | TemperatureUnit,
    readonly createdAt?: Date,
  ) {}
}

export class MetricViewRes implements IMetric {
  constructor(
    readonly id: string,
    readonly type: MetricType,
    readonly value: number,
    readonly createdAt: Date,
    readonly unit: DistanceUnit | TemperatureUnit,
  ) {}
}