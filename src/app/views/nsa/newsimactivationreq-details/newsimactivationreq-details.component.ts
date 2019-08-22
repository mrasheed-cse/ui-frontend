import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkflowsService } from './../services/workflows.service';
import { AppGlobals } from './../../../app.global';
import { Router,ActivatedRoute, Params } from '@angular/router'
import { environment } from '../../../../environments/environment.prod';

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import { IsmsworkflowsService } from '../services/Ismsworkflows.service';

@Component({
  selector: 'app-newsimactivationreq-details',
  templateUrl: './newsimactivationreq-details.component.html',
  styleUrls: ['./newsimactivationreq-details.component.scss'],
	providers: [WorkflowsService,AppGlobals,LoginService,IsmsworkflowsService],
})
export class NewsimactivationreqDetailsComponent implements OnInit {

  requisition: any;
  requsitionLines: any;
  employeeDetails: any;
  requisitionDetails: any;
  requisitionId: number;
  currentLoggedInUser: LoggedInUser;
  userName: string;
  groupID: number;
  userID: string;
  requisition_comments: string;
  public isLoading:boolean = false;
  isDataFound: boolean = true;
  routerUrlAndParams: string;

  constructor(private route:ActivatedRoute, private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService, private ismsworkflowsService: IsmsworkflowsService) {

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
    this.requisitionId = parseInt(this.route.snapshot.paramMap.get('requisition_id'));

  } //end of constructor

  ngOnInit () {

    this.isLoading = true;
    this.requisition = {};
    this.requisition['requisitionDetails'] = {};
    this.requisition['msisdnDetails']= {};    

    setTimeout(()=>{    //<<<---    using ()=> syntax
      
      /////////////////// //////////////////////////
      this.getRequisitionDetails();
      /////////// ////////////// ///////////////////

    }, 2000);

  }

  getRequisitionDetails(){

    this.requisition = this._global.dataTempForNewActRequestDetails;
    this.isLoading = false;
    return;

    this.ismsworkflowsService.findRequisitionDetails(this.requisitionId).subscribe(
      res  =>  {
        console.log('response is : '+res.message);  
        if(res !== ""){
          this.requisition['requisitionDetails'] = res.requisitionDetails;
          this.requisition['msisdnDetails'] = res.msisdnDetails;
          this.isLoading = false;
        }
      },
      err  =>  {	
           
      }        
    );


  }

}
