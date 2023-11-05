import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FeaturesModule } from './features/features.module';
import { DatabaseModule } from './shared/database/database.module';
import { SharedModule } from './shared/shared.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import 'dotenv/config';


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
      useFactory: () => new AuthInterceptor('', process.env.RENTERD_PASSWORD),
      inject: [], 
    }
  ],
})
export class AppModule { }
