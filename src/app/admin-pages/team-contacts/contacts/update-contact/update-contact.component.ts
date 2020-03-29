import {Component, Inject, OnInit} from '@angular/core';
import {NewTeamContact, Team} from '../../team-contacts.objects';
import {TeamsService} from '../../../services/teams.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-update-contact',
    templateUrl: './update-contact.component.html',
    styleUrls: ['./update-contact.component.scss']
})
export class UpdateContactComponent implements OnInit {
    public updateTeamContact = new NewTeamContact();
    public teams: Team[] = [];
    public loading = false;

    constructor(private teamsService: TeamsService, public dialogRef: MatDialogRef<UpdateContactComponent>,
                @Inject(MAT_DIALOG_DATA) new_data: NewTeamContact) {
        this.updateTeamContact = new_data;
    }

    ngOnInit() {
        this.teamsService.getTeamsList();
        this.teamsService.TeamsListEmitter.subscribe(
            data => {
                this.teams = data;
            }
        );
    }

    public updateTeamContactDialog() {
        this.dialogRef.close(this.updateTeamContact);
    }

    public cancel() {
        this.dialogRef.close();
    }
}
