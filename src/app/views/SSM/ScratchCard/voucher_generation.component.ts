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
    templateUrl: './voucher_generation.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,SSMService,DatePipe],
})
export class VoucherGeneration implements OnInit {
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			endSerial:number;
  			startSerial:number;
  			reqDate: Date
  			nwDate: Date;
 			exDate: Date;
 			todayDate:Date;
 			public successAlertShow:boolean = false;
	 		public successAlertMessage:string = "";
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
			listPo=[];
			
			public listVendor=[];
			private rowData: any[];
			itemName:string;
			isLoading:boolean=false;
			Po: FormControl;
			
			
	constructor(private datePipe: DatePipe,private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private ssmService: SSMService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
      this.isDataFound = false;
      this.isDataFoundOther=false;
      this.todayDate = new Date()
    }
    else {
      this.router.navigate(['pages/login']);
    }
   
    this.rowData = [];    
    }
    
    ngOnInit() {
    this.getDenoMination();
    this.getVendor();
    this.getVendorWiseSFTP();
    this.getvoucherSerial();
    this.getvoucherSerialHidden();
	this.createForm(); 
	this.onQuantityChange();
	this.getItemNo();
   this.onDenominationChange();
   //this.onCardChange();
   this.getMaxSerial();
   this.onPoSelectionChange();
       }
    
   createForm(){	
	   
	this.voucherGenrationForm= new FormGroup({
		StartSerial:new  FormControl(''),
		Quantity:new FormControl(''),
		Vendor:new FormControl({value: ''}),
		requestDate:new FormControl(''),
		Pr:new FormControl(''),
		Po:new FormControl({value: ''}, Validators.required),
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
	this.isLoading=true;
	let po_val: string  = this.voucherGenrationForm.controls.Po.value;
	console.log(po_val);
	//alert(po_val);
	console.log(po_val.length);
if(undefined == po_val.length){

	let val: string = JSON.stringify(po_val);
	//alert(val);
	console.log(JSON.parse(val).value);
	//alert(JSON.parse(val).value);
	po_val = JSON.parse(val).value;
console.log(po_val.length);
}
	//if(this.voucherGenrationForm.controls.Po.value==''||this.voucherGenrationForm.controls.Po.value==""){
		if(po_val==''|| po_val.length==0){
		alert("Please provide the Item No(PO)");
		this.isLoading=false;
		return;
	}
	var splitted = po_val.split("-", 1); 
	let thePo:string=splitted[0];
	console.log(thePo);
	
	this.ssmService.checkPoExsist(thePo).subscribe(

		data =>{
			this.isLoading=false;
			if(data!=null){

				this.ShowData();
				
			}
			else{
				alert("No data Found for entered Po")
			}
			
			
		},
		err  =>  {	
			this.isLoading=false;
		 alert("Voucher could not be generated.");
		}
		);
	
	
}
 
//Fetch Dropdown value
getVendor(){ 
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


getItemNo(){
	
this.ssmService.getAllPoInputfiles().subscribe(
	data => {
				//console.log(data);
				for (let index in data) {
					this.listPo.push(
					{
						id:data[index].id+'-'+data[index].itemNumber,
						groupName: data[index].id+'-'+data[index].itemDescription,
							itemName: data[index].itemNumber,
							quantity: data[index].quantity,
							itemDescription: data[index].itemDescription
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
	this.listCardGroup=[];
this.ssmService.getCardGroup(this.voucherGenrationForm.controls.Denomination.value).subscribe(
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

getSerial(){ this.startSerial==null;
	 var val = {}
		 for (let index in this.listDenomination) {
		if(this.listDenomination[index].id==this.voucherGenrationForm.controls.Denomination.value){
		val['Denomination']=this.listDenomination[index].groupName;
		}
		
	}
	 for (let index in this.listCardGroup) {
		if(this.listCardGroup[index].id==this.voucherGenrationForm.controls.CardGroup.value){
		val['CardGroup']=this.listCardGroup[index].groupName;
		}}
	this.ssmService.getSerial(val['Denomination'],val['CardGroup']).subscribe(
		data =>{
			this.startSerial=data.serial;
			
		}
		
	);
	
}

getMaxSerial(){ 
	this.startSerial==null;
	
   this.ssmService.getMaxSerial().subscribe(
	   data =>{
		   this.startSerial=data.serial;		   
	   }
   );
}



onQuantityChange(){
	/*
	this.endSerial=null;
    var v1=null;
		var v2=null;
		v1= Number(this.startSerial);
		v2=this.voucherGenrationForm.controls.Quantity.value-1;
		var num=v1+v2;
		this.endSerial=num;
*/
		this.voucherGenrationForm.get('Quantity').valueChanges
		.subscribe(selectedQuantity => {
			if (selectedQuantity!=null && selectedQuantity.toString().length>0 ){
				this.endSerial=Number(this.startSerial)+Number(selectedQuantity)-1 ;
			}
	
		});
	
	
}

onPoSelectionChange(){
	
	this.voucherGenrationForm.get('Po').valueChanges
		.subscribe(selectedPo => {
			if (selectedPo!=null){							
				for(let index in this.listPo){		
					
					if(this.listPo[index].id==this.voucherGenrationForm.controls.Po.value) {					
						console.log(this.listPo[index].groupName);
						console.log(this.listPo[index].id+'-'+this.listPo[index].itemDescription);
						console.log(this.listPo[index].quantity);
						console.log(this.voucherGenrationForm.controls.Po.value);
						this.voucherGenrationForm.get('Quantity').setValue(Number(this.listPo[index].quantity));			
						console.log(this.voucherGenrationForm.controls.Quantity.value);
						break;
					}		
				}
				
			}
	
		});
}

onDenominationChange(){
	this.endSerial=null;
	this.startSerial=null
	this.voucherGenrationForm.get('Denomination').valueChanges.subscribe(selectab => {
		this.getCardGroup();
		
	});
	
}
onCardChange(){this.endSerial=null;
	this.startSerial=null
	this.voucherGenrationForm.get('CardGroup').valueChanges.subscribe(selectab => {
		this.getSerial();
		
	});
	
}


ShowData(){ 
	
	this.isDataFound=false;
	 var objToInsert = {};
	 var start=""+this.startSerial;
	 for (let index in this.listDenomination) {
		if(this.listDenomination[index].id==this.voucherGenrationForm.controls.Denomination.value){
		objToInsert['Denomination']=this.listDenomination[index].groupName;
		}
		
	}
	 for (let index in this.listCardGroup) {
		if(this.listCardGroup[index].id==this.voucherGenrationForm.controls.CardGroup.value){
		objToInsert['CardGroup']=this.listCardGroup[index].groupName;
		}
		
	}
	
	
	
	 
	for(let index in this.listPo){
		if(this.listPo[index].id==this.voucherGenrationForm.controls.Po.value){			
			objToInsert['Itemnumber']=this.listPo[index].itemName;			
			if(Number(this.voucherGenrationForm.controls.Quantity.value)>Number(this.listPo[index].quantity)){
				alert('Quantity can not be larger than the available quantity '+this.listPo[index].quantity);
				return;
			}
		}		
	}
	 
	objToInsert['endSerial']=this.endSerial;
	objToInsert['BatchNo']=this.batchNo;
	objToInsert['StartSerial']=this.startSerial;
	console.log("Item is ",objToInsert['Itemnumber'])
	objToInsert['Quantity']=this.voucherGenrationForm.controls.Quantity.value;
	objToInsert['requestDate']=this.datePipe.transform(this.reqDate,"dd-MM-yyyy");
	if(this.voucherGenrationForm.controls.Pr.value==null){
		objToInsert['Pr']=" ";
		
	}
	objToInsert['Pr']=this.voucherGenrationForm.controls.Pr.value;
	objToInsert['Po']=this.voucherGenrationForm.controls.Po.value;
	objToInsert['nwExpireDate']=this.datePipe.transform(this.nwDate,"dd-MM-yyyy");
	objToInsert['ExpireDate']=this.datePipe.transform(this.exDate,"dd-MM-yyyy");
	objToInsert['Vendor']=this.voucherGenrationForm.controls.Vendor.value;
	objToInsert['VendorwiseSFTP']=this.voucherGenrationForm.controls.VendorwiseSFTP.value;
	  this.rowData.push(objToInsert);

	  
	  this.isLoading=true;
	this.ssmService.saveScratch(
		objToInsert['Po'],objToInsert['Denomination']
	,start,objToInsert['requestDate'],objToInsert['Quantity'],this.voucherGenrationForm.controls.Vendor.value
	,objToInsert['Pr'],objToInsert['nwExpireDate'],objToInsert['ExpireDate'],objToInsert['CardGroup'],
	
	this.voucherGenrationForm.controls.voucherserialdigits.value,this.voucherGenrationForm.controls.voucherserialdigitshidden.value,
		this.voucherGenrationForm.controls.VendorwiseSFTP.value,this.userName,objToInsert['Itemnumber']).subscribe(
		data=>{if(data!=""){
			this.voucherGenrationForm.reset
			alert("Data saved Sucessfully and notification mail has been triggerd");
			this.isDataFound=true;
			this.isLoading=false
			
		}
			
			
			
		},
		err=>{console.error(err);
		this.isLoading=false
	});
 
   
   }

   //Clear form
   clearForm(event: any){
	this.voucherGenrationForm.reset
	
	}
    
    }