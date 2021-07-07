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
	
  @ViewChild('agGrid') agGrid: AgGridAngular;

  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private defaultColDef;
  private defaultColGroupDef;
  private columnTypes;
  private rowData: any[];
  private offset: number;
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
 			todayDate: Date;
			routerUrlAndParams: string;
  			isDataFound: boolean = true;
  			isDataFoundOther: boolean = true;
			PoNumber: string;
	constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private ssmService: SSMService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
    }
    else {
      this.router.navigate(['pages/login']);
    }

    this.columnDefs = _global.agGrid_defaultColDef;
    this.columnTypes = _global.agGrid_columnTypes;

    this.columnDefs = [
        {headerName: 'PO Date', field: 'date',  width: 130,type:  "nonEditableColumn" },
        {headerName: 'PO Number', field: 'poNo', width: 150, type: "nonEditableColumn" },
        {headerName: 'Item Number', field: 'itemNo', width: 150,type: "nonEditableColumn" },
        {headerName: 'Item Description', field: 'itemDescription', width: 200,type: "nonEditableColumn" },
        {headerName: 'PO Expire Date', field: 'expireDateAsString', width: 130, type:  "nonEditableColumn" },
        {headerName: 'Total Quantity', field: 'quantity', width: 130,type: "nonEditableColumn" },
        {headerName: 'Vendor Name', field: 'vendorName',width: 200,type: "nonEditableColumn" },
        {headerName: 'Unit Price', field: 'unitPrice', width: 100, type: "nonEditableColumn" }, 
        {headerName: 'Amount(BDT)', field: 'amount', width: 100, type: "nonEditableColumn" },
    ];

    this.rowData = [];    

		
    }//Cons End
    
    onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    
  }
  
search(){
	console.log("Po"+this.PoNumber)
	this.ssmService.getPoInformation(this.PoNumber).subscribe(
		 data => {
          if(data !=null){            
            console.log(data);
            this.rowData = data;
            //this.isLoading = false;
          }
          else{
            this.isDataFound = false;
            //this.isLoading = false;
          }
        },
      err => console.error(err),
      () =>{
	alert("No data Found");
         console.log('Done loading PendingTask List');
      }
	);
}

 

    ngOnInit() {
    this.offset = 0; 
   
    }

}
