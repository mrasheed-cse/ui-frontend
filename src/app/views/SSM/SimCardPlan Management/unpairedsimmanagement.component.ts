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
    templateUrl: './unpairedsimmanagement.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,PlanManagementService,DatePipe],
})

export class UnplannedSimManagement implements OnInit {
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			isLoading:boolean=false;
  			fileToUpload: File = null;
    		fileuploadstatus: string;
    		fileName: string;
    		fileerror: boolean = false;
   		    filesuccess: boolean = false;
    		uploading: boolean = false;
			id:string;
			
			  			
constructor(private datePipe: DatePipe,private router: Router,private loginService:
  			 LoginService,private http: HttpClient, private _global: AppGlobals, private planManagemetService: PlanManagementService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
      
      this.getUserDetails();
     
    }
    else {
      this.router.navigate(['pages/login']);
    }
   
    }
    
     dndUpload() {
        this.fileerror = false;
        this.filesuccess = false;
        if (this.fileToUpload == undefined ) {
            this.fileuploadstatus = 'Please select a  file';
            this.fileerror = true;
              this.isLoading=false;
        } else {
            this.uploading = true
            this.isLoading=true
            this.planManagemetService.uploadunpairedfile(this.fileToUpload,this.id).subscribe((res => {
                this.uploading = false
                if (res == null) {
                    this.fileuploadstatus = 'File Upload Fail';
                    this.fileerror = true;
                    this.isLoading=false;this.uploading=true;
                } 
                else {
	this.fileuploadstatus="Data Saved Sucessfully"
                    this.filesuccess = true;
                    this.isLoading=false;
                }
            }), err => {
                this.uploading = false
                this.fileuploadstatus = 'File Upload Fail';
                this.fileuploadstatus = err.error.message;
                this.fileerror = true;
                this.isLoading=false;
            })
            console.log(this.fileToUpload.size);
        }
    }
    handleFileInput(files: FileList) {
        this.fileerror = false;
        this.filesuccess = false;
        this.fileToUpload = files.item(0);
          this.isLoading=false;
        this.fileName = this.fileToUpload.name;
    }
    
    getUserDetails(){
	 this.planManagemetService.getUser(this.userName).subscribe(res => {
		
		if(res!=null){
			
			this.id=res;
		}
		
	})
	
}
    
       ngOnInit(){
	
}
}
    
		
		
		
    
  			