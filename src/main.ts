import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './modules/shared/error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const HOST = configService.get('HOST', '0.0.0.0');
  const PORT = configService.get('PORT', 8080);
  const env = configService.get('NODE_ENV');

  if (env !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('Metrics Tracker')
      .setDescription(`The Metrics Tracker API description`)
      .setVersion('0.0.1')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  
  if (env === 'dev') {
    app.enableCors({ origin: '*' });
  }

  await app.listen(PORT, HOST);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
