import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
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
	
	
	
	}