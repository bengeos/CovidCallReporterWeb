import {Component, Inject, OnInit} from '@angular/core';
import {Team} from '../../team-contacts.objects';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-update-team',
    templateUrl: './update-team.component.html',
    styleUrls: ['./update-team.component.scss']
})
export class UpdateTeamComponent implements OnInit {
    public newTeam = new Team();
    public loading = false;

    constructor(public dialogRef: MatDialogRef<UpdateTeamComponent>, @Inject(MAT_DIALOG_DATA) new_data: Team) {
        this.newTeam = new_data;
    }

    ngOnInit() {
    }

    public updateTeam() {
        this.dialogRef.close(this.newTeam);
    }

    public cancel() {
        this.dialogRef.close();
    }
}
