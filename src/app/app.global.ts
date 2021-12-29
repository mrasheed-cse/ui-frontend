import { Injectable } from '@angular/core';

@Injectable()
// DATA VALUES OF THIS CLASS MUST BE SYNCHED WITH DATABASE

export class AppGlobals {
    readonly groupID_Sourcing: number = 2;
    readonly groupID_CNP: number = 3;
	readonly groupID_BSS_Planning: number = 4;
    readonly groupID_VDSO: number = 5;
	readonly groupID_Wipro_Billing: number = 6;
	readonly groupID_Wipro_RAFM: number = 10;
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


	readonly simActionListPage_totalMarker = -1;
	readonly simActionListPage_approvedMarker = 1;
	readonly simActionListPage_rejectedMarker = 2;
	readonly simActionListPage_pendingMarker = 0;


	readonly wrid_FileUploadPath: string = '/app/nsa_files/';


	//agGrid_1 =

	agGrid_defaultColDef = {
		filter: "agTextColumnFilter"
	};

	agGrid_columnTypes = {
		numberColumn: {
		  width: 83,
		  filter: "agNumberColumnFilter"
		},
		medalColumn: {
		  width: 100,
		  columnGroupShow: "open",
		  filter: false
		},
		nonEditableColumn: { editable: false },
		dateColumn: {
		  filter: "agDateColumnFilter",
		  filterParams: {
			comparator: function(filterLocalDateAtMidnight, cellValue) {
			  var dateParts = cellValue.split("-");
			  var day = Number(dateParts[0]);
			  var month = Number(dateParts[1]) - 1;
			  var year = Number(dateParts[2]);
			  var cellDate = new Date(year, month, day);
			  if (cellDate < filterLocalDateAtMidnight) {
				return -1;
			  } else if (cellDate > filterLocalDateAtMidnight) {
				return 1;
			  } else {
				return 0;
			  }
			}
		  }
		}
	};

	defaultPageSize = 100;
	defaultPageSize2 = 10;

	listSimStatus = [
		{
			"id":"-1","name":"Search by SIM Status"
		},
        {
          "id":"0","name":"Inactive"
        },
        {
          "id":"1","name":"Active"
        },
        {
          "id":"2","name":"Deactive"
        },
        {
          "id":"3","name":"Requested for activation"
        }
	  ];

	  listSimStatusAlt = [
		{
          "id":"2","name":"Deactive"
        },
        {
          "id":"3","name":"Requested for activation"
        }
      ];

}
