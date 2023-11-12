import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from 'src/shared/database/abstract.repository';
import { TransactionSignature } from '../schemas/transaction-signature.schema';

@Injectable()
export class TransactionSignaturesRepository extends AbstractRepository<TransactionSignature> {
  protected readonly logger = new Logger(TransactionSignaturesRepository.name);

  constructor(
    @InjectModel(TransactionSignature.name) TransactionSignatureModel: Model<TransactionSignature>,
    @InjectConnection() connection: Connection,
  ) {
    super(TransactionSignatureModel, connection);
  }
}
