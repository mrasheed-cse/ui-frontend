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
    templateUrl: 'voucher_generation_forward_technology.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,SSMService,DatePipe],})

export class VoucherGenerationForward implements OnInit {
	
	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			batchNo:string;
			listVoucherHopsdata:any[];
  			firstHop:boolean=false;
  			isfirsthopProceed:boolean=false;
		comments:string;
  			Id:number;
  			hop:number;
  			fileToUpload: File = null;
    		fileuploadstatus: string;
    		fileName: string;
    		fileerror: boolean = false;
   			 filesuccess: boolean = false;
    		uploading: boolean = false;

	constructor(private datePipe: DatePipe,private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private ssmService: SSMService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
      this.hop=2;
      this.getData(this.hop);
    }
    else {
      this.router.navigate(['pages/login']);
    }
   
    }
     
    getData(hop:number){
	this.firstHop=true;
	this.listVoucherHopsdata=[];
	this.isfirsthopProceed=false;
	this.comments="";
	this.fileToUpload=null;
	this.ssmService.getApproval1HopData(this.hop).subscribe(data=>{
		for (let index in data) {
			
			this.listVoucherHopsdata.push(
					{
						
						ponumber:data[index].ponumber,
						batchNo: data[index].batchNo,
						 id:data[index].id,
						
						
					}
					
					);
		}
		
		
		
	})
	
}
    
     
	detailsSecondHop(id:number){
		this.isfirsthopProceed=true;
		
		this.firstHop=false;
		this.Id=id;
		
	}
	submit(){
	this.dndUpload();
			console.log(this.comments);
	this.ssmService.setSeccondHop(this.userName,this.Id,this.comments).subscribe(

		data=>{
			if(data!=null){
				alert("DATA Saved And Forwarded");
				this.getData(this.hop);
			}
			
		}
	)
	
	
      }
      
cancel(){
	
	this.ssmService.cancelHop(this.userName,this.Id).subscribe(
		
		data=>{
			if(data!=null){
				alert("Voucher Request is Cancled");
				this.getData(this.hop);
				
			}
			
		}
	)
	
}
    
dndUpload() {
	console.log("File iuploading")
        this.fileerror = false;
        this.filesuccess = false;
        if (this.fileToUpload == undefined || !this.fileToUpload.name.endsWith(".csv")) {
            this.fileuploadstatus = 'Please select a csv file';
            this.fileerror = true;
        } else {
            this.uploading = true
            this.ssmService.postFile(this.fileToUpload,this.Id).subscribe((res => {
                this.uploading = false
                if (res == null) {
                    this.fileuploadstatus = 'File Upload Fail';
                    this.fileerror = true;
                } else {
                    this.fileuploadstatus = 'File Upload Success';
                    this.filesuccess = true;
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
 
   ngOnInit(){
		
	}
       
   
}