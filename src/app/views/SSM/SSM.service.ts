import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

import { AppGlobals } from './../../app.global';
@Injectable()
export class SSMService {



	serverUrl: string;
	
	constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) { 
		this.serverUrl = environment.apiUrl;  		
	}
	
	
	getPoInformation(poNumber:string): any{
		console.log("Ponumber- "+poNumber);
	return this.http.post(this.serverUrl + 'poInformation/search/', {
			poNumber:poNumber});
	}
	
getImsiAndICCID(imsi:string,quantity:string):any	{
	return this.http.post(this.serverUrl + 'inputFileprocessing/getImsiData/', {
			imsi:imsi,quantity:quantity});
	
}
	
	saveData(poNumber:string,startImsi:string,quantity:string,startIccid:string,stk:string,artwork:string,vendor:string,ImsiType:string):any{
		console.log("Postinh")
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
	
	GetAllIMSI(): any {	
		//console.log("In GetAllIMSI()"); 		
		return this.http.get(this.serverUrl + 'IMSI_Group/');
	}
	}