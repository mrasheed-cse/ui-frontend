import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable , throwError as _throw} from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { Router } from '@angular/router';
import {catchError,} from 'rxjs/operators';


import { AppGlobals } from './../../../app.global';


@Injectable()
export class ViewJourney {
	
private headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

 private header2=new HttpHeaders().set('Content-Type', 'application/octet-stream');
 private options = {
    headers: this.headers,
	responseType: 'text' as 'json'
 }

	serverUrl: string;
	
	constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) { 
		this.serverUrl = environment.apiUrl;  		
	}
	
	getAllVoucher(currPage:number,page:number): Observable<any> {	
		return this.http.get(this.serverUrl + 'vouchergeneration/getallvoucher/'+currPage+"/"+page);
	}
	
	getVoucher(id:number): Observable<any> {	
		return this.http.get(this.serverUrl + 'vouchergeneration/getvoucherdetailsbyId/'+id);
	}
	
	downloadFile(ponumber: any,batchNo: any ,vendor :any ,batchQuantity :any,ItemNumber:any,poQuantity:any,deliveredQuantity:any,isExport:boolean):any{
		
		  return this.http.post(this.serverUrl + 'vouchergeneration/downloadcsv/', this.prepareSearchFormdata(ponumber,batchNo,vendor,batchQuantity,
			ItemNumber,poQuantity,deliveredQuantity),{responseType:  "blob" })
		
	}
	
	 private prepareSearchFormdata(ponumber: any,batchNo: any ,vendor :any ,batchQuantity :any,ItemNumber:any,poQuantity:any,deliveredQuantity:any) : any {
        const formData: FormData = new FormData();
      
            formData.append('ponumber',ponumber);
             formData.append('batchNo', batchNo);
        formData.append('vendor',vendor);
      
            formData.append('batchQuantity',batchQuantity);
            formData.append('ItemNumber', ItemNumber);
       
        formData.append('poQuantity', poQuantity);
        formData.append('deliveredQuantity', deliveredQuantity);
        return formData;
    }
	
	
}	 
	