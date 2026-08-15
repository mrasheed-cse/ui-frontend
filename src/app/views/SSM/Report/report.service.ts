import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable , throwError as _throw} from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { Router } from '@angular/router';
import {catchError,} from 'rxjs/operators';


import { AppGlobals } from './../../../app.global';


@Injectable()
export class ReportService {
	
private headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

 
 private options = {
    headers: this.headers,
	responseType: 'text' as 'json'
 }


	serverUrl: string;
	
	constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) { 
		this.serverUrl = environment.apiUrl;  		
	}
	 uploadCsv(fileToUpload: File) {
        const url = environment.apiUrl + "ssmreport/uploadforcastdata/";
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(url, formData);
    }
    
    getDropdown(linkno: string):any {
        return this.http.get(this.serverUrl + "plangenerate/dropdown/" + linkno).pipe(catchError(this.handleError));
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
    
    getTotalQuantiy(product :any[], startDate :any,endDate :any):any{
	console.log(product)
	return this.http.post(this.serverUrl+"ssmreport/gettotalquantity/"+product,{
		startDate: startDate,
		endDate:endDate,
			})
	
}

generateCSV(data:any[]):any{
	  console.log(this.serverUrl +"ssmreport/generatecsv/");
        return this.http.post(this.serverUrl +"ssmreport/generatecsv/",data);
    }
    
    DownloadCSV(fileNameToDownload: string){
	  console.log(this.serverUrl +"ssmreport/downloadCSV/");
	  console.log(fileNameToDownload);
        return this.http.post(this.serverUrl +"ssmreport/downloadCSV/", fileNameToDownload,this.options);
    }
    
    
	getFilteredInputFiles(artWork:string ,vendor:string,imsiType:number,currPage:number,pageSize:number): any{
		return this.http.post(this.serverUrl + 'ssmreport/getallinputfiles', {
            artWork: artWork,
			vendor: vendor,
			imsiType: imsiType,
			currentPage: currPage,
			pageSize: pageSize
        });
  }
  
    
    
    
    }