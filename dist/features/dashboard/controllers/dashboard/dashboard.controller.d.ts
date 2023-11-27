import { DashboardService } from '../../service/dashboard/dashboard.service';
import { LatestDataDTO } from '../../dtos/latest-data.dto';
export declare class DashboardController {
    private _dashService;
    constructor(_dashService: DashboardService);
    getAllBlock(): Promise<LatestDataDTO>;
    getAllHost(): Promise<any>;
}
