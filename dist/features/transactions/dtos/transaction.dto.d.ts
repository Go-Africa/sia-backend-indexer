import { SiacoinOutputDTO } from "./siacoinoutput.dto";
export declare class TransactionDTO {
    id: string;
    siacoininputs: SiacoinInputDTO[];
    siacoinoutputs: SiacoinOutputDTO[];
    filecontracts: string;
    filecontractrevisions: string;
    storageproofs: string;
    siafundinputs: string;
    siafundoutputs: string;
    minerfees: string[];
    arbitrarydata: string[];
}
declare class SiacoinInputDTO {
    parentid: string;
    unlockconditions: Unlockcondition;
}
declare class Unlockcondition {
    timelock: number;
    publickeys: Publickey[];
    signaturesrequired: number;
}
declare class Publickey {
    algorithm: string;
    key: string;
}
export {};
