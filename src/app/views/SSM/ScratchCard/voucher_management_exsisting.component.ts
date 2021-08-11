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
if(this.groupID==7){
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
					console.log(this.listVoucherHopsdata)
		}
		
		
		
	})
}
    
	detailsSecondHop(id:number){
		if(this.groupID=12){
			this.isbatchTest=true;
		}
		else{
			this.isActivation=true;
			
		}
		this.isButton=true;

		this.firstHop=false;
		this.Id=id;
		
	}


	
submit(){
	
	console.log(this.batch);
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