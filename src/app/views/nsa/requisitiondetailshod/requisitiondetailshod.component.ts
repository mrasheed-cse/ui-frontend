import { Component, OnInit } from '@angular/core';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DefinitionDataService } from '../services/definitiondata.service';
import { IsmsworkflowsService } from '../services/Ismsworkflows.service';
import { LoggedInUser } from '../../pages/loggedInUser';

@Component({
  selector: 'app-requisitiondetailshod',
  templateUrl: './requisitiondetailshod.component.html',
  styleUrls: ['./requisitiondetailshod.component.scss'],
  providers: [AppGlobals,LoginService,IsmsworkflowsService]
})
export class RequisitiondetailshodComponent implements OnInit {

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

  constructor(private route:ActivatedRoute,private router: Router,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals,private ismsworkflowsService: IsmsworkflowsService) {

    this.requisition_comments = "";
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
    }
    else {
      this.router.navigate(['pages/login']);
    }

    //call API here to get real data
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

  approveOrRejectRequest(requisitionId, status, userId){

    this.ismsworkflowsService.approveOrRejectRequest(requisitionId, status, userId, this.requisition_comments).subscribe(
      res  =>  {
        console.log('response is : '+res.message);
        if(res !== ""){
          alert(res.message);
          this.router.navigate(['nsa/newrequisition']);
        }
      },
      err  =>  {

      }

    );

  }

  approve(){

    this.approveOrRejectRequest(this.requisitionDetails['id'], "ACCEPT", this.userID);
  }

  reject(){
    this.approveOrRejectRequest(this.requisitionDetails['id'], "REJECT", this.userID);
  }

  rfi(){
    this.approveOrRejectRequest(this.requisitionDetails['id'], "RFI", this.userID);
  }

}
