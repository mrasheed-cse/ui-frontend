import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Misidn } from '../../views/nsa/misidn';
import {MsisdnService} from '../../views/nsa/msisdn.service';
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
  constructor(private msisdnService:MsisdnService,private datePipe:DatePipe) {

    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate());
  }

  ngOnInit(): void {

  }

  isLoading: boolean = false;

changeStartDate(){
  this.minDate.setDate(this.startdate.getDate());
  this.minDate.setMonth(this.startdate.getMonth());
  this.minDate.setFullYear(this.startdate.getFullYear());

}
changeEndDate(){
  this.maxDate.setDate(this.enddate.getDate());
  this.maxDate.setMonth(this.enddate.getMonth());
  this.maxDate.setFullYear(this.enddate.getFullYear());


}
  analyze() {
    let st=this.datePipe.transform(this.startdate,"dd-MM-yyyy");
    let dt=this.datePipe.transform(this.enddate,"dd-MM-yyyy");

    this.isLoading = true;
    this.msisdnService.getAnalyzeData(st,dt).subscribe((res:Misidn) => {
      this.enable = true;
      this.isLoading = false;
      this.generateenable = false;
      console.log(res);
      if(res==null){
        this.generateenable = true;
        this.generatealert = "Couldnot Find the Generation List from "+st+" to "+dt;
      }else{
        this.misisdnList[0]=res;
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

    let st=this.datePipe.transform(this.startdate,"dd-MM-yyyy");
    let dt=this.datePipe.transform(this.enddate,"dd-MM-yyyy");

    this.isLoading = true;
    this.msisdnService.getAnalyzeData(st,dt).subscribe((res:Misidn) => {
      this.enable = true;
      this.isLoading = false;
      this.generateenable = false;
      console.log(res);
      if(res==null){
        this.misisdnList[0]=null;
        this.misisdnList.length=0;
        this.generateenable = true;
        this.generatealert = "Couldnot Find the Generation List from "+st+" to "+dt;
      }else{
        this.misisdnList[0]=res;
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
}


