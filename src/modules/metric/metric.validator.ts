import { AppError, ERROR_CODE } from '../shared/error';
import { MetricType, DistanceUnit, TemperatureUnit } from './metric.enum';
import { IValidFormatUnitPayload } from './metric.type';

export class MetricValidator {
  public static validFormatUnit(payload: IValidFormatUnitPayload) {
    let allowedFormatUnits: any[] = [];
    switch (payload.type) {
      case MetricType.DISTANCE:
        allowedFormatUnits = Object.values(DistanceUnit);
        break;
      case MetricType.TEMPERATURE:
        allowedFormatUnits = Object.values(TemperatureUnit);
        break;
    }

    if (
      payload.formatUnit &&
      !allowedFormatUnits.includes(payload.formatUnit)
    ) {
      throw new AppError(
        ERROR_CODE.PARAM_INVALID,
        `Invalid format unit for ${payload.type} metrics`,
      );
    }
  }
}
