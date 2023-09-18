import { Component, OnInit } from '@angular/core';
import { AppGlobals } from './../../../app.global';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DefinitionDataService } from '../services/definitiondata.service';
import { IsmsworkflowsService } from '../services/ismsworkflows.service';

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import { FileoperationService } from '../services/fileoperation.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-screquisitiondetails-form',
  templateUrl: './screquisitiondetails-form.component.html',
	providers: [AppGlobals,LoginService,IsmsworkflowsService,FileoperationService]
})
export class SCRequisitiondetailsFormComponent implements OnInit {

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
  public isLoading: boolean = false;
  selectedFile: File = null; 
	reFilename: FormControl; 
  fileName: string = "";
  constructor(private route:ActivatedRoute,private router: Router,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals,private ismsworkflowsService: IsmsworkflowsService,private fileoperationService: FileoperationService) {

    this.requisition_comments = "";
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      console.log(this.currentLoggedInUser,'dhshdsgdhsdhdsgd')
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
    }
    else {
      this.router.navigate(['pages/login']);
    }

   this.requisitionId = parseInt(this.route.snapshot.paramMap.get('requisition_id'));
    this.ismsworkflowsService.findScRequisitionDetails(this.requisitionId).subscribe(
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
          this.router.navigate(['nsa/newscrequisition']);
        }
      },
      err  =>  {

      }

    );

  }

  // onFileChange(event){
  //   this.isLoading = true;
  //   this.selectedFile = <File>event.target.files[0];
  //   const fd = new FormData();
	// 	// fd.append('sc-file', this.selectedFile, this.fileName + ".csv");
  //   var result = this.fileoperationService.uploadCSV(fd);
	// 	result.subscribe(
	// 		res => {
	// 			let index = res.message.lastIndexOf(":");
	// 			let file = res.message.substring(index);
	// 			this.workFlowsService.checkFileValidity(this.fileName + ".csv").subscribe(
	// 				response => {
	// 					let res = response.message.split(",");
	// 					if (res[0].trim() === "Valid") {
	// 						this.infoAlertShow = false;
	// 						this.isLoading = false;
	// 						this.mySeriesDefinitionForm.get('quantity').setValue(res[1]);
	// 					}
	// 					else {
	// 						this.infoAlertShow = true;
	// 						this.infoAlertMessage = "All or some numbers in " + this.selectedFile.name + " already have Definition Work Request";
	// 						this.isLoading = false;
	// 					}
	// 				});
	// 		}
	// 	);

  // }


  approve(){
    console.log(this.requisitionDetails);
    this.approveOrRejectRequest(this.requisitionDetails['id'], "ACCEPT", this.userID);

  }

  reject(){
    this.approveOrRejectRequest(this.requisitionDetails['id'], "REJECT", this.userID);
  }

  rfi(){
    this.approveOrRejectRequest(this.requisitionDetails['id'], "RFI", this.userID);
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

  onFileChange(event) {
		this.isLoading = true;
		this.selectedFile = <File>event.target.files[0];
	
		this.fileName = this.selectedFile.name;
		const fd = new FormData();
    let data={'createdBy':this.requisition['employeeDetails']['employeeNo'],'requisitionNo':this.requisition['requisitionDetails']['requisitionNo'],'status':'Active'}
		fd.append('nsa-file', this.selectedFile, this.fileName);
    fd.append('request', new Blob([JSON.stringify(data)], {type: 'application/json'}));
    fd.append('fileName', new Blob([JSON.stringify(this.selectedFile.name)], {type: 'application/json'}));
		var result = this.ismsworkflowsService.uploadFile(fd);
		result.subscribe(
			res => {
				console.log(res);
			}
		);
	}
}
