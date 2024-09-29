import { Component, OnInit } from '@angular/core';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DefinitionDataService } from '../services/definitiondata.service';
import { IsmsworkflowsService } from '../services/ismsworkflows.service';
import { LoggedInUser } from '../../pages/loggedInUser';
import { FileoperationService } from '../../nsa/services/fileoperation.service';

@Component({
  selector: 'app-requisitionassign',
  templateUrl: './requisitionassign.component.html',
  styleUrls: ['./requisitionassign.component.scss'],
	providers: [AppGlobals,LoginService,IsmsworkflowsService,FileoperationService]
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

  constructor(private route:ActivatedRoute,private router: Router,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals,private ismsworkflowsService: IsmsworkflowsService,private fileoperationService: FileoperationService) {

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
          alert(res.message);
          this.router.navigate(['nsa/newrequisition']);
        }
      },
      err  =>  {

      }

    );

  }

  formValidation(){
    let validationPassed : boolean;
    let validationMessage : any;
    validationPassed = true;
    validationMessage = "";

    for(var i = 0; i < this.requisition['requisitionLines'].length; i++){

      var creditLimit = 0;
      var quantity = 0;

      if(this.requisition['requisitionLines'][i]['assignedLimit'] != null &&
      this.requisition['requisitionLines'][i]['assignedLimit'] != undefined &&
      this.requisition['requisitionLines'][i]['assignedLimit'] != ""){
        creditLimit = parseFloat(this.requisition['requisitionLines'][i]['assignedLimit']);
      }

      if(creditLimit >= 0) { /* do nothing */ }
      else{
        validationMessage = "For line "+ (i+1) +" invalid credit limit amount given.";
        validationPassed = false;
      }

      /////////// ///////////////// ///////////////// ////////////////

      if(this.requisition['requisitionLines'][i]['assignedQuantity'] != null &&
      this.requisition['requisitionLines'][i]['assignedQuantity'] != undefined &&
      this.requisition['requisitionLines'][i]['assignedQuantity'] != ""){
        quantity = parseInt(this.requisition['requisitionLines'][i]['assignedQuantity']);
      }

      if(quantity > 0) { /* do nothing */ }
      else{
        validationMessage = "For line "+ (i+1) +" invalid quantity given.";
        validationPassed = false;
      }

    }

    if(!validationPassed){
      alert(validationMessage);
    }

    return validationPassed;
  }

  approve(){

    if(!this.formValidation()) return;

    this.ssmAssignment(this.requisitionDetails['id'], "ACCEPT", this.userID);
  }

  reject(){
    this.ssmAssignment(this.requisitionDetails['id'], "REJECT", this.userID);
  }

  rfi(){
    this.ssmAssignment(this.requisitionDetails['id'], "RFI", this.userID);
  }

  DownloadFile(fileNameToDownload: string){
	  console.log(fileNameToDownload);
    this.fileoperationService.DownloadFile(fileNameToDownload).subscribe((res) => {
			console.log(res);
      var downloadURL = window.URL.createObjectURL(res);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = fileNameToDownload;
      link.click();
		});
  }

}
