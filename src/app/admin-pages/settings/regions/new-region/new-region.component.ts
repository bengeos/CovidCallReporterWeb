import {Component, Inject, OnInit} from '@angular/core';
import {Region} from "../regions.objects";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {RegionsService} from "../../../services/regions.service";

@Component({
  selector: 'app-new-region',
  templateUrl: './new-region.component.html',
  styleUrls: ['./new-region.component.scss']
})
export class NewRegionComponent implements OnInit {
  public newRegion = new Region();
  public loading = false;

  constructor(public dialogRef: MatDialogRef<NewRegionComponent>, @Inject(MAT_DIALOG_DATA) new_data: Region,
              private regionServices: RegionsService) {
  }

  ngOnInit() {

  }
  public addNewRegion() {
    this.dialogRef.close(this.newRegion);
  }

  public cancel() {
    this.dialogRef.close();
  }

}
