import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {  NgModule,
    Component,
    Pipe,
    OnInit,
    } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/app.global';
import { LoggedInUser } from '../pages/loggedInUser';
import { LoginService } from '../pages/LoginService';
import { DatawarehouseService } from '../SSM/DataWarehouse Management/datawarehouse.service';
import { FileoperationService } from './services/fileoperation.service';
import { UploadCSVRecycleSMSService } from './services/uploadCsvRecycleSms.service';


@Component({
    selector: 'app-uploadCsvFile',
    templateUrl: './uploadfileswith-Csv.component.html',
    styles: ['./nsa_styles.css'],
     // styleUrls: ['./search_po.component.scss'],
      providers: [AppGlobals,LoginService,DatePipe,UploadCSVRecycleSMSService,FileoperationService],
})
export class UploadRecycleCsvFile implements OnInit {
    myRecycledSmsForm: FormGroup;
    list: FormControl;
    unused:FormControl;
    msdncount:FormControl;
    recycledSmsFile: FormControl;

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
                LoginService,private http: HttpClient, private _global: AppGlobals, private datawarehouseservice:UploadCSVRecycleSMSService,private fileoperationService: FileoperationService ) {
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
     
         createFormControls() {
            this.recycledSmsFile = new FormControl('', Validators.required);
                this.list =	new FormControl('', Validators.required);
                this.msdncount= new FormControl('', Validators.required);
                this.unused= new FormControl('', Validators.required);
          }
        
          createForm() {
        
                this.myRecycledSmsForm = new FormGroup({
                    list: this.list,
                    msdncount: this.msdncount,
                    unused: this.unused,
                    recycledSmsFile: this.recycledSmsFile
                   
                   
        
                    });
          }
           // convenience getter for easy access to form fields
   // get f() { return this.myRecycledSmsForm.controls; }
        
 submit(){
     var val;
     this.isLoading=true;
     

  const { list, msdncount, unused } = this.myRecycledSmsForm.value;
    //  alert(`Nalistme: ${list}, msdncount: ${msdncount}, unused: ${unused} `);
     

    if (this.myRecycledSmsForm.invalid) {
        this.isLoading=false;
        return;
    }
     
    if (this.fileToUpload == undefined || !this.fileToUpload.name.endsWith(".csv") ||  !this.fileToUpload.name.startsWith("ListId")) {

        this.fileuploadstatus = 'Please select a csv file with file name starting with ListId';
        alert(this.fileuploadstatus);
        this.fileerror = true;
        this.isLoading=false;
    }
    else{
         const fd = new FormData();
    this.isLoading = true;
		//this.fileToUpload = files.item(0);
		this.fileName =  this.fileToUpload.name;
		fd.append('nsa-file', this.fileToUpload, this.fileName);
		var result = this.fileoperationService.uploadRecycledCSV(fd);
        result.subscribe(
			res => {
				let index = res.message.lastIndexOf(":");
				let file = res.message.substring(index);
        let requestData={fileName:this.fileName}
				
        console.log(requestData);
        this.datawarehouseservice.uploadCsv(this.fileName,msdncount,list,unused).subscribe(
     
            data=>{ 
                
                const dataStr = JSON.stringify(data);
    
                JSON.parse(dataStr, (key, value) => {
                    if (typeof value === 'string') {
                        alert(value);
                    }
                });
                if(data!=null){
    
                    this.fileuploadstatus = 'File Upload Success';
                    this.filesuccess = true;
                    this.fileerror = false;
               // alert("Data Saved  Sucessfully"); this.fileerror = false;
           // this.filesuccess = false;
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
        // this.ismsworkflowsService.checkFileValidity(requestData).subscribe(
		// 			response => {
            
		// 				let res = response.message.split(",");
		// 				if (res[0].trim() === "Valid") {
		// 					//this.infoAlertShow = false;
        //       alert("File uploaded successfully");
		// 					this.isLoading = false;
        //       this.isFileLoaded=true;
		// 				}
		// 				else {
		// 					//this.infoAlertShow = true;
        //       alert("This file is invalid");
		// 					this.isLoading = false;
        //       this.isFileLoaded=false;
		// 				}
		// 			});
			}
		);
   // alert( this.fileName);


    }
        
        
        
     

          

     
} 

handleFileInput(files: FileList) {
    this.fileerror = false;
    this.filesuccess = false;
    this.fileToUpload = files.item(0);
    this.fileName = this.fileToUpload.name;

   
   // alert( this.fileName);
}
       
ngOnInit() {
    this.createFormControls();
    this.createForm();
   
  } 
}