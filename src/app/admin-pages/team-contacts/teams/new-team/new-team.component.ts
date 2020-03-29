import {Component, Inject, OnInit} from '@angular/core';
import {Team} from '../../team-contacts.objects';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {
  public newTeam = new Team();
  public loading = false;
  constructor(public dialogRef: MatDialogRef<NewTeamComponent>,
              @Inject(MAT_DIALOG_DATA) new_data: Team) { }

  ngOnInit() {
  }

  public createTeam() {
    this.dialogRef.close(this.newTeam);
  }
  public cancel() {
    this.dialogRef.close();
  }
}
