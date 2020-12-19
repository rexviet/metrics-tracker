import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppError, ERROR_CODE } from '../shared/error';
import { FormatMetricDto } from './metric.dto';
import { DistanceUnit, MetricType, TemperatureUnit } from './metric.enum';

@Injectable()
export class ValidFormatUnitMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const query = (req.query as any) as FormatMetricDto;

    let allowedFormatUnits: any[] = [];
    switch (query.type) {
      case MetricType.DISTANCE:
        allowedFormatUnits = Object.values(DistanceUnit);
        break;
      case MetricType.TEMPERATURE:
        allowedFormatUnits = Object.values(TemperatureUnit);
        break;
    }

    if (query.formatUnit && !allowedFormatUnits.includes(query.formatUnit)) {
      throw new AppError(
        ERROR_CODE.PARAM_INVALID,
        `Invalid format unit for ${query.type} metrics`,
      );
    }

    next();
  }
}
