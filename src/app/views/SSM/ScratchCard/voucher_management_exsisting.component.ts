import {  NgModule,
  Component,
  Pipe,
  OnInit,
  } from '@angular/core';
  import {ReactiveFormsModule, FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
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
import{SSMService } from '../SSM.service';
import { Observable } from 'rxjs/Observable';
import {DatePipe} from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-voucherGen',
    templateUrl: './voucher_management_exsisting.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,SSMService,DatePipe],
})
export class VoucherManagementExsisting implements OnInit {
	
	
	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			listVoucherHopsdata:any[];
  			firstHop:boolean=false;
  			isbatchTest:boolean=false;
  			isActivation:boolean=false;
  			comments:string;
  			Id:number;
  			hop:number;
  			isButton:boolean=false;
  			radioTest:FormGroup;
  			batch;
  				
  	constructor(private datePipe: DatePipe,private router: Router,private fb:FormBuilder,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private ssmService: SSMService ) {
    
     this.radioTest = fb.group({
    batch: ['', Validators.required]
  });
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
      if(this.groupID==12){
	//BatchTesting
	this.hop=6;
	
}
if(this.groupID==13){
//CLC
this.hop=7;
	
	
}
    this.getData(this.hop);}
    else {
      this.router.navigate(['pages/login']);
    }
    }	
  			
  			
  			 getData(hop:number){
	this.firstHop=true;
	this.listVoucherHopsdata=[];
	this.isActivation=false;
	this.isbatchTest=false;
	this.isButton=false;
	this.ssmService.getApproval1HopData(this.hop).subscribe(data=>{
		for (let index in data) {
			
			this.listVoucherHopsdata.push(
					{
						
						ponumber:data[index].ponumber,
						batchNo: data[index].batchNo,
						 id:data[index].id,
						
						
					}
					
					);
		}
		
		
		
	})
}
    
	detailsSecondHop(id:number){
		console.log(this.groupID)
		if(this.groupID==12){
			this.isbatchTest=true;
			this.isButton=true;
			console.log(this.isbatchTest)
		}
		else if (this.groupID==13){
			this.isbatchTest=false
			console.log(this.isbatchTest)
			this.isActivation=true;
			
		}
		

		this.firstHop=false;
		this.Id=id;
		
	}


	
submit(){
	this.ssmService.SaveBatch(this.userName,this.Id,this.batch,this.comments).subscribe(
		data=>{if(data!=null){
			alert("Scratch Card Is Batch Testing sucess")
			this.getData(this.hop);
			
		}
		else{
			alert("Unable to Perform the action")
			this.getData(this.hop);
			
		}
		}
		
	)
}

submitActivate(){
	this.ssmService.SaveFinal(this.userName,this.Id,this.comments).subscribe(
		data=>{if(data!=null){
			alert("Scratch Card Is Activated")
			this.getData(this.hop);
		}
		else{
			alert("Unable to Perform the action")
			this.getData(this.hop);
		}
		}
		
	)
}

cancel(){
	
	this.ssmService.cancelHop(this.userName,this.Id).subscribe(
		
		data=>{
			if(data!=null){
				alert("Voucher Request is Cancled");
				this.getData(this.hop);
				
			}
			
		}
	)
	
}
	 download(){}
  			 
    ngOnInit(){
		
	}
  			}