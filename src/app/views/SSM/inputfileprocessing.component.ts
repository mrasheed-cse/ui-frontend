import {  NgModule,
  Component,
  Pipe,
  OnInit,
  ViewChild} from '@angular/core';
  import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {Observable} from 'rxJS/Observable';
import {catchError,} from 'rxJs/operators';
import {_throw} from 'rxjs/observable/throw';
import { AppGlobals } from './../../app.global';
import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser';
import { AgGridAngular } from 'ag-grid-angular';
import{SSMService } from './SSM.service';
@Component({
    selector: 'app-searchPO',
    templateUrl: './inputfileprocessing.component.html',
      styleUrls: ['./search_po.component.scss'],
      providers: [AppGlobals,LoginService,SSMService],
})
export class InputFileProcessing implements OnInit {
	 private rowData: any[];
  private offset: number;
  private rawDataFromBackend : any[];
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
 			todayDate: Date;
			routerUrlAndParams: string;
  			isDataFound: boolean ;
  			isDataFoundOther: boolean = true;
			PoNumber: string;
			InputFile:FormGroup;
	constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private ssmService: SSMService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
      this.isDataFound = false;
    }
    else {
      this.router.navigate(['pages/login']);
    }

   
    this.rowData = [];    

		
    }
	
	  
search(){
	this.isDataFound = true;
	// window.location.reload()
	console.log("Po"+this.PoNumber)
	this.ssmService.getPoInformation(this.PoNumber).subscribe(
		 data => {
			 this.rawDataFromBackend = data;
          if(data !=null){         
	console.log("DATA= ",data)   
           this.isDataFound = true;
          this.rawDataFromBackend=data;
          if(this.PoNumber==this.rawDataFromBackend['id']){
           var objToInsert = {};
                  objToInsert['id'] = this.rawDataFromBackend['id'];
                  objToInsert['availableQuantity'] = this.rawDataFromBackend['availableQuantity'];
                  objToInsert['supplier'] = this.rawDataFromBackend['supplier'];
                  objToInsert['poExpireDate'] = this.rawDataFromBackend['poExpireDate'];
                  this.rowData.push(objToInsert);
	       
          }
          else{
					 this.isDataFound = false;
					
			}
          }
          else{
            this.isDataFound = false;
            //this.isLoading = false;
          }
        },
      err => console.error(err),
      this.isDataFound = false
     	);
}

onSubmit(){};
	
	ngOnInit() { 
   
    }
}