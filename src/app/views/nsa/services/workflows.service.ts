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
	CreateNewWorkRequest(wr_id: number,userGroup_id: number,user_id: number,workflowFieldsValueSeqWise: string) : boolean {	
  
		//console.log("In GetWR_Name() for theWrNumber "+ theWrNumber);	
		
	
	this.http.post(this.serverUrl + 'NewWorkRequest/'+wr_id+'/'+userGroup_id+'/'+user_id+'/['+workflowFieldsValueSeqWise+']', {
			wr_id: wr_id,
			userGroup_id: userGroup_id,
			user_id: user_id,
			workflowFieldsValueSeqWise: workflowFieldsValueSeqWise
		}).subscribe(
      res  =>  {
        //this.errorMsg = '';
		//console.log('response is : '+res);
		if(res !== null){
			this.isSaved = true;        
		}
      },
      err  =>  {
		  this.isSaved = false;
		  //console.log("err.status : "+err.status);		  
		  //console.log("Returning "+ this.isSaved);	
      }
      );
	    return this.isSaved;
	}


}
