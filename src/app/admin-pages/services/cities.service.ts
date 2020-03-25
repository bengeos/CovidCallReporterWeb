import {EventEmitter, Injectable} from '@angular/core';
import {HttpRequestsServiceService} from '../../services/http-requests-service.service';
import {AuthServicesService} from '../../services/auth-services.service';
import {Zone} from '../settings/zones/zones.objects';
import {City, PaginatedCities} from '../settings/cities/cities.object';
import {Wereda} from '../settings/weredas/weredas.objects';
import {Region} from '../settings/regions/regions.objects';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  public PaginatedCitiesEmitter = new EventEmitter<PaginatedCities>();
  public CitiesListEmitter = new EventEmitter<City[]>();

  constructor(private httpService: HttpRequestsServiceService, private authService: AuthServicesService) {
  }

  public getCitiesList(wereda: Wereda) {
    return this.httpService.sendGetRequest('cities/' + wereda.id, this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetCitiesList(data);
            },
            error => {
              console.log(error);
            },
        );
  }
    public getCitiesListByRegion(region: Region) {
        return this.httpService.sendGetRequest('cities_by_region/' + region.id, this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetCitiesList(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

  private processGetCitiesList(result) {
    if (result && result.status && result.result) {
      this.CitiesListEmitter.emit(result.result);
    }
  }

  public getPaginatedCities(wereda: Wereda) {
    return this.httpService.sendGetRequest('cities_paginated/' + wereda.id, this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetPaginatedCities(data);
            },
            error => {
              console.log(error);
            },
        );
  }

  public getPaginatedCitiesData(full_url) {
    return this.httpService.sendCustomGetRequest(full_url, this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetPaginatedCities(data);
            },
            error => {
              console.log(error);
            },
        );
  }

  private processGetPaginatedCities(result) {
    if (result && result.status && result.result) {
      this.PaginatedCitiesEmitter.emit(result.result);
    }
  }

  public addNewCity(newCity: City) {
    return this.httpService.sendPostRequest('city', newCity, this.authService.getUserToken());
  }

  public updateCity(newCity: City) {
    return this.httpService.sendPatchRequest('city', newCity, this.authService.getUserToken());
  }

  public deleteCity(newCity: City) {
    return this.httpService.sendDeleteRequest('city/' + newCity.id, this.authService.getUserToken());
  }
}
