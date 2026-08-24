import {  NgModule,
  Component,
  Pipe,
  OnInit,
  } from '@angular/core';
  import {ReactiveFormsModule, UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import {throwError as _throw,  Observable } from 'rxjs';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import{PlanManagementService } from './plan_management.service';
import { FileoperationService } from '../../nsa/services/fileoperation.service';
import {DatePipe} from '@angular/common';





@Component({
    selector: 'app-voucherGen',
    templateUrl: './batchtesting.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,PlanManagementService,DatePipe,FileoperationService],
})
export class BatchTesting implements OnInit {
	
		currentLoggedInUser: LoggedInUser;
			username: string;
			groupID: number;
  			userID: string;
  			batchTesting:UntypedFormGroup;
			
			public isDisableBtn:boolean = false;
  			fileToUpload: File = null;
    		fileuploadstatus: string;
    		fileName: string;
    		fileerror: boolean = false;
   		    filesuccess: boolean = false;
    		uploading: boolean = false;
    		listno:string;
    		isConfig:boolean=true;
  			listPlangenerateData=[];
  			ID:number;
  			hop:number;
  			isProceed:boolean=false;
  			NumberSeries:string;
  			
  			startIccids:string[];
  			endIccids:string[];
  			startDate:Date;
  			endDate:Date;
  			TestMSISDN:string;
			  handsetUsed:string;
			  Product:string;
  			simVendorName:string;
  			tester:string;
  			TestDate:Date;
  			ApprovalDate:Date;
  			isAllfilesSubmitted:boolean=false;
			batchId:number=0;  			
			
			provisionUplodaed: boolean=false;
			isLoading:boolean=false;
			response=[];

			testStatuses: string[] = [
				'In Progress',
				'Completed',
				'Failed'
			  ];
			  msisdnTypes: string[] = [
				'Recycle MSISDN',
				'New MSISDN',
				'Virtual_MSISDN',
				'MNP',
				'MY SIM'
			  ];

    		constructor(private datePipe: DatePipe,private router: Router,private loginService:
			   LoginService,private http: HttpClient, private _global: AppGlobals, private planManagemetService: PlanManagementService,
			   private fileoperationService: FileoperationService  ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.username = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
    }
    else {
      this.router.navigate(['pages/login']);
      
      }
      this.hop=4;
      this.getData();
      
    }
       ngOnInit() {
	this.createForm();
	
	
	}
	
	details(id:number){
		
		this.isProceed=true;
		this.isConfig=false;
		this.ID=id;
		this.getBatchTestAutoFetchData(id);
		
	}
	
	createForm(){	
	this.batchTesting= new UntypedFormGroup({
		testFor:new UntypedFormControl(''),	
		msisdnType:new UntypedFormControl({value: ''}),
		testMSISDN:new UntypedFormControl(''),
		handsetUsed:new UntypedFormControl(''),		
		testStatus:new UntypedFormControl({value: ''}),
		testedBy: new UntypedFormControl('')			
	});
	
}

getData(){
	this.isConfig=true;
	this.listPlangenerateData=[];
	this.isProceed=false;
	console.log(this.hop)
	this.planManagemetService.getConfig(this.hop).subscribe(
		data=>{
			for (let index in data) {
				this.listPlangenerateData.push(
					
					{
						productname: data[index].productname,
						quantity: data[index].quantity,
						wrnumber:data[index].wr_number,
						creatorname: data[index].creatorname,
						 id:data[index].id,
						  printingdate: this.datePipe.transform(data[index].printingdate,"dd-MM-yyyy"),
						 packagingdate: this.datePipe.transform(data[index].packagingdate,"dd-MM-yyyy"),
						 deliverydate:  this.datePipe.transform(data[index].deliverydate,"dd-MM-yyyy"),
						
					}
				);
			}
			
		}
		
	)
	
	}
	
	
cancel(){
	
		this.planManagemetService.cancelHop(this.username,this.ID).subscribe(
		
		data=>{
			if(data!=null){
				alert("Voucher Request is Cancled");
				this.getData();
				
			}
			
		}
	)
}

getBatchTestAutoFetchData(id:number){
	this.startIccids=['Please Wait'];
	this.endIccids=['Please Wait'];
	this.planManagemetService.getBatchTestAutoFetchData(id).subscribe(		
		data=>{
			if(data!=null){
				this.startIccids=data.startICCID;
				this.endIccids=data.endICCID;
				this.Product=data.productName;
				this.simVendorName=data.vendorName;
				console.log(this.startIccids);
				console.log(this.endIccids);
			}
			else{
			alert('No plan data found');
		}
		});
	
}


	
	submit(){
		this.isLoading=true;
		if(this.fileToUpload==null || this.fileToUpload.name==''){
			var msisdnType;
			var testStatus;
			msisdnType = this.batchTesting.controls.msisdnType.value;
		   
		  testStatus=this.batchTesting.controls.testStatus.value;
		  
		  this.isLoading=true;
		  this.planManagemetService.saveBatch(
		  this.batchTesting.controls.testFor.value,
		  msisdnType,
		  this.batchTesting.controls.testMSISDN.value,
		  this.batchTesting.controls.handsetUsed.value,			
		  this.batchTesting.controls.testedBy.value,
		  testStatus,
		  this.username,this.ID,
		  //this.fileToUpload.name
		  ""
	  ).subscribe(
		  data=>{
			  if(data!=null)
			  {
				  alert("Batch Testing Sucessfull")
				  this.getData();
			  }
			  else{
				  
				  alert("Failed to save Data")
			  }
			  this.isLoading=false;
		  }			
	  )	
		}
		
		else{

		
	const formData: FormData = new FormData();
		
	//formData.append('ssm-file',this.fileToUpload,this.fileToUpload.name);
	formData.append('ssm-file',this.fileToUpload,'BatchTest_PlanID_'+this.ID+".csv");
	
	console.log(formData);
	
	var result = this.fileoperationService.uploadSSMCSV(formData);
	console.log(result);

	result.subscribe(res => {
			console.log(res);

			console.log('batch file uploaded at '+new Date().toString());

			  var msisdnType;
			  var testStatus;
			  msisdnType = this.batchTesting.controls.msisdnType.value;
			 
			testStatus=this.batchTesting.controls.testStatus.value;
			
			this.isLoading=true;
			this.planManagemetService.saveBatch(
			this.batchTesting.controls.testFor.value,
			msisdnType,
			this.batchTesting.controls.testMSISDN.value,
			this.batchTesting.controls.handsetUsed.value,			
			this.batchTesting.controls.testedBy.value,
			testStatus,
			this.username,this.ID,
			//this.fileToUpload.name
			'BatchTest_PlanID_'+this.ID+".csv"
		).subscribe(
			data=>{
				if(data!=null)
				{
					alert("Batch Testing Sucessfull")
					this.getData();
				}
				else{
					
					alert("Failed to save Data")
				}
				this.isLoading=false;
			}			
		)			
	}

)
		}
}

handleFileInput(files: FileList) {
	this.fileerror = false;
	this.filesuccess = false;
	this.fileToUpload = files.item(0);
	this.fileName = this.fileToUpload.name;
}	
}