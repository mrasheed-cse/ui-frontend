import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IsmsreportService } from './../services/Ismsreport.service';
import { WorkflowsService } from './../services/workflows.service';
import { AppGlobals } from './../../../app.global';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {IsmsReportResponse} from './../models/IsmsReportResponse';
import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-test-sim-surrender',
  templateUrl: './test-sim-surrender.component.html',
  styleUrls: ['./test-sim-surrender.component.scss'],
  providers: [WorkflowsService,IsmsreportService,AppGlobals,LoginService]
})
export class TestSimSurrenderComponent implements OnInit {

  userData: any[] = [];
  userList1: any[] = [];
  lastkeydown1: number = 0;

  currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;
  userID: string;
  isDataFound: boolean = false;
  public dangerAlertShow:boolean = false;
	public dangerAlertMessage:string = "";
	public successSearchShow:boolean = false;
  public successAlertMessage:string = "";

  activationReportList: IsmsReportResponse;

  mySearchForm: FormGroup;
  reqname: FormControl;
  msisdnStatus: FormControl;
   startDate: FormControl;
   endDate: FormControl;
   startMSISDN: FormControl;
   endMSISDN: FormControl;
   simOwner: FormControl;

	reqNamePattern:string = "(RQN).\*";

  public isLoading:boolean = false;

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

  constructor(private route:ActivatedRoute, private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private ismsreportService: IsmsreportService, private workFlowsService: WorkflowsService) {


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

        {headerName: 'RQN #', field: 'requisitionNo', sortable: true, filter: true, width: 150 },
        {headerName: 'Product', field: 'product', sortable: true, filter: true,  width: 100 },
        {headerName: 'MSISDN', field: 'msisdn', sortable: true, filter: true,  width: 100 },
        {headerName: 'SIM', field: 'sim', sortable: true, filter: true,  width: 160 },
        {headerName: 'RQN Type', field: 'requisitionType', sortable: true, filter: true, width: 130 },
        {headerName: 'Requester Name', field: 'requesterName', sortable: true, filter: true,  width: 200 },
        {headerName: 'Requester Mobile', field: 'requesterMobile', sortable: true, filter: true, width: 160 },
        {headerName: 'Approval Status', field: 'msisdnStatus', sortable: true, filter: true, width: 150 },
        {headerName: 'Start date', field: 'startDate', sortable: true, filter: true, width: 150, type: ["dateColumn", "nonEditableColumn"] },
        {headerName: 'End date', field: 'endDate', sortable: true, filter: true, width: 150, type: ["dateColumn", "nonEditableColumn"] }
    ];

    this.rowData = [];


    this.ismsreportService.TestSimActionReport("","","","","","",0,0,0,"Surrender",this.groupID).subscribe(
        data  =>  {
      console.log('response is : '+data);

      if(data !=null){
        console.log(data);
        this.isDataFound = true;
        this.rowData = data;
        this.isLoading = false;
      }
      else{
        this.isDataFound = false;
      }

        },
        err  =>  {
        console.log("err.status : "+err.status);
        this.dangerAlertShow = true;
      this.dangerAlertMessage = " .";
        }

        );
        this.isLoading = false;


  } //end of constructor

  ngOnInit() {
    this.createFormControls();
	this.createForm();
  this.isLoading = true;

  setTimeout(()=>{    //<<<---    using ()=> syntax

    this.listMsisdnStatus = [
      {
        "id":"A","name":"Active"
      },
      {
        "id":"D","name":"Deactive"
      }
    ];
    this.listUsers = [];

    this.workFlowsService.getUserList().subscribe(
      data => {
        Object.assign(this.userData, data);
      },
      error => {
        console.log("Something wrong here");
      });
    }, 2000);

  }

  createFormControls() {
		this.reqname = new FormControl('',Validators.pattern(this.reqNamePattern));
		this.msisdnStatus = new FormControl('');
		this.startDate = new FormControl('');
    this.endDate = new FormControl('');
    this.startMSISDN = new FormControl('', [
      Validators.minLength(11) ,
      Validators.maxLength(11)
    ]);
    this.endMSISDN = new FormControl('', [
      Validators.minLength(11) ,
      Validators.maxLength(11)
    ]);
    this.simOwner = new FormControl('');
  }

  createForm() {
    this.mySearchForm = new FormGroup({
      reqname: this.reqname,
      startMSISDN: this.startMSISDN,
      endMSISDN: this.endMSISDN,
      startDate: this.startDate,
      endDate: this.endDate,
      msisdnStatus: this.msisdnStatus,
      simOwner: this.simOwner
    });
  }


  getUserIdsFirstWay($event) {

    //console.log($event.target.value);

    //let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;

    let userId = $event.target.value;

    this.userList1 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.userData, userId);
      }
    }
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

  FormatTheDate(theDate:any):string {
  if(theDate.length==0)
    return "";
    console.log("theDate : "+theDate);
      var date = new Date(theDate);
      var month = ("0" + (date.getMonth()+1)).slice(-2);
      var day  = ("0" + date.getDate()).slice(-2);
      var formattedDate=[date.getFullYear(),month,day].join("-");
    console.log("formattedDate : "+formattedDate);
    return formattedDate;

  }


topFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

onGridReady(params) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
}
   // FORM SUBMISSION
   onSearchSubmit() {

    if (this.mySearchForm.valid) {
      console.log('Form Submitted!');
      console.log(this.mySearchForm.value);

     //this.topFunction();
     //this.isLoading = true;


var simOwner_value_asId = 0;
if(this.simOwner.value != null && this.simOwner.value != undefined && this.simOwner.value != ""){
  simOwner_value_asId = this.getUserIdFromUserName(this.simOwner.value);
}

    this.ismsreportService.TestSimActionReport(this.reqname.value,
      this.FormatTheDate(this.startDate.value),this.FormatTheDate(this.endDate.value),this.msisdnStatus.value,
      this.startMSISDN.value,this.endMSISDN.value,simOwner_value_asId,0,0,"Surrender",this.groupID).subscribe(
        data  =>  {
      console.log('response is : '+data);

      if(data !=null){
        console.log(data);
        this.isDataFound = true;
        this.rowData = data;
        this.isLoading = false;
      }
      else{
        this.isDataFound = false;
      }

        },
        err  =>  {
        console.log("err.status : "+err.status);
        this.dangerAlertShow = true;
      this.dangerAlertMessage = "Invalid inputs or An error occured while loading the report.";
        }

        );
        this.isLoading = false;

      }
  }
  onBtExport() {
    var params = {};
    this.gridApi.exportDataAsCsv(params);
  }

  getUserIdFromUserName(userName){
    for (var i = 0; i < this.userData.length; i++) {
      if (this.userData[i]['userName'] == userName) {
        return this.userData[i]['id'];
      }
    }
    return 0;
  }

}

