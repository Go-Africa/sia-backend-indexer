import { SiacoinOutput } from "../schemas/siacoinoutput.shema";

export class SiacoinOutputDTO {
    id: string;
    value: string;
    unlockhash: string;
  
    // constructor(siacoinOutput?: SiacoinOutput) {
    //     if(siacoinOutput) {
    //         this.id = siacoinOutput.id;
    //         this.value = siacoinOutput.value;
    //         this.unlockhash = siacoinOutput.unlockhash;
    //     }
    // }
}