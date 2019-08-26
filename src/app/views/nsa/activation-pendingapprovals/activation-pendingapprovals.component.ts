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
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';

@Component({
  selector: 'app-activation-pendingapprovals',
  templateUrl: './activation-pendingapprovals.component.html',
  styleUrls: ['./activation-pendingapprovals.component.scss'],
	providers: [WorkflowsService,AppGlobals,LoginService,IsmsworkflowsService],
})
export class ActivationPendingapprovalsComponent implements OnInit {

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

  constructor(private route:ActivatedRoute, private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workflowsService: WorkflowsService, private ismsworkflowsService: IsmsworkflowsService) {

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


  ngOnInit () {

    //this.isLoading = true;

    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.getRequisitionDetails();
    }, 2000);

  }


  

  getMsisdnDetails(){
    this.workflowsService.newSimActivationDetails(this.requisitionIdSelected, this.userID).subscribe(
      res  =>  {
        if(res !== ""){
          this.requisition['msisdnDetails'] = res;

          for(var i = 0; i < this.requisition['msisdnDetails'].length; i++){
            this.requisition['msisdnDetails']['selected'] = false;
          }

          this.isLoading = false;
        }
      },
      err  =>  {	
           
      }        
    );
  }

  getRequisitionDetails(){

    this.requisitionIdSelected = parseInt(this.route.snapshot.paramMap.get('requisition_id'));
    //this.requisition = this._global.dataTempForNewActRequestDetails;
    this.requisition = {};
    this.isLoading = true;
    //return;

    this.ismsworkflowsService.findRequisitionDetails(this.requisitionIdSelected).subscribe(
      res  =>  {
        console.log('response is : '+res.message);  
        if(res !== ""){
          this.requisition['requisitionDetails'] = res.requisitionDetails;
          this.getMsisdnDetails();
        }
      },
      err  =>  {	
           
      }        
    );


  }


  approve(){

    var allRqnLineNumbers = "";
    var approvedSimActivationIds = "";

    for(var i = 0; i < this.requisition['msisdnDetails'].length; i++){
      if(this.requisition['msisdnDetails'][i]['selected']){

        if(this.requisition['msisdnDetails'][i]['simStatus'] == "Pending activation" &&
        this.requisition['msisdnDetails'][i]['declarationStatus'] == "Agreed"){
          allRqnLineNumbers += this.requisition['msisdnDetails'][i]['requisitionLineMsisdnId'] + ",";
          approvedSimActivationIds += this.requisition['msisdnDetails'][i]['simActivationId'] + ",";          
        }
        else{
          var msg = "Only MSISDNs which are pending for activation, and with declaration status 'Agreed', can be selected. Please deselect MSISDN in row " + (i+1) + ".";
          alert(msg);
          return;
        }

      }
    }

    //console.log(allRqnLineNumbers);return;

    if(confirm("For each MSISDN, please confirm that activation from Bluebox has been completed")){
      //// //////////////////// //////////////
      this.workflowsService.updateSimActivationReq(
        this.requisition['requisitionDetails']['id'], 
        this.userID, 
        allRqnLineNumbers, 
        "", 
        approvedSimActivationIds, 
        "UPDATE").subscribe(
      res  =>  {        
        console.log('response is : '+res.message);  
        if(res !== ""){

        }
      },
      err  =>  {	
          
      }

      );

      setTimeout(()=>{    //<<<---    using ()=> syntax

      /////////////////// //////////////////////////
      this.isLoading = false;
      alert('This request has been submitted.');
      this.router.navigate(['nsa/testsimdashboard']);
      /////////// ////////////// ///////////////////

      }, 5000);


      ///////// /////////////// //////////////
    }
    
  }

}
