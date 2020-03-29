import {EventEmitter, Injectable} from '@angular/core';
import {Role} from '../user/user.objects';
import {HttpRequestsServiceService} from '../../services/http-requests-service.service';
import {AuthServicesService} from '../../services/auth-services.service';
import {PaginatedTeams, Team} from '../team-contacts/team-contacts.objects';

@Injectable({
    providedIn: 'root'
})
export class TeamsService {
    public PaginatedTeamsEmitter = new EventEmitter<PaginatedTeams>();
    public TeamsListEmitter = new EventEmitter<Role[]>();

    constructor(private httpService: HttpRequestsServiceService, private authService: AuthServicesService) {
    }

    public getTeamsList() {
        return this.httpService.sendGetRequest('contact_groups', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetTeamList(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetTeamList(result) {
        if (result && result.status && result.result) {
            this.TeamsListEmitter.emit(result.result);
        }
    }

    public getPaginatedTeams() {
        console.log('calling for data');
        return this.httpService.sendGetRequest('contact_groups_paginated', this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedTeams(data);
                    console.log(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    public getPaginatedTeamsData(full_url: string) {
        return this.httpService.sendCustomGetRequest(full_url, this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedTeams(data);
                },
            );
    }


    private processGetPaginatedTeams(result) {
        if (result && result.status && result.result) {
            this.PaginatedTeamsEmitter.emit(result.result);
        }
    }

    public addNewTeam(company_role: Team) {
        return this.httpService.sendPostRequest('contact_group', company_role, this.authService.getUserToken());
    }

    public updateTeam(company_role: Team) {
        return this.httpService.sendPatchRequest('contact_group', company_role, this.authService.getUserToken());
    }

    public deleteTeam(company_role: Team) {
        return this.httpService.sendDeleteRequest('contact_group/' + company_role.id, this.authService.getUserToken());
    }
}
