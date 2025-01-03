import {
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from '@rline/type';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Get Configs
  const [APP_NAME, APP_DESCRIPTION, PORT, PREFIX] = (() => {
    const C = app.get(ConfigService);
    return [
      C.getOrThrow(ConfigKeys.APP_NAME),
      C.getOrThrow(ConfigKeys.APP_DESCRIPTION),
      C.getOrThrow(ConfigKeys.PORT),
      C.getOrThrow(ConfigKeys.PREFIX),
    ];
  })();

  // EnableCorse
  EnableCors: {
    app.enableCors({ origin: '*' });
  }

  // ConfigureMiddlewares
  ConfigureMiddlewares: {
    app.setGlobalPrefix(PREFIX);
    app.use(helmet());
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          exposeUnsetFields: false,
          exposeDefaultValues: false,
        },
        exceptionFactory(errors) {
          console.debug(JSON.stringify(errors, null, 2));

          throw new UnprocessableEntityException({ errors });
        },
      })
    );
  }

  // ConfigureSwagger
  ConfigureSwagger: {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(APP_NAME)
      .setDescription(APP_DESCRIPTION)
      .addBearerAuth()
      .build();
    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(PREFIX, app, swaggerDoc);
  }

  // Start the app
  await app.listen(PORT, () => {
    logger.log(
      `🚀 ${APP_NAME} is running on: http://localhost:${PORT}/${PREFIX}`
    );
  });
}

bootstrap();
