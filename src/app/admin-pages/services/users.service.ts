import {EventEmitter, Injectable} from '@angular/core';
import {PaginatedUsers, User} from '../user/user.objects';
import {HttpRequestsServiceService} from '../../services/http-requests-service.service';
import {AuthServicesService} from '../../services/auth-services.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    public PaginatedUsersListEmitter = new EventEmitter<PaginatedUsers>();
    public UsersListEmitter = new EventEmitter<User[]>();

    constructor(private httpService: HttpRequestsServiceService, private authService: AuthServicesService) {
    }

    public getUsersList() {
        return this.httpService.sendGetRequest('users', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetUsersList(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetUsersList(result) {
        if (result && result.status && result.result) {
            this.UsersListEmitter.emit(result.result);
        }
    }

    public getPaginatedUsersList() {
        return this.httpService.sendGetRequest('users_paginated', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedUsersList(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    public getPaginatedUsersData(full_url) {
        return this.httpService.sendCustomGetRequest(full_url, this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedUsersList(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetPaginatedUsersList(result) {
        if (result && result.status && result.result) {
            this.PaginatedUsersListEmitter.emit(result.result);
        }
    }

    public addNewUser(new_user: User) {
        return this.httpService.sendPostRequest('user', new_user, this.authService.getUserToken());
    }

    public updateUser(new_user: User) {
        return this.httpService.sendPatchRequest('user', new_user, this.authService.getUserToken());
    }

    public updateUserStatus(new_user: User) {
        return this.httpService.sendPatchRequest('user_status', new_user, this.authService.getUserToken());
    }

    public deleteUser(new_user: User) {
        return this.httpService.sendDeleteRequest('user/' + new_user.id, this.authService.getUserToken());
    }
}
