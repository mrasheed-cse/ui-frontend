import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { DefinitionDataService } from './services/definitiondata.service';
import { WorkflowsService } from './services/workflows.service';
import { FileoperationService } from './services/fileoperation.service';






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
	userID: string;
	groupID: number;

	public dangerAlertShow:boolean = false;
	public dangerAlertMessage:string = "";
	public successAlertShow:boolean = false;
	public successAlertMessage:string = "";
	public infoAlertShow:boolean = false;
	public infoAlertMessage:string = "";
	public isLoading:boolean = false;
	public isBatchIdFound:boolean =false;
  public isDisableBtn:boolean = false;


	myDeProvisionForm: UntypedFormGroup;
	batchID: UntypedFormControl;
	deProvisionFile: UntypedFormControl;
	cnpComment: UntypedFormControl;
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
		this.userID = this.currentLoggedInUser.userID
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
			() => console.log('done loading Provisioning Type Name List')
			);
		*/
}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {

	this.batchID = new UntypedFormControl('');
	this.deProvisionFile = new UntypedFormControl('', Validators.required);
	this.cnpComment = new UntypedFormControl('');
	//this.simType = new  FormControl('');
  }

  createForm() {
    this.myDeProvisionForm = new UntypedFormGroup({
		batchID: this.batchID,
		//simType: this.simType,
		deProvisionFile: this.deProvisionFile,
		cnpComment: this.cnpComment
    });
	}

	topFunction() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}


  // FORM SUBMISSION
	onDeProvisionSubmit() {
   
		if(this.selectedFile.name==this.workFlowsService.FormatWorkRequestNameForAPI(this.WR_Name)+".csv"||this.selectedFile.name==this.workFlowsService.FormatWorkRequestNameForAPI(this.WR_Name)+".txt"){

  if (this.myDeProvisionForm.valid && !this.isDisableBtn) {
	this.topFunction();
	
		console.log('Form Submitted!');
	
	
		

	this.isLoading = true;
	this.isDisableBtn = true;
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

			console.log('file uploaded at '+new Date().toString());

			console.log('Before work request process time '+new Date().toString());
			//{wr_id}/{userGroup_id}/{user_id}/[{workflowFieldsValueSeqWise}]
			
			var res1 = this.workFlowsService.CheckDeProvEligibleBatchId(this.myDeProvisionForm.get('batchID').value, this.fileName);
	console.log(res1);
        res1.subscribe(r => {
			console.log(r.message);
		if(r.message.includes("Please check.")){
			alert(r.message);
			this.isBatchIdFound = false;
			this.isLoading = false;
			this.isDisableBtn=false;
		}
		else{
			this.isBatchIdFound = true;			
		console.log('All msisdns VS batchID found.');
console.log('Now processing the workflow.');
			this.workFlowsService.CreateNewWorkRequest(this._global.wrid_DeProvisioning, this.groupID,this.userID,this.formFieldData).subscribe(
				res  =>  {
			console.log('response is : '+res.message);
			this.isLoading=false;

			if(res !== ""){
				this.successAlertShow = true;
				this.successAlertMessage = " has been created successfully and forwarded to "+res.message+" .";
					this.isLoading = false;
			}
				},
				err  =>  {
					this.isLoading=false;
				console.log("err.status : "+err.status);
				this.dangerAlertShow = true;
			this.dangerAlertMessage = " .";
				this.isLoading = false;
				}

				);

		


	}
});

});
}
else{
alert("FILE NAME DOES NOT Match")}
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
