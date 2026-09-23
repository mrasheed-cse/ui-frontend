import {  NgModule,
  Component,
  Pipe,
  OnInit,
  ViewChild} from '@angular/core';
  import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {throwError as _throw} from 'rxjs';
import { AppGlobals } from './../../app.global';
import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser';
import{SSMService, AucConversionResponse } from './SSM.service';
@Component({
    selector: 'app-searchPO',
    templateUrl: './auc.component.html',
      styleUrls: ['./search_po.component.scss'],
      providers: [AppGlobals,LoginService,SSMService],
})
export class AucProcessor implements OnInit {
		  	currentLoggedInUser: LoggedInUser;
			userName!: string;
			groupID!: number;
  		userID!: string;
 			todayDate!: Date;
			routerUrlAndParams!: string;
  		isDataFound = false;
  		fileToUpload: File | null = null;
    		fileuploadstatus = '';
    		fileName = '';
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
        const file = this.fileToUpload;
        console.log(file ? file.name : '');
        
        if (!file || !(file.name.toUpperCase().endsWith(".AUC"))) {
            this.fileuploadstatus = 'Please select a .auc file';
            this.fileerror = true;
        } else {
            this.uploading = true
            this.isLoading=true
            this.ssmService.aucFileConersion(file).subscribe((res: AucConversionResponse | null) => {
                this.uploading = false
                if (res == null) {
                    this.fileuploadstatus = 'File Upload Fail';
                    this.fileerror = true;
                    this.isLoading=false;
                } 
               else if(res.message === "2"){
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
            }, (err: HttpErrorResponse) => {
                this.uploading = false
                this.fileuploadstatus = err.error && err.error.message ? err.error.message : 'File Upload Fail';
                this.fileerror = true;
                this.isLoading=false;
            })
            console.log(file.size);
        }
    }
    handleFileInput(files: FileList) {
        this.fileerror = false;
        this.filesuccess = false;
        this.fileToUpload = files.item(0);
        this.fileName = this.fileToUpload ? this.fileToUpload.name : '';
    }

    downloadNokiaAucConvertedFile(){
        this.ssmService.downloadNokiaAucConvertedFile()
            .subscribe(
                (response: HttpResponse<Blob>) => {
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

    downloadFile(response: HttpResponse<Blob>) :void {
        this.ssmService.downloadBlobFile(response, 'NokiaHlr.xml');
    }
}
