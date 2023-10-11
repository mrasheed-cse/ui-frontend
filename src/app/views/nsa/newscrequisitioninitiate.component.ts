import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DefinitionDataService } from './services/definitiondata.service';
import { IsmsworkflowsService } from './services/ismsworkflows.service';
import { WorkflowsService } from './services/workflows.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser';

import { NewTestSimRequisition, RequisitionLine } from './models/NewTestSimRequisition'
import { AppGlobals } from './../../app.global';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { parse } from 'querystring';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-newscrequisitioninitiate',
  templateUrl: './newscrequisitioninitiate.component.html',
  styles: ['./nsa_styles.css'],
  providers: [WorkflowsService, DefinitionDataService, IsmsworkflowsService, AppGlobals, LoginService]
})
export class NewscrequisitioninitiateComponent implements OnInit {


  userData: any[] = [];
  userList1: any[] = [];
  lastkeydown1: number = 0;
  finalListOfUsersToSendWithRqn: Array<any>;
  testMobileNumber: string;
  public vaildmobile: boolean = true;

  employeeID: string;
  employeeName: string;
  mobileNo: string;
  designation: string;
  department: string;
  division: string;
  emailAddress: string;
  fullName: string;

  WR_Name: string;
  serverUrl: string;
  currentLoggedInUser: LoggedInUser;
  newTestSimRequisition: NewTestSimRequisition;
  userName: string;
  groupID: number;
  userID: string;
  selecdId: any = 301;

  public dangerAlertShow: boolean = false;
  public dangerAlertMessage: string = "";
  public successAlertShow: boolean = false;
  public successAlertMessage: string = "";
  public infoAlertShow: boolean = false;
  public infoAlertMessage: string = "";
  public isLoading: boolean = false;
  public defFlowFound: boolean = false;

  newScRequisitionForm: FormGroup;
  purposeCategory: FormControl;


  location: FormControl;
  startDate: FormControl;
  endDate: FormControl;
  purposeDetails: FormControl;
  notificationTo: FormControl;
  requisitionType: FormControl;
  requisitionDate: FormControl;
  requisitionLines: FormArray;
  // cardExpiry: FormControl;

  formFieldData: string;

  public listRequisitionType = [];
  public listPurposeCategory = [];
  public listLocation = [];
  public listProduct = [];
  public listImsiType = [];
  public listSpecialRequirement = [];

  todayDate: Date;

  maxDate: Date;
  headerDateData: any;
  // cardExpiryDefultValue:Date;

  /*keyDownHandler(event: Event) {
      console.log(event);
      if (event['which'] === 43 || event['which'] === 45)
          event.preventDefault();
  }*/

  getRequisitionType() {
    //GetRequisitionType
    this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_RequisitionType).subscribe(
      data => {
        //   console.log(data);
        for (let index in data) {
          //   console.log (data[index].ismsMasterDataDetailsName.includes("Scratch"));
          if (data[index].ismsMasterDataDetailsName.includes("Scratch")) {
            this.listRequisitionType.push(
              {
                id: data[index].id,
                ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName

              }
            );
          }

        }

        this.getPurposeCategory();
      },
      err => console.error(err),
      () => console.log('done loading Provisioning Type Name List')
    );
  }

  getPurposeCategory() {
    //GetPurposeCategory

    this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_PurposeType).subscribe(
      data => {
        //console.log(data);
        for (let index in data) {
          if (!data[index].ismsMasterDataDetailsName.includes("IR")) {
            //console.log (data[index]);
            this.listPurposeCategory.push(
              {
                id: data[index].id,
                ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
              }
            );

          }

        }

        this.getLocation();
      },
      err => console.error(err),
      () => console.log('done loading Provisioning Type Name List')
    );
  }

  getLocation() {
    //GetLocation

    this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_Location).subscribe(
      data => {
        //console.log(data);
        for (let index in data) {
          //console.log (data[index]);
          this.listLocation.push(
            {
              id: data[index].id,
              ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
            }
          );
        }

        this.getProduct();
      },
      err => console.error(err),
      () => console.log('done loading Provisioning Type Name List')
    );
  }

  // getProduct(){ 
  //   this.definitionDataService.getDenoMination((this._global.masterData_ProductName)).subscribe(
  //     data => {
  //           //console.log(data);
  //           for (let index in data) {
  //             this.listProduct.push(
  //             {
  //               id:data[index].id,
  //               groupName: data[index].groupName,
  //             }
  //             );
  //           }
  //           this.getUsersList();
  //         },
  //       err => console.error(err),
  //       () => console.log('done loading Product Name List')
  //       );
  //       }


  getProduct() {
    //GetProducts

    this.definitionDataService.getDenoMination().subscribe(
      data => {
        //console.log(data);
        for (let index in data) {
          //console.log (data[index]);
          this.listProduct.push(
            {
              id: data[index].id,
              ismsMasterDataDetailsName: data[index].groupName
            }
          );
        }

        this.getUsersList();
      },
      err => console.error(err),
      () => console.log('done loading Product Name List')
    );
  }

  getUsersList() {
    this.finalListOfUsersToSendWithRqn = [];

    this.workFlowsService.getUserList().subscribe(
      data => {
        Object.assign(this.userData, data);
        this.getImsiType();
      },
      error => {
        console.log("Something wrong here in getUsersList()");
      });
  }

  getImsiType() {
    //GetIMSI Type

    this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_ImsiType).subscribe(
      data => {
        //console.log(data);
        for (let index in data) {
          //console.log (data[index]);
          this.listImsiType.push(
            {
              id: data[index].id,
              ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
            }
          );
        }

        this.isLoading = false;
        // this.purposeCategory.setValue(this.listPurposeCategory[0]['id']);
        // this.location.setValue(this.listLocation[0]['id']);
        // this.requisitionType.setValue(this.listRequisitionType[0]['id']);
      },
      err => console.error(err),
      () => console.log('done loading IMSI Type Name List')
    );
  }


  getUserIdsFirstWay($event) {

    //console.log($event.target.value);

    //let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;

    let userId = $event.target.value;

    this.userList1 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.userData, userId);
      }
    }
  }

  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i]['userName'].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };

  addRecipient() {

    if (this.notificationTo.value == null || this.notificationTo.value == undefined || this.notificationTo.value == "") return;

    for (var i = 0; i < this.userData.length; i++) {
      if (this.userData[i]['userName'] == this.notificationTo.value) {
        this.finalListOfUsersToSendWithRqn.push(this.userData[i]);
        break;
      }
    }

    this.notificationTo.setValue("");
  }

  deleteRecipient(listObj) {
    for (var i = 0; i < this.finalListOfUsersToSendWithRqn.length; i++) {
      if (this.finalListOfUsersToSendWithRqn[i]['userName'] == listObj['userName']) {
        this.finalListOfUsersToSendWithRqn.splice(i, 1);
        break;
      }
    }
  }

  constructor(private router: Router, private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private definitionDataService: DefinitionDataService, private ismsworkflowsService: IsmsworkflowsService, private workFlowsService: WorkflowsService) {

    this.headerDateData = {};

    // Get Current User Profile

    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
      //console.log('Current user: ' + this.userName);

    }
    else {
      //console.log('Current user not found');
      this.router.navigate(['pages/login']);
    }

    this.listSpecialRequirement = environment.dataSpecialRequirementTypes;

    this.definitionDataService.getEmployeeDetails(this.userID).subscribe(
      data => {
        const dataStr = JSON.stringify(data);
        var parsedString = JSON.parse(dataStr);
        this.employeeID = parsedString.employeeNo;
        this.fullName = parsedString.fullName;
        this.mobileNo = parsedString.mobileNumber;
        this.designation = parsedString.designation;
        this.department = parsedString.departmentName;
        this.division = parsedString.divisionName;
        this.emailAddress = parsedString.emailAddress;
      },
      err => console.error(err),
      () => console.log('done loading Emplpoyee Details')

    );

    //GetWR_Name
    /*
    this.definitionDataService.GetWR_Name_forIsms(this._global.wrid_NewSimRequision).subscribe(
    data => {
        const dataStr = JSON.stringify(data);
 
        JSON.parse(dataStr, (key, value) => {
          if (typeof value === 'string') {
            this.WR_Name = value;
            return value;
          }
        });
      },
      err => console.error(err),
      ()=> console.log('done loading Work Request Name')
      );
*/

    //Get Today Date
    this.todayDate = new Date();
    this.maxDate = new Date();
    const startDate = moment(this.todayDate);
    var futureMonth = moment(startDate,"DD-MM-YYYY").add(3, 'M');
    // this.cardExpiryDefultValue=new Date(futureMonth.year(),futureMonth.month(),futureMonth.date());
    
  } //end of constructor

  ngOnInit() {
    this.isLoading = true;
    this.createFormControls();
    this.createForm();
  
    
  }


  createFormControls() {
    this.purposeCategory = new FormControl('', Validators.required);
    this.location = new FormControl({ value: '' }, Validators.required);
    this.startDate = new FormControl({value:'',disabled:true}, Validators.required);
    this.endDate = new FormControl({value:'',disabled:true}, Validators.required);
    this.purposeDetails = new FormControl({value:'',disabled:true}, [
      Validators.required,
      Validators.minLength(120)
    ]);
    this.notificationTo = new FormControl('');
    this.requisitionType = new FormControl({ value: '' }, Validators.required);
    this.requisitionDate = new FormControl('');
    this.requisitionDate.setValue(moment(new Date()).format('DD-MM-YYYY'));
    
    this.requisitionLines = new FormArray([
      new FormGroup({
        product: new FormControl('', Validators.required),
        quantity: new FormControl(1,Validators.required),
        // cardExpiry: new FormControl('', Validators.required),
      })]);
  }

  createForm() {
    this.newScRequisitionForm = new FormGroup({
      requisitionDate: this.requisitionDate,
      requisitionType: this.requisitionType,
      purposeCategory: this.purposeCategory,
      location: this.location,
      startDate: this.startDate,
      endDate: this.endDate,
      purposeDetails: this.purposeDetails,
      notificationTo: this.notificationTo,
      requisitionLines: this.requisitionLines
    });
    this.getRequisitionType();
  }

  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }


  get RequisitionLines(): FormArray {
    return this.newScRequisitionForm.get('requisitionLines') as FormArray;
  }


  addLine() {
    const startDate = moment(this.todayDate);
    var futureMonth = moment(startDate,"DD-MM-YYYY").add(3, 'M');
    this.RequisitionLines.push(new FormGroup(
      {
        product: new FormControl('', Validators.required),
        quantity: new FormControl(1,Validators.required),
        // cardExpiry: new FormControl('', Validators.required),
      }
    ));
  }
  deleteLine(index: number) {
    this.requisitionLines.removeAt(index);
  }

  formValidation() {
    let validationPassed: boolean;
    let validationMessage: any;
    validationPassed = true;
    validationMessage = "";

    var currDate = new Date();

    console.log(this.startDate.value);
    console.log(currDate);

    console.log(this.startDate.value.getTime());
    console.log(currDate.getTime());

    const diffTime = Math.abs(this.startDate.value.getTime() - currDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    console.log(diffDays);

    if (this.startDate.value < currDate && diffDays >= 1) {
      validationMessage = "Start date cannot be a date in the past";
      validationPassed = false;
    }
    else if (this.endDate.value < currDate) {
      validationMessage = "End date must be greater than current date.";
      validationPassed = false;
    }
    else if (this.endDate.value <= this.startDate.value) {
      validationMessage = "End date must be greater than start date";
      validationPassed = false;
    }
    else if (this.purposeDetails.value == null || this.purposeDetails.value == "" || this.purposeDetails.value == undefined || this.purposeDetails.value.length < 120) {
      validationMessage = "Purpose details must contain a minimum of 120 characters";
      validationPassed = false;
    }

    console.log("new check");
    console.log(this.requisitionType.value);
    //validationPassed = false;

    if (this.requisitionType.value == 300) { //test sim

      console.log(this.endDate.value);

      var endDateAsDate = new Date(this.endDate.value);
      console.log(endDateAsDate);

      console.log(this.endDate.value.getTime());
      const diffTimeAlt = Math.abs(this.endDate.value.getTime() - this.startDate.value.getTime());
      const diffDaysAlt = Math.floor(diffTimeAlt / (1000 * 60 * 60 * 24));

      console.log(diffTimeAlt);
      console.log(diffDaysAlt);

      if (diffDaysAlt > 365) {
        alert("You cannot specify a test date period greater than 1 year");
        validationPassed = false;
      }
    }

    for (var i = 0; i < this.requisitionLines.length; i++) {
      var quantity = 0;

      // var cardExpiry = moment(this.newScRequisitionForm.get('cardExpiry').value)
      // var cardExpiry = this.FormatTheDate('');

      /////////// ///////////////// ///////////////// ////////////////

      if (this.requisitionLines.controls[i]['value'] != null &&
        this.requisitionLines.controls[i]['value'] != undefined &&
        this.requisitionLines.controls[i]['value'] != "" &&
        this.requisitionLines.controls[i]['value']['quantity'] != null &&
        this.requisitionLines.controls[i]['value']['quantity'] != undefined &&
        this.requisitionLines.controls[i]['value']['quantity'] != "") {
        quantity = parseInt(this.requisitionLines.controls[i]['value']['quantity']);
      }

      // if (this.requisitionLines.controls[i]['value'] != null &&
      //   this.requisitionLines.controls[i]['value'] != undefined &&
      //   this.requisitionLines.controls[i]['value'] != "" &&
      //   this.requisitionLines.controls[i]['value']['cardExpiry'] != null &&
      //   this.requisitionLines.controls[i]['value']['cardExpiry'] != undefined &&
      //   this.requisitionLines.controls[i]['value']['cardExpiry'] != "") {
      //   cardExpiry = (this.requisitionLines.controls[i]['value']['cardExpiry']);
      // }

      if (quantity > 0) { /* do nothing */ }
      else {
        validationMessage = "For line " + (i + 1) + " invalid quantity given.";
        validationPassed = false;
      }

    }

    if (!validationPassed) {
      this.dangerAlertShow = true;
      this.dangerAlertMessage = validationMessage;
    }

    return validationPassed;
  }


  // FORM SUBMISSION
  onNewScRequisitionSubmit() {

    console.log("this.defFlowFound is ", this.newScRequisitionForm);
    if (this.newScRequisitionForm.valid) {

      /////////////////////////////////////////// //////////////////////////////////
      ///////////////////////// /////////////////////// //////////////////////////////////
      this.topFunction();
      this.isLoading = true;
      console.log('Form Submitted!');

      const theReqDate = this.FormatTheDate(new Date());
      const theStartDate = this.FormatTheDate(this.newScRequisitionForm.get('startDate').value);
      const theEndDate = this.FormatTheDate(this.newScRequisitionForm.get('endDate').value);

      console.log("log start");
      console.log(theReqDate);

      if (!this.formValidation()) {
        this.isLoading = false;
        return;
      }

      ////////////////////////////////////////////////////////////////////
      if (confirm("Are you sure you want to submit this SC requisition? Please review that all your data is correct.")) {
        //do nothing here
      }
      else {
        this.isLoading = false;
        return;
      }
      ////////////////////////////////////////////////////////////////////

      this.headerDateData.requisitionDate = theReqDate;
      console.log(this.headerDateData);
      this.headerDateData.theStartDate = theStartDate;
      this.headerDateData.theEndDate = theEndDate;
      this.headerDateData.requisitionType = this.newScRequisitionForm.get('requisitionType').value;
      this.headerDateData.purposeCategory = this.newScRequisitionForm.get('purposeCategory').value;
      this.headerDateData.location = this.newScRequisitionForm.get('location').value;
      this.headerDateData.testMobileNumber = this.testMobileNumber;
      this.headerDateData.startDate = this.newScRequisitionForm.get('startDate').value;
      this.headerDateData.endDate = this.newScRequisitionForm.get('endDate').value;
      this.headerDateData.purposeDetails = this.newScRequisitionForm.get('purposeDetails').value;
      this.headerDateData.notificationTo = "";

      console.log("this.finalListOfUsersToSendWithRqn");
      console.log(this.finalListOfUsersToSendWithRqn);

      if (this.finalListOfUsersToSendWithRqn != null && this.finalListOfUsersToSendWithRqn.length > 0) {
        for (var i = 0; i < this.finalListOfUsersToSendWithRqn.length; i++) {
          this.headerDateData.notificationTo += this.finalListOfUsersToSendWithRqn[i]['emailAddress'];
          if (i >= (this.finalListOfUsersToSendWithRqn.length - 1)) {
            //do nothing
          }
          else this.headerDateData.notificationTo += ",";
        }
      }
      console.log(this.headerDateData.notificationTo);
      this.headerDateData.requisitionLines = this.newScRequisitionForm.get('requisitionLines').value;

      let resource = (this.headerDateData);
      console.log(resource);
      console.log('Add Button clicked: ' + resource);


      this.ismsworkflowsService.CreateNewTestScRequest(this._global.wrid_NewScRequision, this.groupID, this.userID, this.WR_Name, resource).subscribe(
        res => {
          console.log('response is : ' + res.message);

          if (res !== "") {
            this.newScRequisitionForm.reset();
            this.successAlertShow = true;
            /*if(this.groupID == this._global.groupID_SSM){
                this.successAlertMessage = "Requisition no "+ res.message +" has been submitted successfully and forwarded to CLC for approval.";
            }
            else{
            */
            this.successAlertMessage = "Requisition no " + res.message + " has been submitted successfully and forwarded to SSM for approval.";
            //}
            alert(this.successAlertMessage);
            setTimeout(() => {
              this.isLoading = false;
              this.router.navigate(['nsa/newscrequisitiondetails']);
            }, 4000);
          }
        },
        err => {
          this.isLoading = false;
          console.log("err.status : " + err.status);
          this.dangerAlertShow = true;
          this.dangerAlertMessage = " .";
        }

      );

      /////////////////// //////////////// /////////////// ///////////////////////////////
    }
    ///////////////// //////////////////////////// ///////////////////////////////

  }


  FormatTheDate(selectedrequisitionDate: any): string {

    console.log("selectedrequisitionDate : " + selectedrequisitionDate);
    /*	var date = new Date(selectedrequisitionDate);
    var month = ("0" + (date.getMonth()+1)).slice(-2);
    var day  = ("0" + date.getDate()).slice(-2);
        var formattedDate=[day,month,date.getFullYear()].join("-");*/
    const date = moment(selectedrequisitionDate);
    //console.log('jhhhhhhhhhhhhhhhhhhhhhhhhhh'+date);
    const formattedDate = moment(date).format('DD-MM-YYYY');
    //console.log("formattedDate : "+formattedDate);
    return formattedDate;

  }
  // ValidateNumber(event: any) {
  //   console.log("hello", this.testMobileNumber)
  //   this.isLoading = true;
  //   if (this.testMobileNumber) {
  //     if (this.testMobileNumber.length === 11) {
  //       this.ismsworkflowsService.validateMobileAPI(this.testMobileNumber).subscribe(
  //         res => {
  //           if (res == null || res.message == "Invalid") {
  //             this.infoAlertShow = true
  //             this.infoAlertMessage = "Provided msisdn is invalid, please provide a valid test number"
  //             this.vaildmobile = false;
  //           } else {
  //             this.vaildmobile = true;
  //             this.infoAlertShow = true;
  //             this.infoAlertMessage = "Approved";
  //           }

  //         },
  //         err => {
  //           console.log(err)
  //         }
  //       );
  //     }
  //     else {
  //       this.infoAlertShow = true
  //       this.infoAlertMessage = "Enter 11 Digit Number."
  //       this.vaildmobile = false;

  //     }
  //   }
  //   this.isLoading = false;


  // }

  ValidateNumber(event: any) {
    console.log("hello", this.testMobileNumber)
    this.isLoading = true;
    if (this.testMobileNumber) {
      if (this.testMobileNumber.length === 11) {
        this.ismsworkflowsService.validateMobileAPI(this.testMobileNumber).subscribe(
          res => {
            // if (res == null || res.message == "Invalid") {
              this.infoAlertShow = true
              // this.vaildmobile = true;
             
              this.infoAlertMessage = res.message;
              if(res.message==="Approved"){
                this.vaildmobile = false;
                this.startDate.enable();
                this.endDate.enable();
                this.purposeDetails.enable();
              // } else if(res.message="Test number has not sufficient validity") {
              //   this.vaildmobile = true;
              // } else if(res.message="Provided msisdn is invalid, please provide a valid test number") {
              //   this.vaildmobile = true;
              } else {
                this.vaildmobile = true;
                this.startDate.disable();
                this.endDate.disable();
                this.purposeDetails.disable();
              }

          },
          err => {
            console.log(err)
          }
        );
      }
      else {
        this.infoAlertShow = true
        this.infoAlertMessage = "Enter 11 Digit Number."
        this.vaildmobile = true;
        this.startDate.disable();
        this.endDate.disable();
        this.purposeDetails.disable();
      }
    }
    this.isLoading = false;


  }

  clearForm(event: any) {
    window.location.reload();
  }
  backButton(event: any) {
    //console.log(event);
    this.router.navigateByUrl('/nsa/newscrequisition');
  }
  onStarDateChange(event: string) {
    const startDate = moment(event);
    var futureMonth = moment(startDate,"DD-MM-YYYY").add(3, 'M');
    this.maxDate = new Date(futureMonth.year(),futureMonth.month(),futureMonth.date());
  }
}
