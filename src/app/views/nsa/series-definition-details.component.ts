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
import {Router, ActivatedRoute} from '@angular/router';
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
import { AppGlobals } from './../../app.global';
import PreviousHopFieldNameValue from './models/PreviousHopFieldNameValue';
import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser'; 

@Component({
  selector: 'app-series-definition-details',
  templateUrl: './series-definition-details.component.html',
  styles: [],
  providers: [WorkflowsService,AppGlobals,LoginService]
})
export class SeriesDefinitionDetailsComponent implements OnInit {
	wr_BriefId : number;
	hop_sequence : number;
	wrBriefName : string;
	userGroup_id : number;
	
	
	
	fieldNameValueList: PreviousHopFieldNameValue;
	
	currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;
		
	
	mySeriesDefinitionForm: FormGroup;
	HLR: FormControl;
	SAPC: FormControl;	
	
	cnpComment: FormControl;	
	SDP: FormControl;
	CSP: FormControl;
	EOICK: FormControl;
	emaPort: FormControl;
	SK: FormControl;
	bssComment: FormControl;
	
	formFieldData: string;
	
	public listHLR = [];
	public listSAPC = [];
	public listSDP = [];  
	public listEmaPort = [];
	

	public dangerAlertShow:boolean = false;
	public dangerAlertMessage:string = "";
	public successAlertShow:boolean = false;
	public successAlertMessage:string = "";
	public isDone:boolean = false;
	public isDoneDisable:boolean = false;
	public isLoading:boolean = false;

	
	
  constructor(private loginService: LoginService,private activatedRoute: ActivatedRoute, private router:Router, private _global: AppGlobals, private workFlowsService: WorkflowsService) {
	  
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
	this.LoadQueryStringData();
	this.LoadPreviousHopsData();
	if(this.hop_sequence <=3){
	this.LoadDDLData();	
    this.createFormControls();
    this.createForm();
	}
  }
	
  

  LoadQueryStringData(){
	  // LOAD QUERY STRING DATA
		this.wr_BriefId = Number(this.activatedRoute.snapshot.paramMap.get('wr_BriefId'));
		console.log(this.wr_BriefId);
		
		this.hop_sequence = Number(this.activatedRoute.snapshot.paramMap.get('hopSequence'));		
		console.log(this.hop_sequence);
		
		this.wrBriefName = this.activatedRoute.snapshot.paramMap.get('wr_BriefName');
	
  }
  
LoadPreviousHopsData(){
			//LOAD PREVIOUS HOPS DATA
		//LoadPreviousHopsField(wrID: number,wrBriefId: number,groupID: number,current_hop_seq: number) : any {
		this.workFlowsService.LoadPreviousHopsField(this._global.wrid_NumberSeriesDefinition,this.wr_BriefId,this.groupID,this.hop_sequence).subscribe(
			data => { 
					//console.log(data);
					this.fieldNameValueList = data;
					const totalData = this.fieldNameValueList.length;
					console.log(totalData);
					if (totalData%2==1){   
						console.log("totalData is odd");
						
						this.fieldNameValueList.push({fieldName: " ", fieldValue: " "});

					}
					
				/*
				for (let index in data) {
					console.log (data[index]);					     
					console.log('fieldName is : '+index +' ' +this.fieldNameValueList[index].fieldName);
					console.log('fieldValue is : '+index +' ' +this.fieldNameValueList[index].fieldValue);
					console.log('index is : '+index);
				}
				*/				
			},
			err => console.error(err),
			() => console.log('Done loading LoadPreviousHopsField List')
			);  

}

	LoadDDLData(){
				// LOAD DROPDOWNS DATA
			
	if(this.hop_sequence == 2){
		this.listHLR = [{'id':1, 'name':'HLR1'}, {'id':2, 'name': 'HLR2'}, {'id':3, 'name': 'HLR3'}];
		this.listSAPC = [{'id':1, 'name':'SYUPCC01'}];
	}
	else if(this.hop_sequence == 3){
	this.listSDP = [{'id':1, 'name':'SDP1'}, {'id':2, 'name': 'SDP2'}, {'id':3, 'name': 'SDP3'}];
	this.listEmaPort = [{'id':1, 'name':'3001'}, {'id':2, 'name': '3002'}];
	}
		
	}
  
  
  createFormControls() {

	if(this.hop_sequence == 2){
		this.HLR = new FormControl('', [Validators.required]);	
		this.SAPC= new FormControl('', Validators.required);
		this.cnpComment= new FormControl('');		
	}

	else if(this.hop_sequence == 3){
		this.SDP= new FormControl('', Validators.required);
		this.CSP =	new FormControl({value: 0, disabled: true}, Validators.required);
		this.EOICK =	new FormControl({value: 0, disabled: true}, Validators.required);
		this.emaPort= new FormControl('', Validators.required);
		this.SK =	new FormControl({value: 0, disabled: true}, Validators.required);
		this.bssComment= new FormControl('');	
	}

  }

  createForm() {
	
	if(this.hop_sequence == 2){
		this.mySeriesDefinitionForm = new FormGroup({		
			HLR: this.HLR,
			SAPC: this.SAPC,
			cnpComment: this.cnpComment
		});
	}

	else if(this.hop_sequence == 3){
		this.mySeriesDefinitionForm = new FormGroup({
			SDP: this.SDP,
			CSP: this.CSP,
			EOICK: this.EOICK,
			emaPort: this.emaPort,
			SK: this.SK,
			bssComment: this.bssComment
		});
	}   
  }
  
   // event handler for the select element's change event
    onSDPSelect (event: any) {	  
	
    // update the ui
	const selectedSDPID = event.target.value;
	console.log(selectedSDPID);
	this.mySeriesDefinitionForm.get('CSP').setValue(selectedSDPID);
	this.mySeriesDefinitionForm.get('EOICK').setValue(selectedSDPID);
	this.mySeriesDefinitionForm.get('SK').setValue(selectedSDPID);
  }

  onSeriesProvisionSubmit() {
	 
   if (this.mySeriesDefinitionForm.valid) {
	   this.isLoading = true;
	
    //console.log('Form Submitted!');
    //console.log(this.mySeriesDefinitionForm.value);
  
  this.formFieldData = "";
  this.LogKeyValuePairs(this.mySeriesDefinitionForm);
  console.log(this.formFieldData);
  //{wr_id}/{userGroup_id}/{user_id}/[{workflowFieldsValueSeqWise}]
  this.workFlowsService.UpdateExistiongWorkRequest(this.workFlowsService.FormatWorkRequestNameForAPI(this.wrBriefName),this._global.wrid_NumberSeriesDefinition, this.groupID,this.userName,this.hop_sequence,this.formFieldData,this.isDone).subscribe(
      res  =>  {
		console.log('response is : '+res);
		
		if(res === true){
			this.successAlertShow = true;
			this.successAlertMessage = " has been saved successfully.";
			this.isDoneDisable = true;
			this.isLoading = false;
		}
      },
      err  =>  {		  
		  console.log("err.status : "+err.status);		  
		  this.dangerAlertShow = true;
		this.dangerAlertMessage = " could not be saved.";
		this.isLoading = false;
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
			//this.mySeriesDefinitionForm.get(key).setValue("TOTOTOTO");
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
		this.mySeriesDefinitionForm.reset();		
	}  
	backButton(event: any){
		//console.log(event);
		this.router.navigateByUrl('/nsa/seriesprovision');	
	}
onDoneClick(event: any){
		//console.log(event);
		this.isLoading = true;
		this.successAlertShow = false;
		this.dangerAlertShow = false;
		 this.formFieldData = "";
		 this.isDoneDisable = true;
		 if(this.hop_sequence==5) // LAST HOP IN SERIES PROVISION
			this.isDone = true;
		  this.workFlowsService.UpdateExistiongWorkRequest(this.workFlowsService.FormatWorkRequestNameForAPI(this.wrBriefName),this._global.wrid_NumberSeriesDefinition, this.groupID,this.userName,this.hop_sequence,this.formFieldData,this.isDone).subscribe(
      res  =>  {
		console.log('response is : '+res);
		
		if(res === true){
			this.isLoading = false;
			this.successAlertShow = true;
			if(this.hop_sequence==5)
				this.successAlertMessage = " has been completed successfully.";
			else
				this.successAlertMessage = " has been saved successfully.";
		}
      },
      err  =>  {		  
		  console.log("err.status : "+err.status);		  
		  this.dangerAlertShow = true;
		this.dangerAlertMessage = " could not be saved.";
		this.isLoading = false;
      }
	  
      );
	  
	  
		
	}  
	
  
}
