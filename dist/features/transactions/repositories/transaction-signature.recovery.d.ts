import { Logger } from '@nestjs/common';
import { Connection, PaginateModel } from 'mongoose';
import { AbstractRepository } from 'src/shared/database/abstract.repository';
import { TransactionSignature } from '../schemas/transaction-signature.schema';
export declare class TransactionSignaturesRepository extends AbstractRepository<TransactionSignature> {
    protected readonly logger: Logger;
    constructor(TransactionSignatureModel: PaginateModel<TransactionSignature>, connection: Connection);
}
