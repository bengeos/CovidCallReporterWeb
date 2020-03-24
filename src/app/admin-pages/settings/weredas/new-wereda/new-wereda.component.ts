import {Component, Inject, OnInit} from '@angular/core';
import {Wereda} from '../weredas.objects';
import {Zone} from '../../zones/zones.objects';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {WeredasService} from '../../../services/weredas.service';
import {ZonesService} from '../../../services/zones.service';

@Component({
  selector: 'app-new-wereda',
  templateUrl: './new-wereda.component.html',
  styleUrls: ['./new-wereda.component.scss']
})
export class NewWeredaComponent implements OnInit {
  public newWereda = new Wereda();
  public zones: Zone[] = [];
  public loading = false;

  constructor(public dialogRef: MatDialogRef<NewWeredaComponent>, @Inject(MAT_DIALOG_DATA) new_data: Wereda,
              private weredaService: WeredasService, private zonesServices: ZonesService) {
    this.newWereda = new_data;
  }

  ngOnInit() {
    this.zonesServices.getZonesList(this.newWereda.selected_region);
    this.zonesServices.ZonesListEmitter.subscribe(
        data => {
          this.zones = data;
        }
    );
  }

  public addNewWereda() {
    this.dialogRef.close(this.newWereda);
  }

  public cancel() {
    this.dialogRef.close();
  }

}
