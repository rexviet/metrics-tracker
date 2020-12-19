import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { METRIC_SCHEMA } from '../metric/metric.constant';
import { MetricType } from '../metric/metric.enum';
import { ObjectId } from 'mongodb';

@Schema({ timestamps: true, collation: { locale: 'en' } })
export class MetricChart extends Document {
  @Prop({
    required: true,
    index: true,
    type: MongooseSchema.Types.ObjectId,
    ref: METRIC_SCHEMA,
  })
  metric: ObjectId;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  key: string;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  userId: string;

  @Prop({
    required: true,
    index: true,
    type: String,
    enum: Object.values(MetricType),
  })
  type: MetricType;
}
export const MetricChartSchema = SchemaFactory.createForClass(MetricChart);
MetricChartSchema.index({ userId: 1, key: 1, type: 1 }, { unique: true });
