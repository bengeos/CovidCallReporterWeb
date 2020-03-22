import {EventEmitter, Injectable} from '@angular/core';
import {AuthCallback, LoginUser, RegisterUser, ResetUser} from '../auth-pages/auth-pages.objects';
import {Router} from '@angular/router';
import {HttpRequestsServiceService} from './http-requests-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  public UserAuthEmitter = new EventEmitter<AuthCallback>();
  public RegisterEmitter = new EventEmitter<AuthCallback>();
  constructor(private httpService: HttpRequestsServiceService, private routeManager: Router) { }
  public getResetCode(user: ResetUser) {
    const header = new Headers();
    return this.httpService.sendPostRequest('get_reset_code', user, header);
  }
  public resetPassword(user: ResetUser) {
    const header = new Headers();
    return this.httpService.sendPostRequest('reset_password', user, header);
  }
  public authenticate(user: LoginUser) {
    const header = new Headers();
    console.log('authenticating', user);
    this.httpService.sendPostRequest('authenticate', user, header).subscribe(
        data => {
          this.processAuthenticate(data, true)
        },
        err => {
          this.processAuthenticate(err, false)
        }
    );
  }

  public registerUser(user: RegisterUser) {
    const header = new Headers();
    console.log('Registering', user);
    this.httpService.sendPostRequest('register', user, header).subscribe(
        data => {
          this.processRegistration(data, true);
          console.log(data);
        },
        err => {
          this.processRegistration(err, false);
          console.log(err);
        }
    );
  }
  private processAuthenticate(response: any, state) {
    this.setUserAuthData(JSON.stringify(response));
    if (state) {
      if (response && response.status && response.token) {
        if (response.result && response.result.full_name) {
          this.setFullName(response.result.full_name);
          this.setUserRoleId(response.result.role_id);
        }
        this.setUserToken(response.token);
        const authCallback = new AuthCallback();
        authCallback.isValid = true;
        authCallback.message = 'successfully authenticated';
        authCallback.error = 'Authenticated';
        this.UserAuthEmitter.emit(authCallback);
      } else {
        const authCallback = new AuthCallback();
        authCallback.isValid = false;
        authCallback.message = 'Whoops! Something Went Wrong! try again';
        authCallback.error = 'Unable to Authenticate';
        this.UserAuthEmitter.emit(authCallback);
      }
    } else {
      if (response && response.error) {
        console.log('Error', response);
        const authCallback = new AuthCallback();
        authCallback.isValid = false;
        authCallback.message = response.error.error;
        authCallback.error = 'Authentication Failed!';
        this.UserAuthEmitter.emit(authCallback);
      } else  {
        const authCallback = new AuthCallback();
        authCallback.isValid = false;
        authCallback.message = 'Whoops! Unable To Authenticate';
        authCallback.error = 'Authentication Error!';
        this.UserAuthEmitter.emit(authCallback);
      }
    }
  }

  private processRegistration(response: any, state) {
    if (state) {
      if (response && response.result) {
        const registerCallback = new AuthCallback();
        registerCallback.isValid = true;
        registerCallback.message = 'Successfully Registered';
        registerCallback.error = 'Successfully Registered';
        this.RegisterEmitter.emit(registerCallback);
      } else {
        const registerCallback = new AuthCallback();
        registerCallback.isValid = false;
        registerCallback.message = 'Whoops! registration failed';
        registerCallback.error = 'Whoops! registration failed';
        this.RegisterEmitter.emit(registerCallback);
      }
    } else  {
      if (response && response.error) {
        const registerCallback = new AuthCallback();
        registerCallback.isValid = false;
        registerCallback.message = response.error.error;
        registerCallback.error = 'Registration Failed!';
        this.RegisterEmitter.emit(registerCallback);
      } else  {
        const registerCallback = new AuthCallback();
        registerCallback.isValid = false;
        registerCallback.message = 'Whoops! Something Went Wrong';
        registerCallback.error = 'Registration Failed!';
        this.RegisterEmitter.emit(registerCallback);
      }
    }
  }
  public logOut() {
    this.setFullName('');
    this.setUserToken('');
    this.setUserToken('');
    this.setUserAuthData('[]');
    this.routeManager.navigate(['/auth/login'])
  }
  public setUserToken(user_token: string) {
    localStorage.setItem('covid_call_reporter_token', user_token);
  }
  public getUserToken() {
    return localStorage.getItem('covid_call_reporter_token')
  }
  public setFullName(full_name: string) {
    localStorage.setItem('covid_call_reporter_full_name', full_name);
  }
  public getFullName() {
    return localStorage.getItem('covid_call_reporter_full_name')
  }
  public setUserAuthData(user_token: string) {
    localStorage.setItem('covid_call_reporter_user_auth_data', user_token);
  }
  public getUserAuthData() {
    return JSON.parse(localStorage.getItem('covid_call_reporter_user_auth_data'))
  }
  public setUserRoleId(role_id: string) {
    localStorage.setItem('covid_call_reporter_role_id', role_id);
  }
  public getUserRoleId() {
    return localStorage.getItem('covid_call_reporter_role_id')
  }
}
