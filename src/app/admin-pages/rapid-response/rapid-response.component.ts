import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-rapid-response',
    templateUrl: './rapid-response.component.html',
    styleUrls: ['./rapid-response.component.scss']
})
export class RapidResponseComponent implements OnInit {
    public allCallReports = false;
    public loading = false;

    constructor() {
    }

    ngOnInit() {
    }

    public changeReports(status) {
        this.allCallReports = status;
    }
}
