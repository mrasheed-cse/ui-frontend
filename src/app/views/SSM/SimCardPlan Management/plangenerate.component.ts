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
    templateUrl: './plangenerate.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,PlanManagementService,DatePipe],
})
export class PlanGenerate implements OnInit {
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			planGenrationForm:FormGroup;
  			listitemDropDown=[];
  			listDropDownProductCode=[];
  			listDropDownProductName=[];
  			listDropDownSharerName=[];
  			listDropDownPlanCircle=[];
  			listDropDownRequester=[];
  			listDropDowninputFile=[];
  			quantity:string;
  			startKit:string;
  			endKit:string;
  			msisdnPlanid:string;
  			 public isDisableBtn:boolean = false;
  			 fileToUpload: File = null;
    		fileuploadstatus: string;
    		fileName: string;
    		fileerror: boolean = false;
   			 filesuccess: boolean = false;
    		uploading: boolean = false;
    		isDataFound:boolean=false;
    		listno:string;
    		startICCID:string;
    		public isLoading:boolean = false;
  			
  			constructor(private datePipe: DatePipe,private router: Router,private loginService:
  			 LoginService,private http: HttpClient, private _global: AppGlobals, private planManagemetService: PlanManagementService ) {
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
    
    ngOnInit() {
	this.createForm();
	this.getItem();
	this.getPlanCircle();
	this.getproductCode();
	this.getSharerName();
	this.getproductName();
	this.getRequester();
	this.onItemChange();
	this.getAllSimInputFile();
	this.onProductcodeChange();
}
    
   createForm(){	
	this.planGenrationForm= new FormGroup({
		ItemCode:new FormControl({value: ''}),
		ProductName:new FormControl({value: ''}),
		ProductCode:new FormControl({value: ''}),
		SharerName:new FormControl({value: ''}),
		PlanCircle:new FormControl({value: ''}),
		inputFile:new FormControl({value: ''}),
		requestDate:new FormControl(''),
		wrname:new FormControl(''),
		CustomerCategory:new FormControl({value: ''}),
		Requester:new FormControl({value: ''}),
		
	});
	
}

 clearForm(event: any){
	this.planGenrationForm.reset
	}
	
	dndUpload(check:string) {
        this.fileerror = false;
        this.filesuccess = false;
        if (this.fileToUpload == undefined || !this.fileToUpload.name.endsWith(".csv")) {
            this.fileuploadstatus = 'Please select a csv file';
            this.fileerror = true;
        } else {
            this.uploading = true
            this.planManagemetService.postFile(this.fileToUpload).subscribe((res => {
                this.uploading = false
                if (res == null) {
                    this.fileuploadstatus = 'File Upload Fail';
                    this.fileerror = true;
                } else {if(check=="Quantity"){
                    this.fileuploadstatus = 'File Upload Success';
                    this.filesuccess = true;
                    
                    this.quantity=JSON.stringify(res) ;
                    var num=Number(this.startICCID);
					console.log(num)
					var qty=Number(this.quantity);
	
						console.log(qty)
							var val=num+qty;
	
						this.endKit=this.planGenrationForm.controls.ProductCode.value+JSON.stringify(val);
                    
                }
                
                }
            }), err => {
                this.uploading = false
                this.fileuploadstatus = err.error.message;
                this.fileerror = true;
            })
            console.log(this.fileToUpload.size);
            
        }
    }

getQuantity(){
	this.dndUpload("Quantity");
	
	
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
		
				
onItemChange(){
	this.startKit=null;
	this.endKit=null
	
	this.planGenrationForm.get('inputFile').valueChanges.subscribe(selectab => {
		this.getStartSerial();
		
	});
	
}

onProductcodeChange(){
	
	this.planGenrationForm.get('ProductCode').valueChanges.subscribe(
		
		data=>{	this.startKit=null;
	this.startKit=this.planGenrationForm.controls.ProductCode.value+""+this.startICCID;
}
	)
	
}
getStartSerial(){
	this.startKit=null;
	this.endKit=null;
	 var val = {};
	 
	
		val['inputFile']=this.planGenrationForm.controls.inputFile.value;
		this.planManagemetService.getkitSerial(val['inputFile']).subscribe(
			data=>{this.startICCID=JSON.stringify(data)
		
			}
			
		)
		

		
}
		

    handleFileInput(files: FileList) {
        this.fileerror = false;
        this.filesuccess = false;
        this.fileToUpload = files.item(0);
        this.fileName = this.fileToUpload.name;
    }
    
    getAllSimInputFile(){
	
	this.planManagemetService.getSimInputFile().subscribe(
		data=>
			{
				//console.log(data);
				for (let index in data) {
					this.listDropDowninputFile.push(
					{
						id:data[index].id,
					}
					);
				}
			},
    err => console.error(err));
			
		
	
}
	submit1(){this.isLoading=true;
			this.isDataFound=true;
	 var objToInsert = {};
		objToInsert['itemcode']=this.planGenrationForm.controls.ItemCode.value;
		objToInsert['productname']=this.planGenrationForm.controls.ProductName.value;
		objToInsert['siminputfileid']=this.planGenrationForm.controls.inputFile.value;
		objToInsert['customercategory']	=this.planGenrationForm.controls.CustomerCategory.value;
		objToInsert['productcode']=this.planGenrationForm.controls.ProductCode.value;
		objToInsert['quantity']=this.quantity;
		objToInsert['sharername']=this.planGenrationForm.controls.SharerName.value;
		objToInsert['circle']=this.planGenrationForm.controls.PlanCircle.value;
		objToInsert['requester']=this.planGenrationForm.controls.Requester.value;
		objToInsert['wr_number']=this.planGenrationForm.controls.wrname.value;
		objToInsert['username']=this.userName;
		console.log(objToInsert )
		this.planManagemetService.generatePlan(objToInsert).subscribe(
			
			data=>{
				this.msisdnPlanid=JSON.stringify(data);
				this.SubmitCsv(this.msisdnPlanid);
				
			}
		)
		
		
	}

    
    

SubmitCsv(number:string){
	var x=number+","+this.startKit;
	this.planManagemetService.uploadCsv(this.fileToUpload,x).subscribe(
	
		data=>{ 	console.log(data)
			if(data!=null){
				console.log("Data Saved")
			this.isLoading=false;
			
			this.createForm();
			alert("Data Saved And forwarded Sucessfully");
			this.endKit=null;
			this.startKit=null;
			this.quantity=null;
			this.startICCID=null}
		}
	)
	
	
}	
  		}	
  			