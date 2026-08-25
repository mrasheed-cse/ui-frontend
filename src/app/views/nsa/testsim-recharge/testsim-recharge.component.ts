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

@Component({
    selector: 'app-testsim-recharge',
    templateUrl: './testsim-recharge.component.html',
    styleUrls: ['./testsim-recharge.component.scss'],
    providers: [WorkflowsService, AppGlobals, LoginService],
    standalone: false
})
export class TestsimRechargeComponent implements OnInit {

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

  copyToAll(){
    for(var i = 0; i < this.requisitionList.length; i++){

      if(i == 0) continue;

      this.requisitionList[i]['rechargeAmount'] = this.requisitionList[0]['rechargeAmount'];
      this.requisitionList[i]['justification'] = this.requisitionList[0]['justification'];

    }
  }

  submit(){

    for(var i = 0; i < this.requisitionList.length; i++){

      
      if(this.requisitionList[i]['thisMonthRechargeAmount'] < this.requisitionList[i]['assignedCreditLimit']){
        
      this.requisitionList[i]['rechargeAmount'] = +(this.requisitionList[i]['rechargeAmount']);

      if(
        isNaN(this.requisitionList[i]['rechargeAmount']) ||
        this.requisitionList[i]['rechargeAmount'] == null ||
      this.requisitionList[i]['rechargeAmount'] == undefined){
          var msg = "At row " + (i+1) + " recharge amount is blank.";
          alert(msg);
          return;
      }

      if(parseFloat( this.requisitionList[i]['rechargeAmount'] ) > parseFloat( this.requisitionList[i]['assignedCreditLimit'] )){
          var msg = "At row " + (i+1) + " recharge amount is more than credit limit. This is invalid entry";
          alert(msg);
          return;
      }

      if(this.requisitionList[i]['justification'] == null ||
      this.requisitionList[i]['justification'] == undefined ||
      this.requisitionList[i]['justification'] == ""){
          var msg = "At row " + (i+1) + " justification is blank.";
          alert(msg);
          return;
      }

    }
  }

    ////////////// ////////////////////////

    this.isLoading = true;

    var requestObj = {};
    requestObj['defWorkRequestId'] = this._global.wrid_testSimRecharge;
    requestObj['initiator'] = this.userName;
    requestObj['initiateDate'] = "";
    requestObj['requisitionId'] = 0;
    requestObj['numberWiseDetails'] = [];

    for(var i = 0; i < this.requisitionList.length; i++){
      if(this.requisitionList[i]['thisMonthRechargeAmount'] < this.requisitionList[i]['assignedCreditLimit']){
      var requestDetailObj = {};
      requestDetailObj['requisitionLineMsisdnId'] = this.requisitionList[i]['requisitionLineMsisdnId'];
      requestDetailObj['justification'] = this.requisitionList[i]['justification'];
      requestDetailObj['comments'] = this.requisitionList[i]['justification'];
      requestDetailObj['newCreditLimit'] = 0;
      requestDetailObj['newEndDate'] = "";
      requestDetailObj['rechargeAmount'] = this.requisitionList[i]['rechargeAmount'];
      requestDetailObj['transferMode'] = "";
      requestDetailObj['transferTo'] = "";
      requestDetailObj['lostDamageMode'] = "";
      requestDetailObj['lostDamageDate'] = "";

      requestObj['numberWiseDetails'].push(requestDetailObj);
      }
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
