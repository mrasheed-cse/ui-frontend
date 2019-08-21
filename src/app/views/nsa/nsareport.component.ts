import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { DataTableResource } from 'angular4-smart-table';
import BulkReports from './models/BulkReports';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ReportService } from './services/report.service';
import { AppGlobals } from './../../app.global';
import { Router } from '@angular/router';
import PreviousHopFieldNameValue from './models/PreviousHopFieldNameValue';

import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser'; 

@Component({
  selector: 'app-nsareport',
  templateUrl: './nsareport.component.html',
  styles: ['./demo.component.css'],
  providers: [ReportService,AppGlobals,LoginService]
})
export class NsareportComponent implements OnInit {

  currentLoggedInUser: LoggedInUser;
	userName: string;
  groupID: number;
  
  defFieldNameValueList: PreviousHopFieldNameValue;
  provFieldNameValueList: PreviousHopFieldNameValue;
  deProvFieldNameValueList: PreviousHopFieldNameValue;
  reProvFieldNameValueList: PreviousHopFieldNameValue;
  mnpReProvFieldNameValueList: PreviousHopFieldNameValue;

  defFieldNameValueListBulk: PreviousHopFieldNameValue;
  provFieldNameValueListBulk: PreviousHopFieldNameValue;
  deProvFieldNameValueListBulk: PreviousHopFieldNameValue;
  reProvFieldNameValueListBulk: PreviousHopFieldNameValue;
  mnpReProvFieldNameValueListBulk: PreviousHopFieldNameValue;

  defWRBriefName: string;
  provWRBriefName: string;
  deProvWRBriefName: string;
  reProvWRBriefName: string;
  mnpReProvWRBriefName: string;
  
  defWRBriefNameBulk: string;
  provWRBriefNameBulk: string;
  deProvWRBriefNameBulk: string;
  reProvWRBriefNameBulk: string;
  mnpReProvWRBriefNameBulk: string;

  public defWRShow:boolean = false;
  public provWRShow:boolean = false;
  public deProvWRShow:boolean = false;
  public reProvWRShow:boolean = false;
  public mnpReProvWRShow:boolean = false;

  public defWRShowBulk:boolean = false;
  public provWRShowBulk:boolean = false;
  public deProvWRShowBulk:boolean = false;
  public reProvWRShowBulk:boolean = false;
  public mnpReProvWRShowBulk:boolean = false;

  isCollapsedSingle: boolean = true;
  isCollapsedBulk: boolean = true;
  showTable: boolean = false;

  bulkReportsList: BulkReports;

  mySingleReportForm: FormGroup;
  msisdn: FormControl;

  myBulkReportForm: FormGroup;
  startMSISDN: FormControl;
  endMSISDN: FormControl;
  
  public dangerAlertShow:boolean = false;
	public dangerAlertMessage:string = "";
  public dangerAlertShowBulk:boolean = false;
	public dangerAlertMessageBulk:string = "";

  constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private ReportService: ReportService) { 
    // Get Current User Profile
	
	this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
	
	if (this.currentLoggedInUser) {
		this.userName = this.currentLoggedInUser.userName
		this.groupID = this.currentLoggedInUser.groupID
		//console.log('Current user: ' + this.userName);
		
	} 
	else {
	  //console.log('Current user not found');
	  this.router.navigate(['pages/login']);
	}
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.msisdn = new FormControl('', [
      Validators.required,
      Validators.minLength(11) ,
      Validators.maxLength(11)
    ]);
    this.startMSISDN = new FormControl('', [
      Validators.required,
      Validators.minLength(11) ,
      Validators.maxLength(11)
    ]);
    this.endMSISDN = new FormControl('', [
      Validators.required,
      Validators.minLength(11) ,
      Validators.maxLength(11)
    ]);
  }

  createForm() {
    this.mySingleReportForm = new FormGroup({
      msisdn: this.msisdn
    });
    this.myBulkReportForm = new FormGroup({
      startMSISDN: this.startMSISDN,
      endMSISDN: this.endMSISDN
    });
  }
  
  onSingleNumberReportSubmit() {
	  
    if (this.msisdn.value) {
      console.log('Form Submitted!');
      console.log(this.mySingleReportForm.value);
    this.clearDynamicForm();
      this.ReportService.SingleNumberReport(this.msisdn.value).subscribe(
        res  =>  {
          console.log('response is : '+res);
          if(res == null || (res.defWRName == null && res.provWRName == null && res.deProvWRName == null && res.reProvWRName == null && res.mnpReProvWRName == null)){
            this.dangerAlertShow = true;
            this.dangerAlertMessage = "No Work Request found for this MSISDN: "+this.msisdn.value;
          }
          else{
            if(res.defWRName != null){
              this.defWRShow = true;
              this.defWRBriefName = res.defWRName;
              this.defFieldNameValueList = res.defWRData;
              const totalData = this.defFieldNameValueList.length;
              console.log(totalData);
              if (totalData%2==1){   
                console.log("totalData is odd");
                this.defFieldNameValueList.push({fieldName: "", fieldValue: ""});
              }
            }
            if(res.provWRName != null){
              this.provWRShow = true;
              this.provWRBriefName = res.provWRName;
              this.provFieldNameValueList = res.provWRData;
              const totalData = this.provFieldNameValueList.length;
              console.log(totalData);
              if (totalData%2==1){   
                console.log("totalData is odd");
                this.provFieldNameValueList.push({fieldName: "", fieldValue: ""});
              }
            }
            if(res.deProvWRName != null){
              this.deProvWRShow = true;
              this.deProvWRBriefName = res.deProvWRName;
              this.deProvFieldNameValueList = res.deProvWRData;
              const totalData = this.deProvFieldNameValueList.length;
              console.log(totalData);
              if (totalData%2==1){   
                console.log("totalData is odd");
                this.deProvFieldNameValueList.push({fieldName: "", fieldValue: ""});
              }
            }
            if(res.reProvWRName != null){
              this.reProvWRShow = true;
              this.reProvWRBriefName = res.reProvWRName;
              this.reProvFieldNameValueList = res.reProvWRData;
              const totalData = this.reProvFieldNameValueList.length;
              console.log(totalData);
              if (totalData%2==1){   
                console.log("totalData is odd");
                this.reProvFieldNameValueList.push({fieldName: "", fieldValue: ""});
              }
            }
            if(res.mnpReProvWRName != null){
              this.mnpReProvWRShow = true;
              this.mnpReProvWRBriefName = res.mnpReProvWRName;
              this.mnpReProvFieldNameValueList = res.mnpReProvWRData;
              const totalData = this.mnpReProvFieldNameValueList.length;
              console.log(totalData);
              if (totalData%2==1){   
                console.log("totalData is odd");
                this.mnpReProvFieldNameValueList.push({fieldName: "", fieldValue: ""});
              }
            }
        }
        },
        err  =>  {		  
        console.log("err.status : "+err.status);		  
        this.dangerAlertShow = true;
        if(err.status==404)
          this.dangerAlertMessage = "No data found for this search.";
        else
          this.dangerAlertMessage = "An error occured while showing the search result.";
      
        }
      );	  
    }
    else{
      this.dangerAlertShow = true;
      this.dangerAlertMessage = "Please select any input to search.";
    }
  }

  clearForm(event: any){
    this.mySingleReportForm.reset();
    this.clearDynamicForm();
  }
  
  clearDynamicForm(){

    this.dangerAlertShow = false;

    this.defFieldNameValueList = null;
    this.provFieldNameValueList = null;
    this.deProvFieldNameValueList = null;
    this.reProvFieldNameValueList = null;
    this.mnpReProvFieldNameValueList = null;

    this.defWRBriefName = "";
    this.provWRBriefName = "";
    this.deProvWRBriefName = "";
    this.reProvWRBriefName = "";
    this.mnpReProvWRBriefName = "";

    this.defWRShow = false;
    this.provWRShow = false;
    this.deProvWRShow = false;
    this.reProvWRShow = false;
    this.mnpReProvWRShow = false;
  }

  clearDynamicFormBulk(){

    this.dangerAlertShowBulk = false;

    this.defFieldNameValueListBulk = null;
    this.provFieldNameValueListBulk = null;
    this.deProvFieldNameValueListBulk = null;
    this.reProvFieldNameValueListBulk = null;
    this.mnpReProvFieldNameValueListBulk = null;

    this.defWRBriefNameBulk = "";
    this.provWRBriefNameBulk = "";
    this.deProvWRBriefNameBulk = "";
    this.reProvWRBriefNameBulk = "";
    this.mnpReProvWRBriefNameBulk = "";

    this.defWRShowBulk = false;
    this.provWRShowBulk = false;
    this.deProvWRShowBulk = false;
    this.reProvWRShowBulk = false;
    this.mnpReProvWRShowBulk = false;
  }

  onBulkNumberReportSubmit(){
    this.clearDynamicForm();
    this.showTable = false;

    this.ReportService.MultipleNumberReport(this.startMSISDN.value,this.endMSISDN.value).subscribe(
      res  =>  {
        console.log('response is : '+res);
        if(res == null){
          this.dangerAlertShowBulk = true;
          this.dangerAlertMessageBulk = "No Work Request found for this MSISDN: "+this.msisdn.value;
        }
        else{
          this.showTable = true;
          this.bulkReportsList = res;
        }
      },
      err  =>  {
      console.log("err.status : "+err.status);		  
      this.dangerAlertShow = true;
      if(err.status==404)
        this.dangerAlertMessage = "No data found for this search.";
      else
        this.dangerAlertMessage = "An error occured while showing the search result.";
      }
    );
  }

  selectedRow(bulkReport: BulkReports){
    this.clearDynamicFormBulk();
    console.log("Inside selectedRow() : "+bulkReport.msisdn);
    this.ReportService.SingleNumberReport(bulkReport.msisdn).subscribe(
      res  =>  {
        console.log('response is : '+res);
        if(res == null){
          this.dangerAlertShowBulk = true;
          this.dangerAlertMessageBulk = "No Work Request found for this MSISDN: "+bulkReport.msisdn;
        }
        else{
          if(res.defWRName != null){
            this.defWRShowBulk = true;
            this.defWRBriefNameBulk = res.defWRName;
            this.defFieldNameValueListBulk = res.defWRData;
            const totalData = this.defFieldNameValueListBulk.length;
            console.log(totalData);
            if (totalData%2==1){   
              console.log("totalData is odd");
              this.defFieldNameValueListBulk.push({fieldName: "", fieldValue: ""});
            }
          }
          if(res.provWRName != null){
            this.provWRShowBulk = true;
            this.provWRBriefNameBulk = res.provWRName;
            this.provFieldNameValueListBulk = res.provWRData;
            const totalData = this.provFieldNameValueListBulk.length;
            console.log(totalData);
            if (totalData%2==1){   
              console.log("totalData is odd");
              this.provFieldNameValueListBulk.push({fieldName: "", fieldValue: ""});
            }
          }
          if(res.deProvWRName != null){
            this.deProvWRShowBulk = true;
            this.deProvWRBriefNameBulk = res.deProvWRName;
            this.deProvFieldNameValueListBulk = res.deProvWRData;
            const totalData = this.deProvFieldNameValueListBulk.length;
            console.log(totalData);
            if (totalData%2==1){   
              console.log("totalData is odd");
              this.deProvFieldNameValueListBulk.push({fieldName: "", fieldValue: ""});
            }
          }
          if(res.reProvWRName != null){
            this.reProvWRShowBulk = true;
            this.reProvWRBriefNameBulk = res.reProvWRName;
            this.reProvFieldNameValueListBulk = res.reProvWRData;
            const totalData = this.reProvFieldNameValueListBulk.length;
            console.log(totalData);
            if (totalData%2==1){   
              console.log("totalData is odd");
              this.reProvFieldNameValueListBulk.push({fieldName: "", fieldValue: ""});
            }
          }
          if(res.mnpReProvWRName != null){
            this.mnpReProvWRShowBulk = true;
            this.mnpReProvWRBriefNameBulk = res.mnpReProvWRName;
            this.mnpReProvFieldNameValueListBulk = res.mnpReProvWRData;
            const totalData = this.mnpReProvFieldNameValueListBulk.length;
            console.log(totalData);
            if (totalData%2==1){   
              console.log("totalData is odd");
              this.mnpReProvFieldNameValueListBulk.push({fieldName: "", fieldValue: ""});
            }
          }
      }
      },
      err  =>  {		  
      console.log("err.status : "+err.status);		  
      this.dangerAlertShowBulk = true;
      if(err.status==404)
        this.dangerAlertMessageBulk = "No data found for this search.";
      else
        this.dangerAlertMessageBulk = "An error occured while showing the search result.";
      }
    );
  }

  clearFormBulk(event: any){
    this.myBulkReportForm.reset();
    this.clearDynamicFormBulk();
    this.bulkReportsList = null;
    this.showTable = false;
  }
}
