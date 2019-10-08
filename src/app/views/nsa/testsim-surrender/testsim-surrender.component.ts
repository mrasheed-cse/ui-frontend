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

@Component({
  selector: 'app-testsim-surrender',
  templateUrl: './testsim-surrender.component.html',
  styleUrls: ['./testsim-surrender.component.scss'],
  providers: [WorkflowsService,AppGlobals,LoginService],
})
export class TestsimSurrenderComponent implements OnInit {

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
    this.workFlowsService.loadMySimsFiltered(this.userID, this.allRequisitionLineMsisdnIds).subscribe(
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
    requestObj['defWorkRequestId'] = this._global.wrid_testSimSurrender;
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
      requestDetailObj['lostDamageMode'] = "";
      requestDetailObj['lostDamageDate'] = "";

      requestObj['numberWiseDetails'].push(requestDetailObj);

    } //end of loop over numbers

    ////////////////// /////////////////////////////////
    this.workFlowsService.submitSimActionRequest(requestObj).subscribe(
      data => {
        
      },
    err => console.error(err),
    () => console.log('Done loading PendingTask List')
    );
    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.isLoading = false;
      alert("The request has been submitted");
      this.router.navigate(['nsa/testsimdashboard']);
    }, 4000);

    ////////////// /////////////////////// /////////////
  }

  cancel(){
    this.router.navigate(['nsa/testsimdashboard']);
  }

}
