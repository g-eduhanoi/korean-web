import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as csurf from 'csurf';
import { AllExceptionsFilter } from './configure/security/exception/http-exception.filter';
import hbs, { handlebars } from 'hbs';
import { readFileSync } from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  //  configure view engine and static assets
  app.useStaticAssets(join(__dirname, '..', 'assets/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'assets/views'));

  handlebars.registerPartial(
    'head_component',
    readFileSync(
      join(
        __dirname,
        '..',
        'assets/views/partials/head_component.hbs',
      ).toString(),
      'utf8',
    ),
  );

  handlebars.registerPartial(
    'header_component',
    readFileSync(
      join(
        __dirname,
        '..',
        'assets/views/partials/header_component.hbs',
      ).toString(),
      'utf8',
    ),
  );

  handlebars.registerPartial(
    'footer_component',
    readFileSync(
      join(
        __dirname,
        '..',
        'assets/views/partials/footer_component.hbs',
      ).toString(),
      'utf8',
    ),
  );
  app.setViewEngine('hbs');

  //  configure session
  app.use(
    session({
      secret: 'jshikisession',
      resave: false,
      saveUninitialized: true,
    }),
  );

  // configure cookie parser
  app.use(cookieParser());

  // configure helmet
  // app.use(helmet());

  // configure csrf, has deprecated, please update new one
  // app.use(csurf());

  // configure global exception filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));


  // config swagger
  const config = new DocumentBuilder()
    .setTitle('Korean Education center example')
    .setDescription('The Korean Education center API description')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-access-token', in: 'header' })
    .setBasePath('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
