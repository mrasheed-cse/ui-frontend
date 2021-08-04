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
      providers: [AppGlobals,LoginService,SSMService,DatePipe],
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
  			 			
  	constructor(private datePipe: DatePipe,private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private ssmService: SSMService ) {
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

cancel(){
			this.noDropdownSelected=true;
  			this.isArtworkFound=false;
  			this.isaddArtwork=false;
  			this.isVendorFound=false;
  			this.isAddVendor=false;
  			this.isStkFound=false;
  			this.isAddStk=false;
  			this.listArtwork=[];
  			this.listStk=[];
  			this.listVendor=[];
	
}    
	
}