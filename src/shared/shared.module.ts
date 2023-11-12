import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { InterceptorModule } from './interceptors/interceptor.module';

@Module({
  imports: [
    DatabaseModule,
    InterceptorModule
  ],
  exports: [DatabaseModule]
})
export class SharedModule {}
