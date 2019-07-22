import { Component, OnInit } from '@angular/core';
import { AppGlobals } from './../../../app.global';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DefinitionDataService } from '../services/definitiondata.service';
import { IsmsworkflowsService } from '../services/Ismsworkflows.service';

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser'; 

@Component({
  selector: 'app-requisitiondetails-form',
  templateUrl: './requisitiondetails-form.component.html',
  styleUrls: ['./requisitiondetails-form.component.scss'],
	providers: [AppGlobals,LoginService,IsmsworkflowsService]
})
export class RequisitiondetailsFormComponent implements OnInit {

  requisition: any;
  requsitionLines: Array<any>;
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

        }
      },
      err  =>  {	
           
      }
        
    );

  }


  approve(){
    console.log(this.requisitionDetails);
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
  
  deleteRequisitionLine(lineItem){

    if(confirm("Are you sure?")){
      let numberOfLines : number;
      numberOfLines = this.requsitionLines.length;
  
      if(numberOfLines <= 1){
        alert("There is only 1 line item. This cannot be deleted");
        return;
      }
  
      /////////////////////////////////// /////////////////
      this.ismsworkflowsService.deleteRequisitionLine(lineItem['id']).subscribe(
        res  =>  {
          console.log('response is : '+res.message);  
          alert("Requisition line deleted successfully");
          window.location.reload();
          if(res !== ""){
  
          }
        },
        err  =>  {	
             
        }
          
      );
      ////////////// //////////////////////////// /////////
    }

  }

}
