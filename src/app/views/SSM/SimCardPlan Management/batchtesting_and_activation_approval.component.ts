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
    templateUrl: './batchtesting_and_activation_approval.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,PlanManagementService,DatePipe],
})
export class PlanGenerateApproval implements OnInit {
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			isConfig:boolean=true;
  			listPlangenerateData=[];
  			listData=[];
  			ID:number;
  			isBatch:boolean
  			hop:number;
  			approvalType:any;
  			isProceed:boolean=false;
  			comments:string;
  			isLoading:boolean=false;
  			currenthop:number;
constructor(private datePipe: DatePipe,private router: Router,private loginService:
  			 LoginService,private http: HttpClient, private _global: AppGlobals, private planManagemetService: PlanManagementService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
      this.hop=0;
     
      this.getData();
    }
    else {
      this.router.navigate(['pages/login']);
    }
   
    }
    
    	details(id:number,hop:number){
		
		this.isProceed=true;
		this.isConfig=false;
		this.ID=id;
		if(hop==4){
			
			this.isBatch=true;
			this.currenthop=4;
		}
		else{
			this.isBatch=false;
			this.currenthop=6;
		}
		
	}
	
	submit(){
	
	this.isLoading=true;
	this.planManagemetService.setplanApproval(this.userName,this.ID,this.comments,this.currenthop).subscribe(

		data=>{
			if(data!=null){
				this.isLoading=false;
				alert("Request has been Approved and Forwarded Sucessfully");
				this.getData();
			}
			
		}
	)
	
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
    
    ngOnInit(){
	
}
    getData(){
	this.isConfig=true;
	this.listPlangenerateData=[];
	this.isProceed=false;
	this.comments	=""
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
						currenthop:data[index].currenthop,
					}
				);
				
			}
			
			
			
			
		}
		
		
		
	)
	
	}
	
	
  			
  			}