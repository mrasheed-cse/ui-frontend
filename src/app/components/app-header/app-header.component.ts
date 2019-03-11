import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../views/pages/LoginService';
import { LoggedInUser } from '../../views/pages/loggedInUser'; 

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  providers: [LoginService]
})
export class AppHeaderComponent { 
	
	currentLoggedInUser: LoggedInUser;
	userName: string;
	groupName: string;
	
	
	constructor(private loginService: LoginService, private router: Router) { 
	
	this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
	
	if (this.currentLoggedInUser) {
		this.userName = this.currentLoggedInUser.userName
		this.groupName = this.currentLoggedInUser.groupName
		//console.log('Current user: ' + this.userName);
		
	} 
	else {
	  //console.log('Current user not found');
	  this.router.navigate(['pages/login']);
	}
	
	}

logout(){
	this.loginService.LogOut();
	
}	

}
