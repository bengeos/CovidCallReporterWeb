import {Component, Inject, OnInit} from '@angular/core';
import {Wereda} from '../../weredas/weredas.objects';
import {WeredasService} from '../../../services/weredas.service';
import {City} from '../cities.object';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CitiesService} from '../../../services/cities.service';

@Component({
  selector: 'app-new-city',
  templateUrl: './new-city.component.html',
  styleUrls: ['./new-city.component.scss']
})
export class NewCityComponent implements OnInit {
  public newCity = new City();
  public weredas: Wereda[] = [];
  public loading = false;

  constructor(public dialogRef: MatDialogRef<NewCityComponent>, @Inject(MAT_DIALOG_DATA) new_data: City,
              private weredaService: WeredasService, private citiesService: CitiesService) {
    this.newCity = new_data;
  }

  ngOnInit() {
    this.weredaService.getWeredasList(this.newCity.selected_zone);
    this.weredaService.WeredasListEmitter.subscribe(
        data => {
          this.weredas = data;
        }
    );
  }

  public addNewCity() {
    this.dialogRef.close(this.newCity);
  }

  public cancel() {
    this.dialogRef.close();
  }
}
