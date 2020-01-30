import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { LoggedInUser } from './loggedInUser'; //same folder
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import { LoggedInResponse } from './LogInResponse';


// import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class LoginService {
	serverUrl: string;
	currentLoggedInUser: LoggedInUser;
	loggedInResponse: LoggedInResponse ;
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
			groupID: 0
		};

		this.userStr = "";
	}

	ValidateUser(username: string, password: string) : any {
		var isValidGpUser;
		//var userNameFromEmail = null;
		//var indexOfAt = username.indexOf('@')
		/*if(indexOfAt!= -1){
			userNameFromEmail = username.substring(0,indexOfAt -1);
		}else{
			isValidGpUser = this.http.post(this.serverUrl + 'is-exist-in-ldap',{
			userId: username,
			password: password
		 });
		 return isValidGpUser;
		}*/
		
		return this.http.post<LoggedInResponse>(this.serverUrl + 'login', {
			userId: username,
			password: password
		});
	}

	ValidateDelegateUser(username: string, delegateusername: string, password: string) : any {
		var isValidGpUser;
		var userNameFromEmail = null;
		var indexOfAt = username.indexOf('@')
		/*if(indexOfAt!= -1){
			userNameFromEmail = username.substring(0,indexOfAt -1);
		}else{
			isValidGpUser = this.http.post(this.serverUrl + 'is-exist-in-ldap',{
			userId: username,
			password: password
		 });
		 return isValidGpUser;
		}*/
		console.log(" isValidGpUser: "+isValidGpUser," indexOfAt: "+indexOfAt," userNameFromEmail "+userNameFromEmail, );
		return this.http.post<LoggedInResponse>(this.serverUrl + 'loginAsDelegate', {
			userId: userNameFromEmail == null? username: userNameFromEmail,
			delegateUserId: delegateusername,
			password: password
		});
	}

	GetCurrentLoggedInUser() {
		this.userStr = localStorage.getItem('currentLoggedInUser');
		try {
			return JSON.parse(this.userStr);
		} catch (ex) {
			return null; // or do some other error handling
		}

	}


	LogOut() {

		localStorage.setItem('currentLoggedInUser', null);
		localStorage.removeItem('currentLoggedInUser');
		this.router.navigate(['pages/login']);
	}

	LoadMenu(usersGroupId: number): any {
		console.log("Fetching menu for userGroupID: "+usersGroupId+  " from the API : "+this.serverUrl + 'LoadFullMmenu' );
		return this.http.post(this.serverUrl + 'LoadFullMmenu',{
			userGroupID: usersGroupId
		});
	}


}