import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-generateanalyze',
  templateUrl: './generateanalyze.component.html',
  styleUrls: ['./generateanalyze.component.scss']
})
export class GenerateanalyzeComponent implements OnInit {


  startdate: Date
  enddate: Date;
  maxDate: Date;
  bsInlineValue = new Date();
  minDate: Date;
  enable: boolean = false;
  generateenable: boolean = false;
  generatealert: string;
  dateenable:boolean=false;
  constructor(private datePipe: DatePipe, private router: Router) {

   // this.minDate = new Date();
   // this.maxDate = new Date();
   // this.minDate.setDate(this.minDate.getDate()-1);
    //this.maxDate.setDate(this.maxDate.getDate());
  }

  ngOnInit() {
  }
  isLoading: boolean = false;

  changeStartDate() {
    // this.minDate.setDate(this.startdate.getDate());
    // this.minDate.setMonth(this.startdate.getMonth());
    // this.minDate.setFullYear(this.startdate.getFullYear());

  }
  changeEndDate() {
    // this.maxDate.setDate(this.enddate.getDate());
    // this.maxDate.setMonth(this.enddate.getMonth());
    // this.maxDate.setFullYear(this.enddate.getFullYear());


  }

  generate() {
    let st = this.datePipe.transform(this.startdate, "dd-MM-yyyy");
    let dt = this.datePipe.transform(this.enddate, "dd-MM-yyyy");
    if (this.startdate.getTime() > this.enddate.getTime()) {
      this.dateenable=true;
      console.log("Start date cannot greate than End date");
    }
    else {
      this.router.navigate(['/nsa/generate'], { queryParams: { startDate: st, endDate: dt } });
      this.dateenable=false;
    }

  }

  analyze(){
    let st = this.datePipe.transform(this.startdate, "dd-MM-yyyy");
    let dt = this.datePipe.transform(this.enddate, "dd-MM-yyyy");
    this.router.navigate(['/nsa/analyze'], { queryParams: { startDate: st, endDate: dt } });
  }
}
