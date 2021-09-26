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
import{SSMService } from '../SSM.service';
import { Observable } from 'rxjs/Observable';
import {DatePipe} from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-voucherGen',
    templateUrl: './voucher_management_pending.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,SSMService,DatePipe],
})
export class VoucherManagementApproval implements OnInit {
	
	
	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			listVoucherHopsdata:any[];
  			firstHop:boolean=false;
  			isfirsthopProceed:boolean=false;
  			isotherHopsApproval:boolean=false;
  			comments:string;
  			Id:number;
  			hop:number;
  			fileToUpload: File = null;
    		fileuploadstatus: string;
    		fileName: string;
    		fileerror: boolean = false;
   			 filesuccess: boolean = false;
    		uploading: boolean = false;

  			
  	constructor(private datePipe: DatePipe,private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private ssmService: SSMService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
      console.log("Hello"+this.groupID);
      if(this.groupID==16){
	//technology approval
	this.hop=5;
	
}
if(this.groupID==7){

this.hop=3;
	
	
}
if(this.groupID==12){
	//ssmapproval
	this.hop=4;
	
}


    this.getData(this.hop);}
    else {
      this.router.navigate(['pages/login']);
    }
    }
    
      
    getData(hop:number){
	this.firstHop=true;
	this.listVoucherHopsdata=[];
	this.isfirsthopProceed=false;
	this.isotherHopsApproval=false;
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
		
			this.isotherHopsApproval=true;
		
		this.firstHop=false;
		this.Id=id;
		
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
 
 
 submit1(){
	
	this.ssmService.setHop(this.userName,this.Id,this.comments).subscribe(

		data=>{
			if(data!=null){
				alert("DATA Saved And Forwarded");
				this.getData(this.hop);
			}
			
		}
	)
	
}
    
    
    ngOnInit(){
		
	}
}