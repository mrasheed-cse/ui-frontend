import {  NgModule,
  Component,
  Pipe,
  OnInit,
  } from '@angular/core';
  import {ReactiveFormsModule, UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Router, ActivatedRoute} from '@angular/router';
import {throwError as _throw,  Observable } from 'rxjs';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import{PlanManagementService } from './plan_management.service';
import { FileoperationService } from '../../nsa/services/fileoperation.service';
import {DatePipe} from '@angular/common';





@Component({
    selector: 'app-voucherGen',
    templateUrl: './rep-plangenerate.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,PlanManagementService,DatePipe,FileoperationService],
})
export class RepPlanGenerate implements OnInit {
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			repplanGenrationForm:UntypedFormGroup;
  			listitemDropDown=[];
  			listDropDownProductCode=[];
  			listDropDownProductName=[];
  			listDropDownSharerName=[];
  			listDropDownPlanCircle=[];
  			listDropDownRequester=[];
  			
  			quantity:number;
  			
  			msisdnPlanid: string;
  			 public isDisableBtn:boolean = false;
  			
    		fileuploadstatus: string;
    		fileName: string;
    		fileerror: boolean = false;
   			 filesuccess: boolean = false;
    		uploading: boolean = false;
    		isDataFound:boolean=false;
    		listno:string;
    		
    		public isLoading:boolean = false;
    		public avalibleQuantity:string;
    		listCategoryName=[];
    		
			private kit:any=[];
			inputFileIds:string="";
    		
    		planID :any;
  			constructor(private datePipe: DatePipe,private router: Router,private loginService:
			   LoginService,private http: HttpClient, private _global: AppGlobals, 
			   private activatedRoute: ActivatedRoute,			   
			   private planManagemetService: PlanManagementService, private fileoperationService: FileoperationService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
    }
    else {
      this.router.navigate(['pages/login']);
	}
	
	this.LoadQueryStringData();
   
    }
    
    ngOnInit() {
	this.createForm();
	this.getItem();
	this.getPlanCircle();
	this.getproductCode();
	this.getSharerName();
	this.getCategoryName();
	this.getproductName();
	this.getRequester();
	this.LoadQueryStringData();

	
}
    
   createForm(){	
	this.repplanGenrationForm= new UntypedFormGroup({
		ItemCode:new UntypedFormControl({value: ''}),
		ProductName:new UntypedFormControl({value: ''}),
		ProductCode:new UntypedFormControl({value: ''}),
		SharerName:new UntypedFormControl({value: ''}),
		PlanCircle:new UntypedFormControl({value: ''}),
		inputFile:new UntypedFormControl({value: ''}),
		requestDate:new UntypedFormControl(''),
		wrname:new UntypedFormControl(''),
		quantity:new UntypedFormControl('', [Validators.required, Validators.min(1)]),
		CustomerCategory:new UntypedFormControl({value: ''}),
		CategoryName:new UntypedFormControl({value: ''}),
		Requester:new UntypedFormControl({value: ''}),
		
	});
	
}

 
	

getItem(){
	this.listno="1";
	this.planManagemetService.getDropdown(this.listno).subscribe(
		data=>
			{
				//console.log(data);
				for (let index in data) {
					this.listitemDropDown.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err));
			
		}
		
	


getproductCode(){
	this.listno="2";
	this.planManagemetService.getDropdown(this.listno).subscribe(
		data=>
			{
				//console.log(data);
				for (let index in data) {
					this.listDropDownProductCode.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err));
			
		}
		
getproductName(){
	this.listno="3";
	this.planManagemetService.getDropdown(this.listno).subscribe(
		data=>
			{
				//console.log(data);
				for (let index in data) {
					this.listDropDownProductName.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err));
			
		}
				
getSharerName(){
	
	this.listno="4";
	this.planManagemetService.getDropdown(this.listno).subscribe(
		data=>
			{
				console.log(data);
				for (let index in data) {
					this.listDropDownSharerName.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err));
			
		}
		
getPlanCircle(){
	this.listno="5";
	this.planManagemetService.getDropdown(this.listno).subscribe(
		data=>
			{
				//console.log(data);
				for (let index in data) {
					this.listDropDownPlanCircle.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err));
			
		}
		
getRequester(){
	this.listno="6";
	this.planManagemetService.getDropdown(this.listno).subscribe(
		data=>
			{
				//console.log(data);
				for (let index in data) {
					this.listDropDownRequester.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err));
			
		}
		
		
		getCategoryName(){
	this.listno="8";
	this.planManagemetService.getDropdown(this.listno).subscribe(
		data=>
			{
				//console.log(data);
				for (let index in data) {
					this.listCategoryName.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err));
			
		}


LoadQueryStringData(){
	// LOAD QUERY STRING DATA
	
	this.quantity= Number(this.activatedRoute.snapshot.paramMap.get('totalUploadableQuantity'));
	console.log(this.quantity);
	  this.inputFileIds = this.activatedRoute.snapshot.paramMap.get('ifids');
  
}
SubmitForRepPlanGeneration(){

	if(! (this.repplanGenrationForm.valid  && !this.isDisableBtn)){
		alert('Please provide all inputs');
		return;
	}

	var inputQty = this.repplanGenrationForm.controls.quantity.value;
	if(inputQty>this.quantity){
		alert('Please provide quantity less or equals to '+this.quantity);
		return;
	}

	this.isLoading=true;
	

		var objToInsert = {};
		objToInsert['itemcode']=this.repplanGenrationForm.controls.ItemCode.value;
		objToInsert['productname']=0;// Product Name: Replacement SIM
		
		objToInsert['customercategory']	=0;//Customer Category: Replacement
		objToInsert['productcode']=this.repplanGenrationForm.controls.ProductCode.value;
		objToInsert['quantity']=inputQty;
		objToInsert['sharername']=this.repplanGenrationForm.controls.SharerName.value;
		objToInsert['circle']=this.repplanGenrationForm.controls.PlanCircle.value;
		objToInsert['requester']=this.repplanGenrationForm.controls.Requester.value;
		objToInsert['wr_number']=this.repplanGenrationForm.controls.wrname.value;
		objToInsert['username']=this.userName;
		objToInsert['categoryName']=this.repplanGenrationForm.controls.CategoryName.value;
		objToInsert['inputfileIds']=this.inputFileIds;
		objToInsert['uploadedFileName']='';
		console.log(objToInsert );


		this.planManagemetService.GenerateReplacementPlan(objToInsert).subscribe(
	
			data=>{ 	
				
				console.log(data.message);
				if(data.message === "1"){
					console.log("Data Saved")
					this.isLoading=false;
					alert("Replacement Data Saved And forwarded Sucessfully");
					this.router.navigateByUrl('/nsa/reppreplangenerate');

				}
				else{
					this.isLoading=false;
					alert(data.message);
					//this.ngOnInit();
					this.router.navigateByUrl('/nsa/reppreplangenerate');
					}
			},
			err=> {
				
				console.error(err);
				this.isLoading=false;
				alert("Unable to process.");
				this.ngOnInit();				
			}
);
 
	//this.isLoading=false;
		
}
		

   
    
   }
