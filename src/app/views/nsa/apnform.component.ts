import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DefinitionDataService } from './services/definitiondata.service';
import { WorkflowsService } from './services/workflows.service';






import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser';


import { AppGlobals } from './../../app.global';

@Component({
    selector: 'app-apnform',
    templateUrl: './apnform.component.html',
    styles: [],
    providers: [DefinitionDataService, WorkflowsService, AppGlobals, LoginService],
    standalone: false
})
export class ApnformComponent implements OnInit {
	WR_Name: string;
	serverUrl: string;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	userID: string;
	groupID: number;


	public dangerAlertShow:boolean = false;
	public dangerAlertMessage:string = "";
	public successAlertShow:boolean = false;
	public successAlertMessage:string = "";
	public isLoading:boolean = false;
	public isDisableBtn:boolean = false;
	public infoAlertShow:boolean = false;
	public infoAlertMessage:string = "";

	public isValidApn:boolean = false;


	myApnCreationForm: UntypedFormGroup;
	apnName: UntypedFormControl;
	apnID: UntypedFormControl;
	productType: UntypedFormControl;
	formFieldData: string;


  public listProductType = [];

  constructor(private router: Router,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private definitionDataService: DefinitionDataService, private workFlowsService: WorkflowsService) {

	// Get Current User Profile

	this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

	if (this.currentLoggedInUser) {
		this.userName = this.currentLoggedInUser.userName
		this.groupID = this.currentLoggedInUser.groupID
		this.userID = this.currentLoggedInUser.userID
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
   this.apnName = new UntypedFormControl('', [Validators.required]);
   this.apnID = new UntypedFormControl('', [Validators.required]);
	this.productType = new UntypedFormControl('', [Validators.required]);
  }

  createForm() {
    this.myApnCreationForm = new UntypedFormGroup({
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

  if (this.myApnCreationForm.valid && !this.isDisableBtn) {
console.log(this.isDisableBtn);

		this.topFunction();
	this.isLoading = true;
	this.isDisableBtn = true;

		console.log('Form Submitted!');
//console.log(this.isDisableBtn);
//    console.log(this.myApnCreationForm.value);

const apnName = this.myApnCreationForm.get('apnName').value;
const apnID = this.myApnCreationForm.get('apnID').value;

this.isLoading = true;

	this.definitionDataService.CheckValidityApnCreationWorkRequest(apnName,apnID).subscribe(
		data => {
				console.log(data);

				if(data==false){

					this.infoAlertShow = true;

					this.infoAlertMessage = "APN has been already created with APN Name "+apnName+" or APN ID "+apnID;
					this.isLoading = false;
					
					return;
				}
				else{
					this.formFieldData = this.workFlowsService.FormatWorkRequestNameForAPI(this.WR_Name);
					this.LogKeyValuePairs(this.myApnCreationForm);
					//console.log(this.formFieldData);
					//{wr_id}/{userGroup_id}/{user_id}/[{workflowFieldsValueSeqWise}]
					this.workFlowsService.CreateNewWorkRequest(this._global.wrid_ApnCreation, this.groupID,this.userID,this.formFieldData).subscribe(
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
				},
		err => {
			console.error(err);
			 this.infoAlertShow = true;
			 this.isLoading = false;
			 this.infoAlertMessage = "APN has been already created with APN Name "+apnName+" or APN ID "+apnID;
			 this.isValidApn = false;
		},
		() => console.log('Done ChaeckAPNCreationValidity')
		);
		this.isLoading = false;

	}
}

LogKeyValuePairs(group: UntypedFormGroup): void {

  // Loop through each control key in the FormGroup
  Object.keys(group.controls).forEach((key: string) => {
    // Get the control. The control can be a nested form group
    const abstractControl = group.get(key);
    // If the control is nested form group, recursively call
    // this same method (logKeyValuePairs) passing it
    // the FormGroup so we can get to the form controls in it
    if (abstractControl instanceof UntypedFormGroup) {
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
