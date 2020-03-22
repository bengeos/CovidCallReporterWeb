import {Component, Inject, OnInit} from '@angular/core';
import {Zone} from '../zones.objects';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ZonesService} from '../../../services/zones.service';
import {RegionsService} from '../../../services/regions.service';

@Component({
  selector: 'app-update-zone',
  templateUrl: './update-zone.component.html',
  styleUrls: ['./update-zone.component.scss']
})
export class UpdateZoneComponent implements OnInit {
  public updateZone = new Zone();
  public loading = false;

  constructor(public dialogRef: MatDialogRef<UpdateZoneComponent>, @Inject(MAT_DIALOG_DATA) new_data: Zone,
              private regionService: RegionsService, private zonesService: ZonesService) {
    this.updateZone = new_data;
  }

  ngOnInit() {

  }

  public updateRegionDialog() {
    this.dialogRef.close(this.updateZone);
  }

  public cancel() {
    this.dialogRef.close();
  }

}
