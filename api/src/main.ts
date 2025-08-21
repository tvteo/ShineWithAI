import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173'], // Vite dev URL
    credentials: false,
  });
  await app.listen(process.env.NESTJS_PORT ?? 3000);
}
bootstrap();
