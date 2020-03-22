import {Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CallReport} from "../call-reports.objects";
import {RegionsService} from "../../services/regions.service";
import {Region} from "../../settings/regions/regions.objects";
import {ZonesService} from "../../services/zones.service";
import {Zone} from "../../settings/zones/zones.objects";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
    selector: 'app-new-call-report',
    templateUrl: './new-call-report.component.html',
    styleUrls: ['./new-call-report.component.scss']
})
export class NewCallReportComponent implements OnInit, OnChanges {
    public new_call_report = new CallReport();
    public regions: Region[] = [];
    public zones: Zone[] = [];
    public genders = ['MALE', 'FEMALE'];
    public favoriteSeason = '';
    public providedInfromation: string[] = ['Sign-Symptom', 'Transmission Mode', 'Prevention', 'Treatment', 'Ethiopian'];
    public toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
    public covidSigns: string[] = ['Fever', 'Cough', 'Headache', 'Runny Nose', 'Breathing Difficulty', 'Body Pain', 'Unwellness Feeling'];

    constructor(private regionsService: RegionsService, private zonesService: ZonesService,
                public dialogRef: MatDialogRef<NewCallReportComponent>, @Inject(MAT_DIALOG_DATA) new_data: CallReport) {
    }

    ngOnInit() {
        this.regionsService.getRegionsList();
        this.regionsService.RegionsListEmitter.subscribe(
            data => {
                this.regions = data;
            }
        );
        this.zonesService.ZonesListEmitter.subscribe(
            data => {this.zones = data}
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('CHANGES', changes);
    }

    public onRegionChanges(data) {
        const selectedRegion = new Region();
        selectedRegion.id = this.new_call_report.region_id;
        this.zonesService.getZonesList(selectedRegion);
    }

    public addNewCallReport() {
        this.dialogRef.close(this.new_call_report);
    }

    public cancel() {
        this.dialogRef.close();
    }

}
