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

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-voucherGen',
    templateUrl: './voucher_generation.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,SSMService],
})
export class VoucherGeneration implements OnInit {
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			endSerial:number;
 			todayDate: Date;
			routerUrlAndParams: string;
  			isDataFound: boolean=false ;
  			isDataFoundOther: boolean ;
  			 public isDisableBtn:boolean = false;
			voucherGenrationForm:FormGroup;
			batchNo:string;
			listVendorwiseSFTP=[];
			listvoucherserialdigitshidden=[];
			listvoucherserialdigits=[];
			listCardGroup=[];
			listDenomination=[];
			public listVendor=[];
			private rowData: any[];
			
			
	constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private ssmService: SSMService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
      this.isDataFound = false;
      this.isDataFoundOther=false;
    }
    else {
      this.router.navigate(['pages/login']);
    }
    this.todayDate = new Date();
    this.rowData = [];    
    }
    
    ngOnInit() {
    this.getCardGroup();
    this.getMaxBatchNo();
    this.getDenoMination();
    this.getVendor();
    this.getVendorWiseSFTP();
    this.getvoucherSerial();
    this.getvoucherSerialHidden();
	this.createForm(); 
	this.onquantityChange()
   
       }
    
   createForm(){	console.log("Hello"),
	this.voucherGenrationForm= new FormGroup({
		StartSerial:new  FormControl(''),
		BatchQty:new FormControl(''),
		Vendor:new FormControl({value: ''}),
		requestDate:new FormControl(''),
		Pr:new FormControl(''),
		Po:new FormControl(''),
		nwExpireDate:new FormControl(''),
		ExpireDate:new FormControl(''),
		CardGroup:new FormControl({value: ''}),
		voucherserialdigits:new FormControl({value: ''}),
		voucherserialdigitshidden:new FormControl({value: ''}),
		VendorwiseSFTP:new FormControl({value: ''}),
		Denomination:new  FormControl({value: ''}),
	});
	
}
submitVoucher(){
	this.ssmService.checkPoExsist(this.voucherGenrationForm.controls.Po.value).subscribe(
		data =>{ console.log("Da"+data)
			if(data!=null){
				this.ShowData();
				
			}
			else{
				alert("No data Found for entered Po")
			}
			
			
		}
		);
	
	
}
 ShowData(){ 
	this.isDataFound=true;
	 var objToInsert = {};
	 objToInsert['endSerial']=this.endSerial;
	objToInsert['BatchNo']=this.batchNo;
	objToInsert['StartSerial']=this.voucherGenrationForm.controls.StartSerial.value;
	objToInsert['BatchQty']=this.voucherGenrationForm.controls.BatchQty.value;
	objToInsert['Vendor']=this.voucherGenrationForm.controls.Vendor.value;
	objToInsert['requestDate']=this.voucherGenrationForm.controls.requestDate.value;
	objToInsert['Pr']=this.voucherGenrationForm.controls.Pr.value;
	objToInsert['Po']=this.voucherGenrationForm.controls.Po.value;
	objToInsert['nwExpireDate']=this.voucherGenrationForm.controls.nwExpireDate.value;
	objToInsert['ExpireDate']=this.voucherGenrationForm.controls.ExpireDate.value;
	objToInsert['CardGroup']=this.voucherGenrationForm.controls.CardGroup.value;
		objToInsert['voucherserialdigits']=this.voucherGenrationForm.controls.voucherserialdigits.value;
	objToInsert['voucherserialdigitshidden']=this.voucherGenrationForm.controls.voucherserialdigitshidden.value;
	objToInsert['Denomination']=this.voucherGenrationForm.controls.Denomination.value;
	objToInsert['VendorwiseSFTP']=this.voucherGenrationForm.controls.VendorwiseSFTP.value;
	  this.rowData.push(objToInsert);
	
	
 
   
   }
//Fetch Dropdown value
getVendor(){ console.log("Vendor")
this.ssmService.getAllVendor().subscribe(
	data => {
				//console.log(data);
				for (let index in data) {
					this.listVendor.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err),);
    }

getDenoMination(){ 
this.ssmService.getDenoMination().subscribe(
	data => {
				//console.log(data);
				for (let index in data) {
					this.listDenomination.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err),);
    }
    
    getCardGroup(){ 
		console.log("card")
this.ssmService.getCardGroup().subscribe(
	data => {
				//console.log(data);
				for (let index in data) {
					this.listCardGroup.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err),);
    }

 getvoucherSerial(){ 
	
this.ssmService.getvoucherSerial().subscribe(
	data => {
				//console.log(data);
				for (let index in data) {
					this.listvoucherserialdigits.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err),);
    }

 getvoucherSerialHidden(){ 
this.ssmService.getvoucherSerialHidden().subscribe(
	data => {
				//console.log(data);
				for (let index in data) {
					this.listvoucherserialdigitshidden.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err),);
    }
 getVendorWiseSFTP(){ 
this.ssmService.getVendorWiseSFTP().subscribe(
	data => {
		
				//console.log(data);
				for (let index in data) {
					this.listVendorwiseSFTP.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err),);
    }
 //Submit data
 
  
  getMaxBatchNo(){
	this.ssmService.getMaxBatchNo().subscribe(
		data=>{
			console.log("Das" +data)
			this.batchNo=data;
			
		}
	)
	
	
}
   onquantityChange(){
	this.voucherGenrationForm.get('BatchQty').valueChanges.subscribe(selectab => {
		var v1=this.voucherGenrationForm.controls.StartSerial.value;
	var v2=this.voucherGenrationForm.controls.BatchQty.value-1;
	console.log("V1"+v1+"V2="+v2);
		var endSerial1=v1+v2;
	this.endSerial=endSerial1;
	console.log(this.endSerial)
		}
		
	);
	
	
}
   //Clear form
   clearForm(event: any){
	this.voucherGenrationForm.reset
	
	}
    
    }