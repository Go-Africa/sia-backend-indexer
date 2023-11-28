"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const dashboard_controller_1 = require("./controllers/dashboard/dashboard.controller");
const dashboard_service_1 = require("./service/dashboard/dashboard.service");
const shared_module_1 = require("../../shared/shared.module");
const host_repositort_1 = require("../hosts/repositories/host.repositort");
const transaction_recovery_1 = require("../transactions/repositories/transaction.recovery");
const latest_data_repository_1 = require("./repositories/latest-data.repository");
let DashboardModule = class DashboardModule {
};
DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            shared_module_1.SharedModule
        ],
        controllers: [dashboard_controller_1.DashboardController],
        providers: [
            dashboard_service_1.DashboardService,
            host_repositort_1.HostRepository,
            transaction_recovery_1.TransactionsRepository,
            latest_data_repository_1.LatestDataRepository
        ]
    })
], DashboardModule);
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map