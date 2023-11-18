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
const abstract_schema_1 = require("../../../shared/database/abstract.schema");
const transaction_dto_1 = require("../dtos/transaction.dto");
const paginate = require("mongoose-paginate-v2");
let Transaction = class Transaction extends abstract_schema_1.AbstractDocument {
    constructor(dto) {
        super();
        if (dto) {
            Object.assign(this, dto);
        }
    }
};
__decorate([
    (0, mongoose_1.Prop)({ unique: true }),
    __metadata("design:type", String)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)([(0, mongoose_1.raw)({
            id: { type: String },
            value: { type: String },
            unlockhash: { type: String },
        })]),
    __metadata("design:type", Object)
], Transaction.prototype, "siacoinoutputs", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Transaction.prototype, "height", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Transaction.prototype, "timestamp", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Transaction.prototype, "minerfees", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Transaction.prototype, "arbitrarydata", void 0);
Transaction = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false }),
    __metadata("design:paramtypes", [transaction_dto_1.TransactionDTO])
], Transaction);
exports.Transaction = Transaction;
exports.TransactionSchema = mongoose_1.SchemaFactory.createForClass(Transaction);
exports.TransactionSchema.plugin(paginate);
//# sourceMappingURL=transaction.shema.js.map