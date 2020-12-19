import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { RABBIT_CONNECTION } from './queue.constant';
import { IRabbitConnectionOptions } from './queue.type';
import { QueueService } from './queue.service';
import { Connection } from 'amqp-ts';

@Global()
@Module({})
export class QueueModule {
  static forRootAsync(options: IRabbitConnectionOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    return {
      imports: options.imports,
      providers: [
        ...asyncProviders,
        {
          provide: QueueService,
          useFactory: (connection: Connection) => new QueueService(connection),
          inject: [RABBIT_CONNECTION, ...(options.inject || [])],
        },
      ],
      exports: [QueueService, QueueModule],
      module: QueueModule,
    };
  }

  static register(options: IRabbitConnectionOptions): DynamicModule {
    return {
      module: QueueModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options), QueueService],
      exports: [QueueModule, QueueService],
    };
  }

  private static createAsyncProviders(
    options: IRabbitConnectionOptions,
  ): Provider[] {
    return [
      {
        provide: RABBIT_CONNECTION,
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
    ];
  }
}
