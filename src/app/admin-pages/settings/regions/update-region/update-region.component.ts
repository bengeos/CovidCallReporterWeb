import {Component, Inject, OnInit} from '@angular/core';
import {Region} from '../regions.objects';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../../user/user.objects';
import {RegionsService} from '../../../services/regions.service';

@Component({
  selector: 'app-update-region',
  templateUrl: './update-region.component.html',
  styleUrls: ['./update-region.component.scss']
})
export class UpdateRegionComponent implements OnInit {
  public updateRegion = new Region();
  public loading = false;

  constructor(public dialogRef: MatDialogRef<UpdateRegionComponent>, @Inject(MAT_DIALOG_DATA) new_data: Region,
              private regionService: RegionsService) {
    this.updateRegion = new_data;
  }

  ngOnInit() {

  }

  public updateRegionDialog() {
    this.dialogRef.close(this.updateRegion);
  }

  public cancel() {
    this.dialogRef.close();
  }

}
