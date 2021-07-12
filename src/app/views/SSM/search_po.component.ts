import {  NgModule,
  Component,
  Pipe,
  OnInit,
  ViewChild} from '@angular/core';
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
    templateUrl: './search_po.component.html',
    styleUrls: ['./search_po.component.scss'],
    providers: [AppGlobals,LoginService,SSMService],
})
export class SearchPO implements OnInit {
	
 
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
	constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private ssmService: SSMService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
      this.isDataFound = true;
    }
    else {
      this.router.navigate(['pages/login']);
    }

   
    this.rowData = [];    

		
    }//Cons End
    
   
  
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
                  objToInsert['poDate'] = this.rawDataFromBackend['poDate'];
                  objToInsert['id'] = this.rawDataFromBackend['id'];
                  objToInsert['itemNumber'] = this.rawDataFromBackend['itemNumber'];
                  objToInsert['itemDescription'] = this.rawDataFromBackend['itemDescription'];
                  objToInsert['poExpireDate'] = this.rawDataFromBackend['poExpireDate'];
                  objToInsert['totalQuantity'] = this.rawDataFromBackend['totalQuantity'];
                   objToInsert['supplier'] = this.rawDataFromBackend['supplier'];
                  objToInsert['price'] = this.rawDataFromBackend['price'];
                  objToInsert['amount'] = this.rawDataFromBackend['amount'];
          
          
	       this.rowData.push(objToInsert);
	       
          }
          else{
					 this.isDataFound = false; this.isDataFound = false;
					
			}
          }
          else{
            this.isDataFound = false;
            //this.isLoading = false;
          }
        },
      err => console.error(err),
     	);
}
download(){}

 

    ngOnInit() {
    this.offset = 0; 
   
    }

}
