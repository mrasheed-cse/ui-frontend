import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoggedInUser} from './loggedInUser';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';




import {LoggedInResponse} from './LogInResponse';


@Injectable()
export class LoginService {
    serverUrl: string;
    currentLoggedInUser: LoggedInUser;
    loginId: string;
    loginPassword: string;
    isValid: boolean;
    userStr: string;

    constructor(private router: Router, private http: HttpClient) {
        this.serverUrl = environment.apiUrl;
        this.isValid = false;

        this.currentLoggedInUser = {
            userID: '',
            userName: '',
            groupName: '',
            groupID: 0,
            groupNames: null,
            groupIDs: null
        };

        this.userStr = '';
    }

    ValidateUser(username: string, password: string): any {
        return this.http.post(this.serverUrl + 'login', {
            userId: username,
            password: password
        });
    }

    ValidateDelegateUser(username: string, delegateusername: string, password: string): any {
        var userNameFromEmail = null;
        var indexOfAt = username.indexOf('@');
        console.log('indexOfAt: ' + indexOfAt, ' userNameFromEmail ' + userNameFromEmail);
        console.log(this.serverUrl + 'loginAsDelegate');
        return this.http.post(this.serverUrl + 'loginAsDelegate', {
            userId: userNameFromEmail == null ? username : userNameFromEmail,
            delegateUserId: delegateusername,
            password: password
        });
    }

    VerifyMfa(sessionId: string, otpCode: string): any {
        return this.http.post<LoggedInResponse>(this.serverUrl + 'verify-mfa', {
            sessionId: sessionId,
            otpCode: otpCode
        });
    }

    ResendOtp(sessionId: string): any {
        return this.http.post(this.serverUrl + 'resend-otp', {
            sessionId: sessionId
        });
    }

    RefreshToken(refreshToken: string): any {
        return this.http.post<LoggedInResponse>(this.serverUrl + 'refresh', {
            refreshToken: refreshToken
        });
    }

    GetCurrentLoggedInUser() {
        this.userStr = localStorage.getItem('currentLoggedInUser');
        try {
            console.log(JSON.parse(this.userStr));
            return JSON.parse(this.userStr);
        } catch (ex) {
            return null;
        }
    }

    UpdateCurrentLoggedInUserUserGroup(userGroupId: number, userGroupName: string) {
        console.log('updating usergroup to ' + userGroupName);
        this.userStr = localStorage.getItem('currentLoggedInUser');
        this.currentLoggedInUser = JSON.parse(this.userStr);

        this.currentLoggedInUser.groupID = userGroupId;
        this.currentLoggedInUser.groupName = userGroupName;
        console.log(this.currentLoggedInUser);
        localStorage.setItem('currentLoggedInUser', JSON.stringify(this.currentLoggedInUser));
    }

    LogOut() {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            this.http.post(this.serverUrl + 'logout', {refreshToken: refreshToken}).subscribe(
                () => {},
                () => {}
            );
        }
        localStorage.removeItem('mfa_session_id');
        localStorage.removeItem('mfa_user_id');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('currentLoggedInUser');
        this.router.navigate(['pages/login']);
    }

    LoadMenu(usersGroupIds: any): any {
        console.log('Fetching menu for userGroupIDs: ' + JSON.stringify(usersGroupIds) + '  from the API : ' + this.serverUrl + 'LoadFullMmenu');
        return this.http.post(this.serverUrl + 'LoadFullMmenu', {
            usersGroupIds: usersGroupIds
        });
    }

    AuthenticatePageAccess(link: string, usersGroupIds: any): any {
        console.log('Authentication current user for link: ' + link + '  from the API : ' + this.serverUrl + 'AuthenticatePageAccess');
        return this.http.post(this.serverUrl + 'AuthenticatePageAccess', {
            link: link,
            usersGroupIds: usersGroupIds
        });
    }
}
