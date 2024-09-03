import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { validationExceptionFactory } from './common/exceptions/validation-exception-factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationExceptionFactory,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.BACKEND_CONTAINER_PORT);
  console.log(
    `Application running on BACKEND_CONTAINER_PORT: ${process.env.BACKEND_CONTAINER_PORT}`,
  );
}
bootstrap();
