import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Misidn } from '../../views/nsa/misidn';
import { MsisdnService } from '../../views/nsa/msisdn.service';
import { HttpClient,HttpHeaders,HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { JSONP_ERR_WRONG_RESPONSE_TYPE, JsonpCallbackContext } from '@angular/common/http/src/jsonp';
import { environment } from '../../../environments/environment.prod';
import { ActivatedRoute, Router, ActivationEnd } from '@angular/router';
import {map} from 'rxJS/operator/map';
import {Observable} from 'rxJS/Observable';
import { catchError, } from 'rxJs/operators';
import {_throw} from 'rxjs/observable/throw';
import {ResponseMessage} from '../nsa/response-message';
@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {

  misisdnList: Misidn[] = [];
  misisdn: Misidn;
  startDate: string;
  endDate: string;
  genalert: string;
  genenable: boolean = false;

  constructor(private httpClient: HttpClient, private msisdnService: MsisdnService, private datePipe: DatePipe,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.queryParams
      .subscribe(params => {
        this.startDate = params['startDate'];
        this.endDate = params['endDate'];
      });
    if (this.startDate == "" || this.startDate == undefined || this.endDate == "" || this.endDate == undefined) {
      this.genalert = "Please Enter Start Date and End Date in Generate/Analyze Menu";
      this.genenable = true;
    } else {
      this.generate();
      this.genenable = false;
    }

  }

  generate() {
    this.msisdnService.getGenerateData(this.startDate, this.endDate).subscribe((res: Misidn[]) => {
      console.log(res);

      if (res == null) {
        this.genalert = "Couldnot Find the Generate List from " + this.startDate + " to " + this.endDate;
        this.genenable = true;
      } else {
        this.misisdnList = res;
        this.genenable = false;
      }
    }, err => {
      this.genenable = true;
      this.genalert = "Internal Server Error";
    });
  }


clearGenerate(linkno: number):Observable<ResponseMessage>{
  return this.httpClient.get(environment.apiUrl + "msisdn_recycle_list_generate/clear/" + linkno).pipe(
    catchError(this.handleError));
}


handleError(error: HttpErrorResponse){
  if(error instanceof ErrorEvent){
  } else {
    switch (error.status) {
       case 404:    
      this.genenable = true;
      this.genalert = "MSISDN Deletion Fail";
          break;
      }
  }
   return _throw(error);
  }



    clear(linkno: number) {
   
   this.clearGenerate(linkno). subscribe((res:ResponseMessage) => {
     console.log(res);
          if (res.response==false) {
        this.genenable = true;
        this.genalert = "MSISDN Deletion Fail";
      }
      else {
        this.misisdnList = this.misisdnList.filter(h => h.id !== linkno);
        this.genenable = true;
        this.genalert = "MSISDN Deletion Success";
      }
      console.log(res)
    }), err => {
     
      this.genenable = true;
      this.genalert = "MSISDN deletion Fail";
    };

  }
  downloadfile(path:string,std: Date, end: Date, id: any) {
    const httpOptions = {
      responseType: 'blob' as 'json',
    };
    let st = this.datePipe.transform(std, "dd-MM-yyyy");
    let dt = this.datePipe.transform(end, "dd-MM-yyyy");
    this.httpClient.get(environment.apiUrl + "/msisdn_recycle_list_generate/download/" + id,
      httpOptions).subscribe((response: Response) => {
        if (response == null) {
          this.genenable = true;
          this.genalert = "Couldnot Find the File from " + st + " to " + dt;
        } else {
          const a = document.createElement('a');
          document.body.appendChild(a);
          const blob = new Blob([response], { type: 'octet/stream' });
          const url = window.URL.createObjectURL(response);
          a.href = url;
          a.download = path;
          a.click();
          window.URL.revokeObjectURL(url);
          console.log(response.headers);
        }
      });

  }

}
