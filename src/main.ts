import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  // app.use(csurf());
  app.enableCors();
  app.use(helmet());
  // app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('APP_PORT');

  const options = new DocumentBuilder()
    .setTitle('Backend')
    .setDescription(
      'Full api for the SIA indeser',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT, () =>
    console.log(`Application bootstrap on port ${PORT} 💆😇️ `),
  );
}
bootstrap();
