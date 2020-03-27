import {EventEmitter, Injectable} from '@angular/core';
import {CallReport, PaginatedCallReport, RumorType} from '../call-report/call-reports.objects';
import {AuthServicesService} from '../../services/auth-services.service';
import {HttpRequestsServiceService} from '../../services/http-requests-service.service';

@Injectable({
    providedIn: 'root'
})
export class CallReportsService {
    public PaginatedCallReportEmitter = new EventEmitter<PaginatedCallReport>();
    public PaginatedRapidCallReportEmitter = new EventEmitter<PaginatedCallReport>();
    public PaginatedFollowupCallReportEmitter = new EventEmitter<PaginatedCallReport>();

    public CallReportListEmitter = new EventEmitter<CallReport[]>();
    public CallRumorTypesListEmitter = new EventEmitter<RumorType[]>();

    constructor(private httpService: HttpRequestsServiceService, private authService: AuthServicesService) {
    }

    public getRumorTypes() {
        return this.httpService.sendGetRequest('rumor_types', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetRumorTypesList(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetRumorTypesList(result) {
        if (result && result.status && result.result) {
            this.CallRumorTypesListEmitter.emit(result.result);
        }
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

    public getCallReportsOfUser() {
        return this.httpService.sendGetRequest('call_reports_of_user', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedCallReports(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    public getNewCallReports() {
        return this.httpService.sendGetRequest('new_call_reports', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedCallReports(data);
                },
                error => {
                    console.log(error);
                },
            );
    }
    public getAllCallReports() {
        return this.httpService.sendGetRequest('all_call_reports', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedCallReports(data);
                },
                error => {
                    console.log(error);
                },
            );
    }
    public getAssignedRapidCallReports() {
        return this.httpService.sendGetRequest('get_assigned_rapid_call_reports', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedRapidCallReports(data);
                },
                error => {
                    console.log(error);
                },
            );
    }
    public getNewRapidCallReports() {
        return this.httpService.sendGetRequest('get_new_rapid_call_reports', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedRapidCallReports(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    public getPaginatedNewFollowupCallReports() {
        return this.httpService.sendGetRequest('new_followup_call_reports_paginated', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedFollowupCallReports(data);
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

    private processGetPaginatedRapidCallReports(result) {
        if (result && result.status && result.result) {
            this.PaginatedRapidCallReportEmitter.emit(result.result);
        }
    }
    private processGetPaginatedFollowupCallReports(result) {
        if (result && result.status && result.result) {
            this.PaginatedFollowupCallReportEmitter.emit(result.result);
        }
    }

    public addNewCallReport(newCallReport: CallReport) {
        return this.httpService.sendPostRequest('call_report', newCallReport, this.authService.getUserToken());
    }

    public updateCallReport(newCallReport: CallReport) {
        return this.httpService.sendPatchRequest('call_report', newCallReport, this.authService.getUserToken());
    }

    public updateCallReportGroup(newCallReport: CallReport) {
        return this.httpService.sendPatchRequest('update_call_report', newCallReport, this.authService.getUserToken());
    }

    public deleteCallReport(newCallReport: CallReport) {
        return this.httpService.sendDeleteRequest('call_report/' + newCallReport.id, this.authService.getUserToken());
    }
}
