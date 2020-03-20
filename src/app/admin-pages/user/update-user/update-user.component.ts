import {Component, Inject, OnInit} from '@angular/core';
import {Role, User} from '../user.objects';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UsersService} from '../../services/users.service';
import {RoleService} from '../../services/role.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  public update_user = new User();
  public roles_list: Role[] = [];
  public loading = false;

  constructor(public dialogRef: MatDialogRef<UpdateUserComponent>, @Inject(MAT_DIALOG_DATA) new_data: User,
              private usersService: UsersService, private rolesService: RoleService) {
    this.update_user = new_data;
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

  public updateUser() {
    this.dialogRef.close(this.update_user);
  }

  public cancel() {
    this.dialogRef.close();
  }

}
