import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {ReactiveFormsModule, FormsModule, UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
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
  selector: 'app-discreteprovision',
  templateUrl: './discreteprovision.component.html',
   styleUrls: ['./demo.component.css'],
  providers: [WorkflowsService,AppGlobals,LoginService]
})
export class DiscreteprovisionComponent implements OnInit {
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
	
	
	mySearchForm: UntypedFormGroup;  
   wrname: UntypedFormControl;
   wrstatus: UntypedFormControl;
   startDate: UntypedFormControl;
   endDate: UntypedFormControl;

  wrstatuses: string[] = [
    'In Progress',
    'Completed'
  ];

	wrNamePattern:string = "(DISC_PROV).\*";
	searchWR: string;
	searchWRNumber: string;
	searchWrCreatedBy: string;
	searchWrCreationDate: string;
	searchLastApprover: string;
	searchLextApprover: string;
	searchStatus: string;
	searchPendingGroupID: number;
	searchHopSequence: number;

	todayDate: Date;
	maxEndDate: Date;
	
	constructor(public router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService) {	

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
	this.workFlowsService.LoadPendingTask(this._global.wrid_DescProvisioning,this.groupID).subscribe(
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

		//Get Today Date
	this.todayDate = new Date();
  }



  ngOnInit () {
	this.createFormControls();
  this.createForm();
	this.maxEndDate = this.todayDate;
 }

  
	
datepickerConfig: Partial<BsDatepickerConfig>;
	

   
	

  onSearchSubmit() {
	  
  if (this.wrname.value || this.startDate.value || this.endDate.value || this.wrstatus.value) {
    console.log('Form Submitted!');
    console.log(this.mySearchForm.value);
	this.successSearchShow = false;
	this.dangerAlertShow = false;
	
	this.workFlowsService.SearchWorkRequest(this.wrname.value, this.startDate.value,this.endDate.value,this.wrstatus.value).subscribe(
      res  =>  {
		console.log('response is : '+res);
		this.successSearchShow = true;
		/*
		{"wrNumber":"DEF/001/04/2019","createdBy":"nsa_src","wrCreateDate":"2019-04-02 16:24:36.979","lastApprover":"VDSO","currentApprover":"CNP","status":"Completed"}
		*/
		this.searchWR=this.wrname.value;
		this.searchWRNumber=res["wrNumber"];
		this.searchWrCreatedBy=res["createdBy"];
		this.searchWrCreationDate=res["wrCreateDate"];
		this.searchLastApprover=res["lastApprover"];
		this.searchLextApprover=res["currentApprover"];
		this.searchStatus=res["status"];
		this.searchPendingGroupID = res["currentApproverGroup"];
		this.searchHopSequence = res["currentHopSeq"];
		
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
    
    this.wrname = new UntypedFormControl('',Validators.pattern(this.wrNamePattern));
    this.wrstatus = new UntypedFormControl('');
	this.startDate = new UntypedFormControl('');
	this.endDate = new UntypedFormControl('');
  }

  createForm() {
    this.mySearchForm = new UntypedFormGroup({
      wrname: this.wrname,
      wrstatus: this.wrstatus,
      startDate: this.startDate,
	  endDate: this.endDate
    });
  }
  
   onTaskSelect(aTask) {
        //this.selectedContactId = aTask.wr_ID;
		//this.router.navigateByUrl('/nsa/seriesprovisiondetail');
		}
		
		onStartDateSelect () {
			this.endDate = null;
			this.maxEndDate = this.startDate.value;
			console.log("Start Date Event");
		}
}
