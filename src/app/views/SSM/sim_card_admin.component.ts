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
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {_throw} from 'rxjs/observable/throw';
import { AppGlobals } from './../../app.global';
import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser';
import{SSMService } from './SSM.service';
import{PlanManagementService} from'./SimCardPlan Management/plan_management.service'
import { Observable } from 'rxjs/Observable';
import {DatePipe} from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-voucherGen',
    templateUrl: './sim_card_admin.component.html',
      styleUrls: ['./search_po.component.scss'],
      providers: [AppGlobals,LoginService,SSMService,DatePipe,PlanManagementService],
})
export class SimAdmin implements OnInit {
	 	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			public noDropdownSelected:boolean=true;
  			isArtworkFound:boolean=false;
  			isaddArtwork:boolean=false;
  			newArtwork:string;
  			isVendorFound:boolean=false;
  			isAddVendor:boolean=false;
  			newVendor:string;
  			isStkFound:boolean=false;
  			isAddStk:boolean=false;
  			newStk:string;
  			listArtwork=[];
  			listStk=[];
  			listVendor=[];
  			listDropDownitemCode=[]
  			listno:string;
  			isItemcodeFound:boolean=false;
  			isAddItemcode:boolean=false;
  			ItemCode:string;
  			isproductnameFound:boolean=false;
  			listDropDownproductname=[];
  			isAddproductname:boolean=false;
  			productname:string;
  			isproductcodeFound:boolean=false;
  			listDropDownproductCode=[];
  			isAddproductcode:boolean=false;
  			productCode:string;
  			isAddSharerName:boolean=false;
  			isSharerNameFound:boolean=false;
  			listDropDownSharerName=[];
  			SharerName:string;
  			isCircleFound:boolean=false;
  			listDropDownCircle=[];
  			isAddcircle:boolean=false;
  			circle:string;
  			isrequesterFound:boolean=false;
  			listDropDownrequester=[];
  			isAddrequester:boolean=false;
  			requester:string;
  			 			
  	constructor(private datePipe: DatePipe,private router: Router,private loginService: LoginService,private http: HttpClient, private planManagemetService:PlanManagementService,private _global: AppGlobals, private ssmService: SSMService ) {
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
    
    ngOnInit(){}
    
getArtwork(){ 
	this.listArtwork=[];
	this.noDropdownSelected=false;
 	this.isArtworkFound=true;
 	this.isaddArtwork=false;
 	this.newArtwork=null;
	this.ssmService.getAllArtwork().subscribe(
		data => {
				//console.log(data);
				for (let index in data) {
					this.listArtwork.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					
					}
					);
				}
			},
    	err => console.error(err),
    );
    }
    
    clearArtwork(linkno: number) {
        this.ssmService.deleteArtwork(linkno).subscribe((res => {
            if (res == false) {
              alert("Failed to delete")
            } else {
                this.getArtwork()
            }
        }), err => { console.error(err)
            
        });
    }
     
    addArtwork(){
	this.isaddArtwork=true;
	this.isArtworkFound=false;
	}   
    
    submitArtwork(){
		this.ssmService.saveArtwork(this.newArtwork).subscribe((res => {
            if (res == false) {
              alert("Failed to add")
            } else {
				alert("Data Saved")
                this.getArtwork()
            }
        }),
         err => { console.error(err)
            
        });
        }
     
     
 getStk(){ 
	this.noDropdownSelected=false;
	this.isStkFound=true;
	this.isAddStk=false;
	this.listStk=[];
	this.newStk=null;
	
	this.ssmService.getAllstk().subscribe(
		data => {
				for (let index in data) {
					this.listStk.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					
					}
					);
				}
			},
	    err => console.error(err),
	    );
    }

clearStk(linkno: number) {
        this.ssmService.deleteSTK(linkno).subscribe((res => {
            if (res == false) {
              alert("Failed to delete")
            } else {
                this.getStk()
            }
        }), err => { console.error(err)
            
        });
    } 
addStk(){this.isAddStk=true;
this.isStkFound=false;}

submitStk(){
	
	this.ssmService.saveStk(this.newStk).subscribe((res => {
            if (res == false) {
              alert("Failed to add")
            } else {
				alert("Data Saved")
                this.getStk()
            }
        }), err => { console.error(err)
            
        });
	
	
}

vendorName(){ 
	this.noDropdownSelected=false;
	this.isVendorFound=true;
	this.isAddVendor=false;
	this.listVendor=[];
	this.newVendor=null;
	this.listno="7";
this.planManagemetService.getDropdown(this.listno).subscribe(
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
    
clearVendor (linkno: number) {
        this.ssmService.deleteVendor(linkno).subscribe((res => {
            if (res == false) {
              alert("Failed to delete")
            } else {
                this.vendorName()
            }
        }), err => { console.error(err)
            
        });
    } 
    
addVendor(){this.isAddVendor=true;
this.isVendorFound=false;}    

submitVendor(){
	
	this.ssmService.saveVendor(this.newVendor).subscribe((res => {
            if (res == false) {
              alert("Failed to add")
            } else {
				alert("Data Saved")
                this.vendorName()
            }
        }), err => { console.error(err)
            
        });
	
	
}

getitemCode(){
	this.noDropdownSelected=false;
	this.isItemcodeFound=true;
	this.listno="1";
	this.planManagemetService.getDropdown(this.listno).subscribe(
		data=>
			{
				//console.log(data);
				for (let index in data) {
					this.listDropDownitemCode.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err));
			
	
}
addItemCode(){
	
	this.isAddItemcode=true;
	this.isItemcodeFound=false;
}
submitItemCode(){}

clearItemid(linkno: number){}
cancel(){
			this.noDropdownSelected=true;
  			this.isArtworkFound=false;
  			this.isaddArtwork=false;
  			this.isVendorFound=false;
  			this.isAddVendor=false;
  			this.isStkFound=false;
  			this.isAddStk=false;
  			this.isItemcodeFound=false;
  			this.isAddItemcode=false;
  			this.isAddproductname=false;
  			this.isproductnameFound=false;
  			this.isAddproductcode=false;
  			this.isproductcodeFound=false;
  			this.isSharerNameFound=false;
  			this.isAddSharerName=false;
  			this.isAddcircle=false;
  			this.isCircleFound=false;
  			this.isAddrequester=false;
  			this.isrequesterFound=false;
  			this.listArtwork=[];
  			this.listStk=[];
  			this.listVendor=[];
  			this.listDropDownitemCode=[];
  			this.listDropDownproductname=[];
  			this.listDropDownproductCode=[];
  			this.listDropDownCircle=[];
  			this.listDropDownrequester=[];
  			this.listDropDownSharerName=[]
	
}    

getProductname(){
	this.noDropdownSelected=false;
	this.isproductnameFound=true;
	this.listno="3";
	this.planManagemetService.getDropdown(this.listno).subscribe(
		data=>
			{
				//console.log(data);
				for (let index in data) {
					this.listDropDownproductname.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err));
}

addProductName(){
	this.isAddproductname=true;
	this.isproductnameFound=false;
	
}
clearproductname(linkno: number){}

submitProductname(){}
	
	getProductCode(){
	this.noDropdownSelected=false;
	this.isproductcodeFound=true;
	this.listno="2";
	this.planManagemetService.getDropdown(this.listno).subscribe(
		data=>
			{
				//console.log(data);
				for (let index in data) {
					this.listDropDownproductCode.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err));
}

clearproductCode(linkno:number){}

addProductCode(){
	this.isAddproductcode=true;
	this.isproductcodeFound=false;
	
}

submitProductcode(){}


getSharerCode(){
	this.noDropdownSelected=false;
	this.isSharerNameFound=true;
	this.listno="4";
	this.planManagemetService.getDropdown(this.listno).subscribe(
		data=>
			{
				//console.log(data);
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

addSharerName(){
	
	this.isAddSharerName=true;
	this.isSharerNameFound=false;
}
	clearSharerName(linkno:number){}
	
	submitSharerName(){}
	
	getCircle(){
	this.noDropdownSelected=false;
	this.isCircleFound=true;
	this.listno="5";
	this.planManagemetService.getDropdown(this.listno).subscribe(
		data=>
			{
				//console.log(data);
				for (let index in data) {
					this.listDropDownCircle.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err));
}
addcircle(){
	this.isAddcircle=true;
	this.isCircleFound=false;

}
clearcircle(linkno:number){}

submitPlanCircle(){}

	getRequester(){
	this.noDropdownSelected=false;
	this.isrequesterFound=true;
	this.listno="6";
	this.planManagemetService.getDropdown(this.listno).subscribe(
		data=>
			{
				//console.log(data);
				for (let index in data) {
					this.listDropDownrequester.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err));
}

addRequester(){
	this.isAddrequester=true;
	this.isrequesterFound=false;
	}
submitRequester(){}

clearRequester(linkno:number){}

}