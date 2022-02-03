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
			  isLoading:boolean = false;
			  public masterSelected:boolean = false;
			selectedIdList: string;
			public isDataFound:boolean = false;

  				
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
	this.isDataFound=false;
	this.ssmService.getApproval1HopData(this.hop).subscribe(data=>{
		if(data!=null && data.length>0){
			this.isDataFound=true;
		}
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
		for (let index in data) {
			
			this.listVoucherHopsdata.push(
					{
						
						ponumber:data[index].ponumber,
						batchNo: data[index].batchNo,
						 id: data[index].id,
						serial: data[index].serial,
						denomination:  data[index].denomination,
						networkexpiredate:this.datePipe.transform( data[index].networkexpiredate,"dd-MM-yyyy"),
						expirydate:this.datePipe.transform( data[index].expirydate,"dd-MM-yyyy"),
						requestDate: this.datePipe.transform(data[index].requestDate,"dd-MM-yyyy"),
						cardgroup: data[index].cardgroup,
						serialDigitCount: data[index].serialDigitCount,
						hiddenNumberCount: data[index].hiddenNumberCount,
						sftplocation: data[index].sftplocation,
						vendor:data[index].vendor,
						quantity:data[index].quantity				
						
						
					}
					
					);
		}
		
		
	})
}
    


	
submit(){
	this.isLoading=true;
	this.selectedIdList="";
		//alert(this.listVoucherHopsdata.length);
		for (let i = 0; i < this.listVoucherHopsdata.length; i++) {
			if(this.listVoucherHopsdata[i]['checked']){		
			if(this.selectedIdList.length>0)
			  this.selectedIdList=this.selectedIdList+"_";
			this.selectedIdList =this.selectedIdList+this.listVoucherHopsdata[i]['id'];
			//alert(this.selectedIdList);
		}
	}
	console.log(this.selectedIdList);
	this.ssmService.SaveBatch(this.userName,this.selectedIdList,this.batch,this.comments).subscribe(
		data=>{if(data!=null){
			alert("Scratch Card Is Batch Testing sucess")
			this.isLoading=false;
			this.getData(this.hop);
			
		}
		else{
			alert("Unable to Perform the action")
			this.isLoading=false;
			this.getData(this.hop);
			
		}
		}
		
	)
	this.isLoading=false;
}

submitActivate(){
	this.isLoading=true;
	this.selectedIdList="";
		//alert(this.listVoucherHopsdata.length);
		for (let i = 0; i < this.listVoucherHopsdata.length; i++) {
			if(this.listVoucherHopsdata[i]['checked']){		
			if(this.selectedIdList.length>0)
			  this.selectedIdList=this.selectedIdList+"_";
			this.selectedIdList =this.selectedIdList+this.listVoucherHopsdata[i]['id'];
			//alert(this.selectedIdList);
		}
	}
	console.log(this.selectedIdList);

	this.ssmService.SaveFinal(this.userName,this.selectedIdList,this.comments).subscribe(
		data=>{if(data!=null){
			alert("Scratch Card Is Activated")
			this.isLoading=false;
			this.getData(this.hop);
		}
		else{
			alert("Unable to Perform the action")
			this.isLoading=false;
			this.getData(this.hop);
		}
		}
		
	)
	this.isLoading=false;
}

cancel(){
	this.isLoading = true;
	this.selectedIdList="";
		//alert(this.listVoucherHopsdata.length);
		for (let i = 0; i < this.listVoucherHopsdata.length; i++) {
			if(this.listVoucherHopsdata[i]['checked']){		
			if(this.selectedIdList.length>0)
			  this.selectedIdList=this.selectedIdList+"_";
			this.selectedIdList =this.selectedIdList+this.listVoucherHopsdata[i]['id'];
			//alert(this.selectedIdList);
		}
	}
	console.log(this.selectedIdList);
	this.ssmService.cancelHop(this.userName,this.selectedIdList, this.comments).subscribe(		
		data=>{
			if(data!=null){
				alert("Voucher Request is Cancled");
				this.isLoading  = false;
				this.getData(this.hop);
				
			}
			
		}
	)
	this.isLoading = false;
	
}
 
checkUncheckAll() {
		
		
	for (let i = 0; i < this.listVoucherHopsdata.length; i++) {
	  this.listVoucherHopsdata[i]['checked'] =this.masterSelected;
	  console.log(this.listVoucherHopsdata[i]['checked']);
	  
  }
  
}
	 download(){}
  			 
    ngOnInit(){
		
	}
  			}