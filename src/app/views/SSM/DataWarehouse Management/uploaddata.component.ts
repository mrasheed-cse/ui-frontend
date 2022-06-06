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
import{DatawarehouseService} from'../DataWarehouse Management/datawarehouse.service'
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import { Observable } from 'rxjs/Observable';
import {DatePipe} from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-voucherGen',
    templateUrl: './uploaddata.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,DatePipe,DatawarehouseService],
})
export class UploadDataWh implements OnInit {
	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			uploadFor:string;
  			 fileToUpload: File = null;
    		fileuploadstatus: string;
    		fileName: string;
    		fileerror: boolean = false;
   			 filesuccess: boolean = false;
    		uploading: boolean = false;
    		 isLoading:boolean=false
  constructor(private datePipe: DatePipe,private router: Router,private loginService:
  			 LoginService,private http: HttpClient, private _global: AppGlobals, private datawarehouseservice:DatawarehouseService ) {
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
submit(){
	var val;
	this.isLoading=true;
	//console.log("Selected for "+this.uploadFor)
	if(this.uploadFor!=null){if(this.uploadFor==="0"){
		val="AUC";
	}
	else if(this.uploadFor==="1"){
		val="ADC"
	}
	
	
	this.datawarehouseservice.uploadCsv(this.fileToUpload,val).subscribe(
	
		data=>{ 
			
			const dataStr = JSON.stringify(data);

			JSON.parse(dataStr, (key, value) => {
				if (typeof value === 'string') {
					alert(value);
				}
			});
			if(data!=null){

			
			alert("Data Saved  Sucessfully"); this.fileerror = false;
        this.filesuccess = false;
        this.fileToUpload = null;
        this.isLoading=false
		}
		 else{
			alert("respnse is null")
			 this.isLoading=false
		}
		
		},err => {
			
			//alert('err');
			const dataStr = JSON.stringify(err);
			JSON.parse(dataStr, (key, value) => {
				
				if (typeof value === 'string' ) {
					if(key==='text'){
						////alert(key+" : "+value);
						alert(value);
					}
				}
			});
		 this.isLoading=false
		}
	)
	}
	else{
		alert("Please Select a Value")
		 this.isLoading=false
	}
	
}	
 handleFileInput(files: FileList) {
        this.fileerror = false;
        this.filesuccess = false;
        this.fileToUpload = files.item(0);
        this.fileName = this.fileToUpload.name;
    }
    
ngOnInit(){
	
}
    }