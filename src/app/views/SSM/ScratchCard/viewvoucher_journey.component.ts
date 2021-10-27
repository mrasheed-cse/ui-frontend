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
import{ViewJourney } from './viewvouschejourney.service';
import { Observable } from 'rxjs/Observable';
import {DatePipe} from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-voucherGen',
    templateUrl: './viewvoucher_journey.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,ViewJourney,DatePipe],
})
export class VoucherJourney implements OnInit {
	
	
	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			viewall:boolean=false;
  			isDetail:boolean=false;
  			listVoucherHopsdata=[];
  			voucherDetail:any[]=[];
  			filteredData:any[];
  			public searchText : string;
  			Status: string
  			endSerial:number;
  			constructor(private datePipe: DatePipe,private router: Router,private fb:FormBuilder,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private viewService: ViewJourney ) {
    
 
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
     
      }
    else {
      this.router.navigate(['pages/login']);
    }
    }	
  					 
    ngOnInit(){
	
	 this.getAllData();
		
	}
	
	getAllData(){
		this.viewall=true;
		this.viewService.getAllVoucher().subscribe(
			data=>{
				
				this.filteredData=data;
					for (let index in data) {
			
			this.listVoucherHopsdata.push(
					{
						
						ponumber: data[index].ponumber,
						batchNo: data[index].batchNo,
						currentHop: data[index].currentHop,
						lastHop: data[index].lastHop,
						pendingFor: data[index].pendingFor,
						vendor: data[index].vendor,
						cardGroup: data[index].cardGroup,
						id:data[index].id,
					}
					);
					
				}
				
			})
			}
	
	
	details(id:number){
		
		this.viewall=false;
		this.getVoucherDetail(id);
		this.isDetail=true;
		
	}
  			
  	getVoucherDetail(id:number){
	
	this.isDetail=true;
	this.viewService.getVoucher(id).subscribe(
		data=>{
		console.log(data.ponumber)
		
		console.log("AA "+data['ponumber'])
			this.voucherDetail.push(
					{ponumber: data.ponumber,
						batchNo: data.batchNo,
						 id: data.id,
						 serial: data.serial,
						 quantity: data.quantity,
						denomination: data.denomination,
						networkexpiredate: this.datePipe.transform(data.networkexpiredate,"dd-MM-yyyy"),
						expirydate:this.datePipe.transform( data.expirydate,"dd-MM-yyyy"),
						cardgroup: data.cardgroup,
						sftplocation: data.sftplocation,
						vendor:data.vendor,
						batchtestresult: data.batchtestresult
						
					}					
					);
		this.endSerial=Number(this.voucherDetail[0].serial)+Number(this.voucherDetail[0].quantity)-1
		console.log(this.endSerial )
		
		
		
	})
	
}	

statusChanged(){
	this.listVoucherHopsdata=[];
	console.log("Status" +this.Status)
	var status="";
	if(this.Status==="1"){
		status="CLOSED";
		
	}
	else if(this.Status==="2"){
		status="RAFM ";
		
	}
	else if(this.Status==="3"){
		status="Canceled ";
		
	}
	else if(this.Status==="4"){
		status="SSM ";
		
	}
	else if(this.Status==="5"){
		status="Technology ";
		
	}
	else if(this.Status==="6"){
		status="CLC ";
		
	}
	else{
		status="All";
	}
	for(let index in this.filteredData){
			
		if(this.filteredData[index].pendingFor.trim()===status.trim()){
			console.log("Abc")
			this.listVoucherHopsdata.push(
					{
						
						ponumber: this.filteredData[index].ponumber,
						batchNo: this.filteredData[index].batchNo,
						currentHop: this.filteredData[index].currentHop,
						lastHop: this.filteredData[index].lastHop,
						pendingFor: this.filteredData[index].pendingFor,
						vendor: this.filteredData[index].vendor,
						cardGroup: this.filteredData[index].cardGroup,
						id: this.filteredData[index].id,
					}
					);
			
		}
		
		else if(status==="All"){
			this.listVoucherHopsdata.push(
					{
						
						ponumber: this.filteredData[index].ponumber,
						batchNo: this.filteredData[index].batchNo,
						currentHop: this.filteredData[index].currentHop,
						lastHop: this.filteredData[index].lastHop,
						pendingFor: this.filteredData[index].pendingFor,
						vendor: this.filteredData[index].vendor,
						cardGroup: this.filteredData[index].cardGroup,
						id: this.filteredData[index].id,
					}
					);
			
		}
		
	}
	
}
poChange(){
	this.listVoucherHopsdata=[];
	for(let index in this.filteredData){
			
		if(this.filteredData[index].ponumber===this.searchText){
			this.listVoucherHopsdata.push(
					{
						
						ponumber: this.filteredData[index].ponumber,
						batchNo: this.filteredData[index].batchNo,
						currentHop: this.filteredData[index].currentHop,
						lastHop: this.filteredData[index].lastHop,
						pendingFor: this.filteredData[index].pendingFor,
						vendor: this.filteredData[index].vendor,
						cardGroup: this.filteredData[index].cardGroup,
						id: this.filteredData[index].id,
					}
					);
			
		}
		
}
}
back(){
	this.isDetail=false;
	this.viewall=true;
	this.voucherDetail=[];
	this.endSerial=null;
	
}	
  			
  			}