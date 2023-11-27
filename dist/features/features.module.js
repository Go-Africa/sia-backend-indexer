"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturesModule = void 0;
const common_1 = require("@nestjs/common");
const blocks_module_1 = require("./blocks/blocks.module");
const transactions_module_1 = require("./transactions/transactions.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const hosts_module_1 = require("./hosts/hosts.module");
let FeaturesModule = class FeaturesModule {
};
FeaturesModule = __decorate([
    (0, common_1.Module)({
        imports: [blocks_module_1.BlocksModule, transactions_module_1.TransactionsModule, dashboard_module_1.DashboardModule, hosts_module_1.HostsModule]
    })
], FeaturesModule);
exports.FeaturesModule = FeaturesModule;
//# sourceMappingURL=features.module.js.map