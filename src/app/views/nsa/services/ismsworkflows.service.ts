import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment.prod';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import {NewTestSimRequisition} from '../models/NewTestSimRequisition'

import { AppGlobals } from './../../../app.global';

@Injectable()
export class IsmsworkflowsService {

  serverUrl: string;
	dataOutput: string = "";
	isSaved: boolean;		
	isWF_Saved: boolean;		
	
	constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) { 
		this.serverUrl = environment.apiUrl;  		
		this.isSaved = false;
	}
  
	FormatWorkRequestNameForAPI(WorkRequestName: string) : string {
		var newstr = WorkRequestName.split('/').join('');
		return newstr;
  }
  
  CreateNewTestSimRequest(wr_id: number,userGroup_id: number,userID: string,requisitionName: string, reqHeader: any) : any {	
  	console.log("(this.serverUrl + 'requisition/save', {userID:"+ userID+",	userGroupID: "+userGroup_id+", wrID: "+wr_id+",	requisitionName: "+requisitionName+",reqHeader: "+reqHeader+"	})");
	return this.http.post(this.serverUrl + 'requisition/save', {
		userID: userID,
			userGroupID: userGroup_id, 	
			wrID: wr_id,
			requisitionName: requisitionName,
			reqHeader: reqHeader
		});
	}

}
