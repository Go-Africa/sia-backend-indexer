import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Block, BlockSchema } from 'src/features/blocks/schemas/block.shema';
import { MinerPayout, MinerPayoutSchema } from 'src/features/blocks/schemas/miner-payout.schema';
import { LatestData, LatestDataSchema } from 'src/features/dashboard/schemas/latest-data.schema';
import { Host, HostSchema } from 'src/features/hosts/schemas/host.schema';
import { CoveredField, CoveredFieldSchema } from 'src/features/transactions/schemas/coveredfields.schema';
import { SiacoinOutput, SiacoinOutputSchema } from 'src/features/transactions/schemas/siacoinoutput.shema';
import { TransactionSignature, TransactionSignatureSchema } from 'src/features/transactions/schemas/transaction-signature.schema';
import { Transaction, TransactionSchema } from 'src/features/transactions/schemas/transaction.shema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Block.name, schema: BlockSchema }]),
    MongooseModule.forFeature([{ name: MinerPayout.name, schema: MinerPayoutSchema }]),
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    MongooseModule.forFeature([{ name: Host.name, schema: HostSchema }]),
    MongooseModule.forFeature([{ name: LatestData.name, schema: LatestDataSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: Block.name, schema: BlockSchema }]),
    MongooseModule.forFeature([{ name: MinerPayout.name, schema: MinerPayoutSchema }]),
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    MongooseModule.forFeature([{ name: Host.name, schema: HostSchema }]),
    MongooseModule.forFeature([{ name: LatestData.name, schema: LatestDataSchema }]),
  ]
})
export class DatabaseModule {}
