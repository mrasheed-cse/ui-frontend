
import {throwError as observableThrowError} from 'rxjs';
import { Injectable } from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse, HttpEvent, HttpRequest  } from '@angular/common/http';
import { environment } from '../../../../environments/environment';




import { Observable, Subscription } from 'rxjs';

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

	downloadBlobFile(response: HttpResponse<Blob>, defaultFilename: string): void {
		const headers = response.headers;
		let filename = defaultFilename;

		const contentDisposition = headers.get('content-disposition');
		if (contentDisposition) {
			const parts = contentDisposition.split(';');
			for (const part of parts) {
				const trimmed = part.trim();
				if (trimmed.startsWith('filename=')) {
					const filenamePart = trimmed.split('=')[1];
					if (filenamePart) {
						filename = filenamePart.trim().replace(/"/g, '');
					}
				}
			}
		}

		const body = response.body;
		if (!body) {
			console.error('Download response body is empty');
			return;
		}

		const contentType = headers.get('content-type') || 'application/octet-stream';
		const blob = new Blob([body], { type: contentType });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = filename;
		link.click();
		window.URL.revokeObjectURL(url);
	}

    handleError(error) {
		console.log(error);
        return observableThrowError(error || 'Server error');
    }
	
	uploadRecycledCSV(fd: FormData):any{
		console.log("In uploadCSV");
		console.log(this.serverUrl +'NsaRecycledFileUpload/');
		var result = this.http.post(this.serverUrl +'NsaRecycledFileUpload/', fd);
		  return result;
	   }

	uploadMFSTaggingCSV(fd: FormData): any {
		console.log('In uploadMFSTaggingCSV');
		console.log(this.serverUrl + 'MFSTaggingFileUpload/');
		let result = this.http.post(this.serverUrl + 'MFSTaggingFileUpload/', fd);
		return result;
	}

	uploadMFSDeTaggingCSV(fd: FormData): any {
		console.log('In uploadMFSDeTaggingCSV');
		console.log(this.serverUrl + 'MFSDeTaggingFileUpload/');
		let result = this.http.post(this.serverUrl + 'MFSDeTaggingFileUpload/', fd);
		return result;
	}

	uploadMFSRecyclingReportCSV(fd: FormData): any {
		console.log('In MFSStatusReportFileUpload');
		let result = this.http.post(this.serverUrl + 'MFSStatusReportFileUpload/', fd);
		return result;
	}

	uploadLostSimGd(fd: FormData):any{
		console.log("In uploadSSMCSV");
		var result = this.http.post(this.serverUrl +'lost-sim-gd/upload', fd);
		return result;
	}

	downloadLostSimGd(fileNameToDownload: any){
		console.log("In Download Files");
		const httpOptions = {
			responseType: 'blob' as 'json'
		};
		return this.http.post(this.serverUrl +"lost-sim-gd/download", fileNameToDownload, httpOptions);
	}
}
