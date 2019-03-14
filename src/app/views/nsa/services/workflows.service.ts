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
	//{wr_id}/{userGroup_id}/{user_id}/[{workflowFieldsValueSeqWise}]
	CreateNewWorkRequest(wr_id: number,userGroup_id: number,user_id: number,workflowFieldsValueSeqWise: string) : any {	
  
		//console.log("In GetWR_Name() for theWrNumber "+ theWrNumber);	
		
	
	return this.http.post(this.serverUrl + 'NewWorkRequest/'+wr_id+'/'+userGroup_id+'/'+user_id+'/['+workflowFieldsValueSeqWise+']', {
			wr_id: wr_id,
			userGroup_id: userGroup_id,
			user_id: user_id,
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
}
