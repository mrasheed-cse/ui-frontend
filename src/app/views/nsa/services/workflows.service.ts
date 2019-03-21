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
	CreateNewWorkRequest(wr_id: number,userGroup_id: number,user_name: string,workflowFieldsValueSeqWise: string) : any {	
  
		//console.log("In GetWR_Name() for theWrNumber "+ theWrNumber);	
		console.log("In GetWR_Name() for workflowFieldsValueSeqWise "+ workflowFieldsValueSeqWise);	
		console.log(wr_id+'/'+userGroup_id+'/'+user_name+'/['+workflowFieldsValueSeqWise+']');
	
	
	return this.http.post(this.serverUrl + 'NewWorkRequest', {
			wrID: wr_id,
			userGroupID: userGroup_id,
			userName: user_name,
			workflowFieldsValueSeqWise: workflowFieldsValueSeqWise
		});
	}
	//PendingTasks/{wr_id}/{userGroup_id}
	//http://localhost:8019/nsa/PendingTasks/1/3
	
	LoadPendingTask(wr_id: number,userGroup_id: number) : any {
		return this.http.post(this.serverUrl + 'PendingTasks/'+wr_id+'/'+userGroup_id, {
			wr_id: wr_id,
			userGroup_id: userGroup_id
		});
	}
	
	//PreviousHopsField/{wrID}/{wrBriefId}/{userGroup_id}/{current_hop_seq}
	//http://localhost:8019/nsa/PreviousHopsField/1/1/3/2
	
	LoadPreviousHopsField(wrID: number,wrBriefId: number,userGroup_id: number,current_hop_seq: number) : any {
		return this.http.post(this.serverUrl + 'PreviousHopsField/'+wrID+'/'+wrBriefId+'/'+userGroup_id+'/'+current_hop_seq, {
			wrID: wrID,
			wrBriefId: wrBriefId,
			userGroup_id: userGroup_id,
			current_hop_seq: current_hop_seq
		});
	}
	
	//Update Existing Work Request
	//{wr_id}/{userGroup_id}/{user_name}/[{workflowFieldsValueSeqWise}]
	UpdateExistiongWorkRequest(wrBriefName: string,wr_id: number,userGroup_id: number,user_name: string,hopSequence: number,workflowFieldsValueSeqWise: string, isDone: boolean) : any {	
  
		//console.log("In GetWR_Name() for theWrNumber "+ theWrNumber);	
		
	
	return this.http.post(this.serverUrl + 'ExistingWorkRequest/'+wrBriefName+'/'+wr_id+'/'+userGroup_id+'/'+user_name+'/'+hopSequence+'/['+workflowFieldsValueSeqWise+']/'+isDone, {
			wrBriefName: wrBriefName,
			wr_id: wr_id,
			userGroup_id: userGroup_id,
			user_name: user_name,
			hopSequence: hopSequence,
			workflowFieldsValueSeqWise: workflowFieldsValueSeqWise,
			isDone: isDone
		});
	  
	}
}
