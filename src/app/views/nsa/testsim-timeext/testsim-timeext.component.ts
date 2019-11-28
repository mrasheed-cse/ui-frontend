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
import { environment } from '../../../../environments/environment.prod';

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import { moment } from 'ngx-bootstrap/chronos/test/chain';

@Component({
  selector: 'app-testsim-timeext',
  templateUrl: './testsim-timeext.component.html',
  styleUrls: ['./testsim-timeext.component.scss'],
	providers: [WorkflowsService,AppGlobals,LoginService],
})
export class TestsimTimeextComponent implements OnInit {

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
    this.workFlowsService.loadMySimsFiltered(this.userID, this.allRequisitionLineMsisdnIds, this.offset).subscribe(
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

  submit(){

    for(var i = 0; i < this.requisitionList.length; i++){

      if(this.requisitionList[i]['newEndDate'] == null ||
      this.requisitionList[i]['newEndDate'] == undefined ||
      this.requisitionList[i]['newEndDate'] == ""){
          var msg = "At row " + (i+1) + " end date is blank.";
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

      let a :any;
      let b :any;

      a = moment( this.requisitionList[i]['testEndDateAsString'], 'DD-MM-YYYY' );
      b = moment( this.requisitionList[i]['newEndDate'], 'DD-MM-YYYY' );

      console.log(a);
      console.log(b);
      //console.log(b - a);
      var x = b.diff(a, 'days');
      console.log(x);

      if(x != null &&
      x != undefined &&
      x > (365*2)){
          var msg = "At row " + (i+1) + " new test end date exceeds the maximum limit of 2 years.";
          alert(msg);
          return;
      }

    }

    //return;

    ////////////// ////////////////////////

    this.isLoading = true;

    var requestObj = {};
    requestObj['defWorkRequestId'] = this._global.wrid_testSimTimeLimitExtension;
    requestObj['initiator'] = this.userName;
    requestObj['initiateDate'] = "";
    requestObj['requisitionId'] = 0;
    requestObj['numberWiseDetails'] = [];

    for(var i = 0; i < this.requisitionList.length; i++){

      var requestDetailObj = {};
      requestDetailObj['requisitionLineMsisdnId'] = this.requisitionList[i]['requisitionLineMsisdnId'];
      requestDetailObj['justification'] = this.requisitionList[i]['justification'];
      requestDetailObj['comments'] = this.requisitionList[i]['justification'];
      requestDetailObj['newCreditLimit'] = 0;
      requestDetailObj['newEndDate'] = this.requisitionList[i]['newEndDate'];
      requestDetailObj['newEndDate'] = moment(requestDetailObj['newEndDate']).format('DD-MM-YYYY');
      requestDetailObj['rechargeAmount'] = 0;
      requestDetailObj['transferMode'] = "";
      requestDetailObj['transferTo'] = "";
      requestDetailObj['lostDamageMode'] = "";
      requestDetailObj['lostDamageDate'] = "";

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
