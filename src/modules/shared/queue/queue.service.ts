import { Queue, Connection, Exchange, Message } from 'amqp-ts';
import { Injectable } from '@nestjs/common';
import { ExchangeType } from './queue.enum';

@Injectable()
export class QueueService {
  constructor(private readonly connection: Connection) {}

  public declareExchange(name: string, type: ExchangeType): Exchange {
    return this.connection.declareExchange(name, type, { durable: true });
  }

  public async declareQueue(name: string, exchange?: Exchange): Promise<Queue> {
    const queue = this.connection.declareQueue(name, { durable: true });
    if (exchange) {
      await queue.bind(exchange);
    }
    return queue;
  }

  public publish(exchange: Exchange, data: any): void {
    const message = new Message(data, { persistent: true });
    console.log('publish message:', message);
    return exchange.send(message);
  }

  public async consume(queue: Queue, handler: (message: Message) => any) {
    return queue.activateConsumer(handler);
  }
}
