import {Component, Inject, OnInit} from '@angular/core';
import {Wereda} from "../../weredas/weredas.objects";
import {Zone} from "../../zones/zones.objects";
import {WeredasService} from "../../../services/weredas.service";
import {ZonesService} from "../../../services/zones.service";
import {City} from "../cities.object";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CitiesService} from "../../../services/cities.service";

@Component({
  selector: 'app-update-city',
  templateUrl: './update-city.component.html',
  styleUrls: ['./update-city.component.scss']
})
export class UpdateCityComponent implements OnInit {
  public updateCity = new City();
  public weredas: Wereda[] = [];
  public loading = false;

  constructor(public dialogRef: MatDialogRef<UpdateCityComponent>, @Inject(MAT_DIALOG_DATA) new_data: City,
              private weredasService: WeredasService, private citiesService: CitiesService) {
    this.updateCity = new_data;
  }

  ngOnInit() {
    this.weredasService.getWeredasList(this.updateCity.selected_zone);
    this.weredasService.WeredasListEmitter.subscribe(
        data => {
          this.weredas = data;
        }
    );
  }

  public updateCityDialog() {
    this.dialogRef.close(this.updateCity);
  }

  public cancel() {
    this.dialogRef.close();
  }
}
