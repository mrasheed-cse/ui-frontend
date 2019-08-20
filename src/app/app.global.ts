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

	/*readonly groupID_SSM: number = 10;
	readonly groupID_CLC: number = 11;
    readonly groupID_GENERAL: number = 12;
	readonly groupID_HOD: number = 100;
	readonly groupID_ADMIN: number = 14;*/
	//readonly groupID_VENDOR: number = 15;


	readonly groupID_SSM: number = 12;
	readonly groupID_CLC: number = 13;
    readonly groupID_GENERAL: number = 10;
	readonly groupID_HOD: number = 100;
	readonly groupID_ADMIN: number = 11;

	
	
	readonly wrid_NumberSeriesDefinition: number = 1;
	readonly wrid_NumberSeriesProvisioning: number = 2;
	readonly wrid_DeProvisioning: number = 3;
	readonly wrid_ReProvisioning: number = 4;
	readonly wrid_MnpReProvisioning: number = 5;
	readonly wrid_ApnCreation: number = 6;
	readonly wrid_DescProvisioning: number = 7;
	readonly wrid_NewSimRequision: number = 8;

	
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
	
}



	

