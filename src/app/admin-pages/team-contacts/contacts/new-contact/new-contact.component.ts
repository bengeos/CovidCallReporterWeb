import {Component, Inject, OnInit} from '@angular/core';
import {NewTeamContact, Team, TeamContact} from '../../team-contacts.objects';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TeamsService} from "../../../services/teams.service";

@Component({
    selector: 'app-new-contact',
    templateUrl: './new-contact.component.html',
    styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {
    public newTeamContact = new NewTeamContact();
    public teams: Team[] = [];
    public loading = false;

    constructor(private teamsService: TeamsService, public dialogRef: MatDialogRef<NewContactComponent>,
                @Inject(MAT_DIALOG_DATA) new_data: NewTeamContact) {
        this.newTeamContact = new_data;
    }

    ngOnInit() {
        this.teamsService.getTeamsList();
        this.teamsService.TeamsListEmitter.subscribe(
            data => {
                this.teams = data;
            }
        );
    }

    public createNewTeamContact() {
        this.dialogRef.close(this.newTeamContact);
    }

    public cancel() {
        this.dialogRef.close();
    }

}
