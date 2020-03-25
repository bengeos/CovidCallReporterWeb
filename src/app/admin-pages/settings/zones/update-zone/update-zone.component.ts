import {Component, Inject, OnInit} from '@angular/core';
import {Zone} from '../zones.objects';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RegionsService} from '../../../services/regions.service';
import {Region} from "../../regions/regions.objects";

@Component({
  selector: 'app-update-zone',
  templateUrl: './update-zone.component.html',
  styleUrls: ['./update-zone.component.scss']
})
export class UpdateZoneComponent implements OnInit {
  public updateZone = new Zone();
  public regions: Region[] = [];
  public loading = false;

  constructor(public dialogRef: MatDialogRef<UpdateZoneComponent>, @Inject(MAT_DIALOG_DATA) new_data: Zone,
              private regionService: RegionsService) {
    this.updateZone = new_data;
  }

  ngOnInit() {
    this.regionService.getRegionsList();
    this.regionService.RegionsListEmitter.subscribe(
        data => {
          this.regions = data;
        }
    );
  }

  public updateZoneDialog() {
    this.dialogRef.close(this.updateZone);
  }

  public cancel() {
    this.dialogRef.close();
  }

}
