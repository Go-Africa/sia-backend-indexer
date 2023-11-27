import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DashboardService } from '../../service/dashboard/dashboard.service';
import { LatestDataDTO } from '../../dtos/latest-data.dto';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
    constructor(
        private _dashService: DashboardService
    ) { }

    @ApiResponse({ status: 200, description: 'Successfully get all data', type: LatestDataDTO})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Get('/get-all-data')
    async getAllBlock() {
        const response = await this._dashService.getCMCData();
        return response;
    }

    @ApiResponse({ status: 200, description: 'Successfully get all host'})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Get('/get-all-host')
    async getAllHost() {
        const response = await this._dashService.getHost();
        return response;
    }
}
