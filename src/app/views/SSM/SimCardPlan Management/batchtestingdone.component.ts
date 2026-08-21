import {  NgModule,
  Component,
  Pipe,
  OnInit,
  } from '@angular/core';
  import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import {throwError as _throw,  Observable } from 'rxjs';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import{PlanManagementService } from './plan_management.service';
import {DatePipe} from '@angular/common';





@Component({
    selector: 'app-voucherGen',
    templateUrl: './batchtestingdone.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,PlanManagementService,DatePipe],
})
export class BatchTestingDone implements OnInit {
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			isConfig:boolean=true;
  			listBatchTestDoneData=[];
  			listData=[];
  			ID:number;
  			isBatch:boolean
  			hop:number;
  			approvalType:any;
  			isProceed:boolean=false;
  			comments:string;
  			isLoading:boolean=false;
  			currenthop:number;
constructor(private datePipe: DatePipe,private router: Router,private loginService:
  			 LoginService,private http: HttpClient, private _global: AppGlobals, private planManagemetService: PlanManagementService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
    
      this.getData();
    }
    else {
      this.router.navigate(['pages/login']);
    }
   
    }
    
	

    
    ngOnInit(){
	
}

downloadCSVFiles(id:number) {
	var nameOfFileToDownload = 'BatchTest_PlanID_'+id+".csv";
	console.log("nameOfFileToDownload : "+nameOfFileToDownload);

	var result = this.planManagemetService.DownloadCSV(nameOfFileToDownload);
	result.subscribe(
		data => {
			//saveAs(data, nameOfFileToDownload);

			console.log("ToTOOO");
			//console.log(data);

			var blob = new Blob([data as any], { type: 'text/csv' });

			if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
	console.log("ggg");
				(window.navigator as any).msSaveOrOpenBlob(blob, nameOfFileToDownload);
			} else {
				var a = document.createElement('a');
				a.href = URL.createObjectURL(blob);
				a.download = nameOfFileToDownload;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			}
		},
		err => {console.error(err),
			alert("Server error while downloading file.");
		}
	);
}

    getData(){
	this.isConfig=true;
	this.listBatchTestDoneData=[];
	this.isProceed=false;
	this.planManagemetService.getAllBatchTestDone().subscribe(
		data=>{
			console.log(data);
			for (let index in data) {
				this.listBatchTestDoneData.push(
					
					{


						   testFor: data[index].testFor,
						   msisdnType: data[index].msisdnType,
						   testMSISDN:data[index].testMSISDN,
						   handsetUsed: data[index].handsetUsed,
						 id:data[index].id,
						 testedBy: data[index].testedBy,
						 testStatus: data[index].testStatus,
						 testDoneDate:  this.datePipe.transform(data[index].testDoneDate,"dd-MM-yyyy"),
						 planId:data[index].planId,
						 fileName:data[index].fileName
					}
				);
				
			}
			
			
			
			
		}
		
		
		
	)
	
	}
	
  			
  			}