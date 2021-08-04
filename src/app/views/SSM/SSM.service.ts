import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import {catchError,} from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';


import { AppGlobals } from './../../app.global';


@Injectable()
export class SSMService {
	
private headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

 
 private options = {
    headers: this.headers,
	responseType: 'text' as 'json'
 }


	serverUrl: string;
	
	constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) { 
		this.serverUrl = environment.apiUrl;  		
	}
	
	
	getPoInformation(poNumber:string): any{
	return this.http.post(this.serverUrl + 'poInformation/search/', {
			poNumber:poNumber});
	}
	
getImsiAndICCID(imsi:string,quantity:string,vendor:string):any	{
	return this.http.post(this.serverUrl + 'inputFileprocessing/getImsiData/', {
			imsi:imsi,quantity:quantity,vendor:vendor});
	
}
	
	saveData(poNumber:string,startImsi:string,quantity:string,startIccid:string,stk:string,artwork:string,vendor:string,ImsiType:string):any{
		return this.http.post(this.serverUrl + 'inputFileprocessing/SaveData/', {
			poNumber:poNumber,
			startImsi:startImsi,
			quantity:quantity,
			startIccid:startIccid,
			stk:stk,
			artwork:artwork,
			vendor:vendor,
			ImsiType:ImsiType
		});
		
	}
	
	DownloadCSV(fileNameToDownload: string){
	  console.log(this.serverUrl +"poInformation/downloadCSV/");
	  console.log(fileNameToDownload);
        return this.http.post(this.serverUrl +"poInformation/downloadCSV/", fileNameToDownload,this.options);
    }

	
	GetAllIMSI(): any {	
		//console.log("In GetAllIMSI()"); 		
		return this.http.get(this.serverUrl + 'IMSI_Group/');
	}
	
	getAllVendor(): any {	
		return this.http.get(this.serverUrl + 'inputFileprocessing/vendor/');
	}
	
	
		getAllArtwork(): any {	
		return this.http.get(this.serverUrl + 'inputFileprocessing/artwork/');
	}
	
		getAllstk(): any {	
		return this.http.get(this.serverUrl + 'inputFileprocessing/stk/');
	}
	
	
	getDenoMination(): any {	
		return this.http.get(this.serverUrl + 'vouchergeneration/denomination/');
	}
	getCardGroup(poNumber:string): any {	
		console.log("SErvice "+poNumber)
		return this.http.post(this.serverUrl + 'vouchergeneration/cardgroup/',{
			poNumber:poNumber}
			);
	}
	getvoucherSerial(): any {	
		return this.http.get(this.serverUrl + 'vouchergeneration/voucherserial/');
	}
	
	getvoucherSerialHidden(): any {	
		return this.http.get(this.serverUrl + 'vouchergeneration/voucherserialhidden/');
	}
	
	getVendorWiseSFTP(): any {	
		return this.http.get(this.serverUrl + 'vouchergeneration/vendorwisesftp/');
	}
	getMaxBatchNo():any{
			return this.http.get(this.serverUrl +'vouchergeneration/getBatchNo');
	}
	
	getSerial(denomination:string,cardgroup:string):any{
		return this.http.post(this.serverUrl +'vouchergeneration/getSerial',{
			denomination:denomination,
			cardgroup:cardgroup
			
		});
		
	}
	
	checkPoExsist(poNumber:string): any{
	return this.http.post(this.serverUrl + 'sctrachVoucher/searchPo/', {
			poNumber:poNumber});
	}
	
	saveScratch(ponumber:string,batchNo:string,denomination:string,serial:string,requestDate:any,quantity:string,vendor:string,pr:string
	,networkexpiredate:any,expirydate:any,cardgroup:string,serialDigitCount:string,hiddenNumberCount:string,sftplocation:string,createdBy:string): any{
	return this.http.post(this.serverUrl + 'sctrachVoucher/Save/', {
			ponumber:ponumber,batchNo:batchNo,denomination:denomination,
			serial:serial,requestDate:requestDate,quantity:quantity,
			vendor:vendor,pr:pr,networkexpiredate:networkexpiredate,
			expirydate:expirydate,cardgroup:cardgroup,serialDigitCount:serialDigitCount,
			hiddenNumberCount:hiddenNumberCount,sftplocation:sftplocation,createdBy:createdBy});
	}
	
	getAllCard(): any {	
		return this.http.get(this.serverUrl + 'vouchergeneration/allCard/');
	}
	
	deleteDenomination(linkno: number): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/deleteDenomination/" + linkno).pipe(catchError(this.handleError));
    }
deleteVendor(linkno: number): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/deleteVendor/" + linkno).pipe(catchError(this.handleError));
    }
	
	deleteVoucherSerial(linkno: number): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/deletevoucherSerial/" + linkno).pipe(catchError(this.handleError));
    }
	
	deleteCardGroup(linkno: number): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/deletecardGroup/" + linkno).pipe(catchError(this.handleError));
    }
	deleteHiddenSerial(linkno: number): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/deletehiddenSerial/" + linkno).pipe(catchError(this.handleError));
    }
	deleteVendorSftp(linkno: number): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/vendorSftp/" + linkno).pipe(catchError(this.handleError));
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