import { Module } from '@nestjs/common';
import { DashboardController } from './controllers/dashboard/dashboard.controller';
import { DashboardService } from './service/dashboard/dashboard.service';
import { SharedModule } from 'src/shared/shared.module';
import { HostRepository } from '../hosts/repositories/host.repositort';

@Module({
  imports: [
    SharedModule
  ],
  controllers: [DashboardController],
  providers: [
    DashboardService,
    HostRepository
  ]
})
export class DashboardModule {}
