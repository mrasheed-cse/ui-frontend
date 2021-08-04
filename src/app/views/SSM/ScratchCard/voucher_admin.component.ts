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
    templateUrl: './voucher_admin.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,SSMService,DatePipe],
})
export class VoucherAdmin implements OnInit {
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			public noDropdownSelected:boolean=true;
  			isDenominationfound:boolean=false;
  			isaddDenomination:boolean=false;
  			newDenomination:number;
  			isVendorFound:boolean=false;
  			isAddvendor:boolean=false;
  			newVendor:string;
  			isvoucherSerialFound:boolean=false;
  			isAddVoucherSerial:boolean=false;
  			newVoucherSerial:number;
  			isCardGroupFound:boolean=false;
  			isAddCardGroup:boolean=false;
  			newCardGroup:string;
  			newMapDenomination:number;
  			ishiddenSerialFound:boolean=false;
  			isAddHiddenSerial:boolean=false;
  			newHiddenSerial:number;
  			isSftpFound:boolean=false;
  			isAddSftp:boolean=false;
  			newSftp:string;
  			listVendorwiseSFTP=[];
  			listvoucherserialdigitshidden=[];
  			listvoucherserialdigits=[];
  			listDenomination=[];
  			listVendor=[];
  			listCardGroup=[];
  	
  	
	  			
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
    
    ngOnInit(){
	
}
denomination(){
	this.noDropdownSelected=false;
 	this.isDenominationfound=true;
this.ssmService.getDenoMination().subscribe(
	data => {
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


clearDenomination(linkno: number) {
        this.ssmService.deleteDenomination(linkno).subscribe((res => {
            if (res == false) {
              alert("Failed to delete")
            } else {
                this.denomination()
            }
        }), err => { console.error(err)
            
        });
    }
 
addDenomination(){this.isaddDenomination=true;
this.isDenominationfound=false;}  

SubmitDenomination(){}  

vendorName(){ 
	this.noDropdownSelected=false;
	this.isVendorFound=true;
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
    
addVendor(){this.isAddvendor=true;
this.isVendorFound=false;}    

SubmitVendor(){}


voucherSerial(){
	this.noDropdownSelected=false;
	this.isvoucherSerialFound=true;
this.ssmService.getvoucherSerial().subscribe(
	data => {
				//console.log(data);
				for (let index in data) {
					this.listvoucherserialdigits.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);}
			},
    err => console.error(err))
    }


clearVoucherSerial(linkno: number) {
        this.ssmService.deleteVoucherSerial(linkno).subscribe((res => {
            if (res == false) {
              alert("Failed to delete")
            } else {
                this.voucherSerial()
            }
        }), err => { console.error(err)
            
        });
    } 
    
addVoucherSerial(){
	this.isvoucherSerialFound=false;
	this.isAddVoucherSerial=true;
	}

SubmitVoucherSerial(){}



cardGroup(){
	
	this.noDropdownSelected=false;
	this.isCardGroupFound=true;
this.ssmService.getAllCard().subscribe(
	data => {
				//console.log(data);
				for (let index in data) {
					this.listCardGroup.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
						denominationId: data[index].denominationId,
					}
					);
				}
			},
    err => console.error(err),);
	
}

clearCardGroup(linkno: number) {
        this.ssmService.deleteCardGroup(linkno).subscribe((res => {
            if (res == false) {
              alert("Failed to delete")
            } else {
                this.cardGroup()
            }
        }), err => { console.error(err)
            
        });
    }
addCardGroup(){
	this.isCardGroupFound=false;
	this.isAddCardGroup=true;
	
	
}     
SubmitCardGroup(){}

voucherHiddenNumber(){ 
	this.noDropdownSelected=false;
	this.ishiddenSerialFound=true;
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
    
clearHiddenSerial   (linkno: number) {
        this.ssmService.deleteHiddenSerial(linkno).subscribe((res => {
            if (res == false) {
              alert("Failed to delete")
            } else {
                this.voucherHiddenNumber()
            }
        }), err => { console.error(err)
            
        });
    } 
    
addHiddenSerial(){
	this.ishiddenSerialFound=false;
	this.isAddHiddenSerial=true
	
}    
SubmitHiddenSerial(){};

vendorWiseSFTP(){
	 	this.noDropdownSelected=false;
	 	this.isSftpFound=true;
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

clearSftp (linkno: number) {
        this.ssmService.deleteVendorSftp(linkno).subscribe((res => {
            if (res == false) {
              alert("Failed to delete")
            } else {
                this.voucherHiddenNumber()
            }
        }), err => { console.error(err)
            
        });
    } 
    
    
addSftp(){this.isSftpFound=false;
    this.isAddSftp=true;
}

SubmitSftp(){}


cancel(){
	
			this.noDropdownSelected=true;
  			this.isDenominationfound=false;
  			this.isaddDenomination=false;
  			this.isVendorFound=false;
  			this.isAddvendor=false;
  			this.isvoucherSerialFound=false;
  			this.isAddVoucherSerial=false;
  			this.isCardGroupFound=false;
  			this.isAddCardGroup=false;
  			this.ishiddenSerialFound=false;
  			this.isAddHiddenSerial=false;
  			this.isSftpFound=false;
  			this.isAddSftp=false;
  			this.listVendorwiseSFTP=[];
  			this.listvoucherserialdigitshidden=[];
  			this.listvoucherserialdigits=[];
  			this.listDenomination=[];
  			this.listVendor=[];
  			this.listCardGroup=[];
	
	
}

  			}