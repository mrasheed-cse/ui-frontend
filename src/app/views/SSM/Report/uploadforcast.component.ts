import {Component, OnInit} from '@angular/core';

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import {Router} from '@angular/router';
import {ReportService} from'./report.service';
import { AppGlobals } from './../../../app.global';

@Component({
    selector: 'app-uploadforcast',
    templateUrl: './uploadforcast.component.html',
    styleUrls: ['./uploadforcast.component.css'],
      providers: [AppGlobals,LoginService,ReportService]
})
export class UploadForcast implements OnInit {
	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
    fileToUpload: File = null;
    fileuploadstatus: string;
    fileName: string;
    fileerror: boolean = false;
    filesuccess: boolean = false;
    uploading: boolean = false;

    constructor(private report: ReportService,private loginService:
  			 LoginService,private router: Router) {this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
     

    }
    else {
      this.router.navigate(['pages/login']);
    }
   
    }
    
    	
	

    ngOnInit(): void {
    }

    dndUpload() {
        this.fileerror = false;
        this.filesuccess = false;
        if (this.fileToUpload == undefined || !this.fileToUpload.name.endsWith(".csv")) {
            this.fileuploadstatus = 'Please select a csv file';
            this.fileerror = true;
        } else {
            this.uploading = true
            this.report.uploadCsv(this.fileToUpload).subscribe((res => {
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
}