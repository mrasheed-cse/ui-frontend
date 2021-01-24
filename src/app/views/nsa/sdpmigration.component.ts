import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { DefinitionDataService } from './services/definitiondata.service';
import { WorkflowsService } from './services/workflows.service';
import { FileoperationService } from './services/fileoperation.service';

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

	isCollapsedFile: boolean = true;
	isCollapsedRange: boolean = true;
	public isLoading:boolean = false;

	mySdpMigrationFileForm: FormGroup;
	sdpMigrationFile: FormControl;
	serviceClassName: FormControl;
	formFieldData: string;	
	selectedFile: File = null;
	fileName: string = "";

	mySdpMigrationRangeForm: FormGroup;
	startMSISDN: FormControl;
	endMSISDN: FormControl;	
	SDP: FormControl;
	
  public listSDP = []; 
  
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
		this.LoadDDLData();
    this.createFormControls();
    this.createForm();
	}
	
	LoadDDLData(){
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
	
	}

  createFormControls() {
    this.sdpMigrationFile = new FormControl('', Validators.required);


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

	this.SDP= new FormControl('', Validators.required);

  }

  createForm() {
    this.mySdpMigrationFileForm = new FormGroup({
			sdpMigrationFile: this.sdpMigrationFile	
		});
		
		this.mySdpMigrationRangeForm = new FormGroup({
			startMSISDN: this.startMSISDN,
			endMSISDN: this.endMSISDN,
			SDP: this.SDP
			});
	}
	
	topFunction() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}
  
  // File FORM SUBMISSION
  onSdpMigrationFileSubmit() {

		this.dangerAlertShow = false;	
		this.successAlertShow = false;
		
	 
  if (this.mySdpMigrationFileForm.valid) {
		this.topFunction();
		this.isLoading = true;
    console.log('Form Submitted!');
    //console.log(this.mySdpMigrationFileForm.value);

  
  this.fileName = this.formFieldData;
  console.log(this.formFieldData);
  const fd = new FormData();
  fd.append('nsa-file',this.selectedFile,"SDP_Migration.csv");
  //console.log(this.selectedFile.name); 
  
  
  var result = this.fileoperationService.uploadCSV(fd);
		console.log("SDP_Migration.csv upload DOne "+result);
        result
		.subscribe(res1 => {
			console.log(res1);
		});
	}

	this.definitionDataService.SdpMigrationFromFile()
	.subscribe(
		res  =>  {
		//	console.log('response is : '+res);
			if(res == true){
				this.successAlertShow = true;
				this.successAlertMessage = "SDP Migration Done SUccessfully.";
				this.isLoading = false;
			}
			else{
				this.dangerAlertShow = true;
				this.dangerAlertMessage = "SDP Migration could not be done properly.";
				this.isLoading = false;
			}
		},
		err  =>  {
		console.log("err.status : "+err.status);		  
		this.dangerAlertShow = true;
		this.dangerAlertMessage = "An error occured while doing SDP Migration.";
		this.isLoading = false;
		}
	);


	

}

 // Range FORM SUBMISSION
 onSdpMigrationRangeSubmit() {

	this.dangerAlertShow = false;	
	this.successAlertShow = false;
	
	 
  if (this.mySdpMigrationRangeForm.valid) {
		this.topFunction();
		this.isLoading = true;
    console.log('Form Submitted!');
//    console.log(this.mySdpMigrationRangeForm.value);
	
	this.definitionDataService.SdpMigration(this.mySdpMigrationRangeForm.get('startMSISDN').value,	this.mySdpMigrationRangeForm.get('endMSISDN').value,	this.mySdpMigrationRangeForm.get('SDP').value)
	.subscribe(
		res  =>  {
			console.log('response is : '+res);
			if(res == true){
				this.successAlertShow = true;
				this.successAlertMessage = "SDP from " + this.mySdpMigrationRangeForm.get('startMSISDN').value + " to "+ this.mySdpMigrationRangeForm.get('endMSISDN').value +" has been migrated successfully";
				this.isLoading = false;
			}
			else{
				this.dangerAlertShow = true;
				this.dangerAlertMessage = "SDP Migration could not be done properly.";
				this.isLoading = false;
			}
		},
		err  =>  {
		console.log("err.status : "+err.status);		  
		this.dangerAlertShow = true;
		this.dangerAlertMessage = "An error occured while doing SDP Migration.";
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
		this.mySdpMigrationFileForm.reset();
		this.mySdpMigrationRangeForm.reset();		
	}


	downloadCSVFiles() {
	var nameOfFileToDownload =	"SDP_Migration.csv";

	console.log("Download File Name : "+nameOfFileToDownload);
	
		var result = this.fileoperationService.downloadCSV(nameOfFileToDownload);
		//console.log(result);
		result.subscribe(
			data => {
			//	console.log("ToTOOO");
				//console.log(data);
					
				var blob = new Blob([data], { type: 'text/csv' });
	 
				if (window.navigator && window.navigator.msSaveOrOpenBlob) {
					window.navigator.msSaveOrOpenBlob(blob, nameOfFileToDownload);
				} else {
						var a = document.createElement('a');
						a.href = URL.createObjectURL(blob);
						a.download = nameOfFileToDownload;
						document.body.appendChild(a);
						a.click();
						document.body.removeChild(a);
					}
				},
				err => {
					alert("Server error while downloading file.");
				}
			);
	}

}
