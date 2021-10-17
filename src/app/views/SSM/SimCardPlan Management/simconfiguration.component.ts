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
    templateUrl: './simconfiguration.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,PlanManagementService,DatePipe],
})

export class SimConfiguration implements OnInit {
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
  			isLoading:boolean=false;
  			
  			constructor(private datePipe: DatePipe,private router: Router,private loginService:
  			 LoginService,private http: HttpClient, private _global: AppGlobals, private planManagemetService: PlanManagementService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
      this.hop=2;
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
		
	}
    
    
    
    
  downloadCSVFiles() {
        var nameOfFileToDownload = "PlanGenerate_ID_"+this.ID+".csv";
		console.log("nameOfFileToDownload : "+nameOfFileToDownload);

        var result = this.planManagemetService.DownloadCSV(nameOfFileToDownload);
        result.subscribe(
            data => {
				//saveAs(data, nameOfFileToDownload);

				console.log("ToTOOO");
				//console.log(data);

				var blob = new Blob([data], { type: 'text/csv' });

                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
		console.log("ggg")
                    window.navigator.msSaveOrOpenBlob(blob, nameOfFileToDownload);
                } else {
                    var a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = nameOfFileToDownload;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            },
            err => {console.error(err),
                alert("Server error while downloading file.");
            }
        );
    }
    
 submit(){
	this.isLoading=true;
	this.planManagemetService.setHop(this.userName,this.ID,this.comments).subscribe(

		data=>{
			if(data!=null){
				this.isLoading=false;
				this.getData();
			}
			
		}
	)
	
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
    getData(){
	this.isConfig=true;
	this.listPlangenerateData=[];
	this.isProceed=false;
	console.log(this.hop)
	this.planManagemetService.getConfig(this.hop).subscribe(
		data=>{
			for (let index in data) {
				this.listPlangenerateData.push(
					
					{
						itemcode:data[index].itemcode,
						wrnumber:data[index].wr_number,
						creatorname: data[index].creatorname,
						 id:data[index].id,
						productname: data[index].productname,
					}
				);
			}
			
		}
		
	)
	
	}
    
    
    }