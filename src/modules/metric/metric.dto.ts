import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  DistanceUnit,
  MetricSortField,
  MetricType,
  TemperatureUnit,
} from './metric.enum';
import { OrderOptions } from '../shared/shared.enum';

export class AddDistanceMetricDto {
  @ApiProperty({
    type: String,
    example: 'user_1',
    description: 'User id',
  })
  @IsString()
  @IsDefined()
  userId: string;

  @ApiProperty({ type: Number, example: 0 })
  @IsNumber({}, { message: 'Invalid value' })
  @Type(() => Number)
  @Min(0)
  value: number;

  @ApiProperty({ example: 1609390800000, required: false })
  @IsOptional()
  @IsDate({ message: 'Invalid createdAt' })
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    type: String,
    example: Object.values(DistanceUnit).join('|'),
    description: 'Distance unit',
  })
  @IsEnum(DistanceUnit)
  unit: DistanceUnit;
}

export class AddTemperatureMetricDto {
  @ApiProperty({
    type: String,
    example: 'user_1',
    description: 'User id',
  })
  @IsString()
  @IsDefined()
  userId: string;

  @ApiProperty({ type: Number, example: 0 })
  @IsNumber({}, { message: 'Invalid value' })
  @Type(() => Number)
  value: number;

  @ApiProperty({ example: 1609390800000, required: false })
  @IsOptional()
  @IsDate({ message: 'Invalid createdAt' })
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    type: String,
    example: Object.values(TemperatureUnit).join('|'),
    description: 'Temperature unit',
  })
  @IsEnum(TemperatureUnit)
  unit: TemperatureUnit;
}

export class GetMetricsDto {
  @ApiProperty({
    type: String,
    example: 'user_1',
    description: 'User id',
  })
  @IsString()
  @IsDefined()
  userId: string;

  @ApiProperty({
    type: String,
    example: Object.values(MetricType).join('|'),
    description: 'Metric type',
    required: false,
  })
  @IsOptional()
  @IsEnum(MetricType)
  type?: MetricType;

  @ApiProperty({ example: 1609390800000, required: false })
  @IsOptional()
  @IsDate({ message: 'Invalid from' })
  @Type(() => Date)
  from?: Date;

  @ApiProperty({ example: 1609390800000, required: false })
  @IsOptional()
  @IsDate({ message: 'Invalid from' })
  @Type(() => Date)
  to?: Date;

  @ApiProperty({
    type: String,
    example: [
      ...Object.values(TemperatureUnit),
      ...Object.values(DistanceUnit),
    ].join(' | '),
    description: 'Temperature unit',
    required: false,
  })
  @IsOptional()
  // @IsEnum(TemperatureUnit)
  formatUnit?: DistanceUnit | TemperatureUnit;

  @ApiProperty({
    type: String,
    example: Object.values(MetricSortField).join(' | '),
    description: 'Sort field',
    required: false,
  })
  @IsOptional()
  @IsEnum(MetricSortField)
  sortField?: MetricSortField;

  @ApiProperty({
    type: String,
    example: Object.values(OrderOptions).join(' | '),
    description: 'order',
    required: false,
  })
  @IsOptional()
  @IsEnum(OrderOptions)
  order?: OrderOptions;

  @ApiProperty({ type: Number, example: 0, required: false })
  @IsNumber({}, { message: 'Invalid offset' })
  @IsOptional()
  @Type(() => Number)
  offset?: number;

  @ApiProperty({ type: Number, example: 20, required: false })
  @IsNumber({}, { message: 'Invalid number' })
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
