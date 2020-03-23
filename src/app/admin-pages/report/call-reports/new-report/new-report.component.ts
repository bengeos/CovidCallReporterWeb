import {Component, Inject, OnInit} from '@angular/core';
import {CallReport, ReportGroup} from "../../../call-report/call-reports.objects";
import {Region} from "../../../settings/regions/regions.objects";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {CallReportsService} from "../../../services/call-reports.service";
import {RegionsService} from "../../../services/regions.service";
import {ZonesService} from "../../../services/zones.service";
import {Zone} from "../../../settings/zones/zones.objects";

@Component({
    selector: 'app-new-report',
    templateUrl: './new-report.component.html',
    styleUrls: ['./new-report.component.scss']
})
export class NewReportComponent implements OnInit {
    public new_call_report = new CallReport();
    public regions: Region[] = [];
    public zones: Zone[] = [];
    public genders = ['MALE', 'FEMALE'];
    public providedInfromation: string[] = ['Sign-Symptom', 'Transmission Mode', 'Prevention', 'Treatment', 'Ethiopian'];
    public reportGroups: ReportGroup[] = [];
    public loading = false;

    constructor(public dialogRef: MatDialogRef<NewReportComponent>, @Inject(MAT_DIALOG_DATA) new_data: CallReport,
                private callReportsService: CallReportsService, private regionsService: RegionsService,
                private zonesService: ZonesService) {
        this.new_call_report = new_data;
    }

    ngOnInit() {
        this.regionsService.getRegionsList();
        this.regionsService.RegionsListEmitter.subscribe(
            data => {
                this.regions = data;
            }
        );
        this.zonesService.ZonesListEmitter.subscribe(
            data => {
                this.zones = data
            }
        );

        const reportGroup0 = new ReportGroup();
        reportGroup0.id = 0;
        reportGroup0.name = 'Not Grouped';

        const reportGroup1 = new ReportGroup();
        reportGroup1.id = 1;
        reportGroup1.name = 'Rapid Response Team';

        const reportGroup2 = new ReportGroup();
        reportGroup2.id = 2;
        reportGroup2.name = 'Followup Team';

        const reportGroup3 = new ReportGroup();
        reportGroup3.id = 3;
        reportGroup3.name = 'Other Team';
        this.reportGroups.push(reportGroup0);
        this.reportGroups.push(reportGroup1);
        this.reportGroups.push(reportGroup2);
        this.reportGroups.push(reportGroup3);
    }

    public updateReport() {
        this.dialogRef.close(this.new_call_report);
    }

    public cancel() {
        this.dialogRef.close();
    }

}
