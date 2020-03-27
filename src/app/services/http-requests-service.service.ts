import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsServiceService {
  // public root_url = environment.root_url; // PRODUCTION Server URL s
  public root_url = 'https://api.covidfollowupportal.negarit.net/'; // BENGEOS Local Server URL s
  // public root_url = 'http://127.0.0.1:8000/'; // BENGEOS Local Server URL s
  public api_root_url = this.root_url + 'api/';


  constructor(private httpRequest: HttpClient) { }
  public sendGetRequest(routeName, token) {
    const request_header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.httpRequest.get(this.api_root_url + routeName, {headers: request_header});
  }
  public sendPostRequest(routeName, body, token) {
    const request_header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.httpRequest.post(this.api_root_url + routeName, body, {headers: request_header});
  }
  public sendPutRequest(routeName, body, header) {
    return this.httpRequest.put(this.api_root_url + routeName, body, header);
  }
  public sendPatchRequest(routeName, body, token) {
    const request_header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.httpRequest.patch(this.api_root_url + routeName, body, {headers: request_header});
  }
  public sendDeleteRequest(routeName, token) {
    const request_header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.httpRequest.delete(this.api_root_url + routeName, {headers: request_header});
  }
  public sendCustomGetRequest(full_url, token) {
    const request_header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.httpRequest.get(full_url, {headers: request_header});
  }
  public sendCustomPostRequest(full_url, body, header) {
    return this.httpRequest.post(full_url, body, header);
  }
  public getRootUrl() {
    return this.root_url;
  }
  public getApiRootUrl() {
    return this.api_root_url;
  }
}
