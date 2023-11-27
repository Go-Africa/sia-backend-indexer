import { Module } from '@nestjs/common';
import { HostService } from './services/host/host.service';
import { HostController } from './controllers/host/host.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { SharedModule } from 'src/shared/shared.module';
import { HostRepository } from './repositories/host.repositort';

@Module({
  imports: [
    SharedModule,
    // schedulemodule to detect and execute cron functions
    ScheduleModule.forRoot()
  ],
  providers: [
    HostService,
    HostRepository
  ],
  controllers: [HostController]
})
export class HostsModule {}
