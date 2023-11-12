import { SiacoinOutput } from "../schemas/siacoinoutput.shema";
export declare class SiacoinOutputDTO {
    id?: string;
    value?: string;
    unlockhash?: string;
    constructor(siacoinOutput?: SiacoinOutput);
}
