/**
 * Created by BENGEOS on 3/20/20.
 */
import {Region} from "../settings/regions/regions.objects";

export class DashboardCountData {
    public call_reports_count: number;
    public community_reports_count: number;
    public travel_reports_count: number;
    public medial_reports_count: number;
    constructor() {
        this.call_reports_count = 0;
        this.community_reports_count = 0;
        this.travel_reports_count = 0;
        this.medial_reports_count = 0;
    }
}
export class ReportsHistory {
    public start_date: string;
    public call_reports_count: number[];
    public community_reports_count: number[];
    public travel_reports_count: number[];
    public record_date: string[];
    constructor() {
        this.start_date = '';
        this.call_reports_count = [];
        this.community_reports_count = [];
        this.travel_reports_count = [];
        this.record_date = [];
    }
}

export class ChartObject {
    public labels: string[];
    public series: any[];
    public plugins: any[];
    constructor() {
        this.labels = [];
        this.series = [];
        this.plugins = [];
    }
}

export class RegionalCallReport {
    public region: Region;
    public call_reports: number;
    public last_report_date: string;
}
