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
  selector: 'app-de-provision-form',
  templateUrl: './de-provision-form.component.html',
  styles: [],
  providers: [DefinitionDataService,WorkflowsService,AppGlobals,LoginService,FileoperationService]
})
export class DeProvisionFormComponent implements OnInit {

WR_Name: string;
	serverUrl: string;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;	
	
	public dangerAlertShow:boolean = false;
	public dangerAlertMessage:string = "";
	public successAlertShow:boolean = false;
	public successAlertMessage:string = "";
	public infoAlertShow:boolean = false;
	public infoAlertMessage:string = "";
	
	myDeProvisionForm: FormGroup;
	batchID: FormControl;
	deProvisionFile: FormControl;
	cnpComment: FormControl;
	//simType: FormControl;

	public listSimType = [];
	
	selectedFile: File = null;
	fileName: string = "";
  
	formFieldData: string;

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
	
	//GetWR_Name
	this.definitionDataService.GetWR_Name(this._global.wrid_DeProvisioning).subscribe(
	data => {
			//console.log(data);				
			const dataStr = JSON.stringify(data);

			JSON.parse(dataStr, (key, value) => {
				if (typeof value === 'string') {
					this.WR_Name = value;
					return value;
				}
			}); 
			// console.log(this.WR_Name);
		},
		err => console.error(err),
		()=> console.log('done loading Work Request Name')
		);
	/*	
		//GetSimType
	this.definitionDataService.GetSimTypes().subscribe(
		data => { 
					//console.log(data);
					for (let index in data) {
						//console.log (data[index]);
						this.listSimType.push(
						{
							id:data[index].id,
							simTypeName: data[index].simTypeName
						}
						); 
					}		
				},
			err => console.error(err),
			() => console.log('done loading sim Type Name List')
			);
		*/
}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {	 
    
	this.batchID = new FormControl('');
	this.deProvisionFile = new FormControl('', Validators.required);
	this.cnpComment = new FormControl('');
	//this.simType = new  FormControl('');
  }

  createForm() {
    this.myDeProvisionForm = new FormGroup({			
		batchID: this.batchID,
		//simType: this.simType,
		deProvisionFile: this.deProvisionFile,
		cnpComment: this.cnpComment
    });
  }

  // FORM SUBMISSION
  onDeProvisionSubmit() {
	 
  if (this.myDeProvisionForm.valid) {
	
    console.log('Form Submitted!');
	 
  }
  this.formFieldData = this.workFlowsService.FormatWorkRequestNameForAPI(this.WR_Name);
  this.fileName = this.formFieldData;
  console.log(this.formFieldData);
  const fd = new FormData();
  fd.append('nsa-file',this.selectedFile,this.fileName+".csv");// File Name will be the WR_Name in server
  console.log(this.selectedFile.name);
  
  this.LogKeyValuePairs(this.myDeProvisionForm);
  console.log(this.formFieldData);
  
   var result = this.fileoperationService.uploadCSV(fd);
		console.log(result);
        result
		.subscribe(res => {
			console.log(res);
		});
	
  //{wr_id}/{userGroup_id}/{user_id}/[{workflowFieldsValueSeqWise}]
  
  this.workFlowsService.CreateNewWorkRequest(this._global.wrid_DeProvisioning, this.groupID,this.userName,this.formFieldData).subscribe(
      res  =>  {
		console.log('response is : '+res);
		
		if(res === true){
			this.successAlertShow = true;
			this.successAlertMessage = " has been created successfully.";
//			this.isLoading = false;
		}
      },
      err  =>  {		  
		  console.log("err.status : "+err.status);		  
		  this.dangerAlertShow = true;
		this.dangerAlertMessage = " could not be created.";
//		this.isLoading = false;
      }
	  
      );
	// console.log("this.isLoading "+this.isLoading); 
	
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
		
      //console.log("Key : "+key+" , Value : "+abstractControl.value);
	  
	  if (this.formFieldData){
		  if (key == 'deProvisionFile'){
			  this.formFieldData=this.formFieldData+","+this._global.wrid_FileUploadPath+this.fileName+".csv";
		  }
		  else
			this.formFieldData=this.formFieldData+","+abstractControl.value;
	  }
		else {
			//this.mySeriesProvisionForm.get(key).setValue("TOTOTOTO");
			//console.log("Key : "+key+" , Value : "+abstractControl.value);
			this.formFieldData=abstractControl.value;
		}
		
    }
  });
}

onFileChange(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  

clearForm(event: any){
		//console.log(event);
		this.dangerAlertShow = false;
		this.successAlertShow = false;	
		this.myDeProvisionForm.reset();		
	}
 backButton(event: any){
		//console.log(event);
		this.router.navigateByUrl('/nsa/deprovision');	
	}
  
}