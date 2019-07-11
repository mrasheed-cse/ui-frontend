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
import { RequisitionList } from './models/RequisitionList';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { WorkflowsService } from './services/workflows.service';
import { AppGlobals } from './../../app.global';
import { Router } from '@angular/router';

import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser'; 


@Component({
  selector: 'app-newrequisition',
  templateUrl: './newrequisition.component.html',
  styleUrls: ['./demo.component.css'],
	providers: [WorkflowsService,AppGlobals,LoginService],
})
export class NewrequisitionComponent implements OnInit {

  requisitionList: Array<Object>;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;
	
	public dangerAlertShow:boolean = false;
	public dangerAlertMessage:string = "";
	public successSearchShow:boolean = false;
	public successAlertMessage:string = "";

	isDataFound: boolean = true;
	isCollapsed: boolean = true;
	
	mySearchForm: FormGroup;  
   wrname: FormControl;
   wrstatus: FormControl;
   startDate: FormControl;
   endDate: FormControl;

	wrNamePattern:string = "(RQN).\*";
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
	
	constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService) {	
	this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
	
	if (this.currentLoggedInUser) {
		this.userName = this.currentLoggedInUser.userName
		this.groupID = this.currentLoggedInUser.groupID
	} 
	else {
	  this.router.navigate(['pages/login']);
	}
		this.requisitionList = _global.dataTemp;
	

	//GetPendingTaskList
	/*this.workFlowsService.LoadRequisitionList(0,this.groupID,this.userName).subscribe(
      data => { 				
				if(data !=null){
					console.log(data);
					this.isDataFound = true;
					this.requisitionList = data;					
				}
				else{
					this.isDataFound = false;
				}
			},
		err => console.error(err),
		() => console.log('Done loading PendingTask List')
		);
	//Get Today Date
	this.todayDate = new Date();*/

  }



  ngOnInit () {

	this.createFormControls();
    this.createForm();
  
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
  this.wrname = new FormControl('',Validators.pattern(this.wrNamePattern));
  this.wrstatus = new FormControl('');
	this.startDate = new FormControl('');
	this.endDate = new FormControl('');
  }

  createForm() {
    this.mySearchForm = new FormGroup({
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
	
}
