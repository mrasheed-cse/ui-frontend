import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { DataTableResource } from 'angular4-smart-table';
import PendingTasks from './models/PendingTasks';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { WorkflowsService } from './services/workflows.service';
import { AppGlobals } from './../../app.global';
import { Router } from '@angular/router';

import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser'; 

@Component({
  selector: 'app-apn',
  templateUrl: './apn.component.html',
  styles: [],
  providers: [WorkflowsService,AppGlobals,LoginService]
})
export class ApnComponent implements OnInit {
	pendingTasksList: PendingTasks;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;
	
	public dangerAlertShow:boolean = false;
	public dangerAlertMessage:string = "";
	public successSearchShow:boolean = false;
	public successAlertMessage:string = "";
	

	
	isDataFound: boolean = false;
	isCollapsed: boolean = true;
	
	
	mySearchForm: FormGroup;  
   apnName: FormControl;
   searchWrID: string;
   searchWrName: string;
   searchApnName: string;
   searchApnID: string;
   searchProductType: string;
   searchIsDoneByVDSO: string;

	
	constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService) {	

	// Get Current User Profile
	
	this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
	
	if (this.currentLoggedInUser) {
		this.userName = this.currentLoggedInUser.userName
		this.groupID = this.currentLoggedInUser.groupID
		//console.log('Current user: ' + this.userName);
		
	} 
	else {
	  //console.log('Current user not found');
	  this.router.navigate(['pages/login']);
	}
	//GetPendingTaskList
	this.workFlowsService.LoadPendingTask(this._global.wrid_ApnCreation,this.groupID).subscribe(
      data => { 				
				if(data !=null){
					console.log(data);
					this.isDataFound = true;
					this.pendingTasksList = data;
						
					for (let index in data) {
						//console.log (data[index]);
						
						console.log('pendingAt is : '+index +' ' +this.pendingTasksList[index].pendingAt);
						console.log('nextAction is : '+index +' ' +this.pendingTasksList[index].nextAction);
						console.log('lastActionBy is : '+index +' ' +this.pendingTasksList[index].lastActionBy);
						console.log('lastActionDate is : '+index +' ' +this.pendingTasksList[index].lastActionDate);
						console.log('wr_BriefID is : '+index +' ' +this.pendingTasksList[index].wr_BriefId);
						console.log('wr_BriefName is : '+index +' ' +this.pendingTasksList[index].wr_BriefName);
						console.log('hopSequence is : '+index +' ' +this.pendingTasksList[index].hopSequence);
						console.log('index is : '+index);
					}		
				}
				else{
					this.isDataFound = false;
				}
			},
		err => console.error(err),
		() => console.log('Done loading PendingTask List')
		);
    }



  ngOnInit () {

	this.createFormControls();
    this.createForm();
  
  }

  
	
datepickerConfig: Partial<BsDatepickerConfig>;
	

   
	

  onSearchSubmit() {
	  
  if (this.apnName.value) {
    console.log('Form Submitted!');
    console.log(this.mySearchForm.value);
	this.successSearchShow = false;
	this.dangerAlertShow = false;
	
	this.workFlowsService.APNSearchWorkRequest(this._global.wrid_ApnCreation,this.apnName.value).subscribe(
      res  =>  {
				console.log('response is : '+res.message);
		

				if(res !== ""){	
		this.successSearchShow = true;	
		
		this.searchWrID=res["wrID"];
		this.searchWrName=res["wrName"];
		this.searchApnName=res["apnName"];
		this.searchApnID=res["apnID"];
		this.searchProductType=res["productType"];
		this.searchIsDoneByVDSO=res["isVDSODone"];
		console.log(this.searchWrID);
		console.log(this.searchWrName);
				}
      },
      err  =>  {		  
		  console.log("err.status : "+err.status);		  
		  this.dangerAlertShow = true;
		  if(err.status==404)
				this.dangerAlertMessage = "No data found for this search.";
			else
				this.dangerAlertMessage = "An error occured while showing the search result.";
		
      }
	  
		);	  
  }
  else{
	  this.dangerAlertShow = true;
	  this.dangerAlertMessage = "Please select any input to search.";
  }
}

  createFormControls() {
    
    this.apnName = new FormControl('');
  }

  createForm() {
    this.mySearchForm = new FormGroup({
      apnName: this.apnName
    });
  }
  
   onTaskSelect(aTask) {
        //this.selectedContactId = aTask.wr_ID;
		//this.router.navigateByUrl('/nsa/seriesprovisiondetail');
    }
	
}
