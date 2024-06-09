import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkflowsService } from './../services/workflows.service';
import { AppGlobals } from './../../../app.global';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';

@Component({
  selector: 'app-testsim-transfer',
  templateUrl: './testsim-transfer.component.html',
  styleUrls: ['./testsim-transfer.component.scss'],
  providers: [WorkflowsService, AppGlobals, LoginService],
})
export class TestsimTransferComponent implements OnInit {

  userData: any[] = [];
  userList1: any[] = [];
  lastkeydown1: number = 0;
  subscription: any;

  allRequisitionLineMsisdnIds: string;
  requisitionList: Array<Object>;
  currentLoggedInUser: LoggedInUser;
  userName: string;
  groupID: number;
  userID: string;
  todayDate: Date;
  routerUrlAndParams: string;
  public isLoading: boolean = false;
  isDataFound: boolean = true;
  listTransferModes: Array<any>;
  listUsers: Array<any>;
  private offset: number;
  private currPage: number;
  private totalPages: number;
  listSimStatus: Array<any>;
  searchOptions_simStatus: String;
  searchOptions_msisdn: String;
  searchOptions_rqnNo: String;
  transferMode: String;
  transferTo: String;
  comments: String;

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService) {

    this.allRequisitionLineMsisdnIds = "";
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
    this.requisitionList = [];

  } //end of constructor

  loadPendingList() {
    //GetPendingTaskList
    this.workFlowsService.loadMySimsFilteredByRqnLineMsisdnOnly(this.allRequisitionLineMsisdnIds).subscribe(
      data => {
        if (data != null) {
          console.log(data);
          this.isDataFound = true;
          this.requisitionList = data;
          for (var i = 0; i < this.requisitionList.length; i++) {
            this.requisitionList[i]['selected'] = false;
          }
          this.isLoading = false;
        }
        else {
          this.isDataFound = false;
          this.isLoading = false;
        }
      },
      err => console.error(err),
      () => console.log('Done loading PendingTask List')
    );
    //Get Today Date
    this.todayDate = new Date();
    this.isLoading = false;
  }


  ngOnInit() {

    this.offset = 0;
    this.isLoading = true;
    this.allRequisitionLineMsisdnIds = this.route.snapshot.paramMap.get('all_ids');
    console.log("sim action page");
    console.log("this.allRequisitionLineMsisdnIds");

    setTimeout(() => {    //<<<---    using ()=> syntax
      this.loadPendingList();


      this.listUsers = [];

      this.workFlowsService.getUserList().subscribe(
        data => {
          Object.assign(this.userData, data);
        },
        error => {
          console.log("Something wrong here");
        });

    }, 2000);
    this.isLoading = false;
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


  submit() {

    if (this.transferTo == null || this.transferTo == undefined || this.transferTo == "") {
      var msg = "Please select Transferee whom you want to transfer.";
      alert(msg);
      return;
    }

    if (this.comments == null || this.comments == undefined || this.comments == "") {
      var msg = "Comment is blank.";
      alert(msg);
      return;
    }


    for (var i = 0; i < this.requisitionList.length; i++) {

      //todo hard code

      /*if(this.requisitionList[i]['rechargeAmount'] == null ||
      this.requisitionList[i]['rechargeAmount'] == undefined ||
      this.requisitionList[i]['rechargeAmount'] == ""){
          var msg = "At row " + (i+1) + " recharge amount is blank.";
          alert(msg);
          return;
      }*/


    }

    ////////////// ////////////////////////

    this.isLoading = true;

    var requestObj = {};
    requestObj['defWorkRequestId'] = this._global.wrid_testSimTransfer;
    requestObj['initiator'] = this.userName;
    requestObj['initiateDate'] = "";
    requestObj['requisitionId'] = 0;
    requestObj['numberWiseDetails'] = [];

    for (var i = 0; i < this.requisitionList.length; i++) {

      var requestDetailObj = {};
      requestDetailObj['requisitionLineMsisdnId'] = this.requisitionList[i]['requisitionLineMsisdnId'];
      requestDetailObj['justification'] = this.requisitionList[i]['comments'];
      requestDetailObj['comments'] = this.comments;
      requestDetailObj['newCreditLimit'] = 0;
      requestDetailObj['newEndDate'] = "";
      requestDetailObj['rechargeAmount'] = 0;
      requestDetailObj['transferMode'] = "Transfer"; //this.transferMode;
      requestDetailObj['transferTo'] = this.transferTo;
      requestDetailObj['lostDamageMode'] = "";
      requestDetailObj['lostDamageDate'] = "";

      requestObj['numberWiseDetails'].push(requestDetailObj);

    } //end of loop over numbers

    ////////////////// /////////////////////////////////
    this.workFlowsService.submitSimActionRequest(requestObj).subscribe(
      data => {
        if (data != null && data != undefined && data != "") {
          this.isLoading = false;
          var msg = "The request has been submitted" + data['name'];
          alert(msg);
          this.router.navigate(['nsa/testsimdashboard']);
        }
      },
      err => console.error(err),
      () => console.log('Done loading PendingTask List')
    );
    this.isLoading = false;
    ////////////// /////////////////////// /////////////
  }

  cancel() {
    this.router.navigate(['nsa/testsimdashboard']);
  }

  //////////// ///////////////////////////// //////////////////////////////////



}
