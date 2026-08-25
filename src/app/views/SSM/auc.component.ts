import {  NgModule,
  Component,
  Pipe,
  OnInit,
  ViewChild} from '@angular/core';
  import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {throwError as _throw} from 'rxjs';
import { AppGlobals } from './../../app.global';
import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser';
import{SSMService } from './SSM.service';
@Component({
    selector: 'app-searchPO',
    templateUrl: './auc.component.html',
      styleUrls: ['./search_po.component.scss'],
      providers: [AppGlobals,LoginService,SSMService],
})
export class AucProcessor implements OnInit {
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
 			todayDate: Date;
			routerUrlAndParams: string;
  			isDataFound: boolean ;
  			fileToUpload: File = null;
    		fileuploadstatus: string;
    		fileName: string;
    		fileerror: boolean = false;
   		    filesuccess: boolean = false;
    		uploading: boolean = false;
    		isConverted:boolean=false;
    		isLoading:boolean=false;
             readonly environment = environment;
            xmlDownloadUrl = this.environment.apiUrl+"/auc_conversion/download";
  			
	constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private ssmService: SSMService ) {
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
      this.isDataFound = false;
      this.xmlDownloadUrl = this.environment.apiUrl+"/auc_conversion/download";
      console.log(this.xmlDownloadUrl);
    }
    else {
      this.router.navigate(['pages/login']);
    }
    }

   ngOnInit() { 
   console.log(this.xmlDownloadUrl);
    }

    downloadXMLFile(){
        alert('1');
        this.ssmService.downloadAucFile();
        alert('2');
    }
     
   dndUpload() {
        this.fileerror = false;
        this.filesuccess = false;
        console.log(this.fileToUpload.name);
        
        if (this.fileToUpload == undefined || !(this.fileToUpload.name.toUpperCase().endsWith(".AUC"))) {
            this.fileuploadstatus = 'Please select a .auc file';
            this.fileerror = true;
        } else {
            this.uploading = true
            this.isLoading=true
            this.ssmService.aucFileConersion(this.fileToUpload).subscribe((res => {
                this.uploading = false
                if (res == null) {
                    this.fileuploadstatus = 'File Upload Fail';
                    this.fileerror = true;
                    this.isLoading=false;
                } 
               else if(res['message']==="2"){
			console.log(res['message']+"  111")
	  this.fileuploadstatus = 'File Size is Greater Than 50000';
                    this.fileerror = true;
                    this.isLoading=false;
	
}
                else {
	console.log(res['message']+"  222")
                   this.isConverted=true;
                    this.filesuccess = true;
                    this.isLoading=false;
                }
            }), err => {
                this.uploading = false
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
        this.fileName = this.fileToUpload.name;
    }

    downloadNokiaAucConvertedFile(){
        this.ssmService.downloadNokiaAucConvertedFile()
            .subscribe(
                response => {
                    this.isLoading = false;
                    this.downloadFile(response);
                },
                error => {
                    console.log(error);
                    alert('Failed to download file')
                    this.isLoading = false;
                }
            );
    }

    downloadFile(response : any) :void {
        console.log(response);
        console.log(response.headers);
        let filename = "NokiaHlr.xml";

        // Get filename from content-disposition header
        const contentDisposition = response.headers.get('content-disposition');

        if (contentDisposition) {
            let arr = contentDisposition.split(';');
            if (arr.length > 1) {
                arr.forEach(element => {
                    if (element.trim().startsWith('filename=')) {
                        let arr2 = element.split('=');
                        if (arr2.length > 1) {
                            filename = arr2[1].trim().replace(/"/g, '');
                        }
                    }
                })
            }
        }

        // Create blob and download
        const blob = new Blob([response.body],
            { type: response.headers.get('content-type') });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
    }
}
