
import { WorkflowsService } from './services/workflows.service';
import { AppGlobals } from './../../app.global';
import { environment } from '../../../environments/environment';

import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser';


import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IsmsreportService } from './services/ismsreport.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-newscreport',
  templateUrl: './newscreport.component.html',
  styleUrls: ['./demo.component.css'],
  providers: [IsmsreportService, WorkflowsService, AppGlobals, LoginService],
})
export class NewscreportComponent implements OnInit {



  //userData: any[] = [];
  //userList1: any[] = [];
  lastkeydown1: number = 0;

  currentLoggedInUser: LoggedInUser;
  userName: string;
  groupID: number;
  userID: string;
  isDataFound: boolean = false;
  public dangerAlertShow: boolean = false;
  public dangerAlertMessage: string = "";
  public successSearchShow: boolean = false;
  public successAlertMessage: string = "";

  //   requisitionReportList: IsmsReportResponse;

  mySearchForm: FormGroup;
  startDate: FormControl;
  endDate: FormControl;

  reqNamePattern: string = "(RQN).\*";

  public isLoading: boolean = false;

  datepickerConfig: Partial<BsDatepickerConfig>;
  listMsisdnStatus: Array<any>;
  listUsers: Array<any>;



  private columnDefs;
  private defaultColDef;
  private defaultColGroupDef;
  private columnTypes;
  private rowData: any[];
  private gridApi;
  private gridColumnApi;

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private ismsreportService: IsmsreportService, private workFlowsService: WorkflowsService) {


    this.isLoading = false;
    let isValid = true;
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
    }
    else {
      this.router.navigate(['pages/login']);
    }
    this.columnDefs = _global.agGrid_defaultColDef;
    this.columnTypes = _global.agGrid_columnTypes;

    this.columnDefs = [

      { headerName: 'Requisition No', field: 'requisitionNo', sortable: true, filter: true, width: 200 },
      { headerName: 'Requisition Date', field: 'requisitionDt', sortable: true, filter: true, width: 160 },
      { headerName: 'Requisition Type', field: 'requisitionType', sortable: true, filter: true, width: 160 },
      { headerName: 'Purpose Category', field: 'purposeCategory', sortable: true, filter: true, width: 160 },
      { headerName: 'Expected Test Start Date', field: 'testStartDt', sortable: true, filter: true, width: 200 },
      { headerName: 'Expected Test Completion Date', field: 'testCompletionDt', sortable: true, filter: true, width: 160 },
      { headerName: 'Status', field: 'status', sortable: true, filter: true, width: 200 },
      { headerName: 'SO No', field: 'soNumber', sortable: true, filter: true, width: 100 },
      { headerName: 'Challan No', field: 'challanNo', sortable: true, filter: true, width: 130, type: ["dateColumn", "nonEditableColumn"] },
      { headerName: 'Product Code', field: 'itemCode', sortable: true, filter: true, width: 130, type: ["dateColumn", "nonEditableColumn"] },
      { headerName: 'Product Name', field: 'itemName', sortable: true, filter: true, width: 210 },
      { headerName: 'Batch', field: 'batch', sortable: true, filter: true, width: 210 },
      { headerName: 'TEST SC start', field: 'testSCStart', sortable: true, filter: true, width: 210 },
      { headerName: 'TEST SC end', field: 'testSCEnd', sortable: true, filter: true, width: 210 },
      { headerName: 'BOX Start Serial',  sortable: true, filter: true, width: 210 },
      { headerName: 'BOX End serial',  sortable: true, filter: true, width: 210 },
      { headerName: 'Qty', field: 'qty', sortable: true, filter: true, width: 210 },
    ];

    this.rowData = [];


    this.ismsreportService.TestSCChallanReport("", "").subscribe(
      data => {
        console.log('response is : ' + data);

        if (data != null) {
          console.log(data);
          this.isDataFound = true;
          this.rowData = data;
          this.isLoading = false;
        }
        else {
          this.isDataFound = false;
        }

      },
      err => {
        console.log("err.status : " + err.status);
        this.dangerAlertShow = true;
        this.dangerAlertMessage = " .";
      }

    );
    this.isLoading = false;


  } //end of constructor

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.startDate = new FormControl('');
    this.endDate = new FormControl('');
  }

  createForm() {
    this.mySearchForm = new FormGroup({
      startDate: this.startDate,
      endDate: this.endDate,
    });
  }


  

  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i]['userName'].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };

  FormatTheDate(theDate: any): string {

    console.log("theDate : " + theDate);
    var date = new Date(theDate);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var formattedDate = [date.getFullYear(), month, day].join("-");
    console.log("formattedDate : " + formattedDate);
    return formattedDate;

  }


  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }


  // FORM SUBMISSION
  onSearchSubmit() {

    if (this.mySearchForm.valid) {
      console.log('Form Submitted!');
      console.log(this.mySearchForm.value);

      this.ismsreportService.TestSCChallanReport(this.startDate.value, this.endDate.value).subscribe(
        data => {
          console.log('response is : ' + data);


          if (data != null) {
            console.log(data);
            this.isDataFound = true;
            this.rowData = data;
            this.isLoading = false;
          }
          else {
            this.isDataFound = false;
          }

        },
        err => {
          console.log("err.status : " + err.status);
          this.dangerAlertShow = true;
          this.dangerAlertMessage = " .";
        }

      );
      this.isLoading = false;

    }
  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onBtExport() {
    var params = {};
    this.gridApi.exportDataAsCsv(params);
  }

}
