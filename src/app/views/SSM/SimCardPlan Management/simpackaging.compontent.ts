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
import {throwError as _throw,  Observable } from 'rxjs';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import{PlanManagementService } from './plan_management.service';
import {DatePipe} from '@angular/common';





@Component({
    selector: 'app-voucherGen',
    templateUrl: './simpackaging.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,PlanManagementService,DatePipe],
})

export class SimPackaging implements OnInit {
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			isConfig:boolean=true;
  			listPlangenerateData=[];
  			ID:number;
  			hop:number;
  			isProceed:boolean=false;
  			printingDate:Date;
  			packagingDate:Date;
			deliveryDate:Date;
			todayDate: Date;
  			isLoading:boolean=false;
			Comments:any;
			  
			  

constructor(private datePipe: DatePipe,private router: Router,private loginService:
  			 LoginService,private http: HttpClient, private _global: AppGlobals, private planManagemetService: PlanManagementService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
	  this.hop=3;
	  this.getData();
	  	//Get Today Date
		this.todayDate = new Date();
	 
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

				var blob = new Blob([data as any], { type: 'text/csv' });

                if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
		console.log("ggg");
                    (window.navigator as any).msSaveOrOpenBlob(blob, nameOfFileToDownload);
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
	var delivery=this.datePipe.transform(this.deliveryDate,"dd-MM-yyyy");
	var packaging=this.datePipe.transform(this.packagingDate,"dd-MM-yyyy");
	var printing=this.datePipe.transform(this.printingDate,"dd-MM-yyyy");
	this.isLoading=true;
	this.planManagemetService.setPackeging(this.userName,this.ID,printing,packaging,delivery,this.Comments).subscribe(

		data=>{
			if(data!=null){
				this.isLoading=false;
				alert("DATA Saved And Forwarded");
				this.getData();
			}
			
		},
		err=>{
			console.log("Unable to Process")
			this.isLoading=false;
			this.getData();
			
		}
	)
	
}
    cancel(){
	this.isLoading=true;
		this.planManagemetService.cancelHop(this.userName,this.ID).subscribe(
		
		data=>{
			if(data!=null){
				this.isLoading=false;
				alert("Voucher Request is Cancled");
				this.getData();
				
			}
			
		},err=>{
			console.log("Unable to Process")
			this.isLoading=false;
			this.getData();
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
						quantity: data[index].quantity,
						
					}
				);
			}
			
		}
		
	)
	
	}
  			
  			
  			}