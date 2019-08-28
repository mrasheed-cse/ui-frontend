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
  selector: 'app-testsim-timeext-ssm',
  templateUrl: './testsim-timeext-ssm.component.html',
  styleUrls: ['./testsim-timeext-ssm.component.scss'],
	providers: [WorkflowsService,AppGlobals,LoginService],
})
export class TestsimTimeextSsmComponent implements OnInit {

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
    this.workFlowsService.simActionRequestsPendingForApproval(this._global.wrid_testSimTimeLimitExtension,this.userID).subscribe(
        data => {
          if(data !=null){
            console.log(data);
            this.isDataFound = true;
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

  }

  cancel(){
    this.initTasks();
  }

}
