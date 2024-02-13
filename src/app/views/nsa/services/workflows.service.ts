import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

import { AppGlobals } from './../../../app.global';

@Injectable()
export class WorkflowsService {

	serverUrl: string;
	statusMarker: string;
	dataOutput: string = "";
	isSaved: boolean;		
	isWF_Saved: boolean;		
	
	constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) { 
		this.serverUrl = environment.apiUrl;  		
		this.isSaved = false;
		this.statusMarker = environment.pendingRequestMarker;
	}
  
	FormatWorkRequestNameForAPI(WorkRequestName: string) : string {
		var newstr = WorkRequestName.split('/').join('');
		return newstr;
	}
  
	//Create New Work Request
	//{wr_id}/{userGroup_id}/{user_name}/[{workflowFieldsValueSeqWise}]
	CreateNewWorkRequest(wr_id: number,userGroup_id: number,userID: string,workflowFieldsValueSeqWise: string) : any {	
  
		//console.log("In GetWR_Name() for theWrNumber "+ theWrNumber);	
		//console.log("In GetWR_Name() for workflowFieldsValueSeqWise "+ workflowFieldsValueSeqWise);	
		//console.log(wr_id+'/'+userGroup_id+'/'+userID+'/['+workflowFieldsValueSeqWise+']');
	
	
	return this.http.post(this.serverUrl + 'NewWorkRequest', {
			wrID: wr_id,
			userGroupID: userGroup_id,
			userID: userID,
			workflowFieldsValueSeqWise: workflowFieldsValueSeqWise
		});
	}
	//PendingTasks/{wr_id}/{userGroup_id}
	//http://localhost:8019/nsa/PendingTasks/1/3
	
	LoadPendingTask(wr_id: number,userGroup_id: number) : any {
		//return this.http.post(this.serverUrl + 'PendingTasks/'+wr_id+'/'+userGroup_id, {
		return this.http.post(this.serverUrl + 'PendingTasks', {
			wrID: wr_id,
			userGroupID: userGroup_id
		});
	}

	LoadRequisitionList(wr_id: number, user_id: string) : any {
		return this.http.post(this.serverUrl + 'workflow/search', {
			createdBy: user_id,
			requisitionNo: wr_id,
			status: this.statusMarker
		});
	}	

	//load pending sc
	LoadScRequisitionList(wr_id: number, user_id: string) : any {
		return this.http.post(this.serverUrl + 'testscratchcard/search', {
			createdBy: user_id,
			requisitionNo: wr_id,
			status: this.statusMarker
		});
	}

	LoadPersonalDetails(wr_id: number, user_id: string, status: string) : any {
		//console.log( "status : "+status);
		return this.http.post(this.serverUrl + 'workflow/personalrequests', {
			createdBy: user_id,
			requisitionNo: wr_id,
			status: status
		});
	}

	//sc details
	LoadPersonalScDetails(wr_id: number, user_id: string, status: string) : any {
		//console.log( "status : "+status);
		return this.http.post(this.serverUrl + 'testscratchcard/personalrequests', {
			createdBy: user_id,
			requisitionNo: wr_id,
			status: status
		});
	}

	//download challan
	DownloadChallan(challanNo,requisitionId) : any {
		const httpOptions = {
			responseType: 'blob' as 'json'
		  };
		return this.http.post(this.serverUrl + 'testscratchcard/downloadchallan', {
			challanNo:challanNo,
			requisitionId:requisitionId
		},httpOptions);

	} 

	LoadPreDeactivationScDetails( user_id: string) : any {
		//console.log( "status : "+status);
		return this.http.post(this.serverUrl + 'testscratchcard/loadpredeactivationscdetails', {
			createdBy: user_id
			
		});
	}

	// getSuppilerName(): any {	
	// 	return this.http.get(this.serverUrl + 'inputFileprocessing/artwork/');
	// }

	getDropdown(linkno: string):any {
        console.log(this.serverUrl + "plangenerate/dropdown/" + linkno);
        return this.http.get(this.serverUrl + 'plangenerate/dropdown/' + linkno);
    }

	SubmitDeactivationData(requisition,requisitionId,index) : any {	
  
		//console.log("In GetWR_Name() for theWrNumber "+ theWrNumber);	
		//console.log("In GetWR_Name() for workflowFieldsValueSeqWise "+ workflowFieldsValueSeqWise);	
		//console.log(wr_id+'/'+userGroup_id+'/'+userID+'/['+workflowFieldsValueSeqWise+']');
	return this.http.post(this.serverUrl + 'testscratchcard/SaveDeactRequest', {
			requisition: requisition,
			requisitionId: requisitionId,
			index: index
		});
	}
	

	
	
	//PreviousHopsField/{wrID}/{wrBriefId}/{userGroup_id}/{current_hop_seq}
	//http://localhost:8019/nsa/PreviousHopsField/1/1/3/2
	
	LoadPreviousHopsField(wrID: number,wrBriefID: number,userGroup_id: number,current_hop_seq: number) : any {
		//console.log('PreviousHopsField/'+wrID+'/'+wrBriefID+'/'+userGroup_id+'/'+current_hop_seq);
		return this.http.post(this.serverUrl + 'PreviousHopsField', {
			wrID: wrID,
			wrBriefID: wrBriefID,
			userGroupID: userGroup_id,
			hopSequence: current_hop_seq
		});
	}
	
	//Update Existing Work Request
	//{wr_id}/{userGroup_id}/{user_name}/[{workflowFieldsValueSeqWise}]
	UpdateExistiongWorkRequest(wrBriefName: string,wr_id: number,userGroup_id: number,userID: string,hopSequence: number,workflowFieldsValueSeqWise: string, isDone: boolean) : any {	
  
		//console.log("In GetWR_Name() for theWrNumber "+ theWrNumber);	
		
	
	//console.log(this.serverUrl + 'ExistingWorkRequest/'+wrBriefName+'/'+wr_id+'/'+userGroup_id+'/'+userID+'/'+hopSequence+'/['+workflowFieldsValueSeqWise+']/'+isDone);
	return this.http.post(this.serverUrl + 'ExistingWorkRequest', {
			wrBriefName: wrBriefName,
			wrID: wr_id,
			userGroupID: userGroup_id,
			userID: userID,			
			workflowFieldsValueSeqWise: workflowFieldsValueSeqWise,
			hopSequence: hopSequence,
			isDone: isDone
		});
	  
	}
	
	SearchWorkRequest(wrBriefName: string,startDate: string,endDate: string,status: string) : any {	
  
		//console.log("In SearchWorkRequest() for wrBriefName "+ wrBriefName +"at "+this.serverUrl + 'search/single');	
		
	
	
	return this.http.post(this.serverUrl + 'search/single', {
			workRequestName: wrBriefName,
			starDate: startDate,
			endDate: endDate,
			status: status			
		});
	  
	}
	
	APNSearchWorkRequest(wrID:number, apnName: string) : any {	
  
		//console.log("In APNSearchWorkRequest() for apnName "+ apnName);	
		
	
		return this.http.post(this.serverUrl + 'APNSearch', {
			wrID: wrID,
			wrName: "",
			apnName: apnName,
			apnID: "",
			productType: "",
			isVDSODone: ""
		});	  
	}

	ReprovisonEligibilitySearch(productType: string,productName: string,hlr: string,	imsiClub: string,batchID: string,deProvWrname: string) : any {	
		
		//console.log("In ReprovisonEligibilitySearch()");	
		/*
		console.log(this.serverUrl + "ReProvEligibilitySearch, {	"+		
			"productType: "+productType+","+
			"productName: "+ productName+","+
			"hlr: "+ hlr+","+
			"imsiClub: "+ imsiClub+","+
			"batchID: "+ batchID+"});") ;
		*/
	
		return this.http.post(this.serverUrl + 'ReProvEligibilitySearch', {			
			productType: productType,
			productName: productName,
			hlr: hlr,
			imsiClub: imsiClub,
			batchID: batchID,	
			deProvWrname: deProvWrname	
		});	
	
		
	}

	MnpProvisonEligibilitySearch(productType: string,productName: string,hlr: string,	imsiClub: string,batchID: string) : any {	
		
		//console.log("In Mnp ProvisonEligibilitySearch()");	
		/*
		console.log(this.serverUrl + "MnpProvEligibilitySearch, {	"+		
			"productType: "+productType+","+
			"productName: "+ productName+","+
			"hlr: "+ hlr+","+
			"imsiClub: "+ imsiClub+","+
			"batchID: "+ batchID+"});") ;
		*/
	
		return this.http.post(this.serverUrl + 'MnpProvEligibilitySearch', {			
			productType: productType,
			productName: productName,
			hlr: hlr,
			imsiClub: imsiClub,
			batchID: batchID			
		});	
	
		
	}

	/* ISMS phase 2 services */

	newSimActivation(wr_id: number, user_id: string) : any {
		return this.http.post(this.serverUrl + 'workflow/newsimactivation', {
			createdBy: user_id,
			requisitionNo: wr_id,
			status: "",
			pageSize: this._global.defaultPageSize,
			offset: 0,
			msisdnForSearch: "",
			rqnNoForSearch: "",
			simStatusForSearch: -1
		});
	}

	newSimActivationDetails(wr_id: number, user_id: string) : any {
		return this.http.post(this.serverUrl + 'workflow/newsimactivationdetails', {
			createdBy: user_id,
			requisitionNo: wr_id,
			status: ""
		});
	}

	submitNewSimActivationReq(
		wr_id: number, 
		user_id: string, 
		approvedRqnLineNumbers: string, 
		rejectedRqnLineNumbers: string, 
		actionType: string) : any {
		return this.http.post(this.serverUrl + 'workflow/submitnewsimactivationreq', {
			user_id: user_id,
			wr_id: wr_id,
			actionType: actionType,
			approvedRqnLineNumbers: approvedRqnLineNumbers,
			rejectedRqnLineNumbers: rejectedRqnLineNumbers
		});
	}

	updateSimActivationReq(
		wr_id: number, 
		user_id: string, 
		approvedRqnLineNumbers: string, 
		rejectedRqnLineNumbers: string, 
		approvedSimActivationIds: string,
		actionType: string) : any {
		return this.http.post(this.serverUrl + 'workflow/updatesimactivationreq', {
			user_id: user_id,
			wr_id: wr_id,
			actionType: actionType,
			approvedRqnLineNumbers: approvedRqnLineNumbers,
			rejectedRqnLineNumbers: rejectedRqnLineNumbers,
			approvedSimActivationIds : approvedSimActivationIds
		});
	}

	activationRequestsPendingForApproval(wr_id: number, user_id: string) : any {
		return this.http.post(this.serverUrl + 'workflow/activationrequestspendingforapproval', {
			createdBy: user_id,
			requisitionNo: wr_id,
			status: "PENDING",
			pageSize: this._global.defaultPageSize,
			offset: 0,
			msisdnForSearch: "",
			rqnNoForSearch: "",
			simStatusForSearch: -1
		});
	}

	loadMySims(user_id: string, offset: Number) : any {
		return this.http.post(this.serverUrl + 'workflow/mysims', {
			createdBy: user_id,
			requisitionNo: 0,
			status: "",
			pageSize: this._global.defaultPageSize,
			offset: offset,
			msisdnForSearch: "",
			rqnNoForSearch: "",
			simStatusForSearch: -1
		});
	}

	
	loadMySimsWithSearch(user_id: string, offset: Number, msisdnForSearch: String, rqnNoForSearch: String, simStatusForSearch: Number, defWorkRequestId: Number) : any {
		return this.http.post(this.serverUrl + 'workflow/mysims', {
			createdBy: user_id,
			requisitionNo: 0,
			status: "",
			pageSize: this._global.defaultPageSize,
			offset: offset,
			msisdnForSearch: msisdnForSearch,
			rqnNoForSearch: rqnNoForSearch,
			simStatusForSearch: simStatusForSearch,
			defWorkRequestId: defWorkRequestId,
			defWorkRequestId2: 0
		});
	}

	loadMySimsforDualActionsWithSearch(user_id: string, offset: Number, msisdnForSearch: String, rqnNoForSearch: String, simStatusForSearch: Number, defWorkRequestId: Number, defWorkRequestId2: Number) : any {
		return this.http.post(this.serverUrl + 'workflow/mysimsforDualActions', {
			createdBy: user_id,
			requisitionNo: 0,
			status: "",
			pageSize: this._global.defaultPageSize,
			offset: offset,
			msisdnForSearch: msisdnForSearch,
			rqnNoForSearch: rqnNoForSearch,
			simStatusForSearch: simStatusForSearch,
			defWorkRequestId: defWorkRequestId,
			defWorkRequestId2: defWorkRequestId2
		});
	}

	loadMyInactiveSimsWithSearch(user_id: string, offset: Number, msisdnForSearch: String, rqnNoForSearch: String, simStatusForSearch: Number) : any {
		return this.http.post(this.serverUrl + 'workflow/myinactivesims', {
			createdBy: user_id,
			requisitionNo: 0,
			status: "",
			pageSize: this._global.defaultPageSize,
			offset: offset,
			msisdnForSearch: msisdnForSearch,
			rqnNoForSearch: rqnNoForSearch,
			simStatusForSearch: simStatusForSearch
		});
	}

	loadMyNonActiveSims(user_id: string) : any {
		return this.http.post(this.serverUrl + 'workflow/mynonactivesims', {
			createdBy: user_id,
			requisitionNo: 0,
			status: ""
		});
	}

	loadMySimsFiltered(user_id: string, requisitionLineMsisdnIds: string, offset: Number) : any {
		return this.http.post(this.serverUrl + 'workflow/mysims', {
			createdBy: user_id,
			requisitionNo: 0,
			status: requisitionLineMsisdnIds,
			pageSize: this._global.defaultPageSize,
			offset: offset,
			msisdnForSearch: "",
			rqnNoForSearch: "",
			simStatusForSearch: -1
		});
	}

	loadMySimsFilteredByRqnLineMsisdnOnly(requisitionLineMsisdnIds: string) : any {
		return this.http.post(this.serverUrl + 'workflow/mysims_by_rqn_line_msisdn_id', {
			createdBy: "",
			requisitionNo: 0,
			status: requisitionLineMsisdnIds,
			pageSize: this._global.defaultPageSize,
			offset: 0,
			msisdnForSearch: "",
			rqnNoForSearch: "",
			simStatusForSearch: -1
		});
	}

	loadSimActionListWithSearch(user_id: string, defWorkRequestId: Number, approvalStatus: Number, offset: Number, msisdnForSearch: String, rqnNoForSearch: String, simStatusForSearch: Number) : any {
		console.log("In loadSimActionListWithSearch(user_id: string, defWorkRequestId: Number, approvalStatus: Number, offset: Number, msisdnForSearch: String, rqnNoForSearch: String, simStatusForSearch: Number)");
		console.log("user_id: "+user_id+", defWorkRequestId: "+defWorkRequestId+", approvalStatus: "+approvalStatus+", offset: "+offset+", msisdnForSearch: "+msisdnForSearch+", rqnNoForSearch: "+rqnNoForSearch+", simStatusForSearch:"+simStatusForSearch);
		return this.http.post(this.serverUrl + 'workflow/simactionlist', {
			createdBy: user_id,
			requisitionNo: defWorkRequestId,
			status: approvalStatus.toString(),
			pageSize: this._global.defaultPageSize,
			offset: offset,
			msisdnForSearch: msisdnForSearch,
			rqnNoForSearch: rqnNoForSearch,
			simStatusForSearch: simStatusForSearch
		});
	}

	submitSimActionRequest(requestObj: any) : any {
		return this.http.post(this.serverUrl + 'workflow/submitsimactionrequest', requestObj);
	}


	simActionRequestsPendingForApproval(wr_id: number, user_id: string) : any {
		console.log("wr_id: "+wr_id+", user_id: "+user_id);
		return this.http.post(this.serverUrl + 'workflow/simactionspendingforapproval', {
			createdBy: user_id,
			requisitionNo: wr_id,
			status: "PENDING"
		});
	}

	simActionDualRequestsPendingForApproval(wr_id: string, user_id: string) : any {
		console.log("wr_id: "+wr_id+", user_id: "+user_id);
		return this.http.post(this.serverUrl + 'workflow/simactionspendingforapproval', {
			createdBy: user_id,
			requisitionNo: wr_id,
			status: "PENDING"
		});
	}

	simActionRequestDetailsPendingForApproval(sim_action_id: number) : any {
		return this.http.post(this.serverUrl + 'workflow/simactiondetailspendingforapproval', {
			createdBy: 0,
			requisitionNo: sim_action_id,
			status: "PENDING"
		});
	}

	updateSimAction(data: any) : any {
		return this.http.post(this.serverUrl + 'workflow/updatesimaction', data);
	}


	doPendingSimActionExistsForRqnLineMsisdnId(idsPassed: Array<number>) : any {
		return this.http.post(this.serverUrl + 'workflow/dopendingsimactionexistsforrqnlinemsisdnid', {
			idsPassed: idsPassed
		});
	}


	ownRequestsForSimAction(wr_id: number, user_id: string) : any {
		return this.http.post(this.serverUrl + 'workflow/ownrequestsforsimaction', {
			createdBy: user_id,
			requisitionNo: wr_id,
			status: "PENDING"
		});
	}

	ownRequestsForDualSimAction(wr_id: string, user_id: string) : any {
		return this.http.post(this.serverUrl + 'workflow/ownrequestsforsimaction', {
			createdBy: user_id,
			requisitionNo: wr_id,
			status: "PENDING"
		});
	}

	getUserList() : any {
		return this.http.post(this.serverUrl + 'workflow/userlist', {
			createdBy: 0,
			requisitionNo: 0,
			status: ""
		});
	}

	getDashboardCounters(user_id: string) : any {
		return this.http.post(this.serverUrl + 'dashboard/counters', {
			createdBy: user_id,
			requisitionNo: 0,
			status: ""
		});
	}

	UploadFileNameVsBatchId(mapData: Array<any>, user_name : String):any{
		console.log(environment.apiUrl);
console.log(this.serverUrl+'FileNameVsBatchIdUpload');
		return this.http.post(this.serverUrl+'FileNameVsBatchIdUpload',
			{
				filenameBatchId:mapData, 
				userName:user_name
			}
		)
	}


	// Get whether batchId is uploaded
	CheckDeProvEligibleBatchId(batchId: string, wrName: string): any {		
		
		console.log(this.serverUrl + 'DeProvEligibilitySearch/' + batchId);
		return this.http.post(this.serverUrl + 'DeProvEligibilitySearch/' + batchId+'/' +wrName , {
			batchID: batchId,
			wrName: wrName
			}
		)
	}
	
	checkFileValidity(fileName:String):any{
		return this.http.post(this.serverUrl+"defFileValidity/",fileName);
	}

}
