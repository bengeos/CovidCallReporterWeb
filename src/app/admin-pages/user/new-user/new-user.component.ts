import {Component, Inject, OnInit} from '@angular/core';
import {Role, User} from "../user.objects";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {UsersService} from "../../services/users.service";
import {RoleService} from "../../services/role.service";
import {Region} from "../../settings/regions/regions.objects";
import {RegionsService} from "../../services/regions.service";
import {AuthServicesService} from "../../../services/auth-services.service";

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

    public new_user = new User();
    public roles_list: Role[] = [];
    public region_list: Region[] = [];
    public loading = false;
    public is_super_admin = false;

    constructor(public dialogRef: MatDialogRef<NewUserComponent>, @Inject(MAT_DIALOG_DATA) new_data: User,
                private usersService: UsersService, private rolesService: RoleService, private regionsService: RegionsService,
                private authService: AuthServicesService) {
        this.is_super_admin = (this.authService.getUserRoleId() === '1');
    }

    ngOnInit() {
        this.rolesService.getRolesList();
        this.rolesService.RolesListEmitter.subscribe(
            data => {
                this.roles_list = data;
                this.loading = false;
            }
        );
        this.regionsService.getRegionsList();
        this.regionsService.RegionsListEmitter.subscribe(
            data => {
                this.region_list = data;
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
