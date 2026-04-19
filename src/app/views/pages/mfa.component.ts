import {Component, OnInit} from '@angular/core';
import {LoginService} from './LoginService';
import {Router} from '@angular/router';
import {LoggedInUser} from './loggedInUser';
import {LoggedInResponse} from './LogInResponse';
import {AppGlobals} from './../../app.global';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
    templateUrl: 'mfa.component.html',
    providers: [AppGlobals, LoginService],
})

export class MfaComponent implements OnInit {

    otpCode: string = '';
    sessionId: string = '';
    isLoading: boolean = false;
    isResending: boolean = false;
    hasError: boolean = false;
    errorMessage: string = '';
    successMessage: string = '';

    constructor(private loginService: LoginService, private router: Router, private _global: AppGlobals) {}

    ngOnInit() {
        this.sessionId = localStorage.getItem('mfa_session_id');
        if (!this.sessionId) {
            this.router.navigateByUrl('/pages/login');
        }
    }

    VerifyOtp() {
        if (!this.otpCode || this.otpCode.trim() === '') {
            this.hasError = true;
            this.errorMessage = 'Please enter the OTP code.';
            return;
        }

        this.isLoading = true;
        this.hasError = false;
        this.errorMessage = '';
        this.successMessage = '';

        this.loginService.VerifyMfa(this.sessionId, this.otpCode.trim()).subscribe(
            (res: LoggedInResponse) => {
                this.isLoading = false;
                if (res && res.success) {
                    localStorage.setItem('accessToken', res.accessToken);
                    localStorage.setItem('refreshToken', res.refreshToken);
                    //localStorage.removeItem('mfa_session_id');

                    const user: LoggedInUser = {
                        userID: localStorage.getItem('mfa_user_id') || res.usersName,
                        userName: res.usersName,
                        groupName: res.usersGroupName,
                        groupID: res.usersGroupId,
                        groupNames: res.usersGroupNames,
                        groupIDs: res.usersGroupIds
                    };
                    localStorage.setItem('currentLoggedInUser', JSON.stringify(user));
                    //localStorage.removeItem('mfa_user_id');

                    console.log(user);
                    this.router.navigateByUrl('/nsa/testsimdashboard');
                } else {
                    this.hasError = true;
                    this.errorMessage = (res && res.message) ? res.message : 'Invalid OTP. Please try again.';
                }
            },
            err => {
                this.isLoading = false;
                this.hasError = true;
                //this.errorMessage = (err && err.message) ? err.message : 'Invalid OTP. Please try again.';
                this.errorMessage = 'Invalid OTP. Please try again.';
            }
        );
    }

    ResendOtp() {
        this.isResending = true;
        this.hasError = false;
        this.successMessage = '';

        this.loginService.ResendOtp(this.sessionId).subscribe(
            res => {
                this.isResending = false;
                this.successMessage = 'OTP has been resent to your email.';
            },
            err => {
                this.isResending = false;
                this.hasError = true;
                //this.errorMessage = (err && err.message) ? err.message : 'Failed to resend OTP. Please try again.';
                this.errorMessage = 'Failed to resend OTP. Please try again.';
            }
        );
    }
}
