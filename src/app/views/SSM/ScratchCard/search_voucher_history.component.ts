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
    templateUrl: './search_voucher_history.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,SSMService,DatePipe],
})
export class SearchVoucherHistory implements OnInit {
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			dataFound: boolean=false;
  			BatchNumber:number 
  			isLoading:boolean=false;
  			printedExpiryDate:string;
  			nwExpiryDate:string;
  			confirmationLog :string;
  			confirmationTech:string;
  			requestActivation:string;
  			dataSendToVendor:string;
  			hrnDate:string;
  			quantity:string;
  			startSerial:string;
  			endSerial:string;
  			denomination:string;
  			po:string;
  			
  			
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

search(){
	
	this.ssmService.getBatchDetails(this.BatchNumber).subscribe(data=>{
		
		if(data!=null){
		
		this.dataFound=true;
			this.printedExpiryDate=this.datePipe.transform(data['printedExpiryDate']);
  			this.nwExpiryDate=this.datePipe.transform(data['nwExpiryDate']);
  			this.confirmationLog =this.datePipe.transform(data['confirmationLog']);
  			
  			this.confirmationTech=this.datePipe.transform(data['confirmationTech']);
  			this.requestActivation=this.datePipe.transform(data['requestActivation']);
  			this.dataSendToVendor=this.datePipe.transform(data['dataSendToVendor']);
  			this.hrnDate=this.datePipe.transform(data['hrnDate']);
  			this.quantity=data['quantity']
  			this.startSerial=data['startSerial']
  			this.endSerial=data['endSerial']
  			this.denomination=data['denomination'];
  			this.po=data['po']
	}
	
	}
	,
		err=>{console.error(err);
		alert("Unable to find Details")
	}
	)
	
}


back(){
	this.dataFound=false;
			this.printedExpiryDate="";
  			this.nwExpiryDate="";
  			this.confirmationLog ="";
  			
  			this.confirmationTech="";
  			this.requestActivation="";
  			this.dataSendToVendor="";
  			this.hrnDate="";
  			this.quantity=""
  			this.startSerial=""
  			this.endSerial=""
  			this.denomination="";
  			this.po=""
	
}
ngOnInit() {}


}