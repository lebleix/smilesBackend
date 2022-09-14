import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //const app = await NestFactory.create(AppModule);

  // const options = {
  //   origin: "*",
  //   allowedHeaders: '*',
  //   methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  //   credentials: true
  // };

  app.enableCors();
  // app.enableCors({
  //   allowedHeaders: '*',
  //   // allowedHeaders: ['content-type'],
  //   origin: '*',
  //   credentials: true,
  // });

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Smiles Helper')
    .setDescription('getting info from web')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  
  const port = process.env.PORT || 4000;

  await app.listen(port, '0.0.0.0', function () {
    console.log('Server started.......');
  });
}
bootstrap();
