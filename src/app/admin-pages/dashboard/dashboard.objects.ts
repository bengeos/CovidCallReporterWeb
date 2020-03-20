/**
 * Created by BENGEOS on 3/20/20.
 */
export class DashboardCountData {
    public sent_messages: number;
    public received_messages: number;
    public group_messages: number;
    public users: number;
    public message_ports: number;
    public drip_feeds: number;
    public contacts: number;
    constructor() {
        this.sent_messages = 0;
        this.received_messages = 0;
        this.group_messages = 0;
        this.users = 0;
        this.message_ports = 0;
        this.drip_feeds = 0;
        this.contacts = 0;
    }
}

export class DailySentMessages {
    public start_date: string;
    public record_count: number[];
    public record_date: string[];
    constructor() {
        this.start_date = '';
        this.record_count = [];
        this.record_date = [];
    }
}
export class MessagesHistory {
    public start_date: string;
    public sent_record_count: number[];
    public received_record_count: number[];
    public record_date: string[];
    constructor() {
        this.start_date = '';
        this.sent_record_count = [];
        this.received_record_count = [];
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