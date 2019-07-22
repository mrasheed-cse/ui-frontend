import { Component, OnInit } from '@angular/core';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DefinitionDataService } from '../services/definitiondata.service';
import { IsmsworkflowsService } from '../services/Ismsworkflows.service';
import { LoggedInUser } from '../../pages/loggedInUser';

@Component({
  selector: 'app-requisitionedit',
  templateUrl: './requisitionedit.component.html',
  styleUrls: ['./requisitionedit.component.scss'],
  providers: [AppGlobals,LoginService,IsmsworkflowsService]
})
export class RequisitioneditComponent implements OnInit {

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
  requisition_existing_comments: Array<any>;

  constructor(private route:ActivatedRoute,private router: Router,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals,private ismsworkflowsService: IsmsworkflowsService) {

    this.requisition_comments = "";
    this.requisition_existing_comments = [];
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
          this.getComments(this.requisitionDetails['id'], "", "");
        }
          },
          err  =>  {	
           
          }
        
          );
        }

  ngOnInit() {
  }

  getComments(requisitionId, comment, userId){

    this.ismsworkflowsService.getAllComments(requisitionId, comment, userId).subscribe(
      res  =>  {
        console.log('response is : '+res.message);  
        if(res !== ""){
          this.requisition_existing_comments = res;
        }
      },
      err  =>  {	
           
      }
        
    );

  }

  saveComment(requisitionId, comment, userId){

    this.ismsworkflowsService.commentOnRequest(requisitionId, comment, userId).subscribe(
      res  =>  {
        console.log('response is : '+res.message);  
        if(res !== ""){

        }
      },
      err  =>  {	
           
      }
        
    );

  }

  save(){

    this.saveComment(this.requisitionDetails['id'], this.requisition_comments, this.userID);
    alert('The changes have been saved.');
    this.router.navigate(['nsa/newrequisitiondetails']);
  }

  cancel(){
    window.location.reload();
  }

}
