import { Injectable } from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

//import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment.prod';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import { Observable, Subscription } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';

import { AppGlobals } from './../../../app.global';

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
	
  uploadCSV(fd: FormData){
	  console.log("In uploadCSV");
	 return this.http.post(this.serverUrl +'NsaFileUpload/', fd);
	 }
  
  downloadCSV(fileNameToDownload: string){
        return this.http.post(this.serverUrl +"NsaFileDownload/downloadNsaCSV", fileNameToDownload, this.options);
    }

    handleError(error) {
		console.log(error);
        return Observable.throw(error || 'Server error');
    }
	
    

}
