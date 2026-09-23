import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';





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

	FormatWorkRequestNameForAPI(WorkRequestName: string): string {
		var newstr = WorkRequestName.split('/').join('');
		return newstr;
	}

	CreateNewTestSimRequest(wr_id: number, userGroup_id: number, userID: string, requisitionName: string, reqHeader: any): any {
		console.log("(this.serverUrl + 'requisition/save', {userID:" + userID + ",	userGroupID: " + userGroup_id + ", wrID: " + wr_id + ",	requisitionName: " + requisitionName + ",reqHeader: " + reqHeader + "	})");
		return this.http.post(this.serverUrl + 'requisition/save', {
			userID: userID,
			userGroupID: userGroup_id,
			wrID: wr_id,
			requisitionName: requisitionName,
			reqHeader: reqHeader
		});
	}

	CreateNewTestScRequest(wr_id: number, userGroup_id: number, userID: string, requisitionName: string, reqHeader: any): any {
		console.log("(this.serverUrl + 'requisition/save', {userID:" + userID + ",	userGroupID: " + userGroup_id + ", wrID: " + wr_id + ",	requisitionName: " + requisitionName + ",reqHeader: " + reqHeader + "	})");
		return this.http.post(this.serverUrl + 'testscratchcard/save', {
			userID: userID,
			userGroupID: userGroup_id,
			wrID: wr_id,
			requisitionName: requisitionName,
			reqHeader: reqHeader
		});
	}

	editRequisition(wr_id: number, userID: string, reqHeader: any, comment: string): any {
		console.log("userID:" + userID + ",	wrID: " + wr_id + ", reqHeader: " + reqHeader + ", comment: " + comment);
		return this.http.post(this.serverUrl + 'requisition/requisition-edit', {
			userID: userID,
			wrID: wr_id,
			comment: comment,
			reqHeader: reqHeader
		});
	}

	// vaidation  API
	validateMobileAPI(mobileNo: string,): any {
		console.log(this.serverUrl + 'testscratchCard/validate', "mobileNo:" + mobileNo);
		return this.http.post(this.serverUrl + 'testscratchCard/validate', mobileNo
		);
	}

	findRequisitionDetails(id: number): any {
		return this.http.post(this.serverUrl + 'requisition/find', {
			requisitionId: id
		});
	}

	//find Sc req 
	findScRequisitionDetails(id: number): any {
		return this.http.post(this.serverUrl + 'testscratchcard/find', {
			requisitionId: id
		});
	}

	LostDamagedFind(sim_action_id: number): any {
		console.log(this.serverUrl + 'LostDamaged/find' + sim_action_id);
		return this.http.post(this.serverUrl + 'LostDamaged/find', {
			requisitionId: sim_action_id
		});
	}

	LostDamagedFindApprovedOnly(sim_action_id: number): any {
		console.log(this.serverUrl + 'LostDamaged/findApprovedOnly' + sim_action_id);
		return this.http.post(this.serverUrl + 'LostDamaged/findApprovedOnly', {
			requisitionId: sim_action_id
		});
	}


	/**
	 * 
	 * 		//console.log(this.serverUrl+ '');
			return this.http.post(this.serverUrl+ 'LostDamaged/find',{
				requisitionId: sim_action_id
			});
	 */


	approveOrRejectScRequest(wr_id: number, status: string, userID: string, comment: string): any {
		return this.http.post(this.serverUrl + 'testscratchcard/update', {
			userID: userID,
			wrID: wr_id,
			status: status,
			comment: comment
		});
	}

	approveOrRejectRequest(wr_id: number, status: string, userID: string, comment: string): any {
		return this.http.post(this.serverUrl + 'requisition/update', {
			userID: userID,
			wrID: wr_id,
			status: status,
			comment: comment
		});
	}

	commentOnRequest(wr_id: number, comment: string, userID: string): any {
		return this.http.post(this.serverUrl + 'requisition/comment', {
			userID: userID,
			wrID: wr_id,
			comment: comment
		});
	}

	addEmailRecipientForRequest(wr_id: number, email: string): any {
		return this.http.post(this.serverUrl + 'requisition/addemailrecipient', {
			userID: email,
			wrID: wr_id,
			comment: ""
		});
	}

	respondToRfi(wr_id: number, comment: string, userID: string, requisitionLines: any): any {
		return this.http.post(this.serverUrl + 'requisition/respondtorfi', {
			userID: userID,
			wrID: wr_id,
			comment: comment,
			requisitionLines: requisitionLines
		});
	}
	//response to SC RF
	screspondToRfi(wr_id: number, comment: string, userID: string, requisitionLines: any): any {
		return this.http.post(this.serverUrl + 'testscratchcard/respondtorfi', {
			userID: userID,
			wrID: wr_id,
			comment: comment,
			requisitionLines: requisitionLines
		});
	}I

	getAllComments(wr_id: number, comment: string, userID: string): any {

		return this.http.post(this.serverUrl + 'requisition/retrievecomments', {
			userID: userID,
			wrID: wr_id,
			comment: comment
		});
	}

	getAllEmailRecipientsForRequest(wr_id: number): any {

		return this.http.post(this.serverUrl + 'requisition/getemailrecipients', {
			userID: 0,
			wrID: wr_id,
			comment: ""
		});
	}

	deleteEmailRecipientFromRequest(wr_id: number): any {

		return this.http.post(this.serverUrl + 'requisition/deleteemailrecipient', {
			userID: 0,
			wrID: wr_id,
			comment: ""
		});
	}

	ssmAssignment(wr_id: number, status: string, userID: string, lineItems: Array<any>, comment: string): any {
		return this.http.post(this.serverUrl + 'requisition/ssmassignment', {
			userID: userID,
			wrID: wr_id,
			status: status,
			lineItems: lineItems,
			comment: comment
		});
	}

	// CLC Assignment for final delivery quantity.
	clcAssignment(wr_id: number, userID: string, theLineItem: any): any {
		console.log("In clcAssignment: " + wr_id + "," + userID);

		return this.http.post(this.serverUrl + 'requisition/clcassignment', {
			wrID: wr_id,
			userID: userID,
			theLineItem: theLineItem
		});

	}

	deleteRequisitionLine(lineItemId: number): any {
		return this.http.post(this.serverUrl + 'requisitionline/delete', {
			userID: "",
			wrID: lineItemId,
			status: ""
		});
	}

	deleteIsmsRequisitionline(lineItemId: number): any {
		return this.http.post(this.serverUrl + 'ismsRequisitionline/delete', {
			userID: "",
			wrID: lineItemId,
			status: ""
		});
	}

	getMsisdnDetailsFromSsm(searchObj: any): any {
		return this.http.post(this.serverUrl + 'requisition/ssm2', searchObj);
	}

	getMsisdnDetailsFromSsmLostDamaged(searchObj: any): any {
		console.log(searchObj);
		return this.http.post(this.serverUrl + 'requisition/ssm2', searchObj);
	}

	updateForClc(data: any): any {
		return this.http.post(this.serverUrl + 'requisition/updateforclc', data);
	}

	updateForClcLostDamaged(data: any): any {
		return this.http.post(this.serverUrl + 'requisition/updateforclcLostDamaged', data);
	}

	checkFileValidity(requestData:any): any {
		console.log("In uploadCSV");
		var result = this.http.post(this.serverUrl + 'testscratchcard/scFile/',requestData );
		return result;
	}

	soCreation(id: number): any {
		return this.http.post(this.serverUrl + 'testscratchcard/soCreation', {
			requisitionId: id
		});
	}

}
