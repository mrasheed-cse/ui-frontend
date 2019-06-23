import { Injectable } from '@angular/core';

@Injectable()
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
	readonly groupID_HOD: number = 13;
	readonly groupID_ADMIN: number = 14;
	//readonly groupID_VENDOR: number = 15;
	
	
	readonly wrid_NumberSeriesDefinition: number = 1;
	readonly wrid_NumberSeriesProvisioning: number = 2;
	readonly wrid_DeProvisioning: number = 3;
	readonly wrid_ReProvisioning: number = 4;
	readonly wrid_MnpReProvisioning: number = 5;
	readonly wrid_ApnCreation: number = 6;
	readonly wrid_DescProvisioning: number = 7;
	readonly wrid_NewSimRequision: number = 8;
	
	readonly wrid_FileUploadPath: string = '/app/nsa_files/';
	
	
}
