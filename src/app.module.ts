import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FeaturesModule } from './features/features.module';
import { DatabaseModule } from './shared/database/database.module';
import { SharedModule } from './shared/shared.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FeaturesModule,
    DatabaseModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor, 
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor 
    },
    {
      provide: 'USERNAME', // Define a token for the username value.
      useValue: process.env.RENTERD_USER, // Provide your username value here.
    },
    {
      provide: 'PASSWORD', // Define a token for the password value.
      useValue: process.env.RENTERD_PASSWORD, // Provide your password value here.
    },
  ],
  exports: ['USERNAME', 'PASSWORD']
})
export class AppModule { }
