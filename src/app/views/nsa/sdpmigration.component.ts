import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { DefinitionDataService } from './services/definitiondata.service';
import { WorkflowsService } from './services/workflows.service';
import { FileoperationService } from './services/fileoperation.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser'; 


import { AppGlobals } from './../../app.global';

@Component({
  selector: 'app-sdpmigration',
  templateUrl: './sdpmigration.component.html',
  styles: [],
  providers: [DefinitionDataService,WorkflowsService,AppGlobals,LoginService,FileoperationService]
})
export class SdpmigrationComponent implements OnInit {
	
	serverUrl: string;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;	
	
	
	public dangerAlertShow:boolean = false;
	public dangerAlertMessage:string = "";
	public successAlertShow:boolean = false;
	public successAlertMessage:string = "";

	mySdpMigrationForm: FormGroup;
	sdpMigrationFile: FormControl;
	serviceClassName: FormControl;
	formFieldData: string;
	
	selectedFile: File = null;
	fileName: string = "";
	
  public listServiceClass = [];
  
constructor(private router: Router,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private definitionDataService: DefinitionDataService, private workFlowsService: WorkflowsService, private fileoperationService: FileoperationService) {
	  
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
}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.sdpMigrationFile = new FormControl('', Validators.required);
	this.serviceClassName=	new FormControl({value: '', disabled: true}, Validators.required);
  }

  createForm() {
    this.mySdpMigrationForm = new FormGroup({
		reProvisionFile: this.sdpMigrationFile,		
    });
  }
  
  // FORM SUBMISSION
  onSdpMigrationSubmit() {
	 
  if (this.mySdpMigrationForm.valid) {
    console.log('Form Submitted!');
    console.log(this.mySdpMigrationForm.value);

  }
  this.fileName = this.formFieldData;
  console.log(this.formFieldData);
  const fd = new FormData();
  fd.append('nsa-file',this.selectedFile,this.fileName+".csv");// File Name will be the WR_Name in server
  console.log(this.selectedFile.name);
  
  this.LogKeyValuePairs(this.mySdpMigrationForm);
  console.log(this.formFieldData);
  
  var result = this.fileoperationService.uploadCSV(fd);
		console.log(result);
        result
		.subscribe(res => {
			console.log(res);
		});
}

LogKeyValuePairs(group: FormGroup): void {
	
  // Loop through each control key in the FormGroup
  Object.keys(group.controls).forEach((key: string) => {
    // Get the control. The control can be a nested form group
    const abstractControl = group.get(key);
    // If the control is nested form group, recursively call
    // this same method (logKeyValuePairs) passing it
    // the FormGroup so we can get to the form controls in it
    if (abstractControl instanceof FormGroup) {
      this.LogKeyValuePairs(abstractControl);
      // If the control is a FormControl
    } else {
		
      console.log("Key : "+key+" , Value : "+abstractControl.value);
	  
	  if (this.formFieldData){
		  if (key == 'needByDate'){
			  this.formFieldData=this.formFieldData+","+this.FormatTheDate(abstractControl.value);
		  }
		  else if (key == 'reProvisionFile'){
			  this.formFieldData=this.formFieldData+","+this._global.wrid_FileUploadPath+this.fileName+".csv";
		  }
		  else
			this.formFieldData=this.formFieldData+","+abstractControl.value;
	  }
		else {
			//this.myReProvisionForm.get(key).setValue("TOTOTOTO");
			//console.log("Key : "+key+" , Value : "+abstractControl.value);
			this.formFieldData=abstractControl.value;
		}
		
    }
  });
}

FormatTheDate(selectedNeedByDate:any):string {
	
	console.log("selectedNeedByDate : "+selectedNeedByDate);	
		var date = new Date(selectedNeedByDate);
    var month = ("0" + (date.getMonth()+1)).slice(-2);
    var day  = ("0" + date.getDate()).slice(-2);
    var formattedDate=[day,month,date.getFullYear()].join("/");
	console.log("formattedDate : "+formattedDate);
	return formattedDate;
	
}
onFileChange(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  
clearForm(event: any){
		//console.log(event);
		this.dangerAlertShow = false;
		this.successAlertShow = false;	
		this.mySdpMigrationForm.reset();		
	}
}
