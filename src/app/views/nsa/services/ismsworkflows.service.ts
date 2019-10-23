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

	findRequisitionDetails(id:number) : any{
		return this.http.post(this.serverUrl+ 'requisition/find',{
			requisitionId: id
		});
	}


	approveOrRejectRequest(wr_id: number,status: string,userID: string, comment: string) : any{
		return this.http.post(this.serverUrl+ 'requisition/update',{
			userID: userID,
			wrID: wr_id,
			status: status,
			comment: comment
		});
	}

	commentOnRequest(wr_id: number,comment: string,userID: string) : any{
		return this.http.post(this.serverUrl+ 'requisition/comment',{
			userID: userID,
			wrID: wr_id,
			comment: comment
		});
	}

	addEmailRecipientForRequest(wr_id: number,email: string) : any{
		return this.http.post(this.serverUrl+ 'requisition/addemailrecipient',{
			userID: email,
			wrID: wr_id,
			comment: ""
		});
	}

	respondToRfi(wr_id: number,comment: string,userID: string, requisitionLines: any) : any{
		return this.http.post(this.serverUrl+ 'requisition/respondtorfi',{
			userID: userID,
			wrID: wr_id,
			comment: comment,
			requisitionLines : requisitionLines
		});
	}

	getAllComments(wr_id: number,comment: string,userID: string) : any{

		return this.http.post(this.serverUrl+ 'requisition/retrievecomments',{
			userID: userID,
			wrID: wr_id,
			comment: comment
		});
	}

	getAllEmailRecipientsForRequest(wr_id: number) : any{

		return this.http.post(this.serverUrl+ 'requisition/getemailrecipients',{
			userID: 0,
			wrID: wr_id,
			comment: ""
		});
	}

	deleteEmailRecipientFromRequest(wr_id: number) : any{

		return this.http.post(this.serverUrl+ 'requisition/deleteemailrecipient',{
			userID: 0,
			wrID: wr_id,
			comment: ""
		});
	}

	ssmAssignment(wr_id: number,status: string,userID: string,lineItems: Array<any>) : any{
		return this.http.post(this.serverUrl+ 'requisition/ssmassignment',{
			userID: userID,
			wrID: wr_id,
			status: status,
			lineItems: lineItems
		});
	}

	deleteRequisitionLine(lineItemId: number) : any{
		return this.http.post(this.serverUrl+ 'requisitionline/delete',{
			userID: "",
			wrID: lineItemId,
			status: ""
		});
	}


	getMsisdnDetailsFromSsm(searchObj: any) : any{
		return this.http.post(this.serverUrl+ 'requisition/ssm',searchObj);
	}

	updateForClc(data : any) : any{
		return this.http.post(this.serverUrl+ 'requisition/updateforclc',data);
	}
}
