import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { DefinitionDataService } from './services/definitiondata.service';
import { WorkflowsService } from './services/workflows.service';





import { AppGlobals } from './../../app.global';
import PreviousHopFieldNameValue from './models/PreviousHopFieldNameValue';
import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser'; 

@Component({
  selector: 'app-series-definition-details',
  templateUrl: './series-definition-details.component.html',
  styles: [],
  providers: [DefinitionDataService,WorkflowsService,AppGlobals,LoginService]
})
export class SeriesDefinitionDetailsComponent implements OnInit {
	wr_BriefId : number;
	hop_sequence : number;
	wrBriefName : string;
	userGroup_id : number;
	
	
	
	fieldNameValueList: PreviousHopFieldNameValue;
	
	currentLoggedInUser: LoggedInUser;
	userName: string;
	userID: string;	  	  
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

	
	
  constructor(private loginService: LoginService,private activatedRoute: ActivatedRoute, private router:Router, private _global: AppGlobals, private workFlowsService: WorkflowsService, private definitionDataService: DefinitionDataService) {
	  
	// Get Current User Profile
	
	this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
	
	if (this.currentLoggedInUser) {
		this.userName = this.currentLoggedInUser.userName
		this.userID = this.currentLoggedInUser.userID
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
		//console.log(this.wr_BriefId);
		
		this.hop_sequence = Number(this.activatedRoute.snapshot.paramMap.get('hopSequence'));		
		//console.log(this.hop_sequence);
		
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
					//console.log(totalData);
					if (totalData%2==1){   
						//console.log("totalData is odd");
						
						this.fieldNameValueList.push({fieldName: "", fieldValue: ""});

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
		//this.listHLR = [{'id':1, 'name':'HLR1'}, {'id':2, 'name': 'HLR2'}, {'id':3, 'name': 'HLR3'}];
		//this.listSAPC = [{'id':1, 'name':'SYUPCC01'}];

		//GetHLRNames
	this.definitionDataService.GetHLRNames().subscribe(
		data => { 
					this.listHLR = [];
					
					for (let index in data) {
					//console.log (data[index]);			
					this.listHLR.push(
						{
							id:data[index].id,
							name: data[index].hlrName
						}
						); 
					}		
			// return data;
				},
			err => console.error(err),
			() => console.log('done loading HLR List')
			);
		
			//GetSAPCNames
	this.definitionDataService.GetSAPCNames().subscribe(
		data => { 
					this.listSAPC = [];
					
					for (let index in data) {
					//console.log (data[index]);			
					this.listSAPC.push(
						{
							id:data[index].id,
							name: data[index].sapcName
						}
						); 
					}		
			// return data;
				},
			err => console.error(err),
			() => console.log('done loading SAPC List')
			);
		


	}
	else if(this.hop_sequence == 3){
	//this.listSDP = [{'id':1, 'name':'SDP1'}, {'id':2, 'name': 'SDP2'}, {'id':3, 'name': 'SDP3'}];
	//this.listEmaPort = [{'id':1, 'name':'3001'}, {'id':2, 'name': '3002'}];

			//GetSDPNames
			this.definitionDataService.GetSDPNames().subscribe(
				data => { 
							this.listSDP = [];
							
							for (let index in data) {
							//console.log (data[index]);			
							this.listSDP.push(
								{
									id:data[index].id,
									name: data[index].sdpName
								}
								); 
							}		
					// return data;
						},
					err => console.error(err),
					() => console.log('done loading SDP List')
					);
		
							//GetEmaPortNames
			this.definitionDataService.GetEmaPortNames().subscribe(
				data => { 
							this.listEmaPort = [];
							
							for (let index in data) {
							//console.log (data[index]);			
							this.listEmaPort.push(
								{
									id:data[index].id,
									name: data[index].emaportName
								}
								); 
							}		
					// return data;
						},
					err => console.error(err),
					() => console.log('done loading EmaPort Names List')
					);
				
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
	console.log(Number(selectedSDPID)-1);
	const selectedSDPName = this.listSDP[Number(selectedSDPID)-1].name;
	console.log(selectedSDPName);
	const selectedSDPNumber = selectedSDPName.substring(4)
	console.log(selectedSDPNumber);	
	//this.mySeriesDefinitionForm.get('quantity').setValue(1 + Number(selectedMSISDN) - Number(startMSISDNs));
	this.mySeriesDefinitionForm.get('CSP').setValue(selectedSDPNumber);
	this.mySeriesDefinitionForm.get('EOICK').setValue(Number(selectedSDPNumber)*10);
	this.mySeriesDefinitionForm.get('SK').setValue(Number(selectedSDPNumber)+8000-1);
  }

  topFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// FORM SUBMISSION
onSeriesProvisionSubmit() {
 
if (this.mySeriesDefinitionForm.valid) {
	this.topFunction();
	   this.isLoading = true;
	   this.isDoneDisable = true;
	
    //console.log('Form Submitted!');
    //console.log(this.mySeriesDefinitionForm.value);
  
  this.formFieldData = "";
  this.LogKeyValuePairs(this.mySeriesDefinitionForm);
  console.log(this.formFieldData);
  //{wr_id}/{userGroup_id}/{user_id}/[{workflowFieldsValueSeqWise}]
  this.workFlowsService.UpdateExistiongWorkRequest(this.workFlowsService.FormatWorkRequestNameForAPI(this.wrBriefName),this._global.wrid_NumberSeriesDefinition, this.groupID,this.userID,this.hop_sequence,this.formFieldData,this.isDone).subscribe(
      res  =>  {
		//console.log('response is : '+res.message);
		
		if(res !== ""){	
			this.successAlertShow = true;
			this.successAlertMessage = " has been saved successfully and forwarded to "+res.message+" .";
			
			this.isLoading = false;
		}
      },
      err  =>  {		  
		  console.log("err.status : "+err.status);		  
		  this.dangerAlertShow = true;
		this.dangerAlertMessage = " .";
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
		this.router.navigateByUrl('/nsa/seriesdefinition');	
	}
onDoneClick(event: any){
		//console.log(event);
		this.topFunction();
		this.isLoading = true;
		this.successAlertShow = false;
		this.dangerAlertShow = false;
		 this.formFieldData = "";
		 this.isDoneDisable = true;
		 if(this.hop_sequence==4) // LAST HOP IN SERIES PROVISION
			this.isDone = true;
		  this.workFlowsService.UpdateExistiongWorkRequest(this.workFlowsService.FormatWorkRequestNameForAPI(this.wrBriefName),this._global.wrid_NumberSeriesDefinition, this.groupID,this.userID,this.hop_sequence,this.formFieldData,this.isDone).subscribe(
      res  =>  {
		//console.log('response is : '+res.message);
		
		if(res !== ""){	
			this.isLoading = false;
			this.successAlertShow = true;
			if(this.hop_sequence==4)
				this.successAlertMessage = " has been completed successfully.";
			else
				this.successAlertMessage = " has been saved successfully and forwarded to "+res.message+".";
		}
      },
      err  =>  {		  
		  console.log("err.status : "+err.status);		  
		  this.dangerAlertShow = true;
		this.dangerAlertMessage = " .";
		this.isLoading = false;
      }
	  
      );
	  
	  
		
	}  
	
  
}
