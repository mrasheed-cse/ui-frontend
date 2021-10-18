import {  NgModule,
  Component,
  Pipe,
  OnInit,
  } from '@angular/core';
  import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import {_throw} from 'rxjs/observable/throw';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import{PlanManagementService } from './plan_management.service';
import { Observable } from 'rxjs/Observable';
import {DatePipe} from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-voucherGen',
    templateUrl: './batchtesting.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,PlanManagementService,DatePipe],
})
export class BatchTesting implements OnInit {
	
		currentLoggedInUser: LoggedInUser;
			username: string;
			groupID: number;
  			userID: string;
  			batchTesting:FormGroup;
			listDropDownproduct=[];
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
  			startMobile:string;
  			endMobile:string;
  			startIccid:string;
  			endIccid:string;
  			startDate:Date;
  			endDate:Date;
  			TestMSISDN:string;
  			handsetUsed:string;
  			simVendorName:string;
  			tester:string;
  			TestDate:Date;
  			ApprovalDate:Date;
  			isAllfilesSubmitted:boolean=false;
			batchId:number=0;  			
			securityUploaded :boolean=false;
			internetUploaded : boolean=false;
			ersUploaded: boolean=false;
			incomingUploaded: boolean=false;
			outGoingUploaded: boolean=false;
			provisionUplodaed: boolean=false;
			isLoading:boolean=false;
			response=[];
    		constructor(private datePipe: DatePipe,private router: Router,private loginService:
  			 LoginService,private http: HttpClient, private _global: AppGlobals, private planManagemetService: PlanManagementService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.username = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
    }
    else {
      this.router.navigate(['pages/login']);
      
      }
      this.hop=5;
      this.getData();
      
    }
       ngOnInit() {
	this.createForm();
	this.getproductName();
	
	}
	
	details(id:number){
		
		this.isProceed=true;
		this.isConfig=false;
		this.ID=id;
		this.getBatchFileStatus(id);
		
	}
		
getproductName(){
	this.listno="3";
	this.planManagemetService.getDropdown(this.listno).subscribe(
		data=>
			{
				//console.log(data);
				for (let index in data) {
					this.listDropDownproduct.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err));
			
		}
	
	  createForm(){	
	this.batchTesting= new FormGroup({
		msisdnType:new FormControl({value: ''}),
		testStartDate:new FormControl(''),
		testEndDate:new FormControl(''),
		Product:new FormControl({value: ''}),
		testStatus:new FormControl({value: ''}),
		approvalDate:new FormControl(''),
		approvedBySignature:new FormControl(''),
		TestDate:new FormControl(''),
		testFor:new FormControl(''),
		startMob: new FormControl(''),
		endMob: new FormControl(''),
		startICCID: new FormControl(''),
		endICCID: new FormControl(''),
		testMSISDN:new FormControl(''),
		handsetUsed:new FormControl(''),
		SIMVendorName: new FormControl(''),
		testedBy: new FormControl(''),
				
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
						itemcode:data[index].itemcode,
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

getBatchFileStatus(id:number){
	this.planManagemetService.getBatchFileStatus(id).subscribe(
		
		data=>{
			if(data!=null){
				this.isAllfilesSubmitted=true;}
				
			
		})
	
}


handleFileInput(files: FileList) {
        this.fileerror = false;
        this.filesuccess = false;
        this.fileToUpload = files.item(0);
        this.fileName = this.fileToUpload.name;
    }
	
	submit(){
			  var msisdnType;
			  var testStatus;
			  if(this.batchTesting.controls.msisdnType.value==="0"){
				
				msisdnType="Recycle MSISDN";
			}
			else if(this.batchTesting.controls.msisdnType.value==="1"){
				msisdnType="New MSISDN";
			}
			
			else if(this.batchTesting.controls.msisdnType.value==="2"){
				msisdnType="Virtual MSISDN"
			}
			
			else if(this.batchTesting.controls.msisdnType.value==="3"){
				msisdnType="MNP";
			}
			
			else if(this.batchTesting.controls.msisdnType.value==="4"){
				msisdnType="MY SIM";
				
			}
			
			if(this.batchTesting.controls.testStatus.value==="0"){
				testStatus="Complete";
			}
			
			else	if(this.batchTesting.controls.testStatus.value==="1"){
				testStatus="In Progress";
			}
			this.isLoading=true;
		this.planManagemetService.saveBatch(
			this.batchTesting.controls.testFor.value,this.batchTesting.controls.startMob.value,
		this.batchTesting.controls.endMob.value,this.batchTesting.controls.startICCID.value,
		this.batchTesting.controls.endICCID.value,
		msisdnType,
		this.batchTesting.controls.Product.value,this.batchTesting.controls.handsetUsed.value,this.batchTesting.controls.SIMVendorName.value,
		this.batchTesting.controls.approvalDate.value,
		this.batchTesting.controls.testedBy.value,this.batchTesting.controls.testStartDate.value,
		this.batchTesting.controls.testEndDate.value,this.batchTesting.controls.TestDate.value,
		this.batchTesting.controls.approvedBySignature.value,testStatus,
		this.username,this.ID
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

uploadProv(){
	this.uploadCsv("provision")
}

uploadINC(){
        this.uploadCsv("incoming");
}

uploadOut(){
        this.uploadCsv("outgoing");
}

uploadNet(){
	
	this.uploadCsv("internet")
}
uploadErs(){
	this.uploadCsv("ers")
}
uploadSecurity()
{
	this.uploadCsv("Security")
}

uploadCsv(type:string){
	this.isLoading=true;
        if (this.fileToUpload == undefined || !this.fileToUpload.name.endsWith(".csv")) {
          alert("Please Select A csv file");
          this.isLoading=false;
        } else {
            this.uploading = true
            var uploadFor=type+","+JSON.stringify(this.ID);
            this.planManagemetService.postBatchFile(this.fileToUpload,uploadFor).subscribe((res => {
                this.uploading = false
                if (res == null) {
                   alert("Failed to Upload File")
                } else {
                   alert("Upload Sucessfull")
                    this.isConfig=false;
                  
                   
                    
                
                }
            }), err => {
                this.uploading = false
                this.fileuploadstatus = err.error.message;
                this.fileerror = true;
            })
            console.log(this.fileToUpload.size);
            this.isLoading=false;
        }
}

	
}