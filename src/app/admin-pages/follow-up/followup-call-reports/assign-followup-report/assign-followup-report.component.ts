import {Component, Inject, OnInit} from '@angular/core';
import {AssignedCallReport, CallReport} from '../../../call-report/call-reports.objects';
import {Team} from '../../../team-contacts/team-contacts.objects';
import {TeamsService} from '../../../services/teams.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-assign-followup-report',
    templateUrl: './assign-followup-report.component.html',
    styleUrls: ['./assign-followup-report.component.scss']
})
export class AssignFollowupReportComponent implements OnInit {
    public selectedCallReport = new CallReport();
    public newAssignCallReport = new AssignedCallReport();
    public teams: Team[] = [];
    public loading = false;

    constructor(private teamsService: TeamsService, public dialogRef: MatDialogRef<AssignFollowupReportComponent>,
                @Inject(MAT_DIALOG_DATA) new_data: CallReport) {
        this.selectedCallReport = new_data;
        this.newAssignCallReport.call_report_id = this.selectedCallReport.id;
    }

    ngOnInit() {
        this.teamsService.getTeamsList();
        this.teamsService.TeamsListEmitter.subscribe(
            data => {
                this.teams = data
            }
        );
    }

    public assignCallReport() {
        this.dialogRef.close(this.newAssignCallReport);
    }

    public cancel() {
        this.dialogRef.close();
    }

}
