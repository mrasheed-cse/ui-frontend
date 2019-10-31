import { Component, OnInit, ViewChild } from '@angular/core';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DefinitionDataService } from '../services/definitiondata.service';
import { IsmsworkflowsService } from '../services/Ismsworkflows.service';
import { LoggedInUser } from '../../pages/loggedInUser';

@Component({
  selector: 'app-requisitiondetailsdelivery',
  templateUrl: './requisitiondetailsdelivery.component.html',
  styleUrls: ['./requisitiondetailsdelivery.component.scss'],
	providers: [AppGlobals,LoginService,IsmsworkflowsService]
})
export class RequisitiondetailsdeliveryComponent implements OnInit {

  public recordsFromFile: any[] = [];
  @ViewChild('csvReader') csvReader: any;

  requisition: any;
  requsitionLines: any;
  employeeDetails: any;
  requisitionDetails: any;
  requisitionId: number;
  allAssignmentTypes : any;
  assignmentType : any;
  startingKitNumber : any;
  endingKitNumber : any;
  showMsisdnSeriesAssignmentCard: boolean;
  alreadyAssignedMsisdnSeriesDetails : Array<any>;
  finalArrayToSubmit : Array<any>;
  currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;
	userID: string;
  lineItemBeingConsidered : any;


  constructor(private route:ActivatedRoute,private router: Router,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals,private ismsworkflowsService: IsmsworkflowsService) {

    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
    this.lineItemBeingConsidered = {};

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
   // this.requisition = _global.dataTempForRequisitionDetail;
    this.ismsworkflowsService.findRequisitionDetails(this.requisitionId).subscribe(
      res  =>  {
        console.log('response is : '+res.message);
        if(res !== ""){
          this.requisition = res;

          if(this.requisition != null && this.requisition != undefined && this.requisition != "" &&
        this.requisition['requisitionLines'] != null && this.requisition['requisitionLines'] != undefined && this.requisition['requisitionLines'] != ""){
              for(var i = 0; i < this.requisition['requisitionLines'].length; i++){
                this.requisition['requisitionLines'][i].clcAssignmentCompleted = false;
              }
          }

          this.requsitionLines = res.requisitionLines;
          this.employeeDetails = res.employeeDetails;
          this.requisitionDetails = res.requisitionDetails;
        }
          },
          err  =>  {

          }

          );

    this.allAssignmentTypes = [
      {
        "id" : "Discrete",
        "name" : "Discrete"
      },
      {
        "id" : "Sequential",
        "name" : "Sequential"
      }
    ];

    this.assignmentType = "";
    this.startingKitNumber = "";
    this.endingKitNumber = "";
    this.showMsisdnSeriesAssignmentCard = false;
    this.alreadyAssignedMsisdnSeriesDetails = [];
    this.finalArrayToSubmit = [];

   }

  ngOnInit() {
  }

  clear(){
    window.location.reload();
  }

  submit(){

    var dataToSubmit = Object.create(null);
    dataToSubmit['wrID'] = this.requisitionDetails['id'];
    dataToSubmit['userID'] = this.userID;
    dataToSubmit['status'] = "ACCEPT";
    dataToSubmit['lineWiseMsisdnInfo'] = this.finalArrayToSubmit;

    //console.log(dataToSubmit);return;

    if(this.finalArrayToSubmit.length <= 0){
      alert("Please assign MSISDN for each line item before submitting");
      return;
    }
    else if(this.finalArrayToSubmit.length != this.requsitionLines.length){
      alert("Please assign MSISDN for each line item before submitting");
      return;
    }

    //console.log(dataToSubmit);

    this.updateForClc(dataToSubmit);
    alert('This request has been submitted.');
    this.router.navigate(['nsa/newrequisition']);

  }

  uploadListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidTxtFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        this.recordsFromFile = this.getDataRecordsArrayFromTxtFile(csvRecordsArray);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .txt file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromTxtFile(csvRecordsArray: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      let singleKitNumber = curruntRecord[0].trim();
      csvArr.push(singleKitNumber);
    }
    return csvArr;
  }

  isValidTxtFile(file: any) {
    return file.name.endsWith(".txt");
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.recordsFromFile = [];
  }



  assignMsisdn(lineItem){
    this.assignmentType = "";
    this.startingKitNumber = "";
    this.endingKitNumber = "";
    this.showMsisdnSeriesAssignmentCard = true;
    this.lineItemBeingConsidered = lineItem;
  }

  confirmMsisdnSeriesAssignment(){
    /**/

    var responseObj = {};
    responseObj['requisitionLineId'] = this.lineItemBeingConsidered['id'];
    responseObj['searchModel'] = [];

    if(this.assignmentType == 'Discrete'){

      for(var i = 0; i < this.recordsFromFile.length; i++){
        var arrayObj = {};
        arrayObj['startingKitNumber'] = this.recordsFromFile[i];
        arrayObj['endingKitNumber'] = this.recordsFromFile[i];

        if(arrayObj['startingKitNumber'] == null || arrayObj['startingKitNumber'] == undefined || arrayObj['startingKitNumber'] == "" || arrayObj['startingKitNumber'].length != 28){
          console.log(arrayObj['startingKitNumber']);
          console.log(arrayObj['startingKitNumber'].length);
          var alertTxt = "Invalid starting KIT number specified in row "+ (i+1) +" of input file. KIT number must be 28 digits.";
          alert(alertTxt);
          return;
        }
        if(arrayObj['endingKitNumber'] == null || arrayObj['endingKitNumber'] == undefined || arrayObj['endingKitNumber'] == "" || arrayObj['endingKitNumber'].length != 28){
          var alertTxt = "Invalid ending KIT number specified in row "+ (i+1) +" of input file. KIT number must be 28 digits.";
          alert(alertTxt);
          return;
        }

        responseObj['searchModel'].push(arrayObj);
      }

    }
    else{

      var arrayObj = {};
      arrayObj['startingKitNumber'] = this.startingKitNumber;
      arrayObj['endingKitNumber'] = this.endingKitNumber;

      if(this.startingKitNumber == null || this.startingKitNumber == undefined || this.startingKitNumber == "" || this.startingKitNumber.length != 28){
        alert("Invalid starting KIT number specified. KIT number must be 28 digits.");
        return;
      }
      if(this.endingKitNumber == null || this.endingKitNumber == undefined || this.endingKitNumber == "" || this.endingKitNumber.length != 28){
        alert("Invalid ending KIT number specified. KIT number must be 28 digits.");
        return;
      }

      responseObj['searchModel'].push(arrayObj);
    }



    //console.log(responseObj);
    //return;

    this.ismsworkflowsService.getMsisdnDetailsFromSsm(responseObj).subscribe(
      res  =>  {
        console.log('response is : '+res.message);
        console.log(res);
        if(res !== ""){

          //step 0: validation

          if(res.length <= 0){
            alert("No MSISDNs found with the given KIT numbers specified. Please try again with different KIT numbers.");
            return;
          }
          else if(res.length != this.lineItemBeingConsidered['assignQuantity']){
            let alertMsg = "The requsition line specifies quantity of " + this.lineItemBeingConsidered['assignQuantity'] + ". However, with specified KIT numbers " + res.length + " number of MSISDN found.";
            alert(alertMsg);
            return;
          }
          else{
            //console.log("new check");
            for(var z = 0; z < this.finalArrayToSubmit.length; z++){
              for(var z1 = 0; z1 < this.finalArrayToSubmit[z].msisdnInfo.length; z1++){

                for(var y = 0; y < res.length; y++){
                  /*console.log("res");
                  console.log(res[y]);
                  console.log("final array to submit");
                  console.log(this.finalArrayToSubmit[z].msisdnInfo[z1]);*/

                  if(res[y]['kit_No'] == this.finalArrayToSubmit[z].msisdnInfo[z1]['kit_No']){
                    let innerAlertMsg = "The KIT number " + res[y]['kit_No'] + " has been assigned already in a previous line item. Please specify new KIT number.";
                    alert(innerAlertMsg);
                    return;
                  }
                  if(res[y]['mobile_No'] == this.finalArrayToSubmit[z].msisdnInfo[z1]['mobile_No']){
                    let innerAlertMsg = "The MSISDN " + res[y]['mobile_No'] + " has been assigned already in a previous line item. Please use new MSISDN.";
                    alert(innerAlertMsg);
                    return;
                  }
                  if(res[y]['imsi_No'] == this.finalArrayToSubmit[z].msisdnInfo[z1]['imsi_No']){
                    let innerAlertMsg = "The IMSI number " + res[y]['imsi_No'] + " has been assigned already in a previous line item. Please specify new IMSI number.";
                    alert(innerAlertMsg);
                    return;
                  }

                }

              }
            }
          }

          //step 1: push to final array

          let obj = Object.create(null);
          obj['requisitionLine'] = this.lineItemBeingConsidered['id'];
          obj['msisdnInfo'] = res;

          this.finalArrayToSubmit.push(obj);

          //step 2: reflection on UI

          obj = Object.create(null);
          obj['requisitionLine'] = this.lineItemBeingConsidered['id'];
          obj['startingKitNumber'] = res[0]['kit_No'];
          obj['endingKitNumber'] = res[res.length - 1]['kit_No'];
          obj['startingMsisdnNumber'] =res[0]['mobile_No'];
          obj['endingMsisdnNumber'] = res[res.length - 1]['mobile_No'];
          obj['startingImsiNumber'] = res[0]['imsi_No'];
          obj['endingImsiNumber'] = res[res.length - 1]['imsi_No'];

          this.alreadyAssignedMsisdnSeriesDetails.push(obj);

          //step 3: clear

          this.assignmentType = "";
          this.startingKitNumber = "";
          this.endingKitNumber = "";
          this.showMsisdnSeriesAssignmentCard = false;

          //step 4: mark the row in requisition line items as completed
          //console.log("in step 4");
          for(var i = 0; i < this.requisition['requisitionLines'].length; i++){
            //console.log(this.requisition['requisitionLines'][i].id);
            //console.log(responseObj['requisitionLineId']);
            if(this.requisition['requisitionLines'][i].id == responseObj['requisitionLineId']){
              this.requisition['requisitionLines'][i].clcAssignmentCompleted = true;
            }
          }
        }
        else{
          alert("An error occured when fetching MSISDN information. Please try again.");
        }
      },
      err  =>  {

      }

    );


    /*var obj = Object.create(null);
    obj['startingKitNumber'] = "K131";
    obj['endingKitNumber'] = "K140";
    obj['startingMsisdnNumber'] = "8801710823400";
    obj['endingMsisdnNumber'] = "8801710823409";
    obj['c.quantity'] = "10";
    this.alreadyAssignedMsisdnSeriesDetails.push(obj);*/
  }

  resetMsisdnSeriesAssignment(){
    this.assignmentType = "";
    this.startingKitNumber = "";
    this.endingKitNumber = "";
    this.showMsisdnSeriesAssignmentCard = false;
  }

  updateForClc(dataToSubmit){

    this.ismsworkflowsService.updateForClc(dataToSubmit).subscribe(
      res  =>  {
        console.log('response is : '+res.message);
        if(res !== ""){

        }
      },
      err  =>  {

      }

    );

  }


}
