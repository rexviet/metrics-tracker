import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNumber, IsOptional, Min } from "class-validator";
import { DistanceUnit, TemperatureUnit } from "./metric.enum";

export class AddDistanceMetricDto {
  @ApiProperty({ type: Number, example: 0 })
  @IsNumber({}, { message: 'Invalid value' })
  @Type(() => Number)
  @Min(0)
  readonly value: number;

  @ApiProperty({ example: 1609390800000, required: false })
  @IsOptional()
  @IsDate({ message: 'Invalid createdAt' })
  @Type(() => Date)
  readonly createdAt: Date;
  
  @ApiProperty({
    type: String,
    example: Object.values(DistanceUnit).join('|'),
    description: 'Distance unit',
  })
  @IsEnum(DistanceUnit)
  readonly unit: DistanceUnit;
}

export class AddTemperatureMetricDto {
  @ApiProperty({ type: Number, example: 0 })
  @IsNumber({}, { message: 'Invalid value' })
  @Type(() => Number)
  readonly value: number;

  @ApiProperty({ example: 1609390800000, required: false })
  @IsOptional()
  @IsDate({ message: 'Invalid createdAt' })
  @Type(() => Date)
  readonly createdAt: Date;
  
  @ApiProperty({
    type: String,
    example: Object.values(TemperatureUnit).join('|'),
    description: 'Temperature unit',
  })
  @IsEnum(TemperatureUnit)
  readonly unit: TemperatureUnit;
}