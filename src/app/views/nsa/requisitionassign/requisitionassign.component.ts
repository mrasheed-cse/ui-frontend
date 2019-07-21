import { Component, OnInit } from '@angular/core';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DefinitionDataService } from '../services/definitiondata.service';
import { IsmsworkflowsService } from '../services/Ismsworkflows.service';
import { LoggedInUser } from '../../pages/loggedInUser'; 

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
  currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;
	userID: string;

  constructor(private route:ActivatedRoute,private router: Router,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals,private ismsworkflowsService: IsmsworkflowsService) {

    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
			
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

  ssmAssignment(requisitionId, status, userId){

    let lineItems : Array<any>;
    lineItems = [];

    for(var i = 0; i < this.requsitionLines.length; i++){
      var obj = Object.create(null);
      obj['requisitionLineId'] = this.requsitionLines[i]['id'];
      obj['assignedCreditLimit'] = this.requsitionLines[i]['assignedLimit'];
      obj['assignedQuantity'] = this.requsitionLines[i]['assignedQuantity'];            
      lineItems.push(obj);
    }

    this.ismsworkflowsService.ssmAssignment(requisitionId, status, userId, lineItems).subscribe(
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

    this.ssmAssignment(this.requisitionDetails['id'], "ACCEPT", this.userID);
    alert('This request has been approved.');
    this.router.navigate(['nsa/newrequisition']);
  }

  reject(){
    this.ssmAssignment(this.requisitionDetails['id'], "REJECT", this.userID);
    alert('This request has been rejected.');
    this.router.navigate(['nsa/newrequisition']);
  }

  rfi(){
    this.ssmAssignment(this.requisitionDetails['id'], "RFI", this.userID);
    alert('This request has been sent for RFI.');
    this.router.navigate(['nsa/newrequisition']);
  }

}
