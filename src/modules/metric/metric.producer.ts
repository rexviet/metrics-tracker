import { Injectable } from '@nestjs/common';
import { QueueService } from '../shared/queue/queue.service';
import { Exchange } from 'amqp-ts';
import { ExchangeType } from '../shared/queue/queue.enum';
import { IMetric } from './metric.type';
import { CDC_METRIC } from './metric.constant';

@Injectable()
export class MetricProducer {
  private readonly exchange: Exchange;

  constructor(private readonly queueService: QueueService) {
    this.exchange = this.queueService.declareExchange(
      CDC_METRIC,
      ExchangeType.FANOUT,
    );
  }

  public publish(customer: IMetric) {
    this.queueService.publish(this.exchange, customer);
  }
}
