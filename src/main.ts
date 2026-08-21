import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
<<<<<<< HEAD
      whitelist: true,          // elimina campos no declarados en el DTO
      forbidNonWhitelisted: true, // rechaza el request si vienen campos extra
      transform: true,           // convierte tipos automáticamente (ej. "5" → 5)
    }),
  );

  app.enableCors(); // útil si el frontend corre en otro puerto/dominio

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Servidor corriendo en http://localhost:${port}`);
=======
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Aplicación corriendo en: http://localhost:${process.env.PORT ?? 3000}`);
>>>>>>> origin/cesar_dev
}
bootstrap();