import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Permite que o front-end (Vite, porta 5173) acesse a API
  app.enableCors({ origin: 'http://localhost:5173' });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log('Servidor rodando em http://localhost:3000');
}
bootstrap();