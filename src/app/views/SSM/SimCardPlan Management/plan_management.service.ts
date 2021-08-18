import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment.prod';
import { Router } from '@angular/router';
import {catchError,} from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';


import { AppGlobals } from './../../../app.global';


@Injectable()
export class PlanManagementService {
	
private headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

 
 private options = {
    headers: this.headers,
	responseType: 'text' as 'json'
 }


	serverUrl: string;
	
	constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) { 
		this.serverUrl = environment.apiUrl;  		
	}
	postFile(fileToUpload: File) {
        const url = environment.apiUrl + "plangeneration/getcsvData";
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(url, formData);
    }
    
    getDropdown(linkno: string):any {
        return this.http.get(environment.apiUrl + "plangenerate/dropdown/" + linkno).pipe(catchError(this.handleError));
    }
    
    getkitSerial(itemNo:string,):any{
		return this.http.get(this.serverUrl +'planGenerate/getkitSerial/'+itemNo).pipe(catchError(this.handleError));
		
	}
    
    
    handleError(error: HttpErrorResponse) {
        if (error instanceof ErrorEvent) {
        } else {
            switch (error.status) {
                case 404:
                   
                    break;
            }
        }
        return _throw(error);
    }
    
    
	
	}