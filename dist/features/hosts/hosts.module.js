"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostsModule = void 0;
const common_1 = require("@nestjs/common");
const host_service_1 = require("./services/host/host.service");
const host_controller_1 = require("./controllers/host/host.controller");
const schedule_1 = require("@nestjs/schedule");
const shared_module_1 = require("../../shared/shared.module");
const host_repositort_1 = require("./repositories/host.repositort");
let HostsModule = class HostsModule {
};
HostsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            shared_module_1.SharedModule,
            schedule_1.ScheduleModule.forRoot()
        ],
        providers: [
            host_service_1.HostService,
            host_repositort_1.HostRepository
        ],
        controllers: [host_controller_1.HostController]
    })
], HostsModule);
exports.HostsModule = HostsModule;
//# sourceMappingURL=hosts.module.js.map