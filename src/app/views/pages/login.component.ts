import { Component } from '@angular/core';
import { LoginService } from './LoginService';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  templateUrl: 'login.component.html',
  providers: [LoginService]
})

export class LoginComponent {

  constructor(private loginService: LoginService) { 
	this.loginService.LogOut();
  }

  //private username;
  //private password;
  
  username : string ;
  password : string ;
  
  isValidUser : boolean = true;
   
  
  
  ValidateUser(){
	  //isValidUser : this.loginService.ValidateUser(this.username, this.password)
	  console.log(this.username);
	  console.log(this.password);
	  
	this.isValidUser = this.loginService.ValidateUser(this.username, this.password);
	console.log(this.isValidUser);
  }
  
}
