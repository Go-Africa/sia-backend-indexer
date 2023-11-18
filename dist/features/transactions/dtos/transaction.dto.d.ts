import { SiacoinInputDTO } from "./siacoininput.dto";
import { SiacoinOutputDTO } from "./siacoinoutput.dto";
export declare class TransactionDTO {
    id: string;
    siacoininputs: SiacoinInputDTO[];
    siacoinoutputs: SiacoinOutputDTO[];
    filecontracts: string;
    filecontractrevisions: string;
    storageproofs: string;
    height: number;
    siafundinputs: string;
    siafundoutputs: string;
    minerfees: string[];
    arbitrarydata: string[];
    timestamp: number;
}
