/**
 * Created by BENGEOS on 3/20/20.
 */
import {Region} from "../settings/regions/regions.objects";

export class User {
    public id: number;
    public region: Region;
    public region_id: number;
    public role_id: number;
    public full_name: string;
    public email: string;
    public phone: string;
    public password: string;
    public call_center: string;
    public is_active: boolean;
    public role: Role;
    public created_by: User;
    public updated_by: User;
    public created_at: string;
    public updated_at: string;
    constructor() {
        this.id = 0;
        this.created_at = '';
        this.updated_at = '';
    }
}
export class PaginatedUsers {
    public data: User[];
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
export class Role {
    public id: number;
    public name: string;
    public description: string;
}

export class PaginatedRoles {
    public data: Role[];
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
