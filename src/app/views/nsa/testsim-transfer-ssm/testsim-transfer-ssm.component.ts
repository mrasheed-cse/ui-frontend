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

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';

@Component({
    selector: 'app-testsim-transfer-ssm',
    templateUrl: './testsim-transfer-ssm.component.html',
    styleUrls: ['./testsim-transfer-ssm.component.scss'],
    providers: [WorkflowsService, AppGlobals, LoginService],
    standalone: false
})
export class TestsimTransferSsmComponent implements OnInit {

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

  constructor(public router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService) {

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
    this.workFlowsService.simActionRequestsPendingForApproval(this._global.wrid_testSimTransfer,this.userID).subscribe(
        data => {
          if(data !=null){
            console.log(data);
            this.isDataFound = true;
            this.requisitionList = data;
            this.isLoading = false;
          }
          else{
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

  initTasks(){
    this.selectedSimActionId = 0;
    this.requisitionList = [];
    this.msisdnList = [];
    this.isLoading = true;
    this.showDetail = false;

    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.loadPendingList();
    }, 2000);

    this.isLoading = false;
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

  rejectCorresponding(position){
    //  alert(position);
      this.msisdnList[position]['isRejected'] = false;
      this.msisdnList[position]['isApproved'] = true;      
    }  
    
    approveCorresponding(position){
      //  alert(position);
        this.msisdnList[position]['isRejected'] = true;
        this.msisdnList[position]['isApproved'] = false;       
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
        var msg ="There occurs a problem during this submission";
            alert(msg);
        this.isLoading = false;
      },
      () => {this.isLoading = false;}
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
