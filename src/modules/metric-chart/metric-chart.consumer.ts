import { Injectable, Controller } from '@nestjs/common';
import { Message, Queue } from 'amqp-ts';
import { CDC_METRIC } from '../metric/metric.constant';
import { IMetric } from '../metric/metric.type';
import { ExchangeType } from '../shared/queue/queue.enum';
import { QueueService } from '../shared/queue/queue.service';
import { QueueName } from './metric-chart.enum';
import { MetricChartService } from './metric-chart.service';

@Injectable()
@Controller('metric-chart-consumer')
export class MetricChartConsumer {
  private queueMapper: { [key: string]: Queue } = {};

  constructor(
    private readonly queueService: QueueService,
    private readonly metricChartService: MetricChartService,
  ) {}

  async onModuleInit() {
    const cdcMetricExchange = this.queueService.declareExchange(
      CDC_METRIC,
      ExchangeType.FANOUT,
    );
    this.queueMapper[
      QueueName.CHART_CDC_METRIC
    ] = await this.queueService.declareQueue(
      QueueName.CHART_CDC_METRIC,
      cdcMetricExchange,
    );

    this.consumeMessage().catch((err) => console.error('err:', err));
  }

  public async consumeMessage() {
    return Promise.all([this.consumeCdcMetric()]);
  }

  private async consumeCdcMetric() {
    return this.queueService.consume(
      this.queueMapper[QueueName.CHART_CDC_METRIC],
      async (message: Message) => {
        const content = message.getContent();
        console.log(' [MetricChartConsumer] content:', content);
        await this.metricChartService.upsertMetricChart(content);
        message.ack();
      },
    );
  }
}
