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
		this.groupName="";
		this.userName = this.currentLoggedInUser.userName
		for (var index in this.currentLoggedInUser.groupNames) {
			//console.log(this.currentLoggedInUser.groupNames[index]); 
			if(this.groupName.length>0)
				this.groupName =this.groupName +", "+ this.currentLoggedInUser.groupNames[index];
			else
				this.groupName =this.currentLoggedInUser.groupNames[index];	
		  }
		//this.groupName = this.currentLoggedInUser.groupName
		//console.log('Current user: ' + this.userName);
		
	} 
	else {
	  //console.log('Current user not found');
	  this.router.navigate(['pages/login']);
	}
	
	}

logout(){
	debugger;
		this.loginService.LogOut();
	
}	

}
