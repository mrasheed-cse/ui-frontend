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
import { FileoperationService } from '../../nsa/services/fileoperation.service';
import { Observable } from 'rxjs';
import {DatePipe} from '@angular/common';





@Component({
    selector: 'app-voucherGen',
    templateUrl: './unpairedsimmanagement.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,PlanManagementService,DatePipe,FileoperationService],
})

export class UnplannedSimManagement implements OnInit {
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
              userID: string;
              
              unpairedPlanGenrationForm:FormGroup;
  			listitemDropDown=[];
  			listDropDownProductCode=[];
  			listDropDownProductName=[];
  			
  			listDropDownRequester=[];
  			listno:string;
  			isLoading:boolean=false;
  			fileToUpload: File = null;
    		fileuploadstatus: string;
    		fileName: string;
    		fileerror: boolean = false;
   		    filesuccess: boolean = false;
    		uploading: boolean = false;
			id:string;
			
			  			
constructor(private datePipe: DatePipe,private router: Router,private loginService:
               LoginService,private http: HttpClient, private _global: AppGlobals, private planManagemetService: PlanManagementService,
               private fileoperationService: FileoperationService) {
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

    ngOnInit() {
        this.createForm();
        this.getItem();
        this.getproductCode();
        this.getproductName();
        this.getRequester();
        
        this.fileToUpload = null;
        
    }
    createForm(){	
        this.unpairedPlanGenrationForm= new FormGroup({
            ItemCode:new FormControl({value: ''}),
            ProductName:new FormControl({value: ''}),
            ProductCode:new FormControl({value: ''}),
            requestDate:new FormControl(''),
            wrname:new FormControl(''),            
            Requester:new FormControl({value: ''}),            
        });        
    }   
     
        
    
    getItem(){
        this.listno="1";
        this.planManagemetService.getDropdown(this.listno).subscribe(
            data=>
                {
                    //console.log(data);
                    for (let index in data) {
                        this.listitemDropDown.push(
                        {
                            id:data[index].id,
                            groupName: data[index].groupName,
                        }
                        );
                    }
                },
        err => console.error(err));
                
            }
            
        
    
    
    getproductCode(){
        this.listno="2";
        this.planManagemetService.getDropdown(this.listno).subscribe(
            data=>
                {
                    //console.log(data);
                    for (let index in data) {
                        this.listDropDownProductCode.push(
                        {
                            id:data[index].id,
                            groupName: data[index].groupName,
                        }
                        );
                    }
                },
        err => console.error(err));
                
            }
            
    getproductName(){
        this.listno="3";
        this.planManagemetService.getDropdown(this.listno).subscribe(
            data=>
                {
                    //console.log(data);
                    for (let index in data) {
                        this.listDropDownProductName.push(
                        {
                            id:data[index].id,
                            groupName: data[index].groupName,
                        }
                        );
                    }
                },
        err => console.error(err));
                
            }
            
    getRequester(){
        this.listno="6";
        this.planManagemetService.getDropdown(this.listno).subscribe(
            data=>
                {
                    //console.log(data);
                    for (let index in data) {
                        this.listDropDownRequester.push(
                        {
                            id:data[index].id,
                            groupName: data[index].groupName,
                        }
                        );
                    }
                },
        err => console.error(err));
                
            }
        
    SubmitForPlanGenerationFromUnPairedMsisdnFile(){

       
    
        this.isLoading=true;
        const formData: FormData = new FormData();
            
        formData.append('ssm-file',this.fileToUpload,this.fileToUpload.name);
        
        console.log(formData);
        
        var result = this.fileoperationService.uploadSSMCSV(formData);
        console.log(result);
    
        result.subscribe(res => {
                console.log(res);
    
                console.log('file uploaded at '+new Date().toString());
    
                var objToInsert = {};
            objToInsert['itemcode']=this.unpairedPlanGenrationForm.controls.ItemCode.value;
            objToInsert['productname']=this.unpairedPlanGenrationForm.controls.ProductName.value;
            objToInsert['productcode']=this.unpairedPlanGenrationForm.controls.ProductCode.value;
            objToInsert['requester']=this.unpairedPlanGenrationForm.controls.Requester.value;
            objToInsert['wr_number']=this.unpairedPlanGenrationForm.controls.wrname.value;
            objToInsert['username']=this.userName;
            objToInsert['uploadedFileName']=this.fileToUpload.name;
            console.log(objToInsert );
            this.planManagemetService.uploadCSvAndGeneratePlanForUnpaired(objToInsert).subscribe(
        
                data=>{ 	
                    
                    console.log(data.message);
                        this.isLoading=false;
                        alert(data.message);
                        this.ngOnInit();
                        
                },
                err=> {
                    
                    console.error(err);
                    this.isLoading=false;
                    alert("Unable to process.");
                    this.ngOnInit();				
                }
            )
            
        }
    );
     
        //this.isLoading=false;
            
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
    
       
}
    
		
		
		
    
  			