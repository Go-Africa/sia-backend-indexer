import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { InterceptorModule } from './interceptors/interceptor.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    InterceptorModule
  ],
  exports: [
    DatabaseModule,
    HttpModule
  ]
})
export class SharedModule {}
