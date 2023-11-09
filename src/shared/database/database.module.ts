import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Block, BlockSchema } from 'src/features/blocks/schemas/block.shema';
import { MinerPayout, MinerPayoutSchema } from 'src/features/blocks/schemas/miner-payout.schema';
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
  ],
  exports: [
    MongooseModule.forFeature([{ name: Block.name, schema: BlockSchema }]),
    MongooseModule.forFeature([{ name: MinerPayout.name, schema: MinerPayoutSchema }]),
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    MongooseModule.forFeature([{ name: TransactionSignature.name, schema: TransactionSignatureSchema }]),
    MongooseModule.forFeature([{ name: SiacoinOutput.name, schema: SiacoinOutputSchema }]),
    MongooseModule.forFeature([{ name: CoveredField.name, schema: CoveredFieldSchema }]),
  ]
})
export class DatabaseModule {}
