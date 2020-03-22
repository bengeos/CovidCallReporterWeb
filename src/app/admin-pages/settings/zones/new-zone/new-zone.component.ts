import {Component, Inject, OnInit} from '@angular/core';
import {Zone} from "../zones.objects";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {RegionsService} from "../../../services/regions.service";
import {ZonesService} from "../../../services/zones.service";
import {Region} from "../../regions/regions.objects";

@Component({
    selector: 'app-new-zone',
    templateUrl: './new-zone.component.html',
    styleUrls: ['./new-zone.component.scss']
})
export class NewZoneComponent implements OnInit {
    public newZone = new Zone();
    public regions: Region[] = [];
    public loading = false;

    constructor(public dialogRef: MatDialogRef<NewZoneComponent>, @Inject(MAT_DIALOG_DATA) new_data: Zone,
                private regionServices: RegionsService, private zonesServices: ZonesService) {
        this.newZone = new_data;
    }

    ngOnInit() {
        this.regionServices.getRegionsList();
        this.regionServices.RegionsListEmitter.subscribe(
            data => {
                this.regions = data;
            }
        );
    }

    public addNewZone() {
        this.dialogRef.close(this.newZone);
    }

    public cancel() {
        this.dialogRef.close();
    }

}
