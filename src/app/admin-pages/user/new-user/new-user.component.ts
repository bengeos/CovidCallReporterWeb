import {Component, Inject, OnInit} from '@angular/core';
import {Role, User} from "../user.objects";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {UsersService} from "../../services/users.service";
import {RoleService} from "../../services/role.service";

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

    public new_user = new User();
    public roles_list: Role[] = [];
    public loading = false;

    constructor(public dialogRef: MatDialogRef<NewUserComponent>, @Inject(MAT_DIALOG_DATA) new_data: User,
                private usersService: UsersService, private rolesService: RoleService) {
    }

    ngOnInit() {
        this.rolesService.getRolesList();
        this.rolesService.RolesListEmitter.subscribe(
            data => {
                this.roles_list = data;
                this.loading = false;
            }
        );
    }

    public addNewUser() {
        this.dialogRef.close(this.new_user);
    }

    public cancel() {
        this.dialogRef.close();
    }
}
