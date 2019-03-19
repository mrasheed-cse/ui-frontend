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
			userName: "",
			groupName: "",
			groupID: 0
		};

		this.userStr = "";
	}

	ValidateUser(username: string, password: string) : boolean {
		// start
		this.http.post<LoggedInResponse	>(this.serverUrl + 'login', {
			userId: username,
			password: password
		}
		).subscribe(
			res => {
				//this.errorMsg = '';
				console.log('response is : ' + res);
				if (res !== null) {
					this.isValid = true;
					
					// this.currentLoggedInUser = {
					// 	userName: res.usersName,
					// 	groupName: res.usersGroupName,
					// 	groupID: res.usersGroupId
					// };

					this.loggedInResponse = res;
					
					this.currentLoggedInUser = {
						userName: this.loggedInResponse.usersName,
						groupName: this.loggedInResponse.usersGroupName,
						groupID: this.loggedInResponse.usersGroupId
					};

					
					//this.currentLoggedInUser = res;
					console.log(this.currentLoggedInUser);
					localStorage.setItem('currentLoggedInUser', JSON.stringify(this.currentLoggedInUser));
					this.router.navigateByUrl('/nsa')
					// this.router.navigateByUrl('/pages/login');
					return this.isValid;
				}
			},
			err => {
				this.isValid = false;
				console.log("err.status : " + err.status);
				console.log("Returning " + this.isValid);
				this.router.navigateByUrl('/pages/login');
				return this.isValid;
			}
		);
return true;
		// end
		// if (username == 'nsa_admin' && password == 'admin@123') {

		// 	this.currentLoggedInUser = {
		// 		userName: 'nsa_admin',
		// 		groupName: 'admin',
		// 		groupID: 0
		// 	};
		// 	console.log(this.currentLoggedInUser);
		// 	localStorage.setItem('currentLoggedInUser', JSON.stringify(this.currentLoggedInUser));
		// 	this.router.navigateByUrl('/dashboard');
		// 	return true;
		// }
		// else if (username == 'nsa_cnp' && password == 'cnp@123') {
		// 	this.currentLoggedInUser = {
		// 		userName: 'nsa_cnp',
		// 		groupName: 'cnp',
		// 		groupID: 3
		// 	};
		// 	console.log(this.currentLoggedInUser);
		// 	localStorage.setItem('currentLoggedInUser', JSON.stringify(this.currentLoggedInUser));
		// 	this.router.navigateByUrl('/nsa');
		// 	return true;
		// }
		// else if (username == 'nsa_src' && password == 'src@123') {
		// 	this.currentLoggedInUser = {
		// 		userName: 'nsa_src',
		// 		groupName: 'sourcing',
		// 		groupID: 2
		// 	};
		// 	console.log(this.currentLoggedInUser);
		// 	localStorage.setItem('currentLoggedInUser', JSON.stringify(this.currentLoggedInUser));
		// 	this.router.navigateByUrl('/nsa');
		// 	return true;
		// }
		// else if (username == 'pd' && password == 'pd@123') {
		// 	this.currentLoggedInUser = {
		// 		userName: 'pd',
		// 		groupName: 'pd_grp',
		// 		groupID: 100
		// 	};
		// 	console.log(this.currentLoggedInUser);
		// 	console.log('toto');
		// 	localStorage.setItem('currentLoggedInUser', JSON.stringify(this.currentLoggedInUser));
		// 	this.router.navigateByUrl('/primedata');
		// 	return true;
		// }
		// else {
		// 	localStorage.removeItem('currentLoggedInUser');
		// 	this.router.navigateByUrl('/pages/login');
		// 	return false;
		// }

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


}