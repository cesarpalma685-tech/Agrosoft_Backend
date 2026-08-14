import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log('HOST:', process.env.DB_HOST);
console.log('USER:', process.env.DB_USERNAME);
console.log('PASSWORD:', process.env.DB_PASSWORD ? 'CARGADA' : 'NO CARGADA');
console.log('DATABASE:', process.env.DB_DATABASE);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}

bootstrap();