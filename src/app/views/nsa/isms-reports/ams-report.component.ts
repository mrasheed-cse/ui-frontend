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
import { RequisitionList } from '../models/RequisitionList';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { WorkflowsService } from '../services/workflows.service';
import { AppGlobals } from '../../../app.global';
import { ActivatedRoute,Router } from '@angular/router';
import { FileoperationService } from '../../nsa/services/fileoperation.service';

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';

@Component({
  selector: 'app-ams-report',
  templateUrl: './ams-report.component.html',
  styles: [],
  providers: [WorkflowsService,AppGlobals,LoginService,FileoperationService],
})
export class AMSReportComponent implements OnInit {

  requisitionList: Array<Object>;
  currentLoggedInUser: LoggedInUser;
  userName: string;
  groupID: number;
  userID: string;
  userData: any[] = [];
  userList1: any[] = [];
  lastkeydown1: number = 0;
  
  private offset: number;
	private currPage: number;
  private totalPages: number;
  public dangerAlertShow:boolean = false;
  public dangerAlertMessage:string = "";
  public successSearchShow:boolean = false;
  public successAlertMessage:string = "";
  public isLoading:boolean = false;

  isDataFound: boolean = true;
  isCollapsed: boolean = true;

  mySearchForm: FormGroup;
  wrname: FormControl;
  startDate: FormControl;
  endDate: FormControl;
  amsID: FormControl;
  simOwner: FormControl;

  wrNamePattern:string = "(RQN).\*";
  searchWR: string;
  todayDate: Date;
  routerUrlAndParams: string;
  requestedSimAtatus: string;


  constructor(private route:ActivatedRoute, private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService,private fileoperationService: FileoperationService) {

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
          //call API here to get real dat
    if(this.route.snapshot.paramMap.get('requestedSimAtatus') != null)
      this.requestedSimAtatus = this.route.snapshot.paramMap.get('requestedSimAtatus');
    else 
      this.requestedSimAtatus = "All"; // ALL 
      this.isLoading = true;
    //LoadRequisitionList
    this.loadAMSRqnList();
    //Get Today Date
    this.isLoading = false;
    this.todayDate = new Date();



} //end of constructor

loadAMSRqnList(){
  this.workFlowsService.LoadAMSRequisitionList(0,"",this.offset).subscribe(
    data => {
      if(data !=null){
        console.log(data);
        this.isDataFound = true;
        this.requisitionList = data;
        for(var i = 0; i < this.requisitionList.length; i++){
          this.requisitionList[i]['show'] = true;
        }
        if(data.length > 0) this.totalPages = +(data[0]['totalPages']);
            this.isLoading = false;
      }
      else{
        this.isDataFound = false;
      }
    },
  err => console.error(err),
  () => console.log('Done loading RequisitionList List')
  );
}


ngOnInit () {
  this.offset = 0; this.currPage = 1; this.totalPages = 50000;
  this.createFormControls();
  this.createForm();
  this.workFlowsService.getUserList().subscribe(
    data => {
      Object.assign(this.userData, data);
    },
    error => {
      console.log("Something wrong here");
    });
}

getUserIdsFirstWay($event) {
  let userId = $event.target.value;
  this.userList1 = [];

  if (userId.length > 3) {
    if ($event.timeStamp - this.lastkeydown1 > 200) {
      this.userList1 = this.searchFromArray(this.userData, userId);
    }
  }
}

searchFromArray(arr, regex) {
  let matches = [], i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i]['emailAddress'].match(regex)) {
      matches.push(arr[i]);
    }
  }
  return matches;
};

datepickerConfig: Partial<BsDatepickerConfig>;

clearSearch(){
  for(var i = 0; i < this.requisitionList.length; i++){
    this.requisitionList[i]['show'] = true;
  }
  this.mySearchForm.reset({wrname: '',amsID: '',startDate: '',endDate: '',simOwner: ''});
}

onSearchSubmit() {

  if (this.mySearchForm.valid) {
      console.log('Form Submitted!');
      console.log(this.mySearchForm.value);
      this.successSearchShow = false;
      this.dangerAlertShow = false;

      for(var i = 0; i < this.requisitionList.length; i++){
        this.requisitionList[i]['show'] = false;

        if(this.wrname.value != null && this.wrname.value != undefined && this.wrname.value != "" && this.wrname.value == this.requisitionList[i]['requisitionNo']){
          this.requisitionList[i]['show'] = true;
        }
        if(this.amsID.value != null && this.amsID.value != undefined && this.amsID.value != "" && this.amsID.value == this.requisitionList[i]['amsId']){
          this.requisitionList[i]['show'] = true;
        }
        if(this.simOwner.value != null && this.simOwner.value != undefined && this.simOwner.value != "" && this.simOwner.value == this.requisitionList[i]['initiatorEmail']){
          this.requisitionList[i]['show'] = true;
        }

        if(this.startDate.value != null && this.startDate.value != undefined && this.startDate.value != ""
        &&
        this.endDate.value != null && this.endDate.value != undefined && this.endDate.value != ""){
          //var sdate = moment(this.requisitionList[i]['requisitionDt']).format('DD-MM-YYYY');
          var sdate = new Date(this.requisitionList[i]['requisitionDt'].replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))

          var startDateOfForm = this.startDate.value;
          var endDateOfForm = this.endDate.value;

          startDateOfForm.setHours(0);
          startDateOfForm.setMinutes(0);
          startDateOfForm.setSeconds(0);

          endDateOfForm.setHours(23);
          endDateOfForm.setMinutes(59);
          endDateOfForm.setSeconds(59);

          console.log("sdate");
          //console.log(this.requisitionList[i]['requisitionDt']);
          console.log(sdate);
          console.log(this.startDate.value);
          console.log(this.endDate.value);

          if(sdate >= startDateOfForm && sdate <= endDateOfForm){
            this.requisitionList[i]['show'] = true;
          }
        }
      }
      if(this.requisitionList.length > 0) this.totalPages = Math.trunc(this.requisitionList.length / this._global.defaultPageSize);
      if((this.requisitionList.length % this._global.defaultPageSize) != 0) this.totalPages++;
  }
}

createFormControls() {
  this.wrname = new FormControl('',Validators.pattern(this.wrNamePattern));
  this.amsID = new FormControl('');
  this.startDate = new FormControl('');
  this.endDate = new FormControl('');
  this.simOwner = new FormControl('');
}

createForm() {
  this.mySearchForm = new FormGroup({
    wrname: this.wrname,
    amsID: this.amsID,
    startDate: this.startDate,
    endDate: this.endDate,
    simOwner: this.simOwner
  });
}

downloadAMS(fileNameToDownload: string){
  console.log(fileNameToDownload);
  this.fileoperationService.DownloadFile(fileNameToDownload).subscribe((res) => {
    console.log(res);
    var downloadURL = window.URL.createObjectURL(res);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = fileNameToDownload;
    link.click();
  });
}

prevPage(){
  if(this.offset <= 0){
    //first page .. do nothing
  }
  else{
    this.isLoading = true;
    this.offset = this.offset - this._global.defaultPageSize;
    this.currPage--;
    this.loadAMSRqnList();
  }
}

nextPage(){
  if(this.currPage >= this.totalPages){
    //last page .. do nothing
  }
  else{
    this.isLoading = true;
    this.offset = this.offset + this._global.defaultPageSize;
    this.currPage++;
    this.loadAMSRqnList();
  }
}
}
