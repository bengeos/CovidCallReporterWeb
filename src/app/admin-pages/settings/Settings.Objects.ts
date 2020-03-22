import {Region} from "./regions/regions.objects";
import {Zone} from "./zones/zones.objects";
import {Wereda} from "./weredas/weredas.objects";
/**
 * Created by BENGEOS on 3/22/20.
 */
export class City {
    public id: number;
    public wereda_id: number;
    public wereda: Wereda;
    public name: string;
    public latitude: string;
    public longitude: string;
    public description: string;
    constructor() {
        this.id = null;
        this.name = '';
        this.latitude = '';
        this.longitude = '';
        this.description = '';
    }
}

export class SubCity {
    public id: number;
    public city_id: number;
    public city: City;
    public name: string;
    public latitude: string;
    public longitude: string;
    public description: string;
    constructor() {
        this.id = null;
        this.name = '';
        this.latitude = '';
        this.longitude = '';
        this.description = '';
    }
}

export class Kebele {
    public id: number;
    public sub_city_id: number;
    public subCity: SubCity;
    public name: string;
    public latitude: string;
    public longitude: string;
    public description: string;
    constructor() {
        this.id = null;
        this.name = '';
        this.latitude = '';
        this.longitude = '';
        this.description = '';
    }
}




export class PaginatedCities {
    public data: City[];
    public first_page_url: string;
    public last_page_url: string;
    public next_page_url: string;
    public prev_page_url: string;
    public path: string;
    public current_page: number;
    public per_page: number;
    public last_page: number;
    public total: number;
    public from: number;
    public to: number;

    constructor() {
        this.data = [];
        this.first_page_url = '';
        this.last_page_url = '';
        this.next_page_url = '';
        this.prev_page_url = '';
        this.path = '';
        this.current_page = 0;
        this.per_page = 0;
        this.last_page = 0;
        this.total = 0;
        this.from = 0;
        this.to = 0;
    }
}

export class PaginatedSubCities {
    public data: SubCity[];
    public first_page_url: string;
    public last_page_url: string;
    public next_page_url: string;
    public prev_page_url: string;
    public path: string;
    public current_page: number;
    public per_page: number;
    public last_page: number;
    public total: number;
    public from: number;
    public to: number;

    constructor() {
        this.data = [];
        this.first_page_url = '';
        this.last_page_url = '';
        this.next_page_url = '';
        this.prev_page_url = '';
        this.path = '';
        this.current_page = 0;
        this.per_page = 0;
        this.last_page = 0;
        this.total = 0;
        this.from = 0;
        this.to = 0;
    }
}