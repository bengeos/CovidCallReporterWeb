import {EventEmitter, Injectable} from '@angular/core';
import {PaginatedWeredas, Wereda} from '../settings/weredas/weredas.objects';
import {HttpRequestsServiceService} from '../../services/http-requests-service.service';
import {AuthServicesService} from '../../services/auth-services.service';
import {Zone} from "../settings/zones/zones.objects";

@Injectable({
  providedIn: 'root'
})
export class WeredasService {
  public PaginatedWeredasEmitter = new EventEmitter<PaginatedWeredas>();
  public WeredasListEmitter = new EventEmitter<Wereda[]>();

  constructor(private httpService: HttpRequestsServiceService, private authService: AuthServicesService) {
  }

  public getWeredasList(zone: Zone) {
    return this.httpService.sendGetRequest('weredas/' + zone.id, this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetWeredasList(data);
            },
            error => {
              console.log(error);
            },
        );
  }

  private processGetWeredasList(result) {
    if (result && result.status && result.result) {
      this.WeredasListEmitter.emit(result.result);
    }
  }

  public getPaginatedWeredas(zone: Zone) {
    return this.httpService.sendGetRequest('weredas_paginated/' + zone.id, this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetPaginatedWeredas(data);
            },
            error => {
              console.log(error);
            },
        );
  }

  public getPaginatedWeredasData(full_url) {
    return this.httpService.sendCustomGetRequest(full_url, this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetPaginatedWeredas(data);
            },
            error => {
              console.log(error);
            },
        );
  }

  private processGetPaginatedWeredas(result) {
    if (result && result.status && result.result) {
      this.PaginatedWeredasEmitter.emit(result.result);
    }
  }

  public addNewWereda(newWereda: Wereda) {
    return this.httpService.sendPostRequest('wereda', newWereda, this.authService.getUserToken());
  }

  public updateWereda(newWereda: Wereda) {
    return this.httpService.sendPatchRequest('wereda', newWereda, this.authService.getUserToken());
  }

  public deleteWereda(newWereda: Wereda) {
    return this.httpService.sendDeleteRequest('wereda/' + newWereda.id, this.authService.getUserToken());
  }
}
