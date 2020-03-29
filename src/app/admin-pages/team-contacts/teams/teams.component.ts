import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PaginatedTeams, Team} from '../team-contacts.objects';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NewTeamComponent} from './new-team/new-team.component';
import {TeamsService} from '../../services/teams.service';
import {UpdateTeamComponent} from './update-team/update-team.component';
import swal from 'sweetalert2';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
    @Output() selectedTeam = new EventEmitter<Team>();
    @Output() updateTeamContactsList = new EventEmitter<any>();
    public paginatedTeams = new PaginatedTeams();
    public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500, 1000];
    public loading = false;

    constructor(private teamsService: TeamsService, private dialog: MatDialog) {
    }

    ngOnInit() {
        this.updateTeamsComponent();
        this.teamsService.PaginatedTeamsEmitter.subscribe(
            data => {
                this.paginatedTeams = data;
                this.loading = false;
            }
        );
    }

    public updateTeamsComponent() {
        this.loading = true;
        this.teamsService.getPaginatedTeams();
    }

    public addNewTeam() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = new Team();
        const dialogRef = this.dialog.open(NewTeamComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.teamsService.addNewTeam(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.updateTeamContactsList.emit(null);
                        this.updateTeamsComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.updateTeamContactsList.emit(null);
                        this.updateTeamsComponent();
                    }
                );
            }
        });
    }

    public updateTeam(team: Team): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = team;
        const dialogRef = this.dialog.open(UpdateTeamComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.teamsService.updateTeam(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.updateTeamContactsList.emit(null);
                        this.updateTeamsComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.updateTeamContactsList.emit(null);
                        this.updateTeamsComponent();
                    }
                );
            }
        });
    }

    public deleteTeam(team: Team) {
        swal({
                title: 'Are you sure?',
                text: 'Your will not be able to recover this Team',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel please!',
            },
        ).then((result) => {
            if (result.value) {
                this.loading = true;
                this.teamsService.deleteTeam(team).subscribe(
                    succes => {
                        this.loading = false;
                        this.updateTeamsComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.updateTeamsComponent();
                    }
                );
            }
        });
    }

    public selectTeam(data: Team) {
        this.selectedTeam.emit(data);
    }

    public updateTeamsData(event: any) {
        this.loading = true;
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        this.teamsService.getPaginatedTeamsData(this.paginatedTeams.path + '?page=' + page_num
            + '&PAGINATE_SIZE=' + paginate_size);
    }
}
