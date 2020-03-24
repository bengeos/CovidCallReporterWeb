import {Component, Inject, OnInit} from '@angular/core';
import {Wereda} from '../weredas.objects';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {WeredasService} from '../../../services/weredas.service';
import {ZonesService} from '../../../services/zones.service';
import {Zone} from '../../zones/zones.objects';

@Component({
  selector: 'app-update-wereda',
  templateUrl: './update-wereda.component.html',
  styleUrls: ['./update-wereda.component.scss']
})
export class UpdateWeredaComponent implements OnInit {
  public updateWereda = new Wereda();
  public zones: Zone[] = [];
  public loading = false;

  constructor(public dialogRef: MatDialogRef<UpdateWeredaComponent>, @Inject(MAT_DIALOG_DATA) new_data: Wereda,
              private weredasService: WeredasService, private zonesService: ZonesService) {
    this.updateWereda = new_data;
  }

  ngOnInit() {
    this.zonesService.getZonesList(this.updateWereda.selected_region);
    this.zonesService.ZonesListEmitter.subscribe(
        data => {
          this.zones = data;
        }
    );
  }

  public updateWeredaDialog() {
    this.dialogRef.close(this.updateWereda);
  }

  public cancel() {
    this.dialogRef.close();
  }

}
