import { Component, OnInit } from '@angular/core';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DefinitionDataService } from '../services/definitiondata.service';
import { IsmsworkflowsService } from '../services/Ismsworkflows.service';

@Component({
  selector: 'app-requisitionassign',
  templateUrl: './requisitionassign.component.html',
  styleUrls: ['./requisitionassign.component.scss'],
	providers: [AppGlobals,LoginService,IsmsworkflowsService]
})
export class RequisitionassignComponent implements OnInit {

  requisition: any;
  requsitionLines: any;
  employeeDetails: any;
  requisitionDetails: any;
  requisitionId: number;

  constructor(private route:ActivatedRoute,private router: Router,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals,private ismsworkflowsService: IsmsworkflowsService) {

    //call API here to get real dat
    this.requisitionId = parseInt(this.route.snapshot.paramMap.get('requisition_id'));
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
