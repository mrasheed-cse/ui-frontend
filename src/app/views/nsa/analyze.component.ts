import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Misidn } from '../../views/nsa/misidn';
import { MsisdnService } from '../../views/nsa/msisdn.service';
import { HttpClient } from '@angular/common/http';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';
import {environment} from '../../../environments/environment.prod';
@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit {

  startdate: Date
  enddate: Date;
  maxDate: Date;
  bsInlineValue = new Date();
  minDate: Date;
  enable: boolean = false;
  generateenable: boolean = false;
  generatealert: string;

  misisdnList: Misidn[] = [];
  misisdn: Misidn;
  constructor(private httpClient: HttpClient, private msisdnService: MsisdnService, private datePipe: DatePipe) {

    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate());
  }

  ngOnInit(): void {

  }

  isLoading: boolean = false;

  changeStartDate() {
    this.minDate.setDate(this.startdate.getDate());
    this.minDate.setMonth(this.startdate.getMonth());
    this.minDate.setFullYear(this.startdate.getFullYear());

  }
  changeEndDate() {
    this.maxDate.setDate(this.enddate.getDate());
    this.maxDate.setMonth(this.enddate.getMonth());
    this.maxDate.setFullYear(this.enddate.getFullYear());


  }
  analyze() {
    let st = this.datePipe.transform(this.startdate, "dd-MM-yyyy");
    let dt = this.datePipe.transform(this.enddate, "dd-MM-yyyy");

    this.isLoading = true;
    this.msisdnService.getAnalyzeData(st, dt).subscribe((res: Misidn[]) => {
      this.enable = true;
      this.isLoading = false;
      this.generateenable = false;
      console.log(res);
      if (res == null) {
        this.generateenable = true;
        this.generatealert = "Couldnot Find the Analyze List from " + st + " to " + dt;
      } else {
        this.misisdnList = res;
      }
    }, err => {
      this.enable = true;
      this.isLoading = false;
      this.generateenable = true;
      this.generatealert = "Internal Server Error";
    });
  }
  fileObservable: any;
  generate() {

    let st = this.datePipe.transform(this.startdate, "dd-MM-yyyy");
    let dt = this.datePipe.transform(this.enddate, "dd-MM-yyyy");

    this.isLoading = true;
    this.msisdnService.getAnalyzeData(st, dt).subscribe((res: Misidn[]) => {
      this.enable = true;
      this.isLoading = false;
      this.generateenable = false;
      console.log(res);
      if (res == null) {
        this.misisdnList[0] = null;
        this.misisdnList.length = 0;
        this.generateenable = true;
        this.generatealert = "Couldnot Find the Generation List from " + st + " to " + dt;
      } else {
        this.misisdnList = res;
      }
    }, err => {
      this.enable = true;
      this.isLoading = false;
      this.generateenable = true;
      this.generatealert = "Internal Server Error";
    });

  }
  clear(linkno: number) {
    console.log(linkno);
    this.isLoading = true;
    // this.httpClient.get(environment.apiUrl + "/clear/" + linkno).subscribe((res => {
    //   this.enable = true;
    //   this.isLoading = false;
    //   this.generateenable = false;

    // }), err => {
    //   this.enable = true;
    //   this.isLoading = false;
    //   this.generateenable = true;
    //   this.generatealert = "MSISDN delettion Fail";
    // });

  }
  downloadfile(id: any) {
    const httpOptions = {
      responseType: 'blob' as 'json',
    };
      this.httpClient.get(environment.apiUrl+"/msisdn_recycle_list_download/download/" + id,
      httpOptions).subscribe((response: Response) => {

        if (response == null) {
          let st = this.datePipe.transform(this.startdate, "dd-MM-yyyy");
          let dt = this.datePipe.transform(this.enddate, "dd-MM-yyyy");
          this.generateenable = true;
          this.generatealert = "Couldnot Find the File from " + st + " to " + dt;
        } else {
          const a = document.createElement('a');
          document.body.appendChild(a);
          const blob = new Blob([response], { type: 'octet/stream' });
          const url = window.URL.createObjectURL(response);
          a.href = url;
          a.download = id + ".csv";
          a.click();
          window.URL.revokeObjectURL(url);
          console.log(response.headers);
        }
      });

  }
}
