import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NewTeamContact, PaginatedTeamContacts, Team, TeamContact} from '../team-contacts.objects';
import {TeamContactsService} from '../../services/team-contacts.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UpdateTeamComponent} from '../teams/update-team/update-team.component';
import swal from 'sweetalert2';
import {NewContactComponent} from './new-contact/new-contact.component';
import {UpdateContactComponent} from "./update-contact/update-contact.component";

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnChanges {
    @Input() selectedTeam = new Team();
    @Input() paginatedTeamContacts = new PaginatedTeamContacts();
    public teams: Team[] = [];
    public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500, 1000];
    public loading = false;

    constructor(private teamContactsService: TeamContactsService, private teamContactService: TeamContactsService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.teamContactsService.PaginatedTeamContactsEmitter.subscribe(
            data => {
                this.paginatedTeamContacts = data;
            }
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.selectedTeam.currentValue) {
            this.teamContactsService.getPaginatedTeamContacts(this.selectedTeam);
        }
    }

    public updateTeamContactsComponent() {
        if (this.selectedTeam.id) {
            this.teamContactsService.getPaginatedTeamContacts(this.selectedTeam);
        }
    }

    public updateTeamContactsPagination(event: any) {
        this.loading = true;
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        this.teamContactsService.getPaginatedTeamContactsData(this.paginatedTeamContacts.path + '?page=' + page_num
            + '&PAGINATE_SIZE=' + paginate_size);
    }

    public addNewTeamContact() {
        const newTeam = new NewTeamContact();
        newTeam.contact_group_id = this.selectedTeam.id;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = newTeam;
        const dialogRef = this.dialog.open(NewContactComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.teamContactService.addNewTeamContact(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.updateTeamContactsComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.updateTeamContactsComponent();
                    }
                );
            }
        });
    }

    public updateTeamContact(teamContact: TeamContact): void {
        const updateTeamContact = new NewTeamContact();
        updateTeamContact.id = teamContact.id;
        updateTeamContact.contact_group_id = teamContact.contact_group_id;
        updateTeamContact.full_name = teamContact.contact.full_name;
        updateTeamContact.email = teamContact.contact.email;
        updateTeamContact.phone = teamContact.contact.phone;

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = updateTeamContact;
        const dialogRef = this.dialog.open(UpdateContactComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.teamContactsService.updateTeamContact(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.updateTeamContactsComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.updateTeamContactsComponent();
                    }
                );
            }
        });
    }

    public deleteTeamContact(teamContact: TeamContact) {
        swal({
                title: 'Are you sure?',
                text: 'Your will not be able to recover this Team-Contact',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel please!',
            },
        ).then((result) => {
            if (result.value) {
                this.loading = true;
                this.teamContactsService.deleteTeamContact(teamContact).subscribe(
                    succes => {
                        this.loading = false;
                        this.updateTeamContactsComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.updateTeamContactsComponent();
                    }
                );
            }
        });
    }
}
