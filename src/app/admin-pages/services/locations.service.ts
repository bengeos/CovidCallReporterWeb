import {EventEmitter, Injectable} from '@angular/core';
import {PaginatedRegions, Region} from "../settings/regions/regions.objects";

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  public PaginatedRegionsEmitter = new EventEmitter<PaginatedRegions>();
  public RegionsListEmitter = new EventEmitter<Region[]>();
  constructor() { }
}
