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
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser'; 


import { AppGlobals } from './../../app.global';

@Component({
  selector: 'app-apnform',
  templateUrl: './apnform.component.html',
  styles: [],
  providers: [DefinitionDataService,WorkflowsService,AppGlobals,LoginService]
})
export class ApnformComponent implements OnInit {
	WR_Name: string;
	serverUrl: string;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;	
	
	
	public dangerAlertShow:boolean = false;
	public dangerAlertMessage:string = "";
	public successAlertShow:boolean = false;
	public successAlertMessage:string = "";
	public isLoading:boolean = false;

	
	myApnCreationForm: FormGroup;
	apnName: FormControl;
	apnID: FormControl;	
	productType: FormControl;
	formFieldData: string;
	

  public listProductType = [];

  constructor(private router: Router,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private definitionDataService: DefinitionDataService, private workFlowsService: WorkflowsService) {
	  
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
	this.definitionDataService.GetWR_Name(this._global.wrid_ApnCreation).subscribe(
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

	
	//GetProductTypes
	this.definitionDataService.GetProductTypes().subscribe(
	data => { 
				this.listProductType = [];
				//console.log("this.listProductType "+this.listProductType.length);
				for (let index in data) {
				//console.log (data[index]);			
				this.listProductType.push(
					{
						id:data[index].id,
						productType_name: data[index].productTypeName
					}
					); 
				}		
		// return data;
			},
		err => console.error(err),
		() => console.log('done loading ProductTypes List')
    );
}

  ngOnInit() {
    this.createFormControls();
    this.createForm();	
  }

  createFormControls() {
   this.apnName = new FormControl('', [Validators.required]);
   this.apnID = new FormControl('', [Validators.required]);
	this.productType = new FormControl('', [Validators.required]);
  }

  createForm() {
    this.myApnCreationForm = new FormGroup({
		apnName: this.apnName,
		apnID: this.apnID,
		productType: this.productType
    });
  }
	topFunction() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}
		

  // FORM SUBMISSION
  onApnCreationSubmit() {
	 
  if (this.myApnCreationForm.valid) {
		this.topFunction();
	this.isLoading = true;
    console.log('Form Submitted!');
//    console.log(this.myApnCreationForm.value);

  this.formFieldData = this.workFlowsService.FormatWorkRequestNameForAPI(this.WR_Name);
  this.LogKeyValuePairs(this.myApnCreationForm);
  //console.log(this.formFieldData);
  //{wr_id}/{userGroup_id}/{user_id}/[{workflowFieldsValueSeqWise}]
  this.workFlowsService.CreateNewWorkRequest(this._global.wrid_ApnCreation, this.groupID,this.userName,this.formFieldData).subscribe(
      res  =>  {
				console.log('response is : '+res.message);
		
				if(res !== ""){	
			this.successAlertShow = true;
			this.successAlertMessage = " has been created successfully and forwarded to "+res.message+" .";
		}
      },
      err  =>  {		  
		  console.log("err.status : "+err.status);		  
		  this.dangerAlertShow = true;
		this.dangerAlertMessage = " .";		
      }
	  
			);
		}
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
		this.formFieldData=this.formFieldData+","+abstractControl.value;
	  }
		else {
			//this.myApnCreationForm.get(key).setValue("TOTOTOTO");
			//console.log("Key : "+key+" , Value : "+abstractControl.value);
			this.formFieldData=abstractControl.value;
		}
		
    }
  });
}

clearForm(event: any){
		//console.log(event);
		this.dangerAlertShow = false;
		this.successAlertShow = false;	
		this.myApnCreationForm.reset();		
	}
 backButton(event: any){
		//console.log(event);
		this.router.navigateByUrl('/nsa/apn');	
	}
	
  
}
