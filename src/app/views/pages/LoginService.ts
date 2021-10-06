import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoggedInUser} from './loggedInUser'; //same folder
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import {LoggedInResponse} from './LogInResponse';


// import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class LoginService {
    serverUrl: string;
    currentLoggedInUser: LoggedInUser;
    loggedInResponse: LoggedInResponse;
    theUser: Observable<LoggedInUser>;
    loginId: string;
    loginPassword: string;
    isValid: boolean;
    userStr: string;

    constructor(private router: Router, private http: HttpClient) {
        this.serverUrl = environment.apiUrl;
        //console.log("serverUrl "+ this.serverUrl);
        this.isValid = false;


        this.currentLoggedInUser = {
            userID: "",
            userName: "",
            groupName: "",
            groupID: 0,
            groupNames: null,
            groupIDs: null
        };

        this.userStr = "";
    }

    ValidateUser(username: string, password: string): any {
        return this.http.post<LoggedInResponse>(this.serverUrl + 'login', {
            userId: username,
            password: password
        });
    }

    ValidateDelegateUser(username: string, delegateusername: string, password: string): any {
        var userNameFromEmail = null;
        var indexOfAt = username.indexOf('@')
        console.log("indexOfAt: " + indexOfAt, " userNameFromEmail " + userNameFromEmail,);
        console.log(this.serverUrl + 'loginAsDelegate');
        return this.http.post<LoggedInResponse>(this.serverUrl + 'loginAsDelegate', {
            userId: userNameFromEmail == null ? username : userNameFromEmail,
            delegateUserId: delegateusername,
            password: password
        });
    }

    GetCurrentLoggedInUser() {
        this.userStr = localStorage.getItem('currentLoggedInUser');
        try {
            console.log(JSON.parse(this.userStr));
            return JSON.parse(this.userStr);
        } catch (ex) {
            return null; // or do some other error handling
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

        localStorage.setItem('currentLoggedInUser', null);
        localStorage.removeItem('currentLoggedInUser');
        this.router.navigate(['pages/login']);
    }

    LoadMenu(usersGroupIds: any): any {
        console.log("Fetching menu for userGroupIDs: " + JSON.stringify(usersGroupIds) + "  from the API : " + this.serverUrl + 'LoadFullMmenu');
        return this.http.post(this.serverUrl + 'LoadFullMmenu', {
            //userGroupIDs:JSON.stringify(usersGroupIds),
            usersGroupIds: usersGroupIds
        });
    }


    AuthenticatePageAccess(link: string, usersGroupIds: any): any {
        console.log("Authentication current user for link: " + link + "  from the API : " + this.serverUrl + 'AuthenticatePageAccess');
        return this.http.post(this.serverUrl + 'AuthenticatePageAccess', {
            link: link,
            usersGroupIds: usersGroupIds
        });
    }


}