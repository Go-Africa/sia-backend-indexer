"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiacoinOutputDTO = void 0;
class SiacoinOutputDTO {
    constructor(siacoinOutput) {
        if (siacoinOutput) {
            this.id = siacoinOutput.id;
            this.value = siacoinOutput.value;
            this.unlockhash = siacoinOutput.unlockhash;
        }
    }
}
exports.SiacoinOutputDTO = SiacoinOutputDTO;
//# sourceMappingURL=siacoinoutput.dto.js.map