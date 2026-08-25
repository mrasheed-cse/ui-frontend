import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';





import { AppGlobals } from './../../../app.global';


@Injectable()
export class ReportService {

  serverUrl: string;

  constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) {
    this.serverUrl = environment.apiUrl;
  }

  SingleNumberReport(msisdn: string) : any {	
  
    console.log("In SingleNumberReport() for MSISDN "+ msisdn);
    
		return this.http.post(this.serverUrl + 'SingleNumberReport', {
      msisdn: msisdn
		});	  
  }
  
  MultipleNumberReport(startMSISDN: string, endMSISDN: string) : any {	
  
    console.log("In MultipleNumberReport() for startMSISDN: "+ startMSISDN+" and endMSISDN: "+endMSISDN);
    
		return this.http.post(this.serverUrl + 'MultipleNumberReport', {
      start: startMSISDN,
      end: endMSISDN
		});	  
	}

}
