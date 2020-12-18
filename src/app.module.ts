import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './common/configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
})
export class AppModule {}
