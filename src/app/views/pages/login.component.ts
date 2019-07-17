import { Component } from '@angular/core';
import { LoginService } from './LoginService';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoggedInUser } from './loggedInUser';
import { Observable } from 'rxjs/Observable';
import { AppGlobals } from './../../app.global';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';


@Component({
  templateUrl: 'login.component.html',
  providers: [AppGlobals,LoginService],
})

export class LoginComponent {

  currentLoggedInUser: LoggedInUser;
  isValidUser : boolean = true;
  public isLoading:boolean = false;

  constructor(private loginService: LoginService, private router: Router, private _global: AppGlobals) { 
  this.loginService.LogOut();
  
  this.currentLoggedInUser = {
    userName: "",
    groupName: "",
    groupID: 0,
    userID: ""
  };
  }
  username : string ;
  password : string ;
  
  ValidateUser(){
    this.isLoading = true;
    this.loginService.ValidateUser(this.username, this.password).subscribe(
    res => {
      if (res != null && res) {
        this.isValidUser = true;
        
      
        this.currentLoggedInUser = {
          userID: this.username,
          userName: res.usersName,
          groupName: res.usersGroupName,
          groupID: res.usersGroupId
        };
        localStorage.setItem('currentLoggedInUser', JSON.stringify(this.currentLoggedInUser));
      
        this.isLoading = false;
        this.router.navigateByUrl('/nsa')
      }
    },
    err => {
      this.isValidUser = false;
      this.isLoading = false;
      this.router.navigateByUrl('/pages/login');    
    }

    );

    //let res : any;
    //res = this._global.dataTempForLogin;

    //this.isValidUser = true;
            
    /*this.currentLoggedInUser = {
        userID: this.username,
        userName: res.usersName,
        groupName: res.usersGroupName,
        groupID: res.usersGroupId
    };
    localStorage.setItem('currentLoggedInUser', JSON.stringify(this.currentLoggedInUser));
      
    this.isLoading = false;
    this.router.navigateByUrl('/nsa')*/
  } //end of function validateuser()
  
}
