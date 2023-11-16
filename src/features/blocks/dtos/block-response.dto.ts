import { TransactionDTO } from "src/features/transactions/dtos/transaction.dto";
import { MinerPayoutDTO } from "./miner-payout.dto";
import { Types } from "mongoose";

export class BlockResponseDTO {
    _id: Types.ObjectId;
    id: string;
    height: number;
    parentid: string;
    nonce: number[];
    difficulty: string;
    timestamp: number;
    minerpayouts: MinerPayoutDTO; // Vous pouvez également créer un DTO spécifique pour MinerPayout si nécessaire
    transactionId: string[];; // Vous pouvez également créer un DTO spécifique pour Transaction si nécessaire
    
}