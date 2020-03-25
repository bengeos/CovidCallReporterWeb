import {EventEmitter, Injectable} from '@angular/core';
import {HttpRequestsServiceService} from '../../services/http-requests-service.service';
import {AuthServicesService} from '../../services/auth-services.service';
import {PaginatedSubCities, SubCity} from '../settings/sub-cities/sub-cities.object';
import {City} from '../settings/cities/cities.object';

@Injectable({
  providedIn: 'root'
})
export class SubCitiesService {
  public PaginatedSubCitiesEmitter = new EventEmitter<PaginatedSubCities>();
  public SubCitiesListEmitter = new EventEmitter<SubCity[]>();

  constructor(private httpService: HttpRequestsServiceService, private authService: AuthServicesService) {
  }

  public getSubCitiesList(city: City) {
    return this.httpService.sendGetRequest('sub_cities/' + city.id, this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetSubCitiesList(data);
            },
            error => {
              console.log(error);
            },
        );
  }

  private processGetSubCitiesList(result) {
    if (result && result.status && result.result) {
      this.SubCitiesListEmitter.emit(result.result);
    }
  }

  public getPaginatedSubCities(city: City) {
    return this.httpService.sendGetRequest('sub_cities_paginated/' + city.id, this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetPaginatedSubCities(data);
            },
            error => {
              console.log(error);
            },
        );
  }

  public getPaginatedSubCitiesData(full_url) {
    return this.httpService.sendCustomGetRequest(full_url, this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetPaginatedSubCities(data);
            },
            error => {
              console.log(error);
            },
        );
  }

  private processGetPaginatedSubCities(result) {
    if (result && result.status && result.result) {
      this.PaginatedSubCitiesEmitter.emit(result.result);
    }
  }

  public addNewSubCity(newSubCity: SubCity) {
    return this.httpService.sendPostRequest('sub_city', newSubCity, this.authService.getUserToken());
  }

  public updateSubCity(newSubCity: SubCity) {
    return this.httpService.sendPatchRequest('sub_city', newSubCity, this.authService.getUserToken());
  }

  public deleteSubCity(newSubCity: SubCity) {
    return this.httpService.sendDeleteRequest('sub_city/' + newSubCity.id, this.authService.getUserToken());
  }
}
