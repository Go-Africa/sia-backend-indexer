import { Logger } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from 'src/shared/database/abstract.repository';
import { TransactionSignature } from '../schemas/transaction-signature.schema';
export declare class TransactionSignaturesRepository extends AbstractRepository<TransactionSignature> {
    protected readonly logger: Logger;
    constructor(TransactionSignatureModel: Model<TransactionSignature>, connection: Connection);
}
