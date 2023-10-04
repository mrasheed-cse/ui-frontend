import { Component, OnInit } from '@angular/core';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DefinitionDataService } from '../services/definitiondata.service';
import { IsmsworkflowsService } from '../services/ismsworkflows.service';
import { LoggedInUser } from '../../pages/loggedInUser';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-screquisitionedit',
  templateUrl: './screquisitionedit.component.html',
//   styleUrls: ['./requisitionedit.component.scss'],
  providers: [AppGlobals,LoginService,DefinitionDataService,IsmsworkflowsService]
})
export class SCRequisitioneditComponent implements OnInit {

  requisition: any;
  requsitionLines: any;
  requsition_modified: any;
  employeeDetails: any;
  requisitionDetails: any;
  requisitionId: number;
  currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;
  userID: string;
  requisition_comments: string;
  requisition_existing_comments: Array<any>;

  public listRequisitionType = [];
	public listPurposeCategory = [];
	public listLocation = [];
	// public listUsageCategory = [];
	public listProduct = [];
	// public listImsiType = [];
	public listSpecialRequirement = [];

  loadMasterData(){
    this.listSpecialRequirement = environment.dataSpecialRequirementTypes;
    
//GetRequisitionType
this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_RequisitionType).subscribe(
  data => { 
        //console.log(data);
        for (let index in data) {
          //console.log (data[index]);
          this.listRequisitionType.push(
          {
            id:data[index].id,
            ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
          }
          ); 
        }		
      },
    err => console.error(err),
    () => console.log('done loading Provisioning Type Name List')
    );
//GetPurposeCategory

this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_PurposeType).subscribe(
data => { 
      //console.log(data);
      for (let index in data) {
        //console.log (data[index]);
        this.listPurposeCategory.push(
        {
          id:data[index].id,
          ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
        }
        ); 
      }		
    },
  err => console.error(err),
  () => console.log('done loading Provisioning Type Name List')
  );

  //GetLocation

this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_Location).subscribe(
data => { 
      //console.log(data);
      for (let index in data) {
        //console.log (data[index]);
        this.listLocation.push(
        {
          id:data[index].id,
          ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
        }
        ); 
      }		
    },
  err => console.error(err),
  () => console.log('done loading Provisioning Type Name List')
  );

  //GetUsageCategory

// this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_UsageCategory).subscribe(
// data => { 
//       //console.log(data);
//       for (let index in data) {
//         //console.log (data[index]);
//         this.listUsageCategory.push(
//         {
//           id:data[index].id,
//           ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
//         }
//         ); 
//       }		
//     },
//   err => console.error(err),
//   () => console.log('done loading usage category Name List')
//   );

    //GetProducts

    // getProduct() {
    //   //GetProducts
  
    //   this.definitionDataService.getDenoMination().subscribe(
    //     data => {
    //       //console.log(data);
    //       for (let index in data) {
    //         //console.log (data[index]);
    //         this.listProduct.push(
    //           {
    //             id: data[index].id,
    //             ismsMasterDataDetailsName: data[index].groupName
    //           }
    //         );
    //       }
  
    //       this.getUsersList();
    //     },
    //     err => console.error(err),
    //     () => console.log('done loading Product Name List')
    //   );
    // }

this.definitionDataService.getDenoMination().subscribe(
data => { 
      //console.log(data);
      for (let index in data) {
        //console.log (data[index]);
        this.listProduct.push(
        {
          id:data[index].id,
          ismsMasterDataDetailsName: data[index].groupName
        }
        ); 
      }		
    },
  err => console.error(err),
  () => console.log('done loading Product Name List')
  );

  //GetIMSI Type

// this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_ImsiType).subscribe(
// data => { 
//       //console.log(data);
//       for (let index in data) {
//         //console.log (data[index]);
//         this.listImsiType.push(
//         {
//           id:data[index].id,
//           ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
//         }
//         ); 
//       }		
//     },
//   err => console.error(err),
//   () => console.log('done loading IMSI Type Name List')
//   );
  }

  constructor(private route:ActivatedRoute,private router: Router, private definitionDataService: DefinitionDataService,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals,private ismsworkflowsService: IsmsworkflowsService) {
    
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

    this.loadMasterData();

    //call API here to get real data
    this.requisitionId = parseInt(this.route.snapshot.paramMap.get('requisition_id'));
    this.ismsworkflowsService.findScRequisitionDetails(this.requisitionId).subscribe(
      res  =>  {
        console.log('response is : '+res.message);  
        if(res !== ""){
          this.requisition = res;
          this.requsitionLines = res.requisitionLines;
          this.requsition_modified = res;
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

  deleteLine(aLine, index: number) {
   alert(aLine);   
   console.log(aLine);
   this.requsitionLines.splice(index,1);    
  }


  respondToRfi(requisitionId, comment, userId, requisitionLines){
    // alert('In respondToRfi API');
    console.log(requisitionLines);
    this.ismsworkflowsService.screspondToRfi(requisitionId, comment, userId, requisitionLines).subscribe(
      res  =>  {
        console.log('response is : '+res.message);  
        if(res !== ""){

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

      // var creditLimit = 0;
      var quantity = 0;

      // if(this.requisition['requisitionLines'][i]['creditLimit'] != null &&
      // this.requisition['requisitionLines'][i]['creditLimit'] != undefined &&
      // this.requisition['requisitionLines'][i]['creditLimit'] != ""){
      //   creditLimit = parseFloat(this.requisition['requisitionLines'][i]['creditLimit']);
      // }

      // if(creditLimit >= 0) { /* do nothing */ }
      // else{
      //   validationMessage = "For line "+ (i+1) +" invalid credit limit amount given.";					
      //   validationPassed = false;
      // }

      /////////// ///////////////// ///////////////// ////////////////

      if(this.requisition['requisitionLines'][i]['quantity'] != null &&
      this.requisition['requisitionLines'][i]['quantity'] != undefined &&
      this.requisition['requisitionLines'][i]['quantity'] != ""){
        quantity = parseInt(this.requisition['requisitionLines'][i]['quantity']);
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

  save(){
    // alert('are you sure.');
    if(!this.formValidation()) {
      alert('Invalid form');
      return;
    }
    // alert('HERE');
    this.respondToRfi(this.requisitionDetails['id'], this.requisition_comments, this.userID, this.requisition['requisitionLines']);
    alert('The changes have been saved.');
    this.router.navigate(['nsa/newscrequisitiondetails']);
  }

  cancel(){
    window.location.reload();
  }

}
