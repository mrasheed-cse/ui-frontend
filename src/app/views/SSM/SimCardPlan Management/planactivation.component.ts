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
import {throwError as _throw} from 'rxjs';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import{PlanManagementService } from './plan_management.service';
import { Observable } from 'rxjs';
import {DatePipe} from '@angular/common';





@Component({
    selector: 'app-voucherGen',
    templateUrl: './planactivation.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,PlanManagementService,DatePipe],
})
export class PlanActivation implements OnInit {
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			isConfig:boolean=true;
  			listPlangenerateData=[];
  			ID:number;
  			hop:number;
  			isProceed:boolean=false;
  			fileToUpload: File = null;
    		fileuploadstatus: string;
    		fileName: string;
    		fileerror: boolean = false;
   		    filesuccess: boolean = false;
    		uploading: boolean = false;
    		isLoading:boolean=false;
  			
constructor(private datePipe: DatePipe,private router: Router,private loginService:
  			 LoginService,private http: HttpClient, private _global: AppGlobals, private planManagemetService: PlanManagementService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
    this.hop=5;
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
		data=>{ console.log(data)
			for (let index in data) {
				this.listPlangenerateData.push(
					
					{
						productname: data[index].productname,
						quantity: data[index].quantity,
						wrnumber:data[index].wr_number,
						creatorname: data[index].creatorname,
						 id:data[index].id,
						 printingdate: this.datePipe.transform(data[index].printingdate,"dd-MM-yyyy"),
						 packagingdate: this.datePipe.transform(data[index].packagingdate,"dd-MM-yyyy"),
						 deliverydate:  this.datePipe.transform(data[index].deliverydate,"dd-MM-yyyy"),
						
						
					}
				);
			}
			
		}
		
	)
	
	}


handleFileInput(files: FileList) {
        this.fileerror = false;
        this.filesuccess = false;
        this.fileToUpload = files.item(0);
        this.fileName = this.fileToUpload.name;
    }  		
    
    
    
submit(){ 
	this.isLoading=true;
	var user=JSON.stringify(this.userName).replace(".","!");
            console.log(user)
			var uploadFor=user+","+JSON.stringify(this.ID);
			
        if (this.fileToUpload == undefined || !this.fileToUpload.name.endsWith(".csv")) {
			this.planManagemetService.PlanActivationWOFileUpload(uploadFor).subscribe((res => {
				if (res != null) {
					if(JSON.stringify(res)==="1"){
                   alert("Plan Activation done");
                   this.getData();
                }
                else if(JSON.stringify(res)==="2"){
					alert("A problem occured for plan activation.");
				}
			}
			}));
          this.isLoading=false;
        } else {
            this.uploading = true
           /* var user=JSON.stringify(this.userName).replace(".","!");
            console.log(user)
			var uploadFor=user+","+JSON.stringify(this.ID);
		*/
            this.planManagemetService.postfaultyFile(this.fileToUpload,uploadFor).subscribe((res => {
                this.uploading = false
                if (res != null) {
					if(JSON.stringify(res)==="1"){
                   alert("Faulty Kit marked Sucessfully")
                   this.getData();
                }
                else if(JSON.stringify(res)==="2"){
	
					alert("Unable to Perform Activity please check The uploaded File again")
					this.getData();
				} else if(JSON.stringify(res)==="3"){
			
					alert("Data Does not Exsist Please check File Again")
					this.getData();
				}
               
                
                } 
                
                else {
                   alert("Upload Sucessfull")
                    this.isProceed=false;
                    this.isConfig=true;
                   
                    
                
                }
            }), err => {
                this.uploading = false
                this.fileuploadstatus = err.error.message;
                this.fileerror = true;
            })
            console.log(this.fileToUpload.size);
           this.isLoading=false;
        }
}    	
  			}