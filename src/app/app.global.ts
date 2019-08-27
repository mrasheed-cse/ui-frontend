import { Injectable } from '@angular/core';

@Injectable()
// DATA VALUES OF THIS CLASS MUST BE SYNCHED WITH DATABASE

export class AppGlobals {
    readonly groupID_Sourcing: number = 2;
    readonly groupID_CNP: number = 3;
	readonly groupID_BSS_Planning: number = 4;
    readonly groupID_VDSO: number = 5;
	readonly groupID_Wipro_Billing: number = 6;
    readonly groupID_RAFM: number = 7;
	readonly groupID_CIM: number = 8;
	readonly groupID_OSS: number = 9;

	readonly groupID_SSM: number = 10;
	readonly groupID_CLC: number = 11;
    readonly groupID_GENERAL: number = 12;
	readonly groupID_HOD: number = 100;
	readonly groupID_ADMIN: number = 14;
	//readonly groupID_VENDOR: number = 15;


	/*readonly groupID_SSM: number = 12;
	readonly groupID_CLC: number = 13;
    readonly groupID_GENERAL: number = 10;
	readonly groupID_HOD: number = 100;
	readonly groupID_ADMIN: number = 11;*/



	readonly wrid_NumberSeriesDefinition: number = 1;
	readonly wrid_NumberSeriesProvisioning: number = 2;
	readonly wrid_DeProvisioning: number = 3;
	readonly wrid_ReProvisioning: number = 4;
	readonly wrid_MnpReProvisioning: number = 5;
	readonly wrid_ApnCreation: number = 6;
	readonly wrid_DescProvisioning: number = 7;
	readonly wrid_NewSimRequision: number = 8;
	readonly wrid_NewSimActivation: number = 9;
	readonly wrid_testSimTimeLimitExtension: number = 10;
	readonly wrid_testSimCreditLimitExtension: number = 11;
	readonly wrid_testSimRecharge: number = 12;
	readonly wrid_testSimSurrender: number = 13;
	readonly wrid_testSimDamaged: number = 14;
	readonly wrid_testSimLost: number = 15;
	readonly wrid_testSimTransfer: number = 16;
	readonly wrid_NewSimDeactivation: number = 17;

	readonly masterData_RequisitionType = 1;
	readonly masterData_UsageCategory = 2;
	readonly masterData_Location = 3;
	readonly masterData_PurposeType = 4;
	readonly masterData_ProductType = 5;
	readonly masterData_ProductName = 6;
	readonly masterData_ImsiType = 7;



	readonly wrid_FileUploadPath: string = '/app/nsa_files/';

	//for test purpose
	dataTemp = [
		{
		  id: 1,
		  requisitionNo: "test",
		  requisitionDt:  "test",
		  quantity: "test",
		  requisitionType:  "test",
		  purposeCategory:  "test",
		  testStartDt:  "test",
		  testCompletionDt:  "test",
		  usageCategory:  "test",
		  nextHop:  "1",
		  wrfStatus:  "test"
		},
		{
			id: 2,
			requisitionNo: "test",
			requisitionDt:  "test",
			quantity: "test",
			requisitionType:  "test",
			purposeCategory:  "test",
			testStartDt:  "test",
			testCompletionDt:  "test",
			usageCategory:  "test",
			nextHop:  "2",
			wrfStatus:  "test"
		},
		{
			id: 3,
			requisitionNo: "test",
			requisitionDt:  "test",
			quantity: "test",
			requisitionType:  "test",
			purposeCategory:  "test",
			testStartDt:  "test",
			testCompletionDt:  "test",
			usageCategory:  "test",
			nextHop:  "4",
			wrfStatus:  "test"
		},
		{
			id: 4,
			requisitionNo: "test",
			requisitionDt:  "test",
			quantity: "test",
			requisitionType:  "test",
			purposeCategory:  "test",
			testStartDt:  "test",
			testCompletionDt:  "test",
			usageCategory:  "test",
			nextHop:  "3",
			wrfStatus:  "test"
		}

	]

	/*dataTempForLogin = {
		usersName : "general",
    	emailAddress : "gen@wipro.com",
    	usersGroupName : "general",
    	usersGroupId : 12,
    	remarks : "n/a"
	}*/

	dataTempForLogin = {
		usersName : "ssm",
    	emailAddress : "ssm@wipro.com",
    	usersGroupName : "SSM",
    	usersGroupId : 10,
    	remarks : "n/a"
	}

	/*dataTempForLogin = {
		usersName : "hod",
    	emailAddress : "hod@wipro.com",
    	usersGroupName : "HOD",
    	usersGroupId : 13,
    	remarks : "n/a"
	}*/

	/*dataTempForLogin = {
		usersName : "clc",
    	emailAddress : "clc@wipro.com",
    	usersGroupName : "CLC",
    	usersGroupId : 11,
    	remarks : "n/a"
	}*/

	dataTempForRequisitionDetail = {
		employeeDetails : {
			employeeID : "test",
			mobileNo : "",
			employeeName : "",
			designation : "",
			department : "test",
			division : "",
			emailAddress : ""
		},
		requisitionDetails : {
			requisitionNo : "",
			requisitionDate : "",
			requisitionType : "",
			purposeCategory : "",
			purposeDetails : "test",
			expectedStartDate : "",
			expectedEndDate : "",
			location : "",
			usageCategory : "",
			notificationTo : ""
		},
		requisitionLines : [
			{
				productName : "Bondhu",
				creditLimit : "2000",
				quantity : "10",
				instruction : "",
				imsiTypeName : "Normal",
				specialRequirement : "",
				assignedQuantity: "0",
				assignedLimit: "0"
			},
			{
				productName : "MyPlan",
				creditLimit : "5000",
				quantity : "50",
				instruction : "",
				imsiTypeName : "Normal",
				specialRequirement : "",
				assignedQuantity: "0",
				assignedLimit: "0"
			}
		]
	}


  dataTempForNewActRequest = [
		{
		  id: 1,
		  requisitionNo: "RQN-201808-1001",
		  deliveryStatus: "Delivered",
		  requisitionType:  "For Internal use"
		},
    {
		  id: 2,
		  requisitionNo: "RQN-201808-1002",
		  deliveryStatus: "Delivered",
		  requisitionType:  "For Internal use"
		},
    {
		  id: 3,
		  requisitionNo: "RQN-201808-1003",
		  deliveryStatus: "Delivered",
		  requisitionType:  "For Internal use"
		},
    {
		  id: 4,
		  requisitionNo: "RQN-201808-1004",
		  deliveryStatus: "Delivered",
		  requisitionType:  "For Internal use"
		}
	]

	dataTempForActRequestStatus = [
		{
		  id: 1,
		  requisitionNo: "RQN-201808-1001",
		  deliveryStatus: "Delivered",
		  requisitionType:  "For Internal use"
		},
    {
		  id: 2,
		  requisitionNo: "RQN-201808-1002",
		  deliveryStatus: "Delivered",
		  requisitionType:  "For Internal use"
		},
    {
		  id: 3,
		  requisitionNo: "RQN-201808-1003",
		  deliveryStatus: "Delivered",
		  requisitionType:  "For Internal use"
		},
    {
		  id: 4,
		  requisitionNo: "RQN-201808-1004",
		  deliveryStatus: "Delivered",
		  requisitionType:  "For Internal use"
		}
	]

	dataTempForNewActRequestDetails = {
		"requisitionDetails" : {
			requisitionNo: "RQN-201808-1001",
			requisitionType:  "For Internal use"
		},
		"msisdnDetails" : [
			{
			  id: 1,
			  msisdn: "1710823427",
			  sim: "890091311111",
			  simType:  "Prepaid",
			  simStatus:  "Inactive",
			  deliveryStatus:  "Delivered",
			  declarationStatus:  "Pending"		  			  			  			  
			},
			{
				id: 2,
				msisdn: "1710823428",
				sim: "890091311112",
				simType:  "Prepaid",
				simStatus:  "Inactive",
				deliveryStatus:  "Delivered",
				declarationStatus:  "Pending"		  			  			  			  
			  },
		]
	}	
	

	//// /////////////// ///////////////////// ///////

	dataTempForMySims = [
		{
		  id: 1,
		  msisdn: "1726838059",
		  requisitionNo: "RQN-201707-001",
		  requisitionType: "For internal use",
		  simStatus: "Active",
		  requisitionDate: "12 June 2017",
		  testStartDate: "15 June 2017",
		  testEndDate: "30 August 2019",
		  assignedCreditLimit: "30000"
		},
    	{
			id: 2,
			msisdn: "1746838060",
			requisitionNo: "RQN-201811-022",
			requisitionType: "For internal use",
			simStatus: "Active",
			requisitionDate: "20 November 2018",
			testStartDate: "15 December 2018",
			testEndDate: "15 December 2019",
			assignedCreditLimit: "1500"
		}
	]

}
