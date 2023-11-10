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
exports.TransactionSignatureSchema = exports.TransactionSignature = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const abstract_schema_1 = require("../../../shared/database/abstract.schema");
const coveredfields_schema_1 = require("./coveredfields.schema");
let TransactionSignature = class TransactionSignature extends abstract_schema_1.AbstractDocument {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TransactionSignature.prototype, "parentid", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], TransactionSignature.prototype, "publickeyindex", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], TransactionSignature.prototype, "timelock", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'CoveredField' }),
    __metadata("design:type", coveredfields_schema_1.CoveredField)
], TransactionSignature.prototype, "coveredfields", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TransactionSignature.prototype, "signature", void 0);
TransactionSignature = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], TransactionSignature);
exports.TransactionSignature = TransactionSignature;
exports.TransactionSignatureSchema = mongoose_1.SchemaFactory.createForClass(TransactionSignature);
//# sourceMappingURL=transaction-signature.schema.js.map