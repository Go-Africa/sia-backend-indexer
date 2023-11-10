"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionSchema = exports.Transaction = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const abstract_schema_1 = require("../../../shared/database/abstract.schema");
const siacoinoutput_shema_1 = require("./siacoinoutput.shema");
let Transaction = class Transaction extends abstract_schema_1.AbstractDocument {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'SiacoinOutputSchema' }),
    __metadata("design:type", siacoinoutput_shema_1.SiacoinOutput)
], Transaction.prototype, "siacoininputs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'SiacoinOutputSchema' }),
    __metadata("design:type", siacoinoutput_shema_1.SiacoinOutput)
], Transaction.prototype, "siacoinoutputs", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "filecontracts", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "filecontractrevisions", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "storageproofsstorageproofs", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "siafundinputs", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "siafundoutputs", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Transaction.prototype, "minerfees", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Transaction.prototype, "arbitrarydata", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "transactionsignatures", void 0);
Transaction = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Transaction);
exports.Transaction = Transaction;
exports.TransactionSchema = mongoose_1.SchemaFactory.createForClass(Transaction);
//# sourceMappingURL=transaction.shema.js.map