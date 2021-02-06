import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {Misidn} from "../nsa/misidn";
import {MsisdnService} from "../nsa/msisdn.service";

@Component({
    selector: 'app-generateanalyze',
    templateUrl: './generateanalyze.component.html',
    styleUrls: ['./generateanalyze.component.scss']
})
export class GenerateanalyzeComponent implements OnInit {
    startdate: Date
    enddate: Date;
    maxDate: Date;
    minDate: Date;
    enable: boolean = false;
    dateerror: boolean = false;
    genalert: string;
    genenable: boolean = false;

    constructor(private datePipe: DatePipe, private router: Router, private msisdnService: MsisdnService) {
    }

    ngOnInit() {
    }

    isLoading: boolean = false;

    changeStartDate() {
    }

    changeEndDate() {
    }

    generate() {
        let st = this.datePipe.transform(this.startdate, "dd-MM-yyyy");
        let dt = this.datePipe.transform(this.enddate, "dd-MM-yyyy");
        if (this.startdate.getTime() > this.enddate.getTime()) {
            this.dateerror = true;
            console.log("Start date cannot greate than End date");
        } else {
            this.isLoading = true;
            this.msisdnService.generateMsisdnList(st, dt).subscribe((res: string) => {
                this.isLoading = false;
                this.router.navigate(['/nsa/generate']);
            }, err => {
                this.isLoading = false;
                this.genenable = true;
                this.genalert = err.error.message || err.error || "Internal Server Error";
            });
        }
    }

    analyze() {
        let st = this.datePipe.transform(this.startdate, "dd-MM-yyyy");
        let dt = this.datePipe.transform(this.enddate, "dd-MM-yyyy");
        this.router.navigate(['/nsa/analyze'], {queryParams: {startDate: st, endDate: dt}});
    }
}