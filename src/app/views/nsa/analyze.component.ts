import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Misidn } from '../../views/nsa/misidn';
import { MsisdnService } from '../../views/nsa/msisdn.service';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

import {Observable} from 'rxJS/Observable';
import { catchError, } from 'rxJs/operators';
import {_throw} from 'rxjs/observable/throw';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit {

  misisdnList: Misidn[] = [];
  misisdn: Misidn;
  startDate:string;
  endDate:string;
  analyzealert:string;
  analyzeenable:boolean=false;
  constructor(private httpClient: HttpClient, private msisdnService: MsisdnService, private datePipe: DatePipe,
  private activeRoute:ActivatedRoute){ }

  ngOnInit() {
    this.activeRoute .queryParams
    .subscribe(params => {
      this.startDate = params['startDate'];
      this.endDate = params['endDate'];
    });

    if(this.startDate=="" || this.startDate==undefined || this.endDate=="" || this.endDate==undefined){
      this.analyzealert="Please Enter Start Date and End Date in Generate/Analyze Menu";
      this.analyzeenable=true;
      }else{
        this.analyze();
        this.analyzeenable=false;
      }
    
  }

  
  analyze() {
    this.msisdnService.getAnalyzeData(this.startDate, this.endDate).subscribe((res: Misidn[]) => {
      console.log(res);
      if (res == null) {
        this.analyzealert = "Couldnot Find the Analyze List from " + this.startDate + " to " + this.endDate;
        this.analyzeenable=true;
      } else {
        this.misisdnList = res;
        this.analyzeenable=false;
      }
    }, err => {
     this.analyzeenable = true;
     this.analyzealert = "Internal Server Error";
    });
  }



  clearAnalyze(linkno: number):Observable<any>{
    return this.httpClient.get(environment.apiUrl + "msisdn_recycle_list_analyze/clear/" + linkno).pipe(
      catchError(this.handleError));
  }
  
  
  handleError(error: HttpErrorResponse){
    if(error instanceof ErrorEvent){
    
    }else {
      
      switch (error.status) {
      case 404:    
        this.analyzeenable = true;
        this.analyzealert = "MSISDN Deletion Fail";
            break;
        }
      }
     return _throw(error);
    }

  
  clear(linkno: number) {
   
     this.clearAnalyze(linkno).subscribe((res => {

     if(res==false){
      this.analyzeenable =true;
      this.analyzealert = "MSISDN Deletion Fail";
     }
     else{
      this.misisdnList = this.misisdnList.filter( h => h.id !==linkno);
      this.analyzeenable =true;
      this.analyzealert = "MSISDN Deletion Success";
     }
   
    }), err => {
     this.analyzeenable = true;
      this.analyzealert = "MSISDN delettion Fail";
     });

  }
  downloadfile(path:string,std:Date,end:Date,id: any) {
    const httpOptions = {
      responseType: 'blob' as 'json',
    };
    let st = this.datePipe.transform(std, "dd-MM-yyyy");
    let dt = this.datePipe.transform(end, "dd-MM-yyyy");

    this.httpClient.get(environment.apiUrl + "/msisdn_recycle_list_analyze/download/" + id,
      httpOptions).subscribe((response: Response) => {
     
        if (response == null) {
          this.analyzeenable = true;
          this.analyzealert = "Couldnot Find the File from " + st + " to " + dt;
        } else {
          const a = document.createElement('a');
          document.body.appendChild(a);
          const blob = new Blob([response], { type: 'octet/stream' });
          const url = window.URL.createObjectURL(response);
          a.href = url;
          a.download = path + ".csv";
          a.click();
          window.URL.revokeObjectURL(url);
          console.log(response.headers);
        }
      });
  }
}
