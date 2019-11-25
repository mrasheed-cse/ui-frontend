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
export class IsmsreportService {

  serverUrl: string;

  constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) {
    this.serverUrl = environment.apiUrl;
  }

  /**********************************
	 * TEST SIM REQUISITION REPORTS
	 ***********************************/

  TestSimRequisitionReport(requisitionNo: string, starDate: string, endDate: string, status: string,
    starMsisdn: string, endMsisdn: string, owner: number ) : any {	
  
    console.log("In TestSimRequisitionReport()");
    
		return this.http.post(this.serverUrl + 'ReportTestSimRequisition', {
      "requisitionNo": requisitionNo,
      "starDate": starDate,
      "endDate": endDate,
      "status": status,
      "starMsisdn": starMsisdn,
      "endMsisdn": endMsisdn,  
      "owner": owner
    }
    );	  
  }

  /**********************************
	 * TEST SIM ACTIVATION REPORTS
	 ***********************************/

  TestSimActivatonReport(requisitionNo: string, starDate: string, endDate: string, status: string,
    starMsisdn: string, endMsisdn: string, owner: number ) : any {	
  
    console.log("In TestSimActivationReport()");
    
		return this.http.post(this.serverUrl + 'ReportTestSimActivation', {
      "requisitionNo": requisitionNo,
      "starDate": starDate,
      "endDate": endDate,
      "status": status,
      "starMsisdn": starMsisdn,
      "endMsisdn": endMsisdn,  
      "owner": owner
    }
    );	  
  }


  /**********************************
	 * TEST SIM ACTION REPORTS 
	 ***********************************/
  
  TestSimActitonReport(requisitionNo: string, starDate: string, endDate: string, status: string,
    starMsisdn: string, endMsisdn: string, owner: number, month: number, year: number,  simActionRequestName: string) : any {	
  
    console.log("In TestSimActitonReport() for " + simActionRequestName);
    
		return this.http.post(this.serverUrl + 'ReportTestSimActions', {
      "requisitionNo": requisitionNo,
      "starDate": starDate,
      "endDate": endDate,
      "status": status,
      "starMsisdn": starMsisdn,
      "endMsisdn": endMsisdn,  
      "owner": owner,    
      "month": month,
      "year": year,
      "simActionRequestName": simActionRequestName
    }
    );	  
  }
  
  

}
