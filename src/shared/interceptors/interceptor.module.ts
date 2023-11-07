import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import 'dotenv/config';
import { AuthInterceptor } from './auth.interceptor';

@Module({
    providers: [
      {
        provide: 'USERNAME', // Define a token for the username value.
        useValue: process.env.RENTERD_USER, // Provide your username value here.
      },
      {
        provide: 'PASSWORD', // Define a token for the password value.
        useValue: process.env.RENTERD_PASSWORD, // Provide your password value here.
      },
      {
        provide: APP_INTERCEPTOR,
        useClass: AuthInterceptor 
      },
    ],
    exports: ['USERNAME', 'PASSWORD'], // Export the tokens for use in the interceptor.
  })
export class InterceptorModule {}