import { Component, OnInit } from '@angular/core';
import { AppGlobals } from './../../../app.global';

@Component({
  selector: 'app-requisitiondetailsdelivery',
  templateUrl: './requisitiondetailsdelivery.component.html',
  styleUrls: ['./requisitiondetailsdelivery.component.scss'],
	providers: [AppGlobals]
})
export class RequisitiondetailsdeliveryComponent implements OnInit {

  requisition: any;
  allAssignmentTypes : any;
  assignmentType : any;
  startingKitNumber : any;
  endingKitNumber : any;  
  showMsisdnSeriesAssignmentCard: boolean;
  alreadyAssignedMsisdnSeriesDetails : Array<any>;

  constructor(private _global: AppGlobals) {

    //call API here to get real data
    this.requisition = _global.dataTempForRequisitionDetail;

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
