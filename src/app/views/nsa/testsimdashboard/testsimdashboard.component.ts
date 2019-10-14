import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkflowsService } from './../services/workflows.service';
import { AppGlobals } from './../../../app.global';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';

@Component({
  selector: 'app-testsimdashboard',
  templateUrl: './testsimdashboard.component.html',
  styleUrls: ['./testsimdashboard.component.scss'],
  providers: [WorkflowsService,AppGlobals,LoginService],
})
export class TestsimdashboardComponent implements OnInit {

  currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;
  userID: string;
  todayDate: Date;
	routerUrlAndParams: string;
  public isLoading:boolean = false;
  isDataFound: boolean = true;

  numberOfTestSims : number;
  numberOfTestSims1 : number;  
  numberOfTestSims2 : number;
  numberOfTestSims3 : number;
  numberOfTestSims4 : number;
  numberOfTestSims5 : number;
  numberOfTestSims6 : number;
  numberOfTestSims7 : number;
  numberOfTestSims8 : number;
  numberOfTestSims9 : number;

  constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService) { 


  }

  ngOnInit() {

    this.numberOfTestSims = 0;
    this.numberOfTestSims1 = 0;    
    this.numberOfTestSims2 = 0;
    this.numberOfTestSims3 = 0;
    this.numberOfTestSims4 = 0;
    this.numberOfTestSims5 = 0;
    this.numberOfTestSims6 = 0;
    this.numberOfTestSims7 = 0;
    this.numberOfTestSims8 = 0;                            
    this.numberOfTestSims9 = 0;

    this.isLoading = false;
    let isValid = true;
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID

      

    }
    else {
      this.router.navigate(['pages/login']);
    }




  }

}
