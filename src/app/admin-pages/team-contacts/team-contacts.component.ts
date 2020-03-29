import {Component, OnInit} from '@angular/core';
import {Team} from "./team-contacts.objects";

@Component({
    selector: 'app-team-contacts',
    templateUrl: './team-contacts.component.html',
    styleUrls: ['./team-contacts.component.scss']
})
export class TeamContactsComponent implements OnInit {
    public selectedTeam = new Team();
    public loading = false;

    constructor() {
    }

    ngOnInit() {
    }

    public updateTeamContacts() {

    }

    public onSelectTeam(team) {
        this.selectedTeam = team;
    }

}
