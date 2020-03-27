import {EventEmitter, Injectable} from '@angular/core';
import {DashboardCountData, RegionalCallReport, ReportsHistory} from '../dashboard/dashboard.objects';
import {HttpRequestsServiceService} from '../../services/http-requests-service.service';
import {AuthServicesService} from '../../services/auth-services.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DashboardsService {
    public DashboardCountDataEmitter = new EventEmitter<DashboardCountData>();
    public DashboardReportsHistoryEmitter = new EventEmitter<ReportsHistory>();
    public RegionalCallReports = new EventEmitter<RegionalCallReport>();

    constructor(private httpService: HttpRequestsServiceService, private authService: AuthServicesService,
                private http: HttpClient) {
    }

    public getDashboardCountData() {
        return this.httpService.sendGetRequest('dashboard/count_data', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetDashboardCountData(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetDashboardCountData(dashboard_data) {
        if (dashboard_data && dashboard_data.status && dashboard_data.result) {
            this.DashboardCountDataEmitter.emit(dashboard_data.result);
        }
    }

    public getRegionalCallReports() {
        return this.httpService.sendGetRequest('dashboard/regional_call_reports', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processRegionalCallReports(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processRegionalCallReports(dashboard_data) {
        if (dashboard_data && dashboard_data.status && dashboard_data.result) {
            this.RegionalCallReports.emit(dashboard_data.result);
        }
    }

    public getReportsHistory(day_ref: number) {
        return this.httpService.sendGetRequest('dashboard/reports_history/' + day_ref, this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetReportsHistory(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetReportsHistory(dashboard_data) {
        if (dashboard_data && dashboard_data.status && dashboard_data.result) {
            this.DashboardReportsHistoryEmitter.emit(dashboard_data.result);
        }
    }
}
