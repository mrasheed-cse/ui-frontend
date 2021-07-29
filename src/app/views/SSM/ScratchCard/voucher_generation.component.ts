import {  NgModule,
  Component,
  Pipe,
  OnInit,
  ViewChild} from '@angular/core';
  import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import {Observable} from 'rxJS/Observable';
import {catchError,} from 'rxJs/operators';
import {_throw} from 'rxjs/observable/throw';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import { AgGridAngular } from 'ag-grid-angular';
import{SSMService } from '../SSM.service';
@Component({
    selector: 'app-searchPO',
    templateUrl: './voucher_generation.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,SSMService],
})
export class VoucherGeneration implements OnInit {
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
 			todayDate: Date;
			routerUrlAndParams: string;
  			isDataFound: boolean ;
  			isDataFoundOther: boolean ;
			
	constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private ssmService: SSMService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
      this.isDataFound = false;
      this.isDataFoundOther=false;
    }
    else {
      this.router.navigate(['pages/login']);
    }
    }
    
    ngOnInit() { 
   
    }
    
    
    }