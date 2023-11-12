"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlocksModule = void 0;
const common_1 = require("@nestjs/common");
const block_service_1 = require("./services/block/block.service");
const block_controller_1 = require("./controllers/block/block.controller");
const axios_1 = require("@nestjs/axios");
const coveredfield_repository_1 = require("../transactions/repositories/coveredfield.repository");
const siacoinoutput_recovery_1 = require("../transactions/repositories/siacoinoutput.recovery");
const transaction_signature_recovery_1 = require("../transactions/repositories/transaction-signature.recovery");
const transaction_recovery_1 = require("../transactions/repositories/transaction.recovery");
const block_repository_1 = require("./repositories/block.repository");
const shared_module_1 = require("../../shared/shared.module");
const schedule_1 = require("@nestjs/schedule");
let BlocksModule = class BlocksModule {
};
BlocksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            shared_module_1.SharedModule,
            schedule_1.ScheduleModule.forRoot()
        ],
        providers: [
            block_service_1.BlockService,
            block_repository_1.BlocksRepository,
            coveredfield_repository_1.CoveredFieldsRepository,
            siacoinoutput_recovery_1.SiacoinOutputsRepository,
            transaction_signature_recovery_1.TransactionSignaturesRepository,
            transaction_recovery_1.TransactionsRepository,
        ],
        controllers: [block_controller_1.BlockController]
    })
], BlocksModule);
exports.BlocksModule = BlocksModule;
//# sourceMappingURL=blocks.module.js.map