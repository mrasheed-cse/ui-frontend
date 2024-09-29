import { Injectable } from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse, HttpEvent, HttpRequest  } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import { Observable, Subscription } from 'rxjs/Rx';

@Injectable()
export class FileoperationService {
	
	serverUrl: string;
	
	/*
	private headers = new HttpHeaders({
    'Content-Type': 'application/text',
	'Accept': 'application/text'
 });
 */
 
 private headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

 
 private options = {
    headers: this.headers,
	responseType: 'text' as 'json'
 }
 
  constructor(private http: HttpClient) { 
		this.serverUrl = environment.apiUrl;  		
		
	}
	
  uploadCSV(fd: FormData):any{
	  console.log("In uploadCSV");
	  var result = this.http.post(this.serverUrl +'NsaFileUpload/', fd);
		return result;
	 }

	 
	 uploadMultipleCSV(fd: FormData): any{
		console.log("In uploadMultipleCSV");
		console.log(this.serverUrl +'DeProvisionMultipleBatchFileUpload');
		var result = this.http.post(this.serverUrl +'DeProvisionMultipleBatchFileUpload', fd);
		  return result;
/*
		  const newrequest=new HttpRequest('POST',this.serverUrl +'DeProvisionMultipleBatchFileUpload',fd,{
			reportProgress: true,
			responseType: 'text'
		  });
	 
	  //this.http.post('http://localhost:10881/DeProvisionMultipleBatchFileUpload',fd);
	  alert('calling');
	  		  return this.http.request(newrequest);
*/
	   }

	 uploadSSMCSV(fd: FormData):any{
		console.log("In uploadSSMCSV");
		var result = this.http.post(this.serverUrl +'SSMFileUpload/', fd);
		  return result;
	   }
  
  downloadCSV(fileNameToDownload: string){
	  console.log(this.serverUrl +"NsaFileDownload/downloadNsaCSV");
	  console.log(fileNameToDownload);
		console.log(this.options);	
        return this.http.post(this.serverUrl +"NsaFileDownload/downloadNsaCSV", fileNameToDownload, this.options);
	}

	DownloadFile(fileNameToDownload: any){
		console.log("In Download Files");
		const httpOptions = {
			responseType: 'blob' as 'json'
		};
		return this.http.post(this.serverUrl +"NsaFileDownload/downloadFile", fileNameToDownload, httpOptions);
	}

    handleError(error) {
		console.log(error);
        return Observable.throw(error || 'Server error');
    }
	
	uploadRecycledCSV(fd: FormData):any{
		console.log("In uploadCSV");
		console.log(this.serverUrl +'NsaRecycledFileUpload/');
		var result = this.http.post(this.serverUrl +'NsaRecycledFileUpload/', fd);
		  return result;
	   }

}
