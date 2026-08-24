import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {ReactiveFormsModule, UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { DefinitionDataService } from './services/definitiondata.service';
import { WorkflowsService } from './services/workflows.service';
import { FileoperationService } from './services/fileoperation.service';






import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser';


import { AppGlobals } from './../../app.global';


@Component({
  selector: 'app-reprovisionsearch',
  templateUrl: './reprovisionsearch.component.html',
  styles: [],
  providers: [DefinitionDataService,WorkflowsService,AppGlobals,LoginService,FileoperationService]
})
export class ReprovisionsearchComponent implements OnInit {


	serverUrl: string;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;

	public dangerAlertShow:boolean = false;
	public dangerAlertMessage:string = "";
	public successAlertShow:boolean = false;
	public successAlertMessage:string = "";
	public successSearchShow:boolean = false;
	public isLoading:boolean = false;


	myReProvisionSearchForm: UntypedFormGroup;

	productType: UntypedFormControl;
	productName: UntypedFormControl;
	HLR: UntypedFormControl;
	IMSI: UntypedFormControl;
	batchID: UntypedFormControl;
	deProvWrname: UntypedFormControl
	formFieldData: string;


  public listIMSI = [];
  public listProductType = [];
  public listProduct = [];
  	public listHLR = [];
  		
  dropdownSettings = {};
  	

  constructor(private router: Router,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private definitionDataService: DefinitionDataService, private workFlowsService: WorkflowsService, private fileoperationService: FileoperationService) {

	// Get Current User Profile

	this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

	if (this.currentLoggedInUser) {
		this.userName = this.currentLoggedInUser.userName
		this.groupID = this.currentLoggedInUser.groupID
		//console.log('Current user: ' + this.userName);

	}
	else {
	  //console.log('Current user not found');
	  this.router.navigate(['pages/login']);
	}



	//GetAllIMSI
	this.definitionDataService.GetAllIMSI().subscribe(
	data => {
				//console.log(data);
				for (let index in data) {
					//console.log (data[index]);
					this.listIMSI.push(
					{
						id:data[index].id,
						group_name: data[index].groupName
					}
					);
				}
			},
    err => console.error(err),
    () => console.log('done loading IMSI List')
    );

	//GetProductTypes
	this.definitionDataService.GetProductTypes().subscribe(
	data => {
				this.listProductType = [];
				//console.log("this.listProductType "+this.listProductType.length);
				for (let index in data) {
				//console.log (data[index]);
				this.listProductType.push(
					{
						id:data[index].id,
						productType_name: data[index].productTypeName
					}
					);
				}
		// return data;
			},
		err => console.error(err),
		() => console.log('done loading ProductTypes List')
    );


  //this.listHLR = [{'id':1, 'name':'HLR1'}, {'id':2, 'name': 'HLR2'}, {'id':3, 'name': 'HLR3'}];
  this.definitionDataService.GetHLRNames().subscribe(
		data => {
					this.listHLR = [];
					//console.log("this.listHLR "+this.listHLR.length);
					for (let index in data) {
					//console.log (data[index]);
					this.listHLR.push(
						{
							id:data[index].id,
							name: data[index].hlrName
						}
						);
					}
					//this.listHLR = this.listIMSI;
			// return data;
				},
			err => console.error(err),
			() => console.log('done loading HLR List')
			);

  
  this.isLoading = false;
  this.dropdownSettings = {
		singleSelection: false,
		idField: 'id',
		textField: 'name',
		selectAllText: 'Select All',
		unSelectAllText: 'UnSelect All',
		itemsShowLimit: 0,
		allowSearchFilter: true
	};
	
  


}

  ngOnInit() {
    this.createFormControls();
    this.createForm();

  }

  createFormControls() {

	this.productType = new UntypedFormControl('');
	this.productName= new UntypedFormControl('');
	this.HLR= new UntypedFormControl('');
	this.IMSI= new UntypedFormControl('');
	this.batchID = new UntypedFormControl('');
	this.deProvWrname = new UntypedFormControl('')
  }

  createForm() {
    this.myReProvisionSearchForm = new UntypedFormGroup({
		productType: this.productType,
		productName: this.productName,
		HLR: this.HLR,
		IMSI: this.IMSI,
		batchID: this.batchID,
		deProvWrname: this.deProvWrname
    });
  }
  onProductTypeSelect (event: any) {

    // update the ui
	const selectedProductTypeID: number = event.target.value;

	this.definitionDataService.GetProducts(selectedProductTypeID).subscribe(
		data => {

				this.listProduct = [];

				for (let index in data) {
					//console.log (data[index]);
					this.listProduct.push(
					{
						id:data[index].id,
						productName: data[index].productName
					}

					);

				}
		// return data;
			},
		err => console.error(err),
		() => console.log('done loading Product List based on ProductTypes')
    );
  }

  // FORM SUBMISSION
  onReProvisionSearchSubmit() {

  if (this.myReProvisionSearchForm.valid) {


    console.log('Form Submitted for ReProvisionSearchSubmit!');
    //console.log(this.myReProvisionSearchForm.value);

		const productTypeVal = this.myReProvisionSearchForm.get('productType').value;
		const productNameVal =  this.myReProvisionSearchForm.get('productName').value;
		const HLRVal = this.myReProvisionSearchForm.get('HLR').value;
		const IMSIVal = this.myReProvisionSearchForm.get('IMSI').value;
		const batchIDVal = this.myReProvisionSearchForm.get('batchID').value;
		const deProvWrnameVal = this.workFlowsService.FormatWorkRequestNameForAPI(this.myReProvisionSearchForm.get('deProvWrname').value);
    this.isLoading = true;
		this.workFlowsService.ReprovisonEligibilitySearch(productTypeVal,productNameVal,HLRVal,IMSIVal,batchIDVal,deProvWrnameVal).subscribe(
			data => {
				//	console.log(data);
				this.isLoading = false;
					this.successSearchShow = true;

				},
			err => console.error(err),
			() => console.log('done ReprovisonEligibilitySearch')
			);
			//this.isLoading = false;
  }
  }

  clearForm(event: any){
		//console.log(event);
		this.dangerAlertShow = false;
		this.successAlertShow = false;
		this.myReProvisionSearchForm.reset();
	}

  downloadCSVFiles() {
		this.isLoading = true;
        var nameOfFileToDownload = "ReProvEligibile.csv";
		console.log("nameOfFileToDownload : "+nameOfFileToDownload);

        var result = this.fileoperationService.downloadCSV(nameOfFileToDownload);
		//console.log(result);
        result.subscribe(
            data => {
				//saveAs(data, nameOfFileToDownload);

				//console.log("ToTOOO");
				//console.log(data);

				var blob = new Blob([data as any], { type: 'text/csv' });

                if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
                    (window.navigator as any).msSaveOrOpenBlob(blob, nameOfFileToDownload);
                } else {
                    var a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = nameOfFileToDownload;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
								this.isLoading = false;
            },
            err => {
                alert("Server error while downloading file.");
            }
        );
    }


}
