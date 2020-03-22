import {EventEmitter, Injectable} from '@angular/core';
import {CallReport, PaginatedCallReport} from '../call-report/call-reports.objects';
import {AuthServicesService} from '../../services/auth-services.service';
import {HttpRequestsServiceService} from '../../services/http-requests-service.service';

@Injectable({
    providedIn: 'root'
})
export class CallReportsService {
    public PaginatedCallReportEmitter = new EventEmitter<PaginatedCallReport>();
    public CallReportListEmitter = new EventEmitter<CallReport[]>();

    constructor(private httpService: HttpRequestsServiceService, private authService: AuthServicesService) {
    }

    public getCallReportsList() {
        return this.httpService.sendGetRequest('call_reports', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetCallReportList(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetCallReportList(result) {
        if (result && result.status && result.result) {
            this.CallReportListEmitter.emit(result.result);
        }
    }

    public getPaginatedCallReportsByUser() {
        return this.httpService.sendGetRequest('call_reports_paginated_by_user', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedCallReports(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    public getPaginatedCallReports() {
        return this.httpService.sendGetRequest('call_reports_paginated', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedCallReports(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    public getPaginatedRegionsData(full_url) {
        return this.httpService.sendCustomGetRequest(full_url, this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedCallReports(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetPaginatedCallReports(result) {
        if (result && result.status && result.result) {
            this.PaginatedCallReportEmitter.emit(result.result);
        }
    }

    public addNewCallReport(newCallReport: CallReport) {
        return this.httpService.sendPostRequest('call_report', newCallReport, this.authService.getUserToken());
    }

    public updateCallReport(newCallReport: CallReport) {
        return this.httpService.sendPatchRequest('call_report', newCallReport, this.authService.getUserToken());
    }
    public updateCallReportStatus(newCallReport: CallReport) {
        return this.httpService.sendPatchRequest('call_report_status', newCallReport, this.authService.getUserToken());
    }

    public deleteCallReport(newCallReport: CallReport) {
        return this.httpService.sendDeleteRequest('call_report/' + newCallReport.id, this.authService.getUserToken());
    }
}
