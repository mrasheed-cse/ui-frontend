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
  selector: 'app-testsim-mysims',
  templateUrl: './testsim-mysims.component.html',
  styleUrls: ['./testsim-mysims.component.scss'],
	providers: [WorkflowsService,AppGlobals,LoginService],
})
export class TestsimMysimsComponent implements OnInit {


  selectedIds: string;
  requisitionList: Array<Object>;
  requisitionListOther: Array<Object>;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;
  userID: string;
  todayDate: Date;
	routerUrlAndParams: string;
  public isLoading:boolean = false;
  isDataFound: boolean = true;
  isDataFoundOther: boolean = true;

  selectAll:boolean = false;

  handleSelectAll(event: any){

    console.log(event);

    if(event != null && event != "" && event != undefined) event = parseInt(event);
    else return;

    var status = false;
    if(event == 1){
      status = true;
    }

    for(var i = 0; i < this.requisitionList.length; i++){
      this.requisitionList[i]['selected'] = status;
    }
  }

  constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService) {

    this.selectedIds = "";
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
    //this.requisitionList = _global.dataTempForMySims;

  } //end of constructor

  loadOtherSims(){
    this.isLoading = true;
    this.workFlowsService.loadMyNonActiveSims(this.userID).subscribe(
      data => {
        if(data !=null){
          console.log(data);
          this.isDataFoundOther = true;
          this.requisitionListOther = data;
          this.isLoading = false;
        }
        else{
          this.isDataFoundOther = false;
        }
      },
    err => console.error(err),
    () => console.log('Done loading PendingTask List')
    );
    this.isLoading = false;
  }


  loadPendingList(){
    //GetPendingTaskList
    this.workFlowsService.loadMySims(this.userID).subscribe(
        data => {
          if(data !=null){
            console.log(data);
            this.isDataFound = true;
            this.requisitionList = data;
            for(var i = 0; i < this.requisitionList.length; i++){
              this.requisitionList[i]['selected'] = false;
            }
            this.loadOtherSims();
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
    this.selectedIds = "";

    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.loadPendingList();
    }, 2000);

  }


  detailsAction(aTask){

      //router.navigate(['user', user.id, 'details']);
      //this.router.navigate(['/nsa/requisitiondetailsassesment/',aTask['id']]);
      return '../newsimactivationreq_dt/'.toString();

  }

  getSelectedIds(){

    this.selectedIds = "";

    for(var i = 0; i < this.requisitionList.length; i++){
      if(this.requisitionList[i]['selected'] == true){
        this.selectedIds += this.requisitionList[i]['requisitionLineMsisdnId'] + ",";
      }
    }

    if(this.selectedIds != "" && this.selectedIds.length > 0){
      this.selectedIds = this.selectedIds.substr(0, this.selectedIds.length - 1);
    }

    console.log(this.selectedIds);
  }

  timeExtension(){
    this.getSelectedIds();
    this.router.navigate(['nsa/testsim-timeext', this.selectedIds]);
  }

  creditLimitExtension(){
    this.getSelectedIds();
    this.router.navigate(['nsa/testsim-creditlimitext', this.selectedIds]);
  }

  recharge(){
    this.getSelectedIds();
    this.router.navigate(['nsa/testsim-recharge', this.selectedIds]);
  }

  surrender(){
    this.getSelectedIds();
    this.router.navigate(['nsa/testsim-surrender', this.selectedIds]);
  }

  damaged(){
    this.getSelectedIds();
    this.router.navigate(['nsa/testsim-damaged', this.selectedIds]);
  }

  lost(){
    this.getSelectedIds();
    this.router.navigate(['nsa/testsim-lost', this.selectedIds]);
  }

  transfer(){
    this.getSelectedIds();
    this.router.navigate(['nsa/testsim-transfer', this.selectedIds]);
  }

}
