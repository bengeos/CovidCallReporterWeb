import {Component, Inject, OnInit} from '@angular/core';
import {CallReport, CallRumorType, RumorType} from '../call-reports.objects';
import {Region} from '../../settings/regions/regions.objects';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CallReportsService} from '../../services/call-reports.service';
import {Zone} from '../../settings/zones/zones.objects';
import {RegionsService} from '../../services/regions.service';
import {ZonesService} from '../../services/zones.service';

@Component({
    selector: 'app-update-call-report',
    templateUrl: './update-call-report.component.html',
    styleUrls: ['./update-call-report.component.scss']
})
export class UpdateCallReportComponent implements OnInit {
    public new_call_report = new CallReport();
    public regions: Region[] = [];
    public zones: Zone[] = [];
    public genders = ['MALE', 'FEMALE'];
    public providedInfromation: string[] = ['Sign-Symptom', 'Transmission Mode', 'Prevention', 'Treatment', 'Ethiopian'];
    public rummerTypes: RumorType[] = [];
    public callRumorTypes: CallRumorType[] = [];
    public loading = false;

    constructor(public dialogRef: MatDialogRef<UpdateCallReportComponent>, @Inject(MAT_DIALOG_DATA) new_data: CallReport,
                private callReportsService: CallReportsService, private callReportService: CallReportsService,
                private regionsService: RegionsService, private zonesService: ZonesService) {
        this.new_call_report = new_data;
        this.new_call_report.rumor_types = Array<RumorType>();
        for (let i = 0; i < this.new_call_report.call_rumor_types.length; i++) {
            this.new_call_report.rumor_types.push(this.new_call_report.call_rumor_types[i].call_rumor_type)
        }
        console.log('RIMOR', this.new_call_report.rumor_types);
    }

    ngOnInit() {
        this.callReportService.getCallRumorTypes();
        this.callReportService.CallRumorTypesListEmitter.subscribe(
            data => {
                this.rummerTypes = data;
            }
        );
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

    public updateCallReport() {
        this.dialogRef.close(this.new_call_report);
    }

    public cancel() {
        this.dialogRef.close();
    }

}
