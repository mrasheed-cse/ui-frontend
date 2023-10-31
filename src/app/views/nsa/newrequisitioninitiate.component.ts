import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
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

@Component({
  selector: 'app-newrequisitioninitiate',
  templateUrl: './newrequisitioninitiate.component.html',
  styles: ['./nsa_styles.css'],
  providers: [WorkflowsService,DefinitionDataService,IsmsworkflowsService,AppGlobals,LoginService]
})
export class NewrequisitioninitiateComponent implements OnInit {


	userData: any[] = [];
	userList1: any[] = [];
	lastkeydown1: number = 0;
	finalListOfUsersToSendWithRqn: Array<any>;

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

  public dangerAlertShow:boolean = false;
	public dangerAlertMessage:string = "";
	public successAlertShow:boolean = false;
	public successAlertMessage:string = "";
	public infoAlertShow:boolean = false;
	public infoAlertMessage:string = "";
	public isLoading:boolean = false;
	public defFlowFound:boolean = false;

	newSimRequisitionForm: FormGroup;
	purposeCategory: FormControl;


	location: FormControl;
	usageCategory: FormControl;
	startDate: FormControl;
	endDate: FormControl;
	purposeDetails: FormControl;
	notificationTo: FormControl;
	requisitionType: FormControl;
	requisitionDate: FormControl;
	requisitionLines: FormArray;

	formFieldData: string;

	public listRequisitionType = [];
	public listPurposeCategory = [];
	public listLocation = [];
	public listUsageCategory = [];
	public listProduct = [];
	public listImsiType = [];
	public listSpecialRequirement = [];

	todayDate: Date;


	headerDateData: any;


	/*keyDownHandler(event: Event) {
		console.log(event);
		if (event['which'] === 43 || event['which'] === 45)
			event.preventDefault();
	}*/

	getRequisitionType(){
		//GetRequisitionType
		this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_RequisitionType).subscribe(
		data => {
					//console.log(data);
					for (let index in data) {
						//console.log (data[index]);
						if (!data[index].ismsMasterDataDetailsName.includes("Scratch")) {
						  this.listRequisitionType.push(
							{
							  id:data[index].id,
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

	

	getPurposeCategory(){
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

				this.getLocation();
			},
			err => console.error(err),
			() => console.log('done loading Provisioning Type Name List')
			);
	}

	getLocation(){
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

						this.getUsageCategory();
					},
				err => console.error(err),
				() => console.log('done loading Provisioning Type Name List')
				);
	}

	getUsageCategory(){
		//GetUsageCategory

		this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_UsageCategory).subscribe(
			data => {
				//console.log(data);
				for (let index in data) {
					//console.log (data[index]);
					this.listUsageCategory.push(
					{
						id:data[index].id,
						ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
					}
					);
				}

				this.getProduct();
			},
		err => console.error(err),
		() => console.log('done loading usage category Name List')
		);
	}

	getProduct(){
		//GetProducts

		this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_ProductName).subscribe(
			data => {
				//console.log(data);
				for (let index in data) {
					//console.log (data[index]);
					this.listProduct.push(
					{
						id:data[index].id,
						ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
					}
					);
				}

				this.getUsersList();
			},
		err => console.error(err),
		() => console.log('done loading Product Name List')
		);
	}

	getUsersList(){
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

	getImsiType(){
		//GetIMSI Type

		this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_ImsiType).subscribe(
			data => {
				//console.log(data);
				for (let index in data) {
					//console.log (data[index]);
					this.listImsiType.push(
					{
						id:data[index].id,
						ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
					}
					);
				}

				this.isLoading = false;
				this.purposeCategory.setValue( this.listPurposeCategory[0]['id'] );
				this.location.setValue( this.listLocation[0]['id']);
				this.usageCategory.setValue( this.listUsageCategory[0]['id']);
				this.requisitionType.setValue( this.listRequisitionType[0]['id']);
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

	addRecipient(){

		if(this.notificationTo.value == null || this.notificationTo.value == undefined || this.notificationTo.value == "") return;

		for(var i = 0; i < this.userData.length; i++){
			if(this.userData[i]['userName'] == this.notificationTo.value){
				this.finalListOfUsersToSendWithRqn.push( this.userData[i] );
				break;
			}
		}

		this.notificationTo.setValue("");
	}

	deleteRecipient(listObj){
		for(var i = 0; i < this.finalListOfUsersToSendWithRqn.length; i++){
			if(this.finalListOfUsersToSendWithRqn[i]['userName'] == listObj['userName']){
				this.finalListOfUsersToSendWithRqn.splice( i, 1 );
				break;
			}
		}
	}

  constructor(private router: Router,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private definitionDataService: DefinitionDataService, private ismsworkflowsService: IsmsworkflowsService, private workFlowsService: WorkflowsService) {

			this.	headerDateData = {};

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
					this.employeeName = parsedString.userName;
					this.mobileNo = parsedString.mobileNumber;
					this.designation = parsedString.designation;
					this.department = parsedString.departmentName;
					this.division = parsedString.divisionName;
					this.emailAddress = parsedString.emailAddress;
					this.fullName = parsedString.fullName;
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
      } //end of constructor

      ngOnInit() {
				this.isLoading = true;
        this.createFormControls();
        this.createForm();
      }


      createFormControls() {
        this.purposeCategory = new FormControl('', Validators.required);
      this.location =	new FormControl({value: ''}, Validators.required);
      this.usageCategory = 	new FormControl({value: ''}, Validators.required);
      this.startDate =	new FormControl('', Validators.required);
      this.endDate = 	new FormControl('', Validators.required);
	  this.purposeDetails = new FormControl('',  [
      Validators.required,
      Validators.minLength(120) 
    ]);
	  this.notificationTo = new FormControl('');

      this.requisitionType = new FormControl({value: ''}, Validators.required);
			this.requisitionDate = new FormControl('');
			this.requisitionDate.setValue ( moment(new Date()).format('DD-MM-YYYY') );
      this.requisitionLines = new FormArray([
        //new FormControl(0)
        new FormGroup({
          product: new FormControl('', Validators.required),
          creditLimit: new FormControl(0),
          quantity: new FormControl(0),
          imsiType: new FormControl(''),
					specialRequirement: new FormControl('', Validators.required),
					specialRequirementOther: new FormControl(''),
          assignProduct: new FormControl(0),
          assignQuantity: new FormControl(0)
      })]);

      }

      createForm() {
        this.newSimRequisitionForm = new FormGroup({
					requisitionDate: this.requisitionDate,
					requisitionType: this.requisitionType,
        	purposeCategory: this.purposeCategory,
        	location: this.location,
        	usageCategory: this.usageCategory,
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
      return this.newSimRequisitionForm.get('requisitionLines') as FormArray;
    }


    addLine() {
      //this.RequisitionLines.push(new FormControl());

      this.RequisitionLines.push(new FormGroup(
        {
          product: new FormControl('', Validators.required),
          creditLimit: new FormControl(0),
          quantity: new FormControl(0),
          imsiType: new FormControl(''),
					specialRequirement: new FormControl('', Validators.required),
					specialRequirementOther: new FormControl(''),
          assignProduct: new FormControl(0),
          assignQuantity: new FormControl(0)
            }
      ));

    }
    deleteLine(index: number) {
      this.requisitionLines.removeAt(index);
		}

			formValidation(){
				let validationPassed : boolean;
				let validationMessage : any;
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

				if(this.startDate.value < currDate && diffDays >= 1){
					validationMessage = "Start date cannot be a date in the past";
					validationPassed = false;
				}
				else if(this.endDate.value < currDate ){
					validationMessage = "End date must be greater than current date.";
					validationPassed = false;
				}
				else if(this.endDate.value <= this.startDate.value ){
					validationMessage = "End date must be greater than start date";
					validationPassed = false;
				}
				else if(this.purposeDetails.value == null || this.purposeDetails.value == "" || this.purposeDetails.value == undefined || this.purposeDetails.value.length < 120 ){
					validationMessage = "Purpose details must contain a minimum of 120 characters";
					validationPassed = false;
				}

        console.log("new check");
        console.log(this.requisitionType.value);
        //validationPassed = false;

        if(this.requisitionType.value == 300){ //test sim

          console.log(this.endDate.value);

          var endDateAsDate = new Date(this.endDate.value);
          console.log(endDateAsDate);

          console.log(this.endDate.value.getTime());
          const diffTimeAlt = Math.abs(this.endDate.value.getTime() - this.startDate.value.getTime());
  				const diffDaysAlt = Math.floor(diffTimeAlt / (1000 * 60 * 60 * 24));

          console.log(diffTimeAlt);
          console.log(diffDaysAlt);

          if(diffDaysAlt > 365){
            alert("You cannot specify a test date period greater than 1 year");
            validationPassed = false;
          }
        }

				for(var i = 0; i < this.requisitionLines.length; i++){

					var creditLimit = 0;
					var quantity = 0;

					if(this.requisitionLines.controls[i]['value'] != null &&
					this.requisitionLines.controls[i]['value'] != undefined &&
					this.requisitionLines.controls[i]['value'] != "" &&
					this.requisitionLines.controls[i]['value']['creditLimit'] != null &&
					this.requisitionLines.controls[i]['value']['creditLimit'] != undefined &&
					this.requisitionLines.controls[i]['value']['creditLimit'] != ""){
						creditLimit = parseFloat(this.requisitionLines.controls[i]['value']['creditLimit']);
					}

					if(creditLimit >= 0) { /* do nothing */ }
					else{
						validationMessage = "For line "+ (i+1) +" invalid credit limit amount given.";
						validationPassed = false;
					}

					/////////// ///////////////// ///////////////// ////////////////

					if(this.requisitionLines.controls[i]['value'] != null &&
					this.requisitionLines.controls[i]['value'] != undefined &&
					this.requisitionLines.controls[i]['value'] != "" &&
					this.requisitionLines.controls[i]['value']['quantity'] != null &&
					this.requisitionLines.controls[i]['value']['quantity'] != undefined &&
					this.requisitionLines.controls[i]['value']['quantity'] != ""){
						quantity = parseInt(this.requisitionLines.controls[i]['value']['quantity']);
					}

					if(quantity > 0) { /* do nothing */ }
					else{
						validationMessage = "For line "+ (i+1) +" invalid quantity given.";
						validationPassed = false;
					}

				}

				if(!validationPassed){
					this.dangerAlertShow = true;
					this.dangerAlertMessage = validationMessage;
				}

				return validationPassed;
			}


      // FORM SUBMISSION
      onNewSimRequisitionSubmit() {

		//console.log("this.defFlowFound is "+this.defFlowFound);
      if (this.newSimRequisitionForm.valid) {

        /////////////////////////////////////////// //////////////////////////////////
            ///////////////////////// /////////////////////// //////////////////////////////////
            this.topFunction();
          this.isLoading = true;
            console.log('Form Submitted!');

            const theReqDate = this.FormatTheDate(new Date());
            const theStartDate = this.FormatTheDate(this.newSimRequisitionForm.get('startDate').value);
            const theEndDate = this.FormatTheDate(this.newSimRequisitionForm.get('endDate').value);

    				console.log("log start");
    				console.log(theReqDate);

    				if(!this.formValidation()) {
    					this.isLoading = false;
    					return;
    				}

            ////////////////////////////////////////////////////////////////////
            if(confirm("Are you sure you want to submit this requisition? Please review that all your data is correct.")){
              //do nothing here
            }
            else{
              this.isLoading = false;
              return;
            }
            ////////////////////////////////////////////////////////////////////

    				this.headerDateData.requisitionDate = theReqDate;
    				console.log(this.headerDateData);
    				this.headerDateData.theStartDate = theStartDate;
    				this.headerDateData.theEndDate = theEndDate;
    				this.headerDateData.requisitionType = this.newSimRequisitionForm.get('requisitionType').value;
    				this.headerDateData.purposeCategory = this.newSimRequisitionForm.get('purposeCategory').value;
    				this.headerDateData.location = this.newSimRequisitionForm.get('location').value;
    				this.headerDateData.usageCategory = this.newSimRequisitionForm.get('usageCategory').value;
    				this.headerDateData.startDate = this.newSimRequisitionForm.get('startDate').value;
    				this.headerDateData.endDate = this.newSimRequisitionForm.get('endDate').value;
    				this.headerDateData.purposeDetails = this.newSimRequisitionForm.get('purposeDetails').value;
					this.headerDateData.notificationTo = "";

					console.log("this.finalListOfUsersToSendWithRqn");
					console.log(this.finalListOfUsersToSendWithRqn);
					
					if(this.finalListOfUsersToSendWithRqn != null && this.finalListOfUsersToSendWithRqn.length > 0){
						for(var  i = 0; i < this.finalListOfUsersToSendWithRqn.length; i++){
							this.headerDateData.notificationTo += this.finalListOfUsersToSendWithRqn[i]['emailAddress'];
							if(i >= (this.finalListOfUsersToSendWithRqn.length - 1)){
								//do nothing
							}
							else this.headerDateData.notificationTo += ",";
						}
					}
console.log(this.headerDateData.notificationTo);
    				this.headerDateData.requisitionLines = this.newSimRequisitionForm.get('requisitionLines').value;

    				for(var i = 0; i < this.headerDateData.requisitionLines.length; i++){
    					if(this.headerDateData.requisitionLines[i]['imsiType'] == null ||
    						this.headerDateData.requisitionLines[i]['imsiType'] == undefined ||
    						this.headerDateData.requisitionLines[i]['imsiType'] == "")
    						{
    							this.headerDateData.requisitionLines[i]['imsiType'] = "0";
    						}
    				}

    				let resource = (this.headerDateData);
    				console.log(resource);
    				console.log('Add Button clicked: ' + resource);


    				this.ismsworkflowsService.CreateNewTestSimRequest(this._global.wrid_NewSimRequision, this.groupID,this.userID,this.WR_Name,resource).subscribe(
    					res  =>  {
    						console.log('response is : '+res.message);

    						if(res !== ""){
    							this.newSimRequisitionForm.reset();
								this.successAlertShow = true;
								/*if(this.groupID == this._global.groupID_SSM){
									this.successAlertMessage = "Requisition no "+ res.message +" has been submitted successfully and forwarded to CLC for approval.";
								}
								else{
								*/
									this.successAlertMessage = "Requisition no "+ res.message +" has been submitted successfully and forwarded to SSM for approval.";
								//}
    							alert(this.successAlertMessage);
    							setTimeout(()=>{
                    this.isLoading = false;
    								this.router.navigate(['nsa/newrequisitiondetails']);
    					 		}, 4000);
    						}
    							},
    							err  =>  {
    								this.isLoading = false;
    							console.log("err.status : "+err.status);
    							this.dangerAlertShow = true;
    						this.dangerAlertMessage = " .";
    							}

    							);

            /////////////////// //////////////// /////////////// ///////////////////////////////
        }
        ///////////////// //////////////////////////// ///////////////////////////////

    }


FormatTheDate(selectedrequisitionDate:any):string {

	console.log("selectedrequisitionDate : "+selectedrequisitionDate);
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

clearForm(event: any){
		window.location.reload();
	}
 backButton(event: any){
		//console.log(event);
		this.router.navigateByUrl('/nsa/newrequisition');
	}



}
