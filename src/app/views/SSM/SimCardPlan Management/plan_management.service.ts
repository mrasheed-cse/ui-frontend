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
        return this.http.get(this.serverUrl + "plangenerate/dropdown/" + linkno).pipe(catchError(this.handleError));
    }
    
    getkitSerial(itemNo:string):any{
		return this.http.get(this.serverUrl  +"plangenerate/simkit/"+itemNo).pipe(catchError(this.handleError));
		
	}
    
    getSimInputFile():any{
	
			return this.http.get(this.serverUrl  +"plangenerate/getInputFile/").pipe(catchError(this.handleError));
}
    
    generatePlan(Object :{}):any{
	return this.http.post(this.serverUrl+"plangenerate/genratePlan/",Object);
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
    
    uploadCsv(fileToUpload: File,id:string) {
        const url = environment.apiUrl + "plangeneration/uploadCSv/"+id;
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(url, formData);
    }
    
     getConfig(hop:number): Observable<any>{
	  return this.http.get(environment.apiUrl + "plangenerate/getsimconfighops/" +hop).pipe(catchError(this.handleError));
	
}
    cancelHop(username:string,Id:number){
	
	return this.http.post(this.serverUrl + 'plangenerate/cancelHop/', {
		username:username,
		hopId:Id,
			});
}
setHop(username:string,Id:number,comment:string){
	
	return this.http.post(this.serverUrl + 'plangenerate/saveHop/', {
		username:username,
		id:Id,
		comments:comment
			});

	
	}
	
		
	DownloadCSV(fileNameToDownload: string){
        return this.http.post(this.serverUrl +"plangenerate/downloadCSV/", fileNameToDownload,this.options);
    }

setPackeging(username:string,Id:number,comment:string,printing:any,packaging:any,delivery:any):any{
	
	return this.http.post(this.serverUrl + 'plangenerate/simpackaginghop/', {
		username:username,
		id:Id,
		comments:comment,
		printingDate: printing,
		packagingDate:packaging,
		deliveryDate:delivery
			});

	
	}
	
	}