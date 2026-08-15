import { Component, OnInit, ViewChild } from '@angular/core';
  import {Router, ActivatedRoute} from '@angular/router';
  import {IsmsworkflowsService } from './../services/ismsworkflows.service';
  import { WorkflowsService } from './../services/workflows.service';
  
  
  
  
  
  import { AppGlobals } from './../../../app.global';  
  import { LoginService } from '../../pages/LoginService';
  import { LoggedInUser } from '../../pages/loggedInUser';
import {FileoperationService} from '../services/fileoperation.service';

@Component({
  selector: 'app-lostdamagenewsimconnection',
  templateUrl: './lostdamagenewsimconnection.component.html',
  styles: [],
	providers: [IsmsworkflowsService,WorkflowsService,AppGlobals,LoginService, FileoperationService]
})
export class LostdamagenewsimconnectionComponent implements OnInit {


  sim_action_id : number;
  hop_sequence : number;
  wrBriefName : string;
  userGroup_id : number;
  
  currentLoggedInUser: LoggedInUser;
  userName: string;
  userID: string;	  	  
  groupID: number;
  public rawDataFromBackend_polished: Array<Object>;
  public rawDataFromBackend: Array<Object>;



  public dangerAlertShow:boolean = false;
  public dangerAlertMessage:string = "";
  public successAlertShow:boolean = false;
  public successAlertMessage:string = "";
  public isDone:boolean = false;
  public isDoneDisable:boolean = false;
  public isLoading:boolean = false;
  public isDataFound:boolean = false;
  public isMsisdnAssigned:boolean = false;
  showMsisdnSeriesAssignmentCard: boolean;
  allAssignmentTypes : any;
  assignmentType : any;
  lineItemBeingConsidered : any;
  startingKitNumber : any;
  endingKitNumber : any;
  quantity: number;
  alreadyAssignedMsisdnSeriesDetails : Array<any>;
  finalArrayToSubmit : Array<any>;
  msisdnList : Array<any>;

  constructor(private loginService: LoginService,private activatedRoute: ActivatedRoute, private router:Router, public _global: AppGlobals, private ismsWorkFlowsService: IsmsworkflowsService, private workflowsService : WorkflowsService, private fileoperationService: FileoperationService) {
		
    this.isLoading = false;
	  // Get Current User Profile
	  
	  this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
	  
	  if (this.currentLoggedInUser) {
		  this.userName = this.currentLoggedInUser.userName
		  this.userID = this.currentLoggedInUser.userID
		  this.groupID = this.currentLoggedInUser.groupID
		  //console.log('Current user: ' + this.userName);
		  
	  } 
	  else {
		//console.log('Current user not found');
		this.router.navigate(['pages/login']);
	  }			
		
    this.LoadQueryStringData();	
    this.LoadInitialData(); 

    
    
		}
		
	ngOnInit() {

      
  }
  
	LoadQueryStringData(){
		// LOAD QUERY STRING DATA
		  this.sim_action_id = Number(this.activatedRoute.snapshot.paramMap.get('sim_action_id'));
		  console.log(this.sim_action_id);		  
	  
  }
  
  LoadInitialData(){
    //LoastDamagedFind

    this.ismsWorkFlowsService.LostDamagedFindApprovedOnly(this.sim_action_id).subscribe(
      res  =>  {
        if(res !== ""){
          console.log(res);
          this.isDataFound = true;
          this.rawDataFromBackend = res[0];
          this.rawDataFromBackend_polished = res[1];
          console.log(this.rawDataFromBackend['allRequisitionDetails'].length);

          for(var i = 0; i < this.rawDataFromBackend['allRequisitionDetails'].length; i++){  
            console.log(this.rawDataFromBackend['allRequisitionDetails'][i]['msisdn'].indexOf(","));          
            if(this.rawDataFromBackend['allRequisitionDetails'][i]['msisdn'].indexOf(",")>=0)
              this.rawDataFromBackend['allRequisitionDetails'][i]['msisdn'] = this.rawDataFromBackend['allRequisitionDetails'][i]['msisdn'].substr(0, this.rawDataFromBackend['allRequisitionDetails'][i]['msisdn'].indexOf(','));
            console.log('***'+this.rawDataFromBackend['allRequisitionDetails'][i]['msisdn']);           
          }
          this.isLoading = false;
        } 
    },
    err  =>  {

    }
    );  
  }

  clear(){
    this.router.navigate(['nsa/testsimdashboard']);    
  }

  submit(){

    this.isLoading = true;
    var obj = {};
    obj['simActionId'] = this.sim_action_id;
    obj['userId'] = this.userName;
    obj['msisdnDetails'] = [];
    console.log(obj);

    this.workflowsService.updateSimAction(obj).subscribe(
      res  =>  {
        if(res != null && res != undefined && res !== ""){
          this.isLoading = false;
          var msg = "The request has been submitted" + res['name'];
          alert(msg);          
    this.isLoading = false;
    this.router.navigate(['nsa/testsimdashboard']);
  }
},
err  =>  {

}
); 
  
}

  downloadGdFile(gdFileName) {
    this.fileoperationService.downloadLostSimGd(gdFileName).subscribe((data) => {
      const blob = new Blob([data as any], {type: 'application/pdf'});

      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = gdFileName;
      link.click();

    });
  }
}
