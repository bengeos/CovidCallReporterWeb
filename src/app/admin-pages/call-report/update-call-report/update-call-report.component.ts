import {Component, Inject, OnInit} from '@angular/core';
import {CallReport} from '../call-reports.objects';
import {Region} from '../../settings/regions/regions.objects';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CallReportsService} from '../../services/call-reports.service';

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
    public favoriteSeason = '';
    public providedInfromation: string[] = ['Sign-Symptom', 'Transmission Mode', 'Prevention', 'Treatment', 'Ethiopian'];
    public toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
    public covidSigns: string[] = ['Fever', 'Cough', 'Headache', 'Runny Nose', 'Breathing Difficulty', 'Body Pain', 'Unwellness Feeling'];

    constructor(public dialogRef: MatDialogRef<UpdateCallReportComponent>, @Inject(MAT_DIALOG_DATA) new_data: CallReport,
                private callReportsService: CallReportsService) {
        this.new_call_report = new_data;
    }

    ngOnInit() {

    }

}
