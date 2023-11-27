import { Module } from '@nestjs/common';
import { BlocksModule } from './blocks/blocks.module';
import { TransactionsModule } from './transactions/transactions.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HostsModule } from './hosts/hosts.module';

@Module({
  imports: [BlocksModule, TransactionsModule, DashboardModule, HostsModule]
})
export class FeaturesModule {}
