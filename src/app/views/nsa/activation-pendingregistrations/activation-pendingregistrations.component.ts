import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkflowsService } from './../services/workflows.service';
import { IsmsworkflowsService } from '../services/Ismsworkflows.service';
import { AppGlobals } from './../../../app.global';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';

@Component({
  selector: 'app-activation-pendingregistrations',
  templateUrl: './activation-pendingregistrations.component.html',
  styleUrls: ['./activation-pendingregistrations.component.scss'],
	providers: [WorkflowsService,AppGlobals,LoginService,IsmsworkflowsService],
})
export class ActivationPendingregistrationsComponent implements OnInit {

  requisition: any;
  requisitionList: Array<Object>;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;
  userID: string;
  todayDate: Date;
	routerUrlAndParams: string;
  public isLoading:boolean = false;
  public showDetail:boolean = false;  
  public requisitionIdSelected: number = 0;
  isDataFound: boolean = true;

  constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workflowsService: WorkflowsService, private ismsworkflowsService: IsmsworkflowsService) {

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
    //this.requisitionList = _global.dataTempForNewActRequest;

  } //end of constructor

  loadPendingList(){
    //GetPendingTaskList
    this.workflowsService.activationRequestsPendingForApproval(0,this.userID).subscribe(
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


  ngOnInit () {

    //this.isLoading = true;

    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.loadPendingList();
    }, 2000);

  }


  detailsAction(aTask){

      this.requisitionIdSelected = parseInt(aTask['id']);
      //this.showDetail = true;
      //this.isLoading = true;
      //this.getRequisitionDetails();


      //router.navigate(['user', user.id, 'details']);
      //this.router.navigate(['/nsa/activation-pendingapprovals/',aTask['id']]);
      return '../activation-pendingapprovals/'.toString();

  }

  

  

}
