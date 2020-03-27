import {Component, Inject, OnInit} from '@angular/core';
import {Role, User} from '../user.objects';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UsersService} from '../../services/users.service';
import {RoleService} from '../../services/role.service';
import {RegionsService} from '../../services/regions.service';
import {Region} from '../../settings/regions/regions.objects';
import {AuthServicesService} from "../../../services/auth-services.service";

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
    public update_user = new User();
    public roles_list: Role[] = [];
    public region_list: Region[] = [];
    public loading = false;
    public is_super_admin = false;

    constructor(public dialogRef: MatDialogRef<UpdateUserComponent>, @Inject(MAT_DIALOG_DATA) new_data: User,
                private usersService: UsersService, private rolesService: RoleService, private regionsService: RegionsService,
                private authService: AuthServicesService) {
        this.update_user = new_data;
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

    public updateUser() {
        this.dialogRef.close(this.update_user);
    }

    public cancel() {
        this.dialogRef.close();
    }

}
