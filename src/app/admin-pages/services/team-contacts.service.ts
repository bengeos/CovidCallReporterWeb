import {EventEmitter, Injectable} from '@angular/core';
import {
    NewTeamContact,
    PaginatedTeamContacts,
    PaginatedTeams,
    Team,
    TeamContact
} from '../team-contacts/team-contacts.objects';
import {HttpRequestsServiceService} from '../../services/http-requests-service.service';
import {AuthServicesService} from '../../services/auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class TeamContactsService {
  public PaginatedTeamContactsEmitter = new EventEmitter<PaginatedTeamContacts>();

  constructor(private httpService: HttpRequestsServiceService, private authService: AuthServicesService) {
  }

  public getPaginatedTeamContacts(team: Team) {
    return this.httpService.sendGetRequest('grouped_contacts/' + team.id, this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetPaginatedTeamContacts(data);
              console.log(data);
            },
            error => {
              console.log(error);
            },
        );
  }

  public getPaginatedTeamContactsData(full_url: string) {
    return this.httpService.sendCustomGetRequest(full_url, this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetPaginatedTeamContacts(data);
            },
        );
  }


  private processGetPaginatedTeamContacts(result) {
    if (result && result.status && result.result) {
      this.PaginatedTeamContactsEmitter.emit(result.result);
    }
  }

  public addNewTeamContact(teamContact: NewTeamContact) {
    return this.httpService.sendPostRequest('grouped_contact', teamContact, this.authService.getUserToken());
  }

  public updateTeamContact(teamContact: NewTeamContact) {
    return this.httpService.sendPostRequest('grouped_contact', teamContact, this.authService.getUserToken());
  }

  public deleteTeamContact(teamContact: TeamContact) {
    return this.httpService.sendDeleteRequest('grouped_contact/' + teamContact.id, this.authService.getUserToken());
  }
}
