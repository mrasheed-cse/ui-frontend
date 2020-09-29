import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Misidn } from '../../views/analyze/misidn';
import { environment } from '../../../environments/environment.prod';
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
  constructor(private httpClient: HttpClient) {

    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate());

    this.misisdn = { listno: 85, formdate: '21-01-2020', todate: '22-01-2020', misidn: 12345 };
    this.misisdnList[0] = this.misisdn;
  }

  ngOnInit(): void {

  }

  isLoading: boolean = false;

changeStartDate(){
  this.minDate.setDate(this.startdate.getDate());
}
changeEndDate(){
  this.maxDate.setDate(this.enddate.getDate()+1);
}
  analyze() {
    this.isLoading = true;
    this.httpClient.get(environment.apiUrl + "/msisdn_recycle_list_download/start/" + this.startdate + "/" + this.enddate).subscribe((res => {
      this.enable = true;
      this.isLoading = false;
      this.generateenable = false;

    }), err => {
      this.enable = true;
      this.isLoading = false;
      this.generateenable = true;
      this.generatealert = "Analyze Fail";
    });
  }
  fileObservable: any;
  generate() {
    this.isLoading = true;
    this.httpClient.get(+environment.apiUrl + "/msisdn_recycle_list_download/start/" + this.startdate + "/" + this.enddate).subscribe((res => {
      this.enable = true;
      this.isLoading = false;
      this.generateenable = false;

    }), err => {
      this.enable = true;
      this.isLoading = false;
      this.generateenable = true;
      this.generatealert = "Generation Fail";
    });

  }
  clear(linkno: number) {
    console.log(linkno);
    this.isLoading = true;
    this.httpClient.get(environment.apiUrl + "/clear/" + linkno).subscribe((res => {
      this.enable = true;
      this.isLoading = false;
      this.generateenable = false;

    }), err => {
      this.enable = true;
      this.isLoading = false;
      this.generateenable = true;
      this.generatealert = "MSISDN delettion Fail";
    });

  }
}


