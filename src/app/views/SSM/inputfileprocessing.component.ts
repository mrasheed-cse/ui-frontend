import {  NgModule,
  Component,
  Pipe,
  OnInit,
  ViewChild} from '@angular/core';
  import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {throwError as _throw} from 'rxjs';
import { AppGlobals } from './../../app.global';
import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser';
import{SSMService } from './SSM.service';
import{PlanManagementService } from '../SSM/SimCardPlan Management/plan_management.service';
@Component({
    selector: 'app-searchPO',
    templateUrl: './inputfileprocessing.component.html',
    styleUrls: ['./search_po.component.scss'],
    providers: [AppGlobals, LoginService, SSMService, DatePipe, PlanManagementService],
    standalone: false
})
export class InputFileProcessing implements OnInit {
	 private rowData: any[];
	 private insertRowData: any[];
  private offset: number;
  private rawDataFromBackend :Array<Object>;
  private rawDataFromBackendImsi :  any[];
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
 			todayDate: Date;
			routerUrlAndParams: string;
  			isDataFound: boolean ;
  			isDataFoundOther: boolean ;
			PoNumber: string;
			ImsiType:string;
			Quantity:string;
			Artwork:string;
			STK:string;
			AvailableQty:number;
			Vendor:string;
			isLoading:boolean=false
			 public listIMSI = [];
			 public listArtwork=[];
			 public listVendor=[];
			 public listStk=[];
			FormGroup:{};
			listno:string;
	constructor(private router: Router, private planManagemetService: PlanManagementService ,private loginService: LoginService,private datePipe: DatePipe,private http: HttpClient, private _global: AppGlobals, private ssmService: SSMService ) {
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

   
    this.rowData = [];    
this.insertRowData=[];
		
    }
	
	  
search(){
	this.isDataFound = false;
	this.isDataFoundOther=false;
	  this.rowData = [];  
	  this.listIMSI = [];
	  this.listArtwork=[];
	  this.listVendor=[];
	this.listStk=[];
	this.ssmService.getPoInformation(this.PoNumber,"Input").subscribe(
		 data => {
			 this.rawDataFromBackend = data;
			 console.log(this.rawDataFromBackend)
          if(data !=null){
	this.isDataFound = true;
	this.getImsi();         
	this.getArtwork();
	this.getStk();
	this.getVendor();
           this.isDataFound = true;
          
          
           for (let index in data) {
					this.rowData.push(
					{
						id:data[index].id,
						availableQuantity: data[index].availableQuantity,
						supplier: data[index].supplier,
						poExpireDate: this.datePipe.transform(data[index].poExpireDate,"dd-MM-yyyy"),
					itemDescription: data[index].itemDescription
					}
					);
				}
				console.log(this.rowData[0].itemDescription)
				this.AvailableQty=this.rowData[0].availableQuantity
          }
          else{
            this.isDataFound = false;
            alert("PO Not Found");
          }
        },
      err => console.error(err),
      this.isDataFound = false
     	);
}

submit(){
	
	this.insertRowData=[];
	if( parseInt(this.rowData[0].availableQuantity)>=parseInt(this.Quantity)){
	if(this.ImsiType!=null&&this.STK!=null&&this.Vendor!=null&&this.Artwork!=null){
		 this.isDataFoundOther=true;
			this.ssmService.getImsiAndICCID(this.ImsiType,this.Quantity,this.Vendor).subscribe(
		 data => {
			if(data !=null){ 
				this.rawDataFromBackendImsi=data;
		 var objToInsert1 = {};
		 console.log(this.rowData[0].itemDescription," Desc ")
                  objToInsert1['poNumber'] = this.rowData[0].id;
                  objToInsert1['description'] = this.rowData[0].itemDescription;
                  objToInsert1['startImsi'] = this.rawDataFromBackendImsi['startImsi'];
                  objToInsert1['endImsi'] = this.rawDataFromBackendImsi['endImsi'];
                   objToInsert1['startIccid'] = this.rawDataFromBackendImsi['startIccid'];
                  objToInsert1['endIccid'] = this.rawDataFromBackendImsi['EndIccid'];
                  objToInsert1['quantity'] = this.Quantity;
                  objToInsert1['stk'] = this.STK;
                  objToInsert1['artwork']=this.Artwork;
                  objToInsert1['vendor']=this.Vendor;
                  objToInsert1['imsiType']=this.ImsiType;
                  this.FormGroup=objToInsert1;
                  console.log(objToInsert1)
                  console.log(this.FormGroup);
                  this.insertRowData.push(objToInsert1);
                 
                  }
                  else{ console.log("4")
						 this.isDataFoundOther=false;
					  alert("No Data Found")
	
					}
                  },
		err => {console.error(err),
      this.isDataFoundOther = false
     	});
		}
		else{
		 this.isDataFoundOther=false;
		alert(" Please fill all the correct values ")}
		
	}
	else{ 
	 this.isDataFoundOther=false;
		alert("Quantity Should be less then Avilable Quantity ")
	}
	  
    
	
};


save(){
	if(this.isDataFoundOther){
this.isLoading=true;	
this.ssmService.saveData(this.FormGroup['poNumber'],this.FormGroup['startImsi'],this.Quantity
,this.FormGroup['startIccid'],this.FormGroup['stk'],this.FormGroup['artwork']
,this.FormGroup['vendor'],this.FormGroup['imsiType']).subscribe(
	 data => {
		if(data!=null)
		alert("Data Saved")
		this.isLoading=false;
	},
	err => {console.error(err),
	this.isLoading=false;
});
}
	else{
		
		alert("Please Generate data before This Step")
	}
	
	
}

//GetAllIMSI
getImsi(){ 
this.ssmService.GetAllIMSI().subscribe(
	data => {
				//console.log(data);
				for (let index in data) {
					this.listIMSI.push(
					{
						id:data[index].id,
						group_name: data[index].groupName,
					
					}
					);
				}
			},
    err => console.error(err),
    );
    }
    
    getArtwork(){ 
this.ssmService.getAllArtwork().subscribe(
	data => {
				//console.log(data);
				for (let index in data) {
					this.listArtwork.push(
					{
						id:data[index].id,
						group_name: data[index].groupName,
					
					}
					);
				}
			},
    err => console.error(err),
    () => console.log('done loading IMSI List')
    );
    }
    
    getStk(){ 
this.ssmService.getAllstk().subscribe(
	data => {
				//console.log(data);
				for (let index in data) {
					this.listStk.push(
					{
						id:data[index].id,
						group_name: data[index].groupName,
					
					}
					);
				}
			},
    err => console.error(err),
    );
    }
	
	getVendor(){ 
		
		this.listno="7";
	this.planManagemetService.getDropdown(this.listno).subscribe(
		
	data => {
				//console.log(data);
				for (let index in data) {
					this.listVendor.push(
					{
						id:data[index].id,
						group_name: data[index].groupName,
					
					}
					);
				}
			},
    err => console.error(err),
    );
    }
	ngOnInit() { 
   
    }
}