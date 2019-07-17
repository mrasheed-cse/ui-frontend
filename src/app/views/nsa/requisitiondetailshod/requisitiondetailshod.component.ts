import { Component, OnInit } from '@angular/core';
import { AppGlobals } from './../../../app.global';

@Component({
  selector: 'app-requisitiondetailshod',
  templateUrl: './requisitiondetailshod.component.html',
  styleUrls: ['./requisitiondetailshod.component.scss'],
	providers: [AppGlobals]
})
export class RequisitiondetailshodComponent implements OnInit {

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

}
