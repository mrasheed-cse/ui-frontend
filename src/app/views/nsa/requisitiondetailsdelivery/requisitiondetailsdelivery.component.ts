import { Component, OnInit } from '@angular/core';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DefinitionDataService } from '../services/definitiondata.service';
import { IsmsworkflowsService } from '../services/Ismsworkflows.service';
import { LoggedInUser } from '../../pages/loggedInUser';

@Component({
  selector: 'app-requisitiondetailsdelivery',
  templateUrl: './requisitiondetailsdelivery.component.html',
  styleUrls: ['./requisitiondetailsdelivery.component.scss'],
	providers: [AppGlobals,LoginService,IsmsworkflowsService]
})
export class RequisitiondetailsdeliveryComponent implements OnInit {

  requisition: any;
  requsitionLines: any;
  employeeDetails: any;
  requisitionDetails: any;
  requisitionId: number;
  allAssignmentTypes : any;
  assignmentType : any;
  startingKitNumber : any;
  endingKitNumber : any;  
  showMsisdnSeriesAssignmentCard: boolean;
  alreadyAssignedMsisdnSeriesDetails : Array<any>;
  currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;
	userID: string;
  lineItemBeingConsidered : any;


  constructor(private route:ActivatedRoute,private router: Router,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals,private ismsworkflowsService: IsmsworkflowsService) {

    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
    this.lineItemBeingConsidered = {};
    
    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
    } 
    else {
      this.router.navigate(['pages/login']);
    }

    //call API here to get real dat
    this.requisitionId = parseInt(this.route.snapshot.paramMap.get('requisition_id'));
   // this.requisition = _global.dataTempForRequisitionDetail;
    this.ismsworkflowsService.findRequisitionDetails(this.requisitionId).subscribe(
      res  =>  {
        console.log('response is : '+res.message);  
        if(res !== ""){
          this.requisition = res;
          this.requsitionLines = res.requisitionLines;
          this.employeeDetails = res.employeeDetails;
          this.requisitionDetails = res.requisitionDetails;
        }
          },
          err  =>  {	
           
          }
        
          );

    this.allAssignmentTypes = [
      {
        "id" : "Discrete",
        "name" : "Discrete"
      },
      {
        "id" : "Sequential",
        "name" : "Sequential"
      }
    ];

    this.assignmentType = "";
    this.startingKitNumber = "";
    this.endingKitNumber = "";
    this.showMsisdnSeriesAssignmentCard = false;
    this.alreadyAssignedMsisdnSeriesDetails = [];

   }

  ngOnInit() {
  }

  clear(){

  }

  submit(){
    alert('THis request has been submitted.');


  }

  assignMsisdn(lineItem){
    this.assignmentType = "";
    this.startingKitNumber = "";
    this.endingKitNumber = "";
    this.showMsisdnSeriesAssignmentCard = true;
    this.lineItemBeingConsidered = lineItem;
  }

  confirmMsisdnSeriesAssignment(){
    /*this.assignmentType = "";
    this.startingKitNumber = "";
    this.endingKitNumber = "";
    this.showMsisdnSeriesAssignmentCard = false;*/

    var responseObj = {};
    responseObj['requisitionLineId'] = this.lineItemBeingConsidered['id'];
    responseObj['searchModel'] = [];

    var arrayObj = {};
    arrayObj['startingKitNumber'] = this.startingKitNumber;
    arrayObj['endingKitNumber'] = this.endingKitNumber;

    responseObj['searchModel'].push(arrayObj);

    //console.log(responseObj);
    //return;

    this.ismsworkflowsService.getMsisdnDetailsFromSsm(responseObj).subscribe(
      res  =>  {
        console.log('response is : '+res.message);  
        console.log(res);
        if(res !== ""){
          this.alreadyAssignedMsisdnSeriesDetails = res;
        }
      },
      err  =>  {	
           
      }
        
    );


    /*var obj = Object.create(null);
    obj['startingKitNumber'] = "K131";
    obj['endingKitNumber'] = "K140";
    obj['startingMsisdnNumber'] = "8801710823400";
    obj['endingMsisdnNumber'] = "8801710823409";
    obj['c.quantity'] = "10";
    this.alreadyAssignedMsisdnSeriesDetails.push(obj);*/
  }

  resetMsisdnSeriesAssignment(){
    this.assignmentType = "";
    this.startingKitNumber = "";
    this.endingKitNumber = "";
    this.showMsisdnSeriesAssignmentCard = false;
  }

  approveOrRejectRequest(requisitionId, status, userId){

    this.ismsworkflowsService.approveOrRejectRequest(requisitionId, status, userId).subscribe(
      res  =>  {
        console.log('response is : '+res.message);  
        if(res !== ""){

        }
      },
      err  =>  {	
           
      }
        
    );

  }

  approve(){

    this.approveOrRejectRequest(this.requisitionDetails['id'], "ACCEPT", this.userID);
    alert('This request has been approved.');
    this.router.navigate(['nsa/newrequisition']);
  }

  reject(){
    this.approveOrRejectRequest(this.requisitionDetails['id'], "REJECT", this.userID);
    alert('This request has been rejected.');
    this.router.navigate(['nsa/newrequisition']);
  }

  rfi(){
    this.approveOrRejectRequest(this.requisitionDetails['id'], "RFI", this.userID);
    alert('This request has been sent for RFI.');
    this.router.navigate(['nsa/newrequisition']);
  }

}
