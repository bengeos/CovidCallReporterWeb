import {Component, Inject, OnInit} from '@angular/core';
import {City} from '../../cities/cities.object';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CitiesService} from '../../../services/cities.service';
import {SubCity} from '../sub-cities.object';
import {SubCitiesService} from '../../../services/sub-cities.service';

@Component({
  selector: 'app-new-sub-city',
  templateUrl: './new-sub-city.component.html',
  styleUrls: ['./new-sub-city.component.scss']
})
export class NewSubCityComponent implements OnInit {
  public newSubCity = new SubCity();
  public cities: City[] = [];
  public loading = false;

  constructor(public dialogRef: MatDialogRef<NewSubCityComponent>, @Inject(MAT_DIALOG_DATA) new_data: SubCity,
              private subCitiesService: SubCitiesService, private citiesService: CitiesService) {
    this.newSubCity = new_data;
  }

  ngOnInit() {
    this.citiesService.getCitiesList(this.newSubCity.selected_wereda);
    this.citiesService.CitiesListEmitter.subscribe(
        data => {
          this.cities = data;
        }
    );
  }

  public addNewSubCity() {
    this.dialogRef.close(this.newSubCity);
  }

  public cancel() {
    this.dialogRef.close();
  }
}
