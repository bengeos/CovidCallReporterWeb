import {City} from '../settings/cities/cities.object';
import {SubCity} from '../settings/sub-cities/sub-cities.object';
import {Kebele} from '../settings/Settings.Objects';
import {User} from '../user/user.objects';

export class Team {
    public id: number;
    public city_id: number;
    public city: City;
    public sub_city_id: number;
    public sub_city: SubCity;
    public kebele_id: number;
    public kebele: Kebele;
    public created_by: User;
    public unique_code: string;
    public name: string;
    public description: string;
    public created_at: string;

    constructor() {
        this.id = null;
    }
}

export class PaginatedTeams {
    public data: Team[];
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

export class Contact {
    public id: number;
    public full_name: string;
    public phone: string;
    public email: string;
    public created_at: string;
    public updated_at: string;

    constructor() {
        this.id = 0;
        this.full_name = '';
        this.phone = '';
        this.email = '';
        this.created_at = '';
        this.updated_at = '';
    }
}

export class PaginatedContacts {
    public data: Contact[];
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

export class TeamContact {
    public id: number;
    public contact_id: number;
    public contact: Contact;
    public contact_group: Team;
    public contact_group_id: number;
    public created_at: string;
}

export class NewTeamContact {
    public id: number;
    public contact_group_id: number;
    public full_name: string;
    public phone: string;
    public email: string;
}

export class PaginatedTeamContacts {
    public data: TeamContact[];
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
