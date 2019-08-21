

export class NewTestSimRequisition {
	requisitionDate: string;	
	requisitionType: string;
	purposeCategory: string;	
	location: string;
	usageCategory: string;	
	startDate: string;
	endDate: string;
	purposeDetails: string;	
	notificationTo: string;	
    requisitionLines: RequisitionLine[];
}

export class RequisitionLine {
    product: string;
	creditLimit: number;
	quantity: number;
	imsiType: string;
	specialRequirement: number;
	assignProduct: number;
	assignQuantity: number;
}
