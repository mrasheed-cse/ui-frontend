import { Component, OnInit } from '@angular/core';
import { AppGlobals } from './../../../app.global';

@Component({
  selector: 'app-requisitionassign',
  templateUrl: './requisitionassign.component.html',
  styleUrls: ['./requisitionassign.component.scss'],
	providers: [AppGlobals]
})
export class RequisitionassignComponent implements OnInit {

  requisition: any;

  constructor(private _global: AppGlobals) {

    //call API here to get real data
    this.requisition = _global.dataTempForRequisitionDetail;

    console.log(this.requisition);

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

}
