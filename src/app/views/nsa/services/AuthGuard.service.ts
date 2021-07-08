import { Injectable } from '@angular/core';
import { LoginService } from '../../pages/LoginService';

import { LoggedInUser } from '../../pages/loggedInUser';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

import { isNumeric } from 'rxjs/util/isNumeric';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthGuard implements CanActivate {

	currentLoggedInUser: LoggedInUser;
	userName: string;
	userID: string;
	groupIDs: Array<number>;
	groupNames: Array<string>;
	groupID: number;
	groupName: string;


	constructor(
		public loginService: LoginService,
		private router: Router
	) { }


  
	//canActivate(): boolean {
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean|Observable<boolean>| Promise<boolean> {

		this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
		if (this.currentLoggedInUser) {
			this.userName = this.currentLoggedInUser.userName
			this.userID = this.currentLoggedInUser.userID;
			//this.groupID = this.currentLoggedInUser.groupID;
			this.groupIDs = this.currentLoggedInUser.groupIDs;

			//console.log(route.url[0].path);
			//this.router.navigate([route.url[0].path]);
			//return true;

			return new Promise((resolve, reject) => {
				this.loginService.AuthenticatePageAccess('/nsa/'+route.url[0].path, this.groupIDs).subscribe(
				data => {
						console.log('got data');
						if (data != null) {
							console.log(data);
							this.groupIDs = data['authenticUserGroups'];
							this.groupNames = data['authenticUserGroupNames'];
	
							//this.groupID = data;
	
							if (this.groupIDs.length == 1) {
								this.groupID = this.groupIDs[0];
								console.log('Current page usergroup: ' + this.groupID);
								if (this.groupID == 0) {
									//console.log('Current user not found');
									this.router.navigate(['pages/404']);
									resolve(false);
								}
								else
									resolve(true);
							}
							else {
								var optStr = "";
	
								for (let index in this.groupNames) {
	
									optStr = optStr + (Number(index) + 1) + ". " + this.groupNames[index] + "\n";
								}
								while (true) {
									var optGrp = prompt("Write the NUMBER of the group you want to work here.\n" + optStr, "");
									if (isNumeric(optGrp)) {
										//alert(optGrp);
										this.groupID = this.groupIDs[Number(optGrp) - 1];
										this.groupName = this.groupNames[Number(optGrp) - 1];
										break;
									}
	
								}
								alert("You are working here as " + this.groupName);
								console.log('/nsa/'+route.url[0].path);
								console.log('Current page usergroup: ' + this.groupID);
								//this.router.navigate(['/nsa/'+route.url[0].path]);
								this.loginService.UpdateCurrentLoggedInUserUserGroup(this.groupID, this.groupName);
								this.loginService.GetCurrentLoggedInUser();
								var time = new Date();
								console.log( time.getTime())
								resolve(true);
								
							}
						}
						else {
							 alert('Sorry! You are not allowed to view this page');
	                        this.loginService.LogOut();
	                            resolve(false);
							
						}
					},
					err => console.error(err),
					() => console.log('Authorization done')
				);
	
	      //return true;
	    })
  }}} 		
	 