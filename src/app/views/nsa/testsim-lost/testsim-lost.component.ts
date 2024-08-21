import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkflowsService } from './../services/workflows.service';
import { AppGlobals } from './../../../app.global';
import { Router,ActivatedRoute } from '@angular/router';

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import { moment } from 'ngx-bootstrap/chronos/test/chain';

@Component({
  selector: 'app-testsim-lost',
  templateUrl: './testsim-lost.component.html',
  styleUrls: ['./testsim-lost.component.scss'],
  providers: [WorkflowsService,AppGlobals,LoginService],
})
export class TestsimLostComponent implements OnInit {

  allRequisitionLineMsisdnIds: string;
  requisitionList: Array<Object>;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;
  userID: string;
  todayDate: Date;
	routerUrlAndParams: string;
  public isLoading:boolean = false;
  isDataFound: boolean = true;
  private offset: number;
		  private currPage: number;
		  private totalPages: number;
		  listSimStatus: Array<any>;
		  searchOptions_simStatus: String;
		  searchOptions_msisdn: String;
		  searchOptions_rqnNo: String;

  constructor(private route:ActivatedRoute, private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService) {

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

  loadPendingList(){
    //GetPendingTaskList
    this.workFlowsService.loadMySimsFilteredByRqnLineMsisdnOnly(this.allRequisitionLineMsisdnIds).subscribe(
        data => {
          if(data !=null){
            console.log(data);
            this.isDataFound = true;
            this.requisitionList = data;
            for(var i = 0; i < this.requisitionList.length; i++){
              this.requisitionList[i]['selected'] = false;
            }
            this.isLoading = false;
          }
          else{
            this.isDataFound = false;
          }
        },
      err => console.error(err),
      () => console.log('Done loading PendingTask List')
      );
    //Get Today Date
    this.todayDate = new Date();
  }


  ngOnInit () {

    this.offset = 0;
    this.isLoading = true;
    this.allRequisitionLineMsisdnIds = this.route.snapshot.paramMap.get('all_ids');
    console.log("sim action page");
    console.log("this.allRequisitionLineMsisdnIds");

    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.loadPendingList();
    }, 2000);

  }

  CheckAllOptions(){
    for(var i = 0; i < this.requisitionList.length; i++){
      this.requisitionList[i]['requestedNewSim'] = true;
    }
  }

  DecheckAllOptions(){
    for(var i = 0; i < this.requisitionList.length; i++){
      this.requisitionList[i]['requestedNewSim'] = false;
    }
  }

  copyToAll(){
    for(var i = 0; i < this.requisitionList.length; i++){

      if(i == 0) continue;

      this.requisitionList[i]['lostDamageDate'] = this.requisitionList[0]['lostDamageDate'];
      this.requisitionList[i]['comments'] = this.requisitionList[0]['comments'];
      this.requisitionList[i]['requestedNewSim'] = this.requisitionList[0]['requestedNewSim'];

    }
  }

  submit(){

    for(var i = 0; i < this.requisitionList.length; i++){

      if(this.requisitionList[i]['lostDamageDate'] == null ||
      this.requisitionList[i]['lostDamageDate'] == undefined ||
      this.requisitionList[i]['lostDamageDate'] == ""){
          var msg = "At row " + (i+1) + " lost date is blank.";
          alert(msg);
          return;
      }

      if(this.requisitionList[i]['comments'] == null ||
      this.requisitionList[i]['comments'] == undefined ||
      this.requisitionList[i]['comments'] == ""){
          var msg = "At row " + (i+1) + " comments is blank.";
          alert(msg);
          return;
      }

    }

    ////////////// ////////////////////////

    this.isLoading = true;

    var requestObj = {};
    requestObj['defWorkRequestId'] = this._global.wrid_testSimLost;
    requestObj['initiator'] = this.userName;
    requestObj['initiateDate'] = "";
    requestObj['requisitionId'] = 0;
    requestObj['numberWiseDetails'] = [];

    for(var i = 0; i < this.requisitionList.length; i++){

      var requestDetailObj = {};
      requestDetailObj['requisitionLineMsisdnId'] = this.requisitionList[i]['requisitionLineMsisdnId'];
      requestDetailObj['justification'] = this.requisitionList[i]['comments'];
      requestDetailObj['comments'] = this.requisitionList[i]['comments'];
      requestDetailObj['newCreditLimit'] = 0;
      requestDetailObj['newEndDate'] = "";
      requestDetailObj['rechargeAmount'] = 0;
      requestDetailObj['transferMode'] = "";
      requestDetailObj['transferTo'] = "";
      requestDetailObj['lostDamageMode'] = "Lost";
      requestDetailObj['lostDamageDate'] = this.requisitionList[i]['lostDamageDate'];
      requestDetailObj['lostDamageDate'] = moment(requestDetailObj['lostDamageDate']).format('DD-MM-YYYY');

      if(this.requisitionList[i]['requestedNewSim'] == true){
        requestDetailObj['requestedNewSim'] = 1;
      }
      else{
        requestDetailObj['requestedNewSim'] = 0;
      }

      requestObj['numberWiseDetails'].push(requestDetailObj);

    } //end of loop over numbers

    ////////////////// /////////////////////////////////
    this.workFlowsService.submitSimActionRequest(requestObj).subscribe(
      data => {
        if(data != null && data != undefined && data != ""){
          this.isLoading = false;
          var msg = "The request has been submitted" + data['name'];
          alert(msg);
          this.router.navigate(['nsa/testsimdashboard']);
        }
      },
    err => console.error(err),
    () => console.log('Done loading PendingTask List')
    );

    ////////////// /////////////////////// /////////////
  }

  cancel(){
    this.router.navigate(['nsa/testsimdashboard']);
  }

}
