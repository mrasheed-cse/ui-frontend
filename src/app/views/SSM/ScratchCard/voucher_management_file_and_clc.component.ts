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
import{SSMService } from '../SSM.service';
import {DatePipe} from '@angular/common';





@Component({
    selector: 'app-voucherGen',
    templateUrl: './voucher_management_file_and _clc.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,SSMService,DatePipe],
})
export class VoucherManagementActivationAndView implements OnInit {
	
	
	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			listVoucherHopsdata:any[];
  			filename: any[];
  			firstHop:boolean=false;
  			isfirsthopProceed:boolean=false;
  			isotherHopsApproval:boolean=false;
  			comments:string;
  			hop:number;
  			clcHop:boolean=false;
isLoading:boolean = false;
  			
  	constructor(private datePipe: DatePipe,private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private ssmService: SSMService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
if(this.groupID==7||this.groupID==12||this.groupID==17){

this.hop=0;
	
	
}



    this.getData(this.hop);}
    else {
      this.router.navigate(['pages/login']);
    }
    }
    getData(hop:number){
		this.isLoading=true;
	this.firstHop=true;
	this.listVoucherHopsdata=[];
	this.isfirsthopProceed=false;
	this.isotherHopsApproval=false;
	this.ssmService.getApproval1HopData(this.hop).subscribe(data=>{
		for (let index in data) {
			
			this.listVoucherHopsdata.push(
					{
						
						ponumber:data[index].ponumber,
						batchNo: data[index].batchNo,
						 id:data[index].id,
						
						
					}
					
					);
					console.log(this.listVoucherHopsdata)
		}
		
		
		
	})
	this.isLoading=false;
}




    

 download(Id:number) {
        var nameOfFileToDownload = "";
        
		console.log("nameOfFileToDownload : "+nameOfFileToDownload);
		this.ssmService.getFilenameFromDB(Id).subscribe(data=>{
			if(data!=null){
				
				
				nameOfFileToDownload=data.fileName;
				console.log(nameOfFileToDownload)
			
			this.dnwdFile(nameOfFileToDownload)
		}
		
		});		
		
       
    }
 
dnwdFile(filename:string){
	
	 var result = this.ssmService.DownloadCSV(filename);
		console.log(result);
        result.subscribe(
            data => {
				//saveAs(data, nameOfFileToDownload);

				console.log("ToTOOO");
				//console.log(data);

				var blob = new Blob([data as any], { type: 'text/csv' });

                if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
		console.log("ggg");
                    (window.navigator as any).msSaveOrOpenBlob(blob, filename);
                } else {
                    var a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = filename;
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

ngOnInit(){
		
	}
	

    
    }