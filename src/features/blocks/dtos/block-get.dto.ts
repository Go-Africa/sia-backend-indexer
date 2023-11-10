import { TransactionDTO } from "src/features/transactions/dtos/transaction.dto";
import { MinerPayoutDTO } from "./miner-payout.dto";

export class BlockGetDTO {
    id: string;
    height: number;
    parentid: string;
    nonce: number[];
    difficulty: string;
    timestamp: number;
    minerpayouts: MinerPayoutDTO; // Vous pouvez également créer un DTO spécifique pour MinerPayout si nécessaire
    transactions: TransactionDTO[]; // Vous pouvez également créer un DTO spécifique pour Transaction si nécessaire
    
}