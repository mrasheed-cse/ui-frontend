import { Component, OnInit } from '@angular/core';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DefinitionDataService } from '../services/definitiondata.service';
import { IsmsworkflowsService } from '../services/Ismsworkflows.service';

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



  constructor(private route:ActivatedRoute,private router: Router,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals,private ismsworkflowsService: IsmsworkflowsService) {

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
  }

  confirmMsisdnSeriesAssignment(){
    this.assignmentType = "";
    this.startingKitNumber = "";
    this.endingKitNumber = "";
    this.showMsisdnSeriesAssignmentCard = false;

    var obj = Object.create(null);
    obj['startingKitNumber'] = "K131";
    obj['endingKitNumber'] = "K140";
    obj['startingMsisdnNumber'] = "8801710823400";
    obj['endingMsisdnNumber'] = "8801710823409";
    obj['c.quantity'] = "10";
    this.alreadyAssignedMsisdnSeriesDetails.push(obj);
  }

  resetMsisdnSeriesAssignment(){
    this.assignmentType = "";
    this.startingKitNumber = "";
    this.endingKitNumber = "";
    this.showMsisdnSeriesAssignmentCard = false;
  }

}
