import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkflowsService } from './../services/workflows.service';
import { AppGlobals } from './../../../app.global';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';

@Component({
  selector: 'app-testsim-lost-ssm',
  templateUrl: './testsim-lost-ssm.component.html',
  styleUrls: ['./testsim-lost-ssm.component.scss'],
  providers: [WorkflowsService,AppGlobals,LoginService],
})
export class TestsimLostSsmComponent implements OnInit {

  requisitionList: Array<Object>;
  msisdnList: Array<Object>;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;
  userID: string;
  todayDate: Date;
	routerUrlAndParams: string;
  public isLoading:boolean = false;
  isDataFound: boolean = true;
  showDetail: boolean = false;
  selectedSimActionId: number;

  constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService) {

    this.isLoading = false;
    this.showDetail = false;
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
    this.msisdnList = [];

  } //end of constructor

  loadPendingList(){
    //GetPendingTaskList
    this.workFlowsService.simActionRequestsPendingForApproval(this._global.wrid_testSimDamaged,this.userID).subscribe(
        data => {
          if(data !=null){
            console.log(data);
            this.isDataFound = true;

            if(data.length > 0){
              for(var i = 0; i < data.length; i++){
                this.requisitionList.push(data[i]);
              }
            }

            /////////// /////////////////// ///////////// ////////////////////
            this.workFlowsService.simActionRequestsPendingForApproval(this._global.wrid_testSimLost,this.userID).subscribe(
              data => {
                if(data !=null){
                  console.log(data);

                  if(data.length > 0){
                    for(var i = 0; i < data.length; i++){
                      this.requisitionList.push(data[i]);
                    }
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
            ////////// //////////////////// /////////////////// //////////////

            this.requisitionList = data;
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

  initTasks(){
    this.selectedSimActionId = 0;
    this.requisitionList = [];
    this.msisdnList = [];
    this.isLoading = true;
    this.showDetail = false;

    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.loadPendingList();
    }, 2000);
  }

  ngOnInit () {

    this.initTasks();

  }

  details(aTask){

    this.isLoading = true;
    this.selectedSimActionId = (aTask['simActionId']);

    this.workFlowsService.simActionRequestDetailsPendingForApproval(aTask['simActionId']).subscribe(
      res  =>  {
        if(res !== ""){
          this.msisdnList = res;

          for(var i = 0; i < this.msisdnList.length; i++){
            this.msisdnList[i]['selected'] = false;
            this.msisdnList[i]['isApproved'] = false;
            this.msisdnList[i]['isRejected'] = false;
            this.msisdnList[i]['locked'] = false;
            if(this.msisdnList[i]['approvalStatus'] == 2){
              this.msisdnList[i]['isRejected'] = true;
              this.msisdnList[i]['locked'] = true;
            }
          }

          this.isLoading = false;
          this.showDetail = true;
        }
      },
      err  =>  {

      }
    );

  }

  approveAll(){

    for(var i = 0; i < this.msisdnList.length; i++){
      if(!this.msisdnList[i]['locked']){
        this.msisdnList[i]['isRejected'] = false;
        this.msisdnList[i]['isApproved'] = true;
      }
    }

  }

  rejectAll(){

    for(var i = 0; i < this.msisdnList.length; i++){
      if(!this.msisdnList[i]['locked']){
        this.msisdnList[i]['isRejected'] = true;
        this.msisdnList[i]['isApproved'] = false;
      }
    }

  }

  submit(){

    this.isLoading = true;

    var obj = {};
    obj['simActionId'] = this.selectedSimActionId;
    obj['userId'] = this.userName;
    obj['msisdnDetails'] = [];

    for(var i = 0; i < this.msisdnList.length; i++){

      var obj2 = {};
      obj2['simActionMsisdnId'] = this.msisdnList[i]['simActionMsisdnId'];
      if(this.msisdnList[i]['isRejected']){
        obj2['approvalStatus'] = 2;
      }
      if(this.msisdnList[i]['isApproved']){
        obj2['approvalStatus'] = 1;
      }

      obj['msisdnDetails'].push(obj2);
    }

    this.workFlowsService.updateSimAction(obj).subscribe(
      res  =>  {
        if(res !== ""){
          if(res != null && res != undefined && res != ""){
            this.isLoading = false;
            var msg = "The request has been submitted" + res['name'];
            alert(msg);
            this.router.navigate(['nsa/testsimdashboard']);
          }
        }
      },
      err  =>  {

      }
    );

  }

  cancel(){
    this.initTasks();
  }

  checkApproval(event, aTask){
    console.log(aTask);
    if(aTask['locked'] == true){
      aTask['isRejected'] == true;
      aTask['isApproved'] == false;
    }
  }

}
