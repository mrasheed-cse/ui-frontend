import { Component } from '@angular/core';
import { LoginService } from './LoginService';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoggedInUser } from './loggedInUser';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';


@Component({
  templateUrl: 'login.component.html',
  providers: [LoginService]
})

export class LoginComponent {

  currentLoggedInUser: LoggedInUser;
  isValidUser : boolean = true;
  public isLoading:boolean = false;

  constructor(private loginService: LoginService, private router: Router) { 
  this.loginService.LogOut();
  
  this.currentLoggedInUser = {
    userName: "",
    groupName: "",
    groupID: 0
  };
  }

  //private username;
  //private password;
  
  username : string ;
  password : string ;
  
  
  
  
  
  ValidateUser(){
	  //isValidUser : this.loginService.ValidateUser(this.username, this.password)
	  //console.log(this.username);
    //console.log(this.password);
    //console.log("1. isLoading "+this.isLoading);
  this.isLoading = true;
  //console.log("2. isLoading "+this.isLoading);
  //this.isValidUser = 
  this.loginService.ValidateUser(this.username, this.password).subscribe(
  res => {
    //this.errorMsg = '';
    //console.log('response is : ' + res);
    if (res !== null) {
      this.isValidUser = true;
      
     
      this.currentLoggedInUser = {
        userName: res.usersName,
        groupName: res.usersGroupName,
        groupID: res.usersGroupId
      };

      //console.log(this.currentLoggedInUser);
      localStorage.setItem('currentLoggedInUser', JSON.stringify(this.currentLoggedInUser));
      //console.log("2.1 isLoading "+this.isLoading);
      //console.log("3. isLoading "+this.isLoading);
     
      this.isLoading = false;
  //console.log("4. isLoading "+this.isLoading);
      this.router.navigateByUrl('/nsa')
    }
  },
  err => {
    this.isValidUser = false;
    this.isLoading = false;
    //console.log("4. isLoading "+this.isLoading);
    //console.log("err.status : " + err.status);
    //console.log("Returning " + this.isValidUser);
    this.router.navigateByUrl('/pages/login');    
  }
);
	
  }
  
}
