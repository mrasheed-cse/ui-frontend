export class RequisitionDetails {
    employeeDetails: EmployeeDetails;
    requisitionHeader: RequisitionHeader;
    requisitionLines: RequisitionLines[];

}

export class EmployeeDetails {
  employeeID: string;
  employeeName: string;
  mobileNo: string;
  designation: string;
  department: string;
  division: string;
  emailAddress: string;
}

export class RequisitionHeader{
    requisitionNo: string; 
    requisitionDt: string; 
    quantity: number; 
    requisitionType: string; 
    purposeCategory: string;
    testStartDt: string; 
    testCompletionDt: string; 
	usageCategory: string;
	location: string;
	notificationTo: string;	
}
export class RequisitionLines {
    product: string;
    creditLimit: number;
    quantity: number;
    instruction: string;
    imsiType: string;
    specialRequirement: string;
    assignCreditLimit: number;
    assignQuantity: number;
    deliverQuantity: number;
    actionType: string;
    
}
