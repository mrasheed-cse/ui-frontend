import { Component, OnInit } from '@angular/core';
import { AppGlobals } from './../../../app.global';

@Component({
  selector: 'app-requisitiondetails-form',
  templateUrl: './requisitiondetails-form.component.html',
  styleUrls: ['./requisitiondetails-form.component.scss'],
	providers: [AppGlobals]
})
export class RequisitiondetailsFormComponent implements OnInit {

  requisition: any;

  constructor(private _global: AppGlobals) {

    //call API here to get real data
    this.requisition = _global.dataTempForRequisitionDetail;

   }

  ngOnInit() {
  }

  approve(){
    alert('THis request has been approved.');

  }

  reject(){
    alert('THis request has been rejected.');
  }

  rfi(){
    alert('THis request has been sent for RFI.');
  }
  
  deleteRequisitionLine(lineItem){

  }

}
