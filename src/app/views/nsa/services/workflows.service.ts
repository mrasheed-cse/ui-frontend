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

import { AppGlobals } from './../../../app.global';

@Injectable()
export class WorkflowsService {

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
  
	//Create New Work Request
	//{wr_id}/{userGroup_id}/{user_name}/[{workflowFieldsValueSeqWise}]
	CreateNewWorkRequest(wr_id: number,userGroup_id: number,userID: string,workflowFieldsValueSeqWise: string) : any {	
  
		//console.log("In GetWR_Name() for theWrNumber "+ theWrNumber);	
		console.log("In GetWR_Name() for workflowFieldsValueSeqWise "+ workflowFieldsValueSeqWise);	
		console.log(wr_id+'/'+userGroup_id+'/'+userID+'/['+workflowFieldsValueSeqWise+']');
	
	
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
	
	//PreviousHopsField/{wrID}/{wrBriefId}/{userGroup_id}/{current_hop_seq}
	//http://localhost:8019/nsa/PreviousHopsField/1/1/3/2
	
	LoadPreviousHopsField(wrID: number,wrBriefID: number,userGroup_id: number,current_hop_seq: number) : any {
		console.log('PreviousHopsField/'+wrID+'/'+wrBriefID+'/'+userGroup_id+'/'+current_hop_seq);
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
		
	
	console.log(this.serverUrl + 'ExistingWorkRequest/'+wrBriefName+'/'+wr_id+'/'+userGroup_id+'/'+userID+'/'+hopSequence+'/['+workflowFieldsValueSeqWise+']/'+isDone);
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
  
		console.log("In SearchWorkRequest() for wrBriefName "+ wrBriefName);	
		
	
	
	return this.http.post(this.serverUrl + 'search/single', {
			workRequestName: wrBriefName,
			starDate: startDate,
			endDate: endDate,
			status: status			
		});
	  
	}
	
	APNSearchWorkRequest(wrID:number, apnName: string) : any {	
  
		console.log("In APNSearchWorkRequest() for apnName "+ apnName);	
		
	
		return this.http.post(this.serverUrl + 'APNSearch', {
			wrID: wrID,
			wrName: "",
			apnName: apnName,
			apnID: "",
			productType: "",
			isVDSODone: ""
		});	  
	}

	ReprovisonEligibilitySearch(productType: string,productName: string,hlr: string,	imsiClub: string,batchID: string) : any {	
		
		console.log("In ReprovisonEligibilitySearch()");	
		console.log(this.serverUrl + "ReProvEligibilitySearch, {	"+		
			"productType: "+productType+","+
			"productName: "+ productName+","+
			"hlr: "+ hlr+","+
			"imsiClub: "+ imsiClub+","+
			"batchID: "+ batchID+"});") ;
		
	
		return this.http.post(this.serverUrl + 'ReProvEligibilitySearch', {			
			productType: productType,
			productName: productName,
			hlr: hlr,
			imsiClub: imsiClub,
			batchID: batchID			
		});	
	
		
	}

	MnpProvisonEligibilitySearch(productType: string,productName: string,hlr: string,	imsiClub: string,batchID: string) : any {	
		
		console.log("In Mnp ProvisonEligibilitySearch()");	
		console.log(this.serverUrl + "MnpProvEligibilitySearch, {	"+		
			"productType: "+productType+","+
			"productName: "+ productName+","+
			"hlr: "+ hlr+","+
			"imsiClub: "+ imsiClub+","+
			"batchID: "+ batchID+"});") ;
		
	
		return this.http.post(this.serverUrl + 'MnpProvEligibilitySearch', {			
			productType: productType,
			productName: productName,
			hlr: hlr,
			imsiClub: imsiClub,
			batchID: batchID			
		});	
	
		
	}
}
