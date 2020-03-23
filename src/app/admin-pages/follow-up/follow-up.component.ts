import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-follow-up',
    templateUrl: './follow-up.component.html',
    styleUrls: ['./follow-up.component.scss']
})
export class FollowUpComponent implements OnInit {
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
