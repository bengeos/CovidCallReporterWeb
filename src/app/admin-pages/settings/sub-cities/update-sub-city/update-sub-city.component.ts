import {Component, Inject, OnInit} from '@angular/core';
import {City} from '../../cities/cities.object';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CitiesService} from '../../../services/cities.service';
import {SubCity} from '../sub-cities.object';
import {SubCitiesService} from '../../../services/sub-cities.service';

@Component({
  selector: 'app-update-sub-city',
  templateUrl: './update-sub-city.component.html',
  styleUrls: ['./update-sub-city.component.scss']
})
export class UpdateSubCityComponent implements OnInit {
  public updateSubCity = new SubCity();
  public cities: City[] = [];
  public loading = false;

  constructor(public dialogRef: MatDialogRef<UpdateSubCityComponent>, @Inject(MAT_DIALOG_DATA) new_data: SubCity,
              private subCitiesService: SubCitiesService, private citiesService: CitiesService) {
    this.updateSubCity = new_data;
  }

  ngOnInit() {
    this.citiesService.getCitiesList(this.updateSubCity.selected_wereda);
    this.citiesService.CitiesListEmitter.subscribe(
        data => {
          this.cities = data;
        }
    );
  }

  public updateSubCityDialog() {
    this.dialogRef.close(this.updateSubCity);
  }

  public cancel() {
    this.dialogRef.close();
  }
}
