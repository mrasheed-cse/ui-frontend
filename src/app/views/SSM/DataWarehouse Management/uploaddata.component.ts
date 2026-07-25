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
import{DatawarehouseService} from'../DataWarehouse Management/datawarehouse.service'
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import { Observable } from 'rxjs/Observable';
import {DatePipe} from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-voucherGen',
    templateUrl: './uploaddata.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,DatePipe,DatawarehouseService],
})
export class UploadDataWh implements OnInit {
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
  			 LoginService,private http: HttpClient, private _global: AppGlobals, private datawarehouseservice:DatawarehouseService ) {
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

	submit() {

		let val;
		this.isLoading = true;

		if (this.uploadFor == null) {
			alert('Please Select a Value');
			this.isLoading = false;
			return;
		}

		val = this.uploadFor === '0' ? 'AUC' : 'ADC';

		this.datawarehouseservice.uploadCsv(this.fileToUpload, val)
			.subscribe(
				response => {

					this.isLoading = false;

					const contentType = response.headers.get('Content-Type');
					const uploadStatus = response.headers.get('X-Upload-Status');

					// Duplicate file returned
					if (uploadStatus === 'DUPLICATES' ||
						contentType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {

						alert('Duplicate found. Please find the downloaded file');

						const blob = response.body;

						const fileName = this.getFileName(
							response.headers.get('Content-Disposition')
						) || 'Duplicates.xlsx';

						const url = window.URL.createObjectURL(blob);

						const a = document.createElement('a');
						a.href = url;
						a.download = fileName;
						document.body.appendChild(a);
						a.click();

						document.body.removeChild(a);
						window.URL.revokeObjectURL(url);

						return;
					}

					// Otherwise it is a text response
					const reader = new FileReader();

					reader.onload = () => {

						const message = reader.result as string;

						alert(message);

						this.fileerror = false;
						this.filesuccess = false;
						this.fileToUpload = null;
					};

					reader.readAsText(response.body);
				},
				err => {

					this.isLoading = false;

					if (err.error instanceof Blob) {

						const reader = new FileReader();

						reader.onload = () => {
							alert(reader.result as string);
						};

						reader.readAsText(err.error);

					} else {
						alert('Upload failed.');
					}
				}
			);
	}

	private getFileName(contentDisposition: string): string {

		if (!contentDisposition) {
			return null;
		}

		const matches = /filename="?([^"]+)"?/.exec(contentDisposition);

		return matches && matches[1] ? matches[1] : null;
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
