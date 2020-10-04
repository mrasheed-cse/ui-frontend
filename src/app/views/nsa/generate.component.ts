import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Misidn } from '../../views/nsa/misidn';
import { MsisdnService } from '../../views/nsa/msisdn.service';
import { HttpClient } from '@angular/common/http';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';
import { environment } from '../../../environments/environment.prod';
import { ActivatedRoute, Router, ActivationEnd } from '@angular/router';

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
  generatealert: string;
  generateenable: boolean = false;

  constructor(private httpClient: HttpClient, private msisdnService: MsisdnService, private datePipe: DatePipe,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.queryParams
      .subscribe(params => {
        this.startDate = params['startDate'];
        this.endDate = params['endDate'];
      });
    if (this.startDate == "" || this.startDate == undefined || this.endDate == "" || this.endDate == undefined) {
      this.generatealert = "Please Enter Start Date and End Date in Generate/Analyze Menu";
      this.generateenable = true;
    } else {
      this.generate();
      this.generateenable = false;
    }

  }

  generate() {

    this.msisdnService.getGenerateData(this.startDate, this.endDate).subscribe((res: Misidn[]) => {
      console.log(res);
      if (res == null) {
        this.generatealert = "Couldnot Find the Analyze List from " + this.startDate + " to " + this.endDate;
        this.generateenable = true;
      } else {
        this.misisdnList = res;
        this.generateenable = false;
      }
    }, err => {
      this.generateenable = true;
      this.generatealert = "Internal Server Error";
    });
  }

  clear(linkno: number) {
    console.log(linkno);

    this.httpClient.get(environment.apiUrl + "msisdn_recycle_list_generate/clear/" + linkno).subscribe((res => {

      if (res == null) {
        this.generateenable = true;
        this.generatealert = "MSISDN Deletion Fail";
      }
      else {
        this.misisdnList = this.misisdnList.filter(h => h.id !== linkno);
        this.generateenable = true;
        this.generatealert = "MSISDN Deletion Success";
      }
      console.log(res)
    }), err => {
      this.generateenable = true;
      this.generatealert = "MSISDN delettion Fail";
    });

  }
  downloadfile(std: Date, end: Date, id: any) {
    const httpOptions = {
      responseType: 'blob' as 'json',
    };
    let st = this.datePipe.transform(std, "dd-MM-yyyy");
    let dt = this.datePipe.transform(end, "dd-MM-yyyy");
    this.httpClient.get(environment.apiUrl + "/msisdn_recycle_list_generate/download/" + id,
      httpOptions).subscribe((response: Response) => {
        if (response == null) {
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
