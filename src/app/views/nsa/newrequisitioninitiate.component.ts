import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { DefinitionDataService } from './services/definitiondata.service';
import { IsmsworkflowsService } from './services/Ismsworkflows.service';
import { Observable } from 'rxjs/Observable';

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
  providers: [DefinitionDataService,IsmsworkflowsService,AppGlobals,LoginService]
})
export class NewrequisitioninitiateComponent implements OnInit {


	employeeID: string;
	employeeName: string;
  mobileNo: string;
  designation: string;
  department: string;
  division: string;
  emailAddress: string;

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

  

  constructor(private router: Router,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private definitionDataService: DefinitionDataService, private ismsworkflowsService: IsmsworkflowsService) {
		
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
				},
				err => console.error(err),
				() => console.log('done loading Emplpoyee Details')

			);

  //GetWR_Name
	this.definitionDataService.GetWR_Name(this._global.wrid_NewSimRequision).subscribe(
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
			},
		err => console.error(err),
		() => console.log('done loading usage category Name List')
		);

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
			},
		err => console.error(err),
		() => console.log('done loading Product Name List')
		);

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
			},
		err => console.error(err),
		() => console.log('done loading IMSI Type Name List')
		);

		//Get Today Date
		this.todayDate = new Date();      
      }
    
      ngOnInit() {
        this.createFormControls();
        this.createForm();	
      }
      
      
      createFormControls() {
        this.purposeCategory = new FormControl('', Validators.required);
      this.location =	new FormControl({value: ''}, Validators.required);
      this.usageCategory = 	new FormControl({value: ''}, Validators.required);	
      this.startDate =	new FormControl('');
      this.endDate = 	new FormControl('');
      this.purposeDetails = new FormControl('', Validators.required);
      
      this.notificationTo = 	new FormControl('', Validators.required);	
      
      this.requisitionType = new  FormControl('');
      this.requisitionDate = new FormControl('');
      this.requisitionLines = new FormArray([  
        //new FormControl(0)    
        new FormGroup({
          product: new FormControl('', Validators.required),
          creditLimit: new FormControl(0),
          quantity: new FormControl(0),
          imsiType: new FormControl('', Validators.required),
					specialRequirement: new FormControl(''),
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
          imsiType: new FormControl('', Validators.required),
					specialRequirement: new FormControl(''),
					specialRequirementOther: new FormControl(''),
          assignProduct: new FormControl(0),
          assignQuantity: new FormControl(0)
            }
      )); 
      
    }
    deleteLine(index: number) {
      this.requisitionLines.removeAt(index);
    }
    
    
      // FORM SUBMISSION
      onNewSimRequisitionSubmit() {
       //console.log("this.defFlowFound is "+this.defFlowFound);
      if (this.newSimRequisitionForm.valid) {
        this.topFunction();
      this.isLoading = true;
        console.log('Form Submitted!');
      
        const theReqDate = this.FormatTheDate(this.newSimRequisitionForm.get('requisitionDate').value);
        const theStartDate = this.FormatTheDate(this.newSimRequisitionForm.get('startDate').value);
        const theEndDate = this.FormatTheDate(this.newSimRequisitionForm.get('endDate').value);
		
				console.log("log start");
				console.log(theReqDate);

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
				this.headerDateData.notificationTo = this.newSimRequisitionForm.get('notificationTo').value;
				this.headerDateData.requisitionLines = this.newSimRequisitionForm.get('requisitionLines').value;
				   
    
				let resource = (this.headerDateData);
				console.log(resource);
/*
				let aNewTestSimRequisition:NewTestSimRequisition = new NewTestSimRequisition(); 
				aNewTestSimRequisition.requisitionDate = this.FormatTheDate(this.newSimRequisitionForm.get('requisitionDate').value);
				aNewTestSimRequisition.requisitionType = this.FormatTheDate(this.newSimRequisitionForm.get('requisitionType').value);
				aNewTestSimRequisition.purposeCategory = this.FormatTheDate(this.newSimRequisitionForm.get('purposeCategory').value);
				aNewTestSimRequisition.location = this.FormatTheDate(this.newSimRequisitionForm.get('location').value);
				aNewTestSimRequisition.usageCategory = this.FormatTheDate(this.newSimRequisitionForm.get('usageCategory').value);
				aNewTestSimRequisition.startDate = this.FormatTheDate(this.newSimRequisitionForm.get('startDate').value);
				aNewTestSimRequisition.endDate = this.FormatTheDate(this.newSimRequisitionForm.get('endDate').value);
				aNewTestSimRequisition.purposeDetails = this.FormatTheDate(this.newSimRequisitionForm.get('purposeDetails').value);
				aNewTestSimRequisition.notificationTo = this.FormatTheDate(this.newSimRequisitionForm.get('notificationTo').value);
				
				let requisitionLines:RequisitionLine[];
				// = new RequisitionLine(); 
				aRequisitionLine:RequisitionLine;

				//aNewTestSimRequisition.requisitionLines = this.newSimRequisitionForm.get('requisitionLines') as FormArray;
			*/	
				console.log('Add Button clicked: ' + resource);			
				
				
				this.ismsworkflowsService.CreateNewTestSimRequest(this._global.wrid_NewSimRequision, this.groupID,this.userID,this.WR_Name,resource).subscribe(
					res  =>  {
						console.log('response is : '+res.message);
				
						if(res !== ""){	
							this.isLoading = false;
							this.successAlertShow = true;
							this.successAlertMessage = " has been created successfully and forwarded to "+res.message+". ";
							alert(this.successAlertMessage);
							window.location.reload();
						}
							},
							err  =>  {	
								this.isLoading = false;	  
							console.log("err.status : "+err.status);		  
							this.dangerAlertShow = true;
						this.dangerAlertMessage = " .";
							}
						
							);
						}
    }


FormatTheDate(selectedrequisitionDate:any):string {
	
	console.log("selectedrequisitionDate : "+selectedrequisitionDate);	
	/*	var date = new Date(selectedrequisitionDate);
    var month = ("0" + (date.getMonth()+1)).slice(-2);
    var day  = ("0" + date.getDate()).slice(-2);
		var formattedDate=[day,month,date.getFullYear()].join("-");*/
		const date = moment(selectedrequisitionDate);
		console.log('jhhhhhhhhhhhhhhhhhhhhhhhhhh'+date);
		const formattedDate = moment(date).format('MM-DD-YYYY');
	  console.log("formattedDate : "+formattedDate);
  	return formattedDate;
	
}

clearForm(event: any){
		//console.log(event);
		this.dangerAlertShow = false;
		this.successAlertShow = false;	
		this.newSimRequisitionForm.reset();		
	}
 backButton(event: any){
		//console.log(event);
		this.router.navigateByUrl('/nsa/newrequisition');	
	}

      

}
