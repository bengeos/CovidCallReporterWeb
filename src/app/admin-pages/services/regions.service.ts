import {EventEmitter, Injectable} from '@angular/core';
import {PaginatedRegions, Region} from '../settings/regions/regions.objects';
import {HttpRequestsServiceService} from '../../services/http-requests-service.service';
import {AuthServicesService} from '../../services/auth-services.service';

@Injectable({
    providedIn: 'root'
})
export class RegionsService {
    public PaginatedRegionsEmitter = new EventEmitter<PaginatedRegions>();
    public RegionsListEmitter = new EventEmitter<Region[]>();

    constructor(private httpService: HttpRequestsServiceService, private authService: AuthServicesService) {
    }

    public getRegionsList() {
        return this.httpService.sendGetRequest('regions', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetRegionsList(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetRegionsList(result) {
        if (result && result.status && result.result) {
            this.RegionsListEmitter.emit(result.result);
        }
    }

    public getPaginatedRegions() {
        return this.httpService.sendGetRequest('regions_paginated', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedRegions(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    public getPaginatedRegionsData(full_url) {
        return this.httpService.sendCustomGetRequest(full_url, this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedRegions(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetPaginatedRegions(result) {
        if (result && result.status && result.result) {
            this.PaginatedRegionsEmitter.emit(result.result);
        }
    }

    public addNewRegion(newRegion: Region) {
        return this.httpService.sendPostRequest('region', newRegion, this.authService.getUserToken());
    }

    public updateRegion(newRegion: Region) {
        return this.httpService.sendPatchRequest('region', newRegion, this.authService.getUserToken());
    }

    public deleteRegion(newRegion: Region) {
        return this.httpService.sendDeleteRequest('region/' + newRegion.id, this.authService.getUserToken());
    }
}
