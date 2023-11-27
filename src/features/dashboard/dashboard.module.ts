import { Module } from '@nestjs/common';
import { DashboardController } from './controllers/dashboard/dashboard.controller';
import { DashboardService } from './service/dashboard/dashboard.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    SharedModule
  ],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
