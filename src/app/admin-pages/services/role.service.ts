import {EventEmitter, Injectable} from '@angular/core';
import {PaginatedRoles, Role} from '../user/user.objects';
import {HttpRequestsServiceService} from '../../services/http-requests-service.service';
import {AuthServicesService} from '../../services/auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public PaginatedRolesEmitter = new EventEmitter<PaginatedRoles>();
  public RolesListEmitter = new EventEmitter<Role[]>();

  constructor(private httpService: HttpRequestsServiceService, private authService: AuthServicesService) {
  }


  public getRolesList() {
    return this.httpService.sendGetRequest('roles', this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetRolesList(data);
            },
            error => {
              console.log(error);
            },
        );
  }

  private processGetRolesList(result) {
    if (result && result.status && result.result) {
      this.RolesListEmitter.emit(result.result);
    }
  }

  public getPaginatedRoles() {
    console.log('calling for data');
    return this.httpService.sendGetRequest('roles_paginated', this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetPaginatedRoles(data);
              console.log(data);
            },
            error => {
              console.log(error);
            },
        );
  }

  public getPaginatedRolesData(full_url: string) {
    return this.httpService.sendCustomGetRequest(full_url,  this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetPaginatedRoles(data);
            },
        );
  }


  private processGetPaginatedRoles(result) {
    if (result && result.status && result.result) {
      this.PaginatedRolesEmitter.emit(result.result);
    }
  }
  public addNewRole(company_role: Role) {
    return this.httpService.sendPostRequest('role', company_role, this.authService.getUserToken());
  }
  public updateRole(company_role: Role) {
    return this.httpService.sendPostRequest('roless', company_role, this.authService.getUserToken());
  }
  public deleteRole(company_role: Role) {
    return this.httpService.sendDeleteRequest('role/' + company_role.id, this.authService.getUserToken());
  }
}
