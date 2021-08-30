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
			userName: string;
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
  			
    		constructor(private datePipe: DatePipe,private router: Router,private loginService:
  			 LoginService,private http: HttpClient, private _global: AppGlobals, private planManagemetService: PlanManagementService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
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
		msisdntype:new FormControl({value: ''}),
		startDate:new FormControl(''),
		endDate:new FormControl(''),
		productName:new FormControl({value: ''}),
		TestStatus:new FormControl({value: ''}),
		ApprovalDate:new FormControl(''),
		Approved:new FormControl(''),
		TestDate:new FormControl(''),
		CustomerCategory:new FormControl({value: ''}),
		Requester:new FormControl({value: ''}),
		
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
						
					}
				);
			}
			
		}
		
	)
	
	}
	clearForm(event: any){
	this.batchTesting.reset
	}
	
	 cancel(){
	
		this.planManagemetService.cancelHop(this.userName,this.ID).subscribe(
		
		data=>{
			if(data!=null){
				alert("Voucher Request is Cancled");
				this.getData();
				
			}
			
		}
	)
}
handleFileInput(files: FileList) {
        this.fileerror = false;
        this.filesuccess = false;
        this.fileToUpload = files.item(0);
        this.fileName = this.fileToUpload.name;
    }
	
	submit(){}
	
}