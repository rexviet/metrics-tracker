import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DistanceUnit, MetricType, TemperatureUnit } from './metric.enum';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collation: { locale: 'en' } })
export class Metric extends Document {
  @Prop({
    required: true,
    index: true,
    type: String,
    enum: Object.values(MetricType),
  })
  type: MetricType;

  @Prop({
    required: true,
    type: Number,
  })
  value: number;

  @Prop({
    required: true,
    type: Date,
  })
  createdAt: Date;

  @Prop({
    required: true,
    type: String,
    enum: [...Object.values(DistanceUnit), ...Object.values(TemperatureUnit)],
  })
  unit: DistanceUnit | TemperatureUnit;
}

export const MetricSchema = SchemaFactory.createForClass(Metric);