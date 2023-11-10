import { TransactionDTO } from "src/features/transactions/dtos/transaction.dto";
import { MinerPayoutDTO } from "./miner-payout.dto";
export declare class BlockGetDTO {
    id: string;
    height: number;
    parentid: string;
    nonce: number[];
    difficulty: string;
    timestamp: number;
    minerpayouts: MinerPayoutDTO;
    transactions: TransactionDTO[];
}
