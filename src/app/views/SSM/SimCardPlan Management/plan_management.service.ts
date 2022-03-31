import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment.prod';
import { Router } from '@angular/router';
import {catchError,} from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';

import{PlanGenerate} from"./plangenerate.component"

import { AppGlobals } from './../../../app.global';


@Injectable()
export class PlanManagementService {
	
private headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

 
  private prepareSearchFormdata(data: PlanGenerate) : any {
        const formData: FormData = new FormData();
  //console.log("Daat "+data.imsiType)
            formData.append('file',data.fileToUpload, data.fileToUpload.name);
            formData.append('planID',data.planID)
       
        return formData;
    }
	
 
 private options = {
    headers: this.headers,
	responseType: 'text' as 'json'
 }


	serverUrl: string;
	
	constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) { 
		this.serverUrl = environment.apiUrl;  		
	}
	postFile(fileToUpload: File) {
        const url = environment.apiUrl + "plangeneration/getcsvData/";
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(url, formData);
    }
    
    getDropdown(linkno: string):any {
        return this.http.get(this.serverUrl + "plangenerate/dropdown/" + linkno).pipe(catchError(this.handleError));
    }
    
    getkitSerial(itemNo:any[]):any{
		return this.http.get(this.serverUrl  +"plangenerate/simkit/"+itemNo).pipe(catchError(this.handleError));
		
	}
    
  GetAllIMSI(): any {	
		//console.log("In GetAllIMSI()"); 		
		return this.http.get(this.serverUrl + 'IMSI_Group/');
	}
    
    generatePlan(Object :{}):any{
	return this.http.post(this.serverUrl+"plangenerate/genratePlan/",Object);
}
    
    handleError(error: HttpErrorResponse) {
        if (error instanceof ErrorEvent) {
        } else {
            switch (error.status) {
                case 404:
                   
                    break;
            }
        }
        return _throw(error);
    }
    /*
    uploadCsv(data:PlanGenerate) {
        const url = environment.apiUrl + "plangeneration/uploadCSv/"+data.imsiType;
     
        return this.http.post(url, this.prepareSearchFormdata(data));
    }
*/
    uploadCSvAndGeneratePlan(object :any):any{
        
        return this.http.post(this.serverUrl+"plangenerate/uploadCSvAndGeneratePlan/",object);
       

    }

    uploadCSvAndGeneratePlanForUnpaired(object :any):any{
        
        return this.http.post(this.serverUrl+"unpairedUploadAndPlanGenerate/start/",object);
       

    }
    
     getConfig(hop:number): Observable<any>{
	  return this.http.get(environment.apiUrl + "plangenerate/getsimconfighops/" +hop).pipe(catchError(this.handleError));
	
}

getAllBatchTestDone(): Observable<any>{
    return this.http.get(environment.apiUrl + "plangenerate/loadbatchtestdone/" ).pipe(catchError(this.handleError));
  
}
    cancelHop(username:string,Id:number){
	
	return this.http.post(this.serverUrl + 'plangenerate/cancelHop/', {
		username:username,
		id:Id,
			});
}
setHop(username:string,Id:number,comment:string){
	
	return this.http.post(this.serverUrl + 'plangenerate/saveHop/', {
		username:username,
		id:Id,
		comments:comment
			});

	
	}
	
		
	DownloadCSV(fileNameToDownload: string){
        return this.http.post(this.serverUrl +"plangenerate/downloadCSV/", fileNameToDownload,this.options);
    }

setPackeging(username:string,Id:number,printing:any,packaging:any,delivery:any,comments: any):any{
	
	return this.http.post(this.serverUrl + 'plangenerate/simpackaginghop/', {
		username:username,
		id:Id,
		printingDate: printing,
		packagingDate:packaging,
		deliveryDate:delivery,
		comments:comments
			});

	
	}
	
	
	setplanApproval(username:string,Id:number,comment:string,hop:number):any{
	
	return this.http.post(this.serverUrl + 'plangenerate/approvals/', {
		username:username,
		id:Id,
		comments:comment,
		lastHopID:hop
			});

	
	}
	
	getBatchFileStatus(id:number):any{
		return this.http.get(this.serverUrl + 'plangenerate/batchFilestatus/'+id)
		
    }
    
    getBatchTestAutoFetchData(id:number):any{
		return this.http.get(this.serverUrl + 'plangenerate/batchTestAutoFetchData/'+id)
		
	}
	
	postBatchFile(fileToUpload: File,type:string) {
        const url = environment.apiUrl + "plangeneration/uploadBatchFile/"+type;
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(url, formData);
    }
 
 /*this.batchTesting.controls.testFor.value,
 msisdnType,
 this.batchTesting.controls.testMSISDN.value,
 this.batchTesting.controls.handsetUsed.value,			
 this.batchTesting.controls.testedBy.value,
 testStatus,
 this.username,this.ID
 */
 saveBatch(testFor:string,msisdnType:string,testMSISDN:string,handsetUsed:string,
 testedBy:string,testStatus:string,username:string,Id:number,fileName:string){
return 	this.http.post(this.serverUrl+"plangenerate/savebatchtest/",{
    testFor:testFor,
    msisdnType:msisdnType,
    handsetUsed:handsetUsed,
    username:username,
    testedBy:testedBy,
    planId:Id,
    testStatus:testStatus,
    fileName:fileName,
    testMSISDN:testMSISDN
	
})
	
}

postfaultyFile(fileToUpload: File,Comments:string){
	
	
        const url = environment.apiUrl + "plangeneration/uploadfaultyFile/"+Comments;
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(url, formData);
	
}

PlanActivationWOFileUpload(Comments:string){
	

    
    return this.http.post(environment.apiUrl + "plangeneration/PlanActivationWOFileUpload/"+Comments,{});

}

getTotalQuantiy(imsitype:any[]):any{
	console.log(imsitype)
	return this.http.get(this.serverUrl+"plangenerate/gettotalquantity/"+imsitype)
	
}


returnandReciceve(Object :{}):any{
	return this.http.post(this.serverUrl+"plangenerate/lasthop/",Object);
}
    
		postReturnFile(fileToUpload: File,type:number) {
        const url = environment.apiUrl + "plangeneration/uploadlasthopfile/"+type;
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(url, formData);
    }
	
	
    
    getUser(username:string):any{
	
	return 	this.http.put(this.serverUrl+"unpaired/getuser",{username:username});
}
    
	}