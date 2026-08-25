import {Component} from '@angular/core';
import {LoginService} from './LoginService';
import {Router} from '@angular/router';
import {LoggedInUser} from './loggedInUser';
import {AppGlobals} from './../../app.global';







@Component({
    templateUrl: 'login.component.html',
    providers: [AppGlobals, LoginService],
    standalone: false
})

export class LoginComponent {

    isValidUser: boolean = true;
    isDelegateAccess: boolean = false;
    public isLoading: boolean = false;
    errorMessage: string = '';

    username: string;
    password: string;
    delegateusername: string;

    constructor(private loginService: LoginService, private router: Router, private _global: AppGlobals) {
        // Clear any existing session when opening the login page
        localStorage.removeItem('mfa_session_id');
        localStorage.removeItem('mfa_user_id');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('currentLoggedInUser');
    }

    ValidateUser() {
        this.isLoading = true;
        this.isValidUser = true;
        this.errorMessage = '';

        if (this.isDelegateAccess) {
            this.loginService.ValidateDelegateUser(this.username, this.delegateusername, this.password).subscribe(
                res => {
                    this.isLoading = false;
                    if (res && res.success && res.sessionId) {
                        localStorage.setItem('mfa_session_id', res.sessionId);
                        localStorage.setItem('mfa_user_id', this.username);
                        this.router.navigateByUrl('/pages/mfa');
                    } else {
                        this.isValidUser = false;
                        this.errorMessage = (res && res.message) ? res.message : 'Invalid credentials. Please try again.';
                    }
                },
                err => {
                    this.isValidUser = false;
                    this.isLoading = false;
                    this.errorMessage = (err && err.error && err.error.message) ? err.error.message : 'Invalid credentials. Please try again.';
                }
            );
        } else {
            this.loginService.ValidateUser(this.username, this.password).subscribe(
                res => {
                    this.isLoading = false;
                    if (res && res.success && res.sessionId) {
                        localStorage.setItem('mfa_session_id', res.sessionId);
                        localStorage.setItem('mfa_user_id', this.username);
                        this.router.navigateByUrl('/pages/mfa');
                    } else {
                        this.isValidUser = false;
                        this.errorMessage = (res && res.message) ? res.message : 'Invalid credentials. Please try again.';
                    }
                },
                err => {
                    this.isValidUser = false;
                    this.isLoading = false;
                    this.errorMessage = (err && err.error && err.error.message) ? err.error.message : 'Invalid credentials. Please try again.';
                }
            );
        }
    }
}
