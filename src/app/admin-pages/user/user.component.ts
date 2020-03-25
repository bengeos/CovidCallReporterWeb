import {Component, OnInit} from '@angular/core';
import {PaginatedUsers, User} from "./user.objects";
import {UsersService} from "../services/users.service";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {SwalMessagesService} from "../services/swal-messages.service";
import swal from "sweetalert2";
import {NewUserComponent} from "./new-user/new-user.component";
import {UpdateUserComponent} from "./update-user/update-user.component";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public paginated_users = new PaginatedUsers();
    public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500, 1000];
    public loading = false;

    constructor(private usersService: UsersService, private dialog: MatDialog, private responseMessageService: SwalMessagesService) {
    }

    ngOnInit() {
        this.loading = true;
        this.usersService.getPaginatedUsersList();
        this.usersService.PaginatedUsersListEmitter.subscribe(
            data => {
                this.paginated_users = data;
                this.loading = false;
            }
        );
    }

    public updateUsersComponent() {
        this.usersService.getPaginatedUsersList();
    }

    public updatePaginatedUsersData(event: any) {
        this.loading = true;
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        this.usersService.getPaginatedUsersData(this.paginated_users.path + '?page='
            + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }

    public addNewUser(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = new User();
        const dialogRef = this.dialog.open(NewUserComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.usersService.addNewUser(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'User Added Successfully');
                        this.updateUsersComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.responseMessageService.displayErrorResponseMessage(failed);
                    }
                );
            }
        });
    }

    public updateUser(user_data: User): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = user_data;
        const dialogRef = this.dialog.open(UpdateUserComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.usersService.updateUser(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'User Updated Successfully');
                        this.updateUsersComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.responseMessageService.displayErrorResponseMessage(failed);
                    }
                );
            }
        });
    }

    public changeUserStatus(user: User) {
        swal({
                title: 'Are you sure?',
                text: 'You are changing user status?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, change it!',
                cancelButtonText: 'No, cancel please!',
            },
        ).then((result) => {
            if (result.value) {
                this.loading = true;
                this.usersService.updateUserStatus(user).subscribe(
                    succes => {
                        this.responseMessageService.showNotification(4, 'top', 'right', 'User Status Updates');
                        this.updateUsersComponent();
                    },
                    failed => {
                        this.responseMessageService.displayErrorResponseMessage(failed);
                        this.updateUsersComponent();
                    }
                );
            } else  {
                this.updateUsersComponent();
            }
        });
    }

    public deleteUser(user_data: User) {
        swal({
                title: 'Are you sure?',
                text: 'Your will not be able to recover this User',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel please!',
            },
        ).then((result) => {
            if (result.value) {
                this.loading = true;
                this.usersService.deleteUser(user_data).subscribe(
                    succes => {
                        this.responseMessageService.showNotification(4, 'top', 'right', 'User Deleted Successfully');
                        this.updateUsersComponent();
                    },
                    failed => {
                        this.responseMessageService.displayErrorResponseMessage(failed);
                        this.updateUsersComponent();
                    }
                );
            }
        });
    }

}
