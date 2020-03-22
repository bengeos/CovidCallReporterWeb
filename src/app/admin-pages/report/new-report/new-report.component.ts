import {Component, Inject, OnInit} from '@angular/core';
import {CallReport} from "../../call-report/call-reports.objects";
import {Region} from "../../settings/regions/regions.objects";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {CallReportsService} from "../../services/call-reports.service";
import {RegionsService} from "../../services/regions.service";
import {ZonesService} from "../../services/zones.service";

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
    public favoriteSeason = '';
    public providedInfromation: string[] = ['Sign-Symptom', 'Transmission Mode', 'Prevention', 'Treatment', 'Ethiopian'];
    public toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
    public covidSigns: string[] = ['Fever', 'Cough', 'Headache', 'Runny Nose', 'Breathing Difficulty', 'Body Pain', 'Unwellness Feeling'];
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
    }

    public updateReport() {
        this.loading = true;
        this.callReportsService.updateCallReportStatus(this.new_call_report).subscribe(
            succes => {
                this.loading = false;
                this.dialogRef.close(this.new_call_report);
            },
            failed => {
                this.loading = false;
            }
        );
    }

    public cancel() {
        this.dialogRef.close();
    }

}
