import { DEFAULT_LIMIT, DEFAULT_OFFET } from '../shared/shared.constant';
import { OrderOptions } from '../shared/shared.enum';
import {
  DistanceUnit,
  MetricSortField,
  MetricType,
  TemperatureUnit,
} from './metric.enum';

export interface IAddMetricPayload {
  readonly userId: string;
  readonly type: MetricType;
  readonly value: number;
  readonly createdAt: Date;
  readonly unit: DistanceUnit | TemperatureUnit;
}
export class AddDistanceMetric implements IAddMetricPayload {
  readonly type: MetricType;

  constructor(
    readonly userId: string,
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
    readonly userId: string,
    readonly value: number,
    readonly createdAt: Date,
    readonly unit: TemperatureUnit,
  ) {
    this.type = MetricType.TEMPERATURE;
  }
}

export interface IMetric {
  readonly id: string;
  readonly userId: string;
  readonly type: MetricType;
  readonly value: number;
  readonly createdAt: Date;
  readonly unit: DistanceUnit | TemperatureUnit;
  readonly formatUnit?: DistanceUnit | TemperatureUnit;
  readonly formatedValue?: number;
}

interface IDistanceMetric {
  formatToMeter(): number;
  formatToCentimeter(): number;
  formatToInch(): number;
  formatToFeet(): number;
  formatToYard(): number;
}
export class DistanceMetric implements IMetric, IDistanceMetric {
  readonly type: MetricType = MetricType.DISTANCE;
  readonly formatedValue: number;

  constructor(
    readonly id: string,
    readonly userId: string,
    readonly value: number,
    readonly createdAt: Date,
    readonly unit: DistanceUnit,
    readonly formatUnit?: DistanceUnit,
  ) {
    switch (this.formatUnit) {
      case DistanceUnit.METER:
        this.formatedValue = this.formatToMeter();
        break;
      case DistanceUnit.CENTIMETER:
        this.formatedValue = this.formatToCentimeter();
        break;
      case DistanceUnit.INCH:
        this.formatedValue = this.formatToInch();
        break;
      case DistanceUnit.FEET:
        this.formatedValue = this.formatToFeet();
        break;
      case DistanceUnit.YARD:
        this.formatedValue = this.formatToYard();
        break;
      default:
        this.formatUnit = this.unit;
        this.formatedValue = this.value;
        break;
    }
  }

  formatToMeter(): number {
    switch (this.unit) {
      case DistanceUnit.METER:
        return this.value;
      case DistanceUnit.CENTIMETER:
        return this.value / 100;
      case DistanceUnit.INCH:
        return this.value / 39.37;
      case DistanceUnit.FEET:
        return this.value / 3.2808;
      case DistanceUnit.YARD:
        return this.value / 1.0936;
    }
  }
  formatToCentimeter(): number {
    return this.unit === DistanceUnit.CENTIMETER
      ? this.value
      : this.formatToMeter() * 100;
  }
  formatToInch(): number {
    return this.unit === DistanceUnit.INCH
      ? this.value
      : this.formatToMeter() * 39.37;
  }
  formatToFeet(): number {
    return this.unit === DistanceUnit.FEET
      ? this.value
      : this.formatToMeter() * 3.2808;
  }
  formatToYard(): number {
    return this.unit === DistanceUnit.YARD
      ? this.value
      : this.formatToMeter() * 1.0936;
  }
}

interface ITemperatureMetric {
  formatToCDegree(): number;
  formatToFDegree(): number;
  formatToKDegree(): number;
}
export class TemperatureMetric implements IMetric, ITemperatureMetric {
  readonly type: MetricType = MetricType.TEMPERATURE;
  readonly formatedValue: number;

  constructor(
    readonly id: string,
    readonly userId: string,
    readonly value: number,
    readonly createdAt: Date,
    readonly unit: TemperatureUnit,
    readonly formatUnit?: TemperatureUnit,
  ) {
    switch (formatUnit) {
      case TemperatureUnit.C:
        this.formatedValue = this.formatToCDegree();
        break;
      case TemperatureUnit.F:
        this.formatedValue = this.formatToFDegree();
        break;
      case TemperatureUnit.K:
        this.formatedValue = this.formatToKDegree();
        break;
      default:
        this.formatUnit = this.unit;
        this.formatedValue = this.value;
        break;
    }
  }

  formatToCDegree(): number {
    switch (this.unit) {
      case TemperatureUnit.C:
        return this.value;
      case TemperatureUnit.F:
        return (this.value - 32) / 1.8;
      case TemperatureUnit.K:
        return this.value - 273.15;
    }
  }
  formatToFDegree(): number {
    return this.unit === TemperatureUnit.F
      ? this.value
      : this.formatToCDegree() * 1.8 + 32;
  }
  formatToKDegree(): number {
    return this.unit === TemperatureUnit.K
      ? this.value
      : this.formatToCDegree() + 273.15;
  }
}

export interface IAddMetricViewReq {
  readonly userId: string;
  readonly type: MetricType;
  readonly value: number;
  readonly createdAt?: Date;
  readonly unit: DistanceUnit | TemperatureUnit;
}
export class AddMetricViewReq implements IAddMetricViewReq {
  constructor(
    readonly userId: string,
    readonly type: MetricType,
    readonly value: number,
    readonly unit: DistanceUnit | TemperatureUnit,
    readonly createdAt?: Date,
  ) {}
}

export class MetricViewRes implements IMetric {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly type: MetricType,
    readonly value: number,
    readonly createdAt: Date,
    readonly unit: DistanceUnit | TemperatureUnit,
    readonly formatUnit?: DistanceUnit | TemperatureUnit,
    readonly formatedValue?: number,
  ) {}
}

export interface IGetMetricsPayload {
  readonly userId: string;
  readonly type?: MetricType;
  readonly from?: Date;
  readonly to?: Date;
  readonly formatUnit?: DistanceUnit | TemperatureUnit;
  readonly sortField: MetricSortField;
  readonly order: OrderOptions;
  readonly offset: number;
  readonly limit: number;
}
export class GetMetricsPayload implements IGetMetricsPayload {
  constructor(
    readonly userId: string,
    readonly sortField: MetricSortField,
    readonly order: OrderOptions,
    readonly offset: number,
    readonly limit: number,
    readonly type?: MetricType,
    readonly from?: Date,
    readonly to?: Date,
    readonly formatUnit?: DistanceUnit | TemperatureUnit,
  ) {}
}

export interface IGetMetricsViewReq extends IValidFormatUnitPayload {
  readonly userId: string;
  readonly from?: Date;
  readonly to?: Date;
  readonly sortField: MetricSortField;
  readonly order: OrderOptions;
  readonly offset: number;
  readonly limit: number;
}
export class GetMetricsViewReq implements IGetMetricsViewReq {
  constructor(
    readonly userId: string,
    readonly type: MetricType,
    readonly from?: Date,
    readonly to?: Date,
    readonly formatUnit?: DistanceUnit | TemperatureUnit,
    readonly sortField: MetricSortField = MetricSortField.CREATED_AT,
    readonly order: OrderOptions = OrderOptions.DESC,
    readonly offset: number = DEFAULT_OFFET,
    readonly limit: number = DEFAULT_LIMIT,
  ) {}
}

export interface IValidFormatUnitPayload {
  readonly type: MetricType;
  readonly formatUnit?: DistanceUnit | TemperatureUnit;
}
