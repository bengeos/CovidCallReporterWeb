import {EventEmitter, Injectable, Input} from '@angular/core';
import {PaginatedZones, Zone} from '../settings/zones/zones.objects';
import {HttpRequestsServiceService} from '../../services/http-requests-service.service';
import {AuthServicesService} from '../../services/auth-services.service';
import {Region} from "../settings/regions/regions.objects";

@Injectable({
    providedIn: 'root'
})
export class ZonesService {
    public PaginatedZonesEmitter = new EventEmitter<PaginatedZones>();
    public ZonesListEmitter = new EventEmitter<Zone[]>();

    constructor(private httpService: HttpRequestsServiceService, private authService: AuthServicesService) {
    }

    public getZonesList(region: Region) {
        return this.httpService.sendGetRequest('zones/' + region.id, this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetZonesList(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetZonesList(result) {
        if (result && result.status && result.result) {
            this.ZonesListEmitter.emit(result.result);
        }
    }

    public getPaginatedZones(region: Region) {
        return this.httpService.sendGetRequest('zones_paginated/' + region.id, this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedZones(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    public getPaginatedZonesData(full_url) {
        return this.httpService.sendCustomGetRequest(full_url, this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedZones(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetPaginatedZones(result) {
        if (result && result.status && result.result) {
            this.PaginatedZonesEmitter.emit(result.result);
        }
    }

    public addNewZone(newZone: Zone) {
        return this.httpService.sendPostRequest('zone', newZone, this.authService.getUserToken());
    }

    public updateZone(newZone: Zone) {
        return this.httpService.sendPatchRequest('zone', newZone, this.authService.getUserToken());
    }

    public deleteZone(newZone: Zone) {
        return this.httpService.sendDeleteRequest('zone/' + newZone.id, this.authService.getUserToken());
    }
}
