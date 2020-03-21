/**
 * Created by BENGEOS on 3/21/20.
 */
export class CallReport {
    public id: number;
    public region_id: number;
    public zone_id: number;
    public wereda_id: number;
    public city_id: number;
    public sub_city_id: number;
    public kebele_id: number;
    public age: number;
    public phone: number;
    public occupation: number;
    public other: number;
    public gender: number;
    public created_at: string;

    constructor() {
        this.id = null;
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