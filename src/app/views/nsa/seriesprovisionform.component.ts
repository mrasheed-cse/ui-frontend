import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  selector: 'app-seriesprovisionform',
  templateUrl: './seriesprovisionform.component.html',
  styles: ['./nsa_styles.css'],
  providers: [DefinitionDataService,WorkflowsService,AppGlobals,LoginService]
})
export class SeriesprovisionformComponent implements OnInit {


	WR_Name: string;
	serverUrl: string;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	userID: string;
	groupID: number;
	totalQuantity: number = 0;

	//datepickerConfig: Partial<BsDatepickerConfig>;

	public dangerAlertShow:boolean = false;
	public dangerAlertMessage:string = "";
	public successAlertShow:boolean = false;
	public successAlertMessage:string = "";
	public infoAlertShow:boolean = false;
	public infoAlertMessage:string = "";
	public defFlowFound:boolean = false;

	public isLoading:boolean = false;


	mySeriesProvisionForm: FormGroup;
	startMSISDN: FormControl;
	endMSISDN: FormControl;
	quantity: FormControl;
	productType: FormControl;
	productName: FormControl;
	serviceClassName: FormControl;
	communityID: FormControl;
	hlr: FormControl;
	sdp: FormControl;
	startICCID: FormControl;
	startICCID19: FormControl;
	endICCID: FormControl;
	startIMSI: FormControl;
	endIMSI: FormControl;
	simType: FormControl;
	needByDate: FormControl;
	srcComment: FormControl;
	formFieldData: string;

	public listSimType = [];

	todayDate: Date;

  constructor(private router: Router,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private definitionDataService: DefinitionDataService, private workFlowsService: WorkflowsService) {

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

	//GetWR_Name
	this.definitionDataService.GetWR_Name(this._global.wrid_NumberSeriesProvisioning).subscribe(
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
			() => console.log('done loading Provisioning Type Name List')
			);

		//Get Today Date
		this.todayDate = new Date();
}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
	this.onMSISDNChanges();
	this.onStartICCIDChanges();
  }

  createFormControls() {
    this.startMSISDN = new FormControl('', [
      Validators.required,
      Validators.minLength(11) ,
      Validators.maxLength(11)
    ]);
    this.endMSISDN = new FormControl('', [
      Validators.required,
      Validators.minLength(11) ,
      Validators.maxLength(11)
    ]);
	this.quantity =	new FormControl({value: 0, disabled: true}, Validators.required);
	this.productType = new FormControl({value: '', disabled: true}, Validators.required);
	this.productName = new FormControl({value: '', disabled: true}, Validators.required);
	this.serviceClassName =	new FormControl({value: '', disabled: true}, Validators.required);
	this.communityID = 	new FormControl({value: '', disabled: true}, Validators.required);
	this.hlr =	new FormControl({value: '', disabled: true}, Validators.required);
	this.sdp = 	new FormControl({value: '', disabled: true}, Validators.required);
	this.startICCID = new FormControl('', [
		Validators.required,
		Validators.minLength(18) ,
		Validators.maxLength(18)
	]);
	this.startICCID19 = 	new FormControl({value: '', disabled: true}, Validators.required);
	this.endICCID = 	new FormControl({value: '', disabled: true}, Validators.required);
	this.startIMSI = 	new FormControl({value: '', disabled: true}, Validators.required);
	this.endIMSI = 	new FormControl({value: '', disabled: true}, Validators.required);
	this.simType = new  FormControl('');
	this.needByDate = new FormControl('');
	this.srcComment = new FormControl('');
  }

  createForm() {
    this.mySeriesProvisionForm = new FormGroup({
		startMSISDN: this.startMSISDN,
		endMSISDN: this.endMSISDN,
		quantity: this.quantity,
		productType: this.productType,
		productName: this.productName,
		serviceClassName: this.serviceClassName,
		communityID: this.communityID,
		hlr: this.hlr,
		sdp: this.sdp,
		startICCID: this.startICCID,
		startICCID19: this.startICCID19,
		endICCID: this.endICCID,
		startIMSI: this.startIMSI,
		endIMSI: this.endIMSI,
		simType: this.simType,
		needByDate: this.needByDate,
		srcComment: this.srcComment

    });
  }

  onMSISDNChanges() {


    this.mySeriesProvisionForm.get('startMSISDN').valueChanges
    .subscribe(selectedMSISDN => {
		const endMSISDNs = this.mySeriesProvisionForm.get('endMSISDN').value;

		if (selectedMSISDN!=null && selectedMSISDN.toString().length==11){
			this.totalQuantity = 1+ Number(endMSISDNs) - Number(selectedMSISDN);
			this.mySeriesProvisionForm.get('quantity').setValue(this.totalQuantity);
			this.LoadDetailData(selectedMSISDN,endMSISDNs);
      this.isLoading = false;
		}

    });

	this.mySeriesProvisionForm.get('endMSISDN').valueChanges
    .subscribe(selectedMSISDN => {
		const startMSISDNs = this.mySeriesProvisionForm.get('startMSISDN').value;


      if (selectedMSISDN!=null && startMSISDNs.length==11){
			this.totalQuantity = 1 + Number(selectedMSISDN) - Number(startMSISDNs);
			this.mySeriesProvisionForm.get('quantity').setValue(this.totalQuantity);
      this.isLoading = true;
      this.LoadDetailData(startMSISDNs, selectedMSISDN);
		}
    });
  }
	  LoadDetailData (startMSISDNs, endMSISDNs) {

		console.log("Quantity Now "+ this.totalQuantity);
		if (this.totalQuantity>0){
		console.log("Start for GetDefinitionDetails");
		this.isLoading = true;
		this.definitionDataService.GetDefinitionDetails(startMSISDNs,endMSISDNs).subscribe(
			data => {
					console.log(data);

					if(data.length>0){

						for (let index in data) {
							console.log (data[index]);
							console.log('fieldName is : '+index +' ' +data[index].fieldName);
							console.log('fieldValue is : '+index +' ' +data[index].fieldValue);
							console.log('index is : '+index);

							if(data[index].fieldName == 'Product type'){
								this.mySeriesProvisionForm.get('productType').setValue(data[index].fieldValue);
							}
							else if(data[index].fieldName == 'Product name'){
								this.mySeriesProvisionForm.get('productName').setValue(data[index].fieldValue);
							}
							else if(data[index].fieldName == 'Service Class Name'){
								this.mySeriesProvisionForm.get('serviceClassName').setValue(data[index].fieldValue);
							}
							else if(data[index].fieldName == 'Community ID'){
								this.mySeriesProvisionForm.get('communityID').setValue(data[index].fieldValue);
							}
							else if(data[index].fieldName == 'HLR'){
								this.mySeriesProvisionForm.get('hlr').setValue(data[index].fieldValue);
							}
							else if(data[index].fieldName == 'SDP'){
								this.mySeriesProvisionForm.get('sdp').setValue(data[index].fieldValue);
							}
						}
						this.infoAlertShow = false;
						this.defFlowFound = true;
					}

					else{

						this.infoAlertShow = true;
						this.defFlowFound=false;
						this.infoAlertMessage = "All numbers from "+startMSISDNs +" and "+ endMSISDNs +" do not have Definition Work Request OR these numbers already have provisioned.";
            this.isLoading = false;
					}


			},
			err => {
				console.error(err);
				 this.infoAlertShow = true;
				 this.defFlowFound=false;
				this.infoAlertMessage = "All numbers from "+startMSISDNs +" and "+ endMSISDNs +" do not have Definition Work Request OR these numbers already have provisioned.";
        this.isLoading = false;
				},
			() => console.log('Done loading Detail Data')
			);
		}
	}



onStartICCIDChanges() {

	var lastDigit: string;

    this.mySeriesProvisionForm.get('startICCID').valueChanges
    .subscribe(selectedStartICCID => {
		lastDigit = this.definitionDataService.LuhnAlgorithmFor19thDigit(selectedStartICCID);


			var startICCIDval = selectedStartICCID +lastDigit;
			var totalQuantity = this.mySeriesProvisionForm.get('quantity').value - 1;

			var endICCIDval = this.definitionDataService.LongNumberAddition(selectedStartICCID,totalQuantity+"");
			lastDigit = this.definitionDataService.LuhnAlgorithmFor19thDigit(endICCIDval);
			endICCIDval = endICCIDval + lastDigit;

			var startIMSIval = '47001'+selectedStartICCID.substr(8,10);
			var endIMSIval = this.definitionDataService.LongNumberAddition(startIMSIval,totalQuantity+"");

			this.mySeriesProvisionForm.get('startICCID19').setValue(startICCIDval);
			this.mySeriesProvisionForm.get('endICCID').setValue(endICCIDval);

			this.mySeriesProvisionForm.get('startIMSI').setValue(startIMSIval);
			this.mySeriesProvisionForm.get('endIMSI').setValue(endIMSIval);

    });


}

topFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


  // FORM SUBMISSION
  onSeriesProvisionSubmit() {
	 //console.log("this.defFlowFound is "+this.defFlowFound);
  if (this.mySeriesProvisionForm.valid && this.defFlowFound) {
		this.topFunction();
	this.isLoading = true;
    //console.log('Form Submitted!');
	//console.log(this.needByDate.value);
	const date = new Date(this.needByDate.value);

    //console.log(this.mySeriesProvisionForm.value);
	//console.log("this.isLoading "+this.isLoading);

  this.formFieldData = this.workFlowsService.FormatWorkRequestNameForAPI(this.WR_Name);
  this.LogKeyValuePairs(this.mySeriesProvisionForm);
  //console.log(this.formFieldData);
  //{wr_id}/{userGroup_id}/{user_id}/[{workflowFieldsValueSeqWise}]
  this.workFlowsService.CreateNewWorkRequest(this._global.wrid_NumberSeriesProvisioning, this.groupID,this.userID,this.formFieldData).subscribe(
      res  =>  {
		//console.log('response is : '+res.message);

		if(res !== ""){
			this.successAlertShow = true;
			this.successAlertMessage = " has been created successfully and forwarded to "+res.message+". ";
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
	// console.log("this.isLoading "+this.isLoading);
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
		  if (key == 'needByDate'){
			  this.formFieldData=this.formFieldData+","+this.FormatTheDate(abstractControl.value);
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

FormatTheDate(selectedNeedByDate:any):string {

	console.log("selectedNeedByDate : "+selectedNeedByDate);
		var date = new Date(selectedNeedByDate);
    var month = ("0" + (date.getMonth()+1)).slice(-2);
    var day  = ("0" + date.getDate()).slice(-2);
    var formattedDate=[day,month,date.getFullYear()].join("/");
	console.log("formattedDate : "+formattedDate);
	return formattedDate;

}

clearForm(event: any){
		//console.log(event);
		this.dangerAlertShow = false;
		this.successAlertShow = false;
		this.mySeriesProvisionForm.reset();
	}
 backButton(event: any){
		//console.log(event);
		this.router.navigateByUrl('/nsa/seriesprovision');
	}

}
