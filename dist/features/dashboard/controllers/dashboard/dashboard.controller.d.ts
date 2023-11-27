import { DashboardService } from '../../service/dashboard/dashboard.service';
export declare class DashboardController {
    private _dashService;
    constructor(_dashService: DashboardService);
    getAllBlock(): Promise<any>;
    getAllHost(): Promise<any>;
}
