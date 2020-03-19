import {Component, OnInit} from '@angular/core';
import {AuthCallback, LoginUser} from '../auth-pages.objects';
import {AuthServicesService} from '../../services/auth-services.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public new_login_user = new LoginUser();
    public loading = false;

    constructor(private authService: AuthServicesService, private router: Router) {
    }

    ngOnInit() {
        this.authService.UserAuthEmitter.subscribe(
            data => {
                this.processAuthCallBack(data)
            }
        );
    }

    public loginUser() {
        this.loading = true;
        this.authService.authenticate(this.new_login_user);
    }

    private processAuthCallBack(authCall: AuthCallback) {
        if (authCall.isValid) {
            this.router.navigate(['/admin/dashboards']);
            // console.log('Login Call Back', authCall.message);
        } else {
            this.loading = false;
            this.new_login_user = new LoginUser();
            swal({
                title: authCall.error,
                text: authCall.message,
                buttonsStyling: true,
                confirmButtonClass: 'btn btn-success'
            });
        }
    }

}
