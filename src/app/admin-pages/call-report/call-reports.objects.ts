import {Region} from '../settings/regions/regions.objects';
import {Zone} from '../settings/zones/zones.objects';
import {Wereda} from '../settings/weredas/weredas.objects';
import {Kebele} from '../settings/Settings.Objects';
import {City} from '../settings/cities/cities.object';
import {SubCity} from "../settings/sub-cities/sub-cities.object";
/**
 * Created by BENGEOS on 3/21/20.
 */
export class CallReport {
    public id: number;
    public region_id: number;
    public region: Region;
    public zone_id: number;
    public zone: Zone;
    public wereda_id: number;
    public wereda: Wereda;
    public city_id: number;
    public city: City;
    public sub_city_id: number;
    public sub_city: SubCity;
    public kebele_id: number;
    public kebele: Kebele;
    public age: number;
    public phone: string;
    public second_phone: string;
    public full_name: string;
    public occupation: number;
    public other: string;
    public gender: string;
    public is_travel_hx: boolean;
    public is_contacted_with_pt: boolean;
    public is_visited_animal: boolean;
    public is_visited_hf: boolean;
    public report_type: string;
    public node: any;
    public rumor_types: RumorType[];
    public report_group_id: number;
    public description: string;
    public remark_1: string;
    public remark_2: string;
    public created_at: string;

    constructor() {
        this.id = null;
        this.region_id = null;
        this.gender = 'MALE';
    }
}

export class RumorType {
    public id: number;
    public name: string;
    public description: string;
    constructor() {
        this.id = null;
        this.name = '';
        this.description = '';
    }
}

export class CallRumorType {
    public id: number;
    public call_report_id: number;
    public call_rumor_type_id: number;
    public call_rumor_type: RumorType;
    constructor() {
        this.id = null;
    }
}

export class ReportGroup {
    public id: number;
    public name: string;
    constructor() {
        this.id = null;
        this.name = '';
    }
}

export class PaginatedCallReport {
    public data: CallReport[];
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
