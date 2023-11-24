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
  public isFileLoaded: boolean = false;
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
          console.log(res,'rokive');
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

    this.ismsworkflowsService.approveOrRejectScRequest(requisitionId, status, userId, this.requisition_comments).subscribe(
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

  salesOrderCreationRequest(qty){

    this.ismsworkflowsService.salesOrderCreationRequest(qty).subscribe(
      res => {
        console.log('SO Creation response is : '+res.message);
          if(res == ""){
            alert(res.message);
          }
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

    if (this.requisition.requisitionDetails.current_hop_seq===3 && this.requisition.requisitionDetails.current_hop_seq===5){
      this.salesOrderCreationRequest(this.requisitionDetails.qty);
    }
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
      this.ismsworkflowsService.deleteIsmsRequisitionline(lineItem.id).subscribe(
        res  =>  {
          console.log('response is : '+res.message);
          alert("Requisition line deleted successfully");
          var obj=this.requisition['requisitionLines'] as any
          let lines=this.removeObjectWithId( this.requisition['requisitionLines'], lineItem.id );
          this.requisition['requisitionLines']=lines;
          //window.location.reload();
          if(res !== ""){

          }
        },
        err  =>  {

        }

      );
      ////////////// //////////////////////////// /////////
    }

  }
  removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
  
    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }
  
    return arr;
  }
  onFileChange(event,qty:number,exDate:Date) {
	
    
    const fd = new FormData();
    this.isLoading = true;
		this.selectedFile = <File>event.target.files[0];
		this.fileName =  this.selectedFile.name;
		fd.append('nsa-file', this.selectedFile, this.fileName);
		var result = this.fileoperationService.uploadCSV(fd);
		result.subscribe(
			res => {
				let index = res.message.lastIndexOf(":");
				let file = res.message.substring(index);
        let requestData={fileName:this.fileName,qty:qty,expiryDate:exDate,requisitionDetailId:this.requisitionDetails['id']}
				
        console.log(requestData);
        this.ismsworkflowsService.checkFileValidity(requestData).subscribe(
					response => {
            
						let res = response.message.split(",");
						if (res[0].trim() === "Valid") {
							//this.infoAlertShow = false;
              alert("File uploaded successfully");
							this.isLoading = false;
              this.isFileLoaded=true;
						}
						else {
							//this.infoAlertShow = true;
              alert("This file is invalid");
							this.isLoading = false;
              this.isFileLoaded=false;
						}
					});
			}
		);
	}
}
