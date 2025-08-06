import {
  NgModule,
  Component,
  Pipe,
	OnInit,
	ViewChild
} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { HttpEventType, HttpResponse  } from '@angular/common/http';
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
  selector: 'app-uploadfileswith-batch-id',
  templateUrl: './uploadfileswith-batch-id.component.html',
  styles: [],
  providers: [DefinitionDataService,WorkflowsService,AppGlobals,LoginService,FileoperationService]
})


export class UploadfileswithBatchIdComponent implements OnInit {

	@ViewChild('csvReader') csvReader: any;

  
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
	public isDisableBtn:boolean = false;
	public isFileInfoValid:boolean = false;

	public recordsFromFile: any[] = [];
	public uploadedFiles: File[] = null;



	myDeProvisionListForm: FormGroup;


	deProvisionListFile: FormControl;


	selectedListFile: File = null;
	fileName: string = "";

	formFieldData: string;
	fileListDetails:string='';
	progress = 0;

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

	
}

ngOnInit() {
	this.createFormControls();
	this.createForm();
}

createFormControls() {


this.deProvisionListFile = new FormControl('', Validators.required);

}

createForm() {
	this.myDeProvisionListForm = new FormGroup({

		deProvisionListFile: this.deProvisionListFile
	});
}
  
	topFunction() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}


  
onListFileChange(event) {
    this.selectedListFile = <File>event.target.files[0];
	}
	
	isValidCsvFile(file: any) {
    return file.name.endsWith(".csv");
	}
	
	getDataRecordsArrayFromCSVFile(csvRecordsArray: any) {
		

		let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
			let curruntRecord = (<string>csvRecordsArray[i]).split(',');
			console.log(curruntRecord);
			let obj = Object.create(null);
			obj['fieldName'] = curruntRecord[0].trim();
			obj['fieldValue'] = curruntRecord[1].trim();
      csvArr.push(obj);
    }
    return csvArr;
	}
	
	fileReset() {
    this.csvReader.nativeElement.value = "";
    this.recordsFromFile = [];
  }

	uploadListener($event: any): void {

		this.fileListDetails="";
    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCsvFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
		debugger;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/).filter(line => line.trim().length > 0);

				this.recordsFromFile = this.getDataRecordsArrayFromCSVFile(csvRecordsArray);
				if(this.recordsFromFile.length<1){
					alert("No valid data found. Please refer the sample file.");
					return;
				}
        console.log("recordsFromFile");
        console.log(this.recordsFromFile);
				
				this.workFlowsService.UploadFileNameVsBatchId(this.recordsFromFile, this.userName).subscribe(
					res  =>  {
						console.log('response is : '+res.message);
						alert(res.message);
						if(res.message.includes("successfully")){
							this.isFileInfoValid=true;
						}
					})

      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

	onFileChange(event:any) {
		this.uploadedFiles = event.target.files;
		//alert(this.uploadedFiles.length);

		this.fileListDetails=this.uploadedFiles.length+" files have been uploaded.<br/>";	
		for(var i=0;i<this.uploadedFiles.length;i++){
		 this.fileListDetails+=this.uploadedFiles[i].name+", Size: "+this.uploadedFiles[i].size+"(bytes)<br/>";
		}

		this.fileListDetails+="<br/>Below "+this.recordsFromFile.length+" files are to be uploaded.<br/>";	
		for(var i=0;i<this.recordsFromFile.length;i++){
			this.fileListDetails+=this.recordsFromFile[i].fieldName+"<br/>";
		 }

  }
	onDeProvisionSubmit() {
		if(this.recordsFromFile.length==this.uploadedFiles.length){
			alert("Expected file count is OK.");
			const fd = new FormData();
			for(var i=0;i<this.uploadedFiles.length;i++){
				if(this.isValidCsvFile(this.uploadedFiles[i])){ // 					check for .csv
					var isPresent = this.recordsFromFile.some((el) => { return el.fieldName === this.uploadedFiles[i].name}); // check for the uploaded list
					console.log(isPresent);
					  if(isPresent){
							fd.append('nsamultifiles',this.uploadedFiles[i]);
							console.log(this.uploadedFiles[i].name);
						}
						else{
							alert(this.uploadedFiles[i].name+" is not the file name list. Please check.");
							return;
					}
				}
				else{
					alert(this.uploadedFiles[i].name+" is not a .csv file. Please check.");
					return;
				}
			}
	 
	 
	 this.fileoperationService.uploadMultipleCSV(fd).subscribe(
		res => {
			console.log('response is : '+res.message);
			alert(res.message);
			this.isFileInfoValid=false;
			
			
		},
		err => 
		{
			console.log(err);

      alert('Could not upload the file!');
		}
		

	);
		}
		else{
			alert("Please provide "+this.recordsFromFile.length+" files.");
		}

	}
clearForm(event: any){
		//console.log(event);
		this.dangerAlertShow = false;
		this.successAlertShow = false;
		this.myDeProvisionListForm.reset();
	}
 backButton(event: any){
		//console.log(event);
		this.router.navigateByUrl('/nsa/deprovision');
	}

}
