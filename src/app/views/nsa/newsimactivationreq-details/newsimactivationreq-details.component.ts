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
import { IsmsworkflowsService } from '../services/Ismsworkflows.service';
import { DefinitionDataService } from '../services/definitiondata.service';

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';

@Component({
  selector: 'app-newsimactivationreq-details',
  templateUrl: './newsimactivationreq-details.component.html',
  styleUrls: ['./newsimactivationreq-details.component.scss'],
	providers: [WorkflowsService,DefinitionDataService,AppGlobals,LoginService,IsmsworkflowsService],
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
  selectAll:boolean = false;

  WR_Name: string;

  handleSelectAll(event: any){

    console.log(event);

    if(event != null && event != "" && event != undefined) event = parseInt(event);
    else return;

    var status = false;
    if(event == 1){
      status = true;
    }

    for(var i = 0; i < this.requisition['msisdnDetails'].length; i++){
      this.requisition['msisdnDetails'][i]['selected'] = status;
    }
  }

  constructor(private route:ActivatedRoute, private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private definitionDataService: DefinitionDataService, private workFlowsService: WorkflowsService, private ismsworkflowsService: IsmsworkflowsService) {

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

    //GetWR_Name
	this.definitionDataService.GetWR_Name_forIsms(this._global.wrid_NewSimActivation).subscribe(
    data => {
        const dataStr = JSON.stringify(data);

        JSON.parse(dataStr, (key, value) => {
          if (typeof value === 'string') {
            this.WR_Name = value;
            return value;
          }
        });
      },
      err => console.error(err),
      ()=> console.log('done loading Work Request Name')
      );


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

  getMsisdnDetails(){
    this.workFlowsService.newSimActivationDetails(this.requisitionId, this.userID).subscribe(
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
        this.isLoading = false;
           
      }        
    );
  }

  getRequisitionDetails(){

    //this.requisition = this._global.dataTempForNewActRequestDetails;
    this.isLoading = true;
    //return;

    this.ismsworkflowsService.findRequisitionDetails(this.requisitionId).subscribe(
      res  =>  {
        console.log('response is : '+res.message);  
        if(res !== ""){
          this.requisition['requisitionDetails'] = res.requisitionDetails;
          this.getMsisdnDetails();
        }
        this.isLoading = false;
      },
      err  =>  {	
        this.isLoading = false;
      }        
    );


  }

  submit(){

    if(confirm("You are about to submit SIM activation request. Do you agree to the terms and conditions displayed onscreen?")){
      
      var allRqnLineNumbers = "";
  
      for(var i = 0; i < this.requisition['msisdnDetails'].length; i++){
        if(this.requisition['msisdnDetails'][i]['selected']){
  
          if(this.requisition['msisdnDetails'][i]['simStatus'] == "Inactive" || this.requisition['msisdnDetails'][i]['simStatus'] == "Declaration not given"){
            allRqnLineNumbers += this.requisition['msisdnDetails'][i]['requisitionLineMsisdnId'] + ",";
          }
          else{
            var msg = "Only inactive MSISDNs can be selected. Please deselect MSISDN in row " + (i+1) + ".";
            alert(msg);
            return;
          }
  
        }
      }

      //console.log(allRqnLineNumbers);return;

      //// //////////////////// //////////////
      this.isLoading = true;
      this.workFlowsService.submitNewSimActivationReq(this.requisition['requisitionDetails']['id'], this.userID, allRqnLineNumbers, "", "NEW").subscribe(
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

  cancel(){
    this.router.navigate(['nsa/testsimdashboard']);
  }

}
