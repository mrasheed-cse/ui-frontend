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
    templateUrl: './returnandreceive.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,PlanManagementService,DatePipe],
})

export class ReturnAndReceive implements OnInit {
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			isConfig:boolean=true;
  			listPlangenerateData=[];
  			ID:number;
  			hop:number;
  			isProceed:boolean=false;
  			comments:string;
  			fileToUpload: File = null;
    		fileuploadstatus: string;
    		fileName: string;
    		fileerror: boolean = false;
   		    filesuccess: boolean = false;
    		uploading: boolean = false;
			ItemCode :string;
			ProductName :string;
			simInputfile :string;
			CustomerCategory :string;
			ProductCode :string;
			SharerName :string;
			quantity :string;		
			PlanCircle : string;
			Requester : string;
			wrname :string;
			listno:string;
			printingDate:Date;
  			packagingDate:Date;
  			deliveryDate:Date;
			listitemDropDown=[];
  			listDropDownProductCode=[];
  			listDropDownProductName=[];
  			listDropDownSharerName=[];
  			listDropDownPlanCircle=[];
  			listDropDownRequester=[];
  			listDropDowninputFile=[];
  			
constructor(private datePipe: DatePipe,private router: Router,private loginService:
  			 LoginService,private http: HttpClient, private _global: AppGlobals, private planManagemetService: PlanManagementService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
    this.hop=8;
      this.getData();
    }
    else {
      this.router.navigate(['pages/login']);
    }
   
    }
    
    	details(id:number){
		
		this.isProceed=true;
		this.isConfig=false;
		this.ID=id;
		
		this.getItem();
	this.getPlanCircle();
	this.getproductCode();
	this.getSharerName();
	this.getproductName();
	this.getRequester();
	
		for (let index in this.listPlangenerateData) {
			
			if(this.listPlangenerateData[index].id==this.ID){
				console.log(this.listPlangenerateData);
				this.ItemCode= this.listPlangenerateData[index].itemcode;
				this.ProductCode=this.listPlangenerateData[index].productcode;
				this.ProductName=this.listPlangenerateData[index].productname;
				this.SharerName=this.listPlangenerateData[index].sharername;
				this.wrname=this.listPlangenerateData[index].wrnumber;
				this.PlanCircle=this.listPlangenerateData[index].circle;
				this.quantity=this.listPlangenerateData[index].quantity;
				this.Requester=this.listPlangenerateData[index].requester;
				this.CustomerCategory=this.listPlangenerateData[index].customercategory;
				this.simInputfile=this.listPlangenerateData[index].siminputfileid;
				
				var datePack=this.listPlangenerateData[index].packagingdate;
				this.packagingDate=new Date(datePack);
				var datePrint=this.listPlangenerateData[index].printingdate;
				this.printingDate=new Date(datePrint);
				var dateDeliv=this.listPlangenerateData[index].deliverydate; 
				this.deliveryDate= new Date(dateDeliv);
				console.log(dateDeliv)
			}
			
		
	}
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

getItem(){
	this.listno="1";
	this.planManagemetService.getDropdown(this.listno).subscribe(
		data=>
			{
			console.log(data);
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
    getData(){
	this.isConfig=true;
	this.listPlangenerateData=[];
	this.isProceed=false;
	console.log(this.hop)
	this.planManagemetService.getConfig(this.hop).subscribe(
		data=>{ console.log(data)
			for (let index in data) {
				this.listPlangenerateData.push(
					
					{
						itemcode:data[index].itemcode,
						wrnumber : data[index].wr_number,
						creatorname: data[index].creatorname,
						 id:data[index].id,
						productcode : data[index].productcode,
						productname : data[index].productname,
						customercategory : data[index].customercategory,
						quantity :  data[index].quantity,
						sharername : data[index].sharername,
						circle : data[index].circle,
						requester :  data[index].requester,
						siminputfileid : data[index].siminputfileid,
						printingdate : data[index].printingdate,
						deliverydate :data[index].deliverydate,
						packagingdate : data[index].packagingdate,
					
					
					}
				);
			}
			
		}
		
	)
	
	}


submit(){
	
	
	 var objToInsert = {};
	 	objToInsert['itemcode']=this.ItemCode;
		objToInsert['productname']=this.ProductName;
		if(this.CustomerCategory==="0"){
		objToInsert['customercategory']="CORPORATE"
	}
	else if(this.CustomerCategory==="1")
	{
		objToInsert['customercategory']="REGULAR"
	}
	else if(this.CustomerCategory==="2")
	{
		objToInsert['customercategory']="UNPAIR"
	}
	else{
		
		objToInsert['customercategory']	=this.CustomerCategory;
	}
		
		objToInsert['productcode']=this.ProductCode;
		objToInsert['sharername']=this.SharerName;
		objToInsert['circle']=this.PlanCircle;
		objToInsert['requester']=this.Requester;
		objToInsert['wr_number']=this.wrname;
		objToInsert['id']=this.ID;
		objToInsert['printingDate']=this.datePipe.transform(this.printingDate,"dd-MM-yyyy");
		objToInsert['packagingDate']=this.datePipe.transform(this.packagingDate,"dd-MM-yyyy");
		objToInsert['deliveryDate']=this.datePipe.transform(this.deliveryDate,"dd-MM-yyyy");
		objToInsert['comments']=this.comments;
		objToInsert['username']=this.userName;
		
			this.planManagemetService.returnandReciceve(objToInsert).subscribe(
			
			data=>{ if(data!=null){
							alert("Plan Has Been Sucessfully generated")
							
				this.uploadCsv(this.ID);
			}
				
				
			}
		)
	
	console.log(this.datePipe.transform(this.printingDate,"dd-MM-yyyy"))
	
}



uploadCsv(id:number){
        if (this.fileToUpload == undefined || !this.fileToUpload.name.endsWith(".csv")) {
          alert("Please Select A csv file");
        } else {
            this.uploading = true
            this.planManagemetService.postReturnFile(this.fileToUpload,id).subscribe((res => {
                this.uploading = false
                if (res == null) {
                   alert("Failed to Upload File")
                   this.getData();
                } else {
	
						this.getData();
                    this.isProceed=false;
                    this.isConfig=true;
                   
                    
                
                }
            }), err => {
                this.uploading = false
                this.fileuploadstatus = err.error.message;
                this.fileerror = true;
            })
            console.log(this.fileToUpload.size);
        }
}


handleFileInput(files: FileList) {
        this.fileerror = false;
        this.filesuccess = false;
        this.fileToUpload = files.item(0);
        this.fileName = this.fileToUpload.name;
    }  		
    }