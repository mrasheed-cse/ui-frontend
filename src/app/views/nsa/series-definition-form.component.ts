import {
	NgModule,
	Component,
	Pipe,
	OnInit
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DefinitionDataService } from './services/definitiondata.service';
import { WorkflowsService } from './services/workflows.service';
import { FileoperationService } from './services/fileoperation.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser';


import { AppGlobals } from './../../app.global';
@Component({
	selector: 'app-series-definition-form',
	templateUrl: './series-definition-form.component.html',
	styles: [],
	providers: [DefinitionDataService, WorkflowsService, AppGlobals, LoginService, FileoperationService]
})
export class SeriesDefinitionFormComponent implements OnInit {


	WR_Name: string;
	serverUrl: string;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	userID: string;
	groupID: number;


	public dangerAlertShow: boolean = false;
	public dangerAlertMessage: string = "";
	public successAlertShow: boolean = false;
	public successAlertMessage: string = "";
	public isLoading: boolean = false;
	public infoAlertShow: boolean = false;
	public infoAlertMessage: string = "";
	public isDisableBtn: boolean = false;

	//NSA_disc_num -- file upload CR 
	isInitial: boolean = true;

	rowData = [];
	searchEnd: any;
	searchStart: any;
	searchFile: any;


	mySeriesDefinitionForm: FormGroup;
	startMSISDN: FormControl;
	endMSISDN: FormControl;
	discDefFile: FormControl;  // disc num CR -- file upload
	quantity: FormControl;
	IMSI: FormControl;
	productType: FormControl;
	productName: FormControl;
	serviceClassName: FormControl;
	communityID: FormControl;
	zone: FormControl;
	srcComment: FormControl;
	formFieldData: string;
	searchType: FormControl;


	selectedFile: File = null;  // disc num CR -- file upload
	fileName: string = "";

	public listIMSI = [];
	public listProductType = [];
	public listProduct = [];
	public listServiceClass = [];
	public listCommunityID = [];
	public listZone = [];



	//listZone = [{'id':1, 'name':'Dhaka'}, {'id':2, 'name': 'Ctd'}, {'id':3, 'name': 'Khulna'}];

	constructor(private router: Router, private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private definitionDataService: DefinitionDataService, private workFlowsService: WorkflowsService, private fileoperationService: FileoperationService) {


		// Get Current User Profile

		this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

		if (this.currentLoggedInUser) {
			this.userName = this.currentLoggedInUser.userName
			this.userID = this.currentLoggedInUser.userID
			this.groupID = this.currentLoggedInUser.groupID
			//console.log('Current user: ' + this.userName);

		}
		else {
			//console.log('Current user not found');
			this.router.navigate(['pages/login']);
		}

		//GetWR_Name
		this.definitionDataService.GetWR_Name(this._global.wrid_NumberSeriesDefinition).subscribe(
			data => {
				//console.log(data);
				const dataStr = JSON.stringify(data);

				JSON.parse(dataStr, (key, value) => {
					if (typeof value === 'string') {
						this.WR_Name = value;
						return value;
					}
				});
				// console.log(this.WR_Name);
			},
			err => console.error(err),
			() => console.log('done loading Work Request Name')
		);

		//GetAllIMSI
		this.definitionDataService.GetAllIMSI().subscribe(
			data => {
				//console.log(data);
				for (let index in data) {
					//console.log (data[index]);
					this.listIMSI.push(
						{
							id: data[index].id,
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
							id: data[index].id,
							productType_name: data[index].productTypeName
						}
					);
				}
				// return data;
			},
			err => console.error(err),
			() => console.log('done loading ProductTypes List')
		);

		//GetZoneNames
		this.definitionDataService.GetZoneNames().subscribe(
			data => {
				this.listZone = [];
				//console.log("this.listZone "+this.listZone.length);
				for (let index in data) {
					//console.log (data[index]);
					this.listZone.push(
						{
							id: data[index].id,
							name: data[index].zoneName
						}
					);
				}
				// return data;
			},
			err => console.error(err),
			() => console.log('done loading Zone List')
		);





	}

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		this.onMSISDNChanges();
	}

	createFormControls() {
		this.startMSISDN = new FormControl('', [
			//Validators.required,
			Validators.minLength(11),
			Validators.maxLength(11)
		]);
		this.endMSISDN = new FormControl('', [
			//Validators.required,
			Validators.minLength(11),
			Validators.maxLength(11)
		]);
		this.discDefFile = new FormControl('');
		this.productType = new FormControl('', [Validators.required]);
		this.quantity = new FormControl({ value: 0, disabled: true }, Validators.required);
		this.IMSI = new FormControl('', Validators.required);
		this.productName = new FormControl('', Validators.required);
		this.serviceClassName = new FormControl({ value: '', disabled: true }, Validators.required);
		this.communityID = new FormControl({ value: '', disabled: true }, Validators.required);
		this.zone = new FormControl('');
		this.srcComment = new FormControl('');
		this.searchType = new FormControl('', Validators.required);
	}

	createForm() {
		this.mySeriesDefinitionForm = new FormGroup({
			startMSISDN: this.startMSISDN,
			endMSISDN: this.endMSISDN,
			discDefFile: this.discDefFile,
			quantity: this.quantity,
			IMSI: this.IMSI,
			productType: this.productType,
			productName: this.productName,
			serviceClassName: this.serviceClassName,
			communityID: this.communityID,
			zone: this.zone,
			srcComment: this.srcComment,
			searchType: this.searchType

		});
	}

	onMSISDNChanges() {

		this.mySeriesDefinitionForm.get('startMSISDN').valueChanges
			.subscribe(selectedMSISDN => {
				const endMSISDNs = this.mySeriesDefinitionForm.get('endMSISDN').value;

				if (selectedMSISDN != null && selectedMSISDN.toString().length == 11 && endMSISDNs.toString().length == 11) {
					this.mySeriesDefinitionForm.get('quantity').setValue(1 + Number(endMSISDNs) - Number(selectedMSISDN));
					this.ChaeckDefinitionValidity(selectedMSISDN, endMSISDNs);
				}

			});

		this.mySeriesDefinitionForm.get('endMSISDN').valueChanges
			.subscribe(selectedMSISDN => {
				const startMSISDNs = this.mySeriesDefinitionForm.get('startMSISDN').value;

				if (selectedMSISDN != null && selectedMSISDN.toString().length == 11 && startMSISDNs.toString().length == 11) {
					this.mySeriesDefinitionForm.get('quantity').setValue(1 + Number(selectedMSISDN) - Number(startMSISDNs));
					this.ChaeckDefinitionValidity(startMSISDNs, selectedMSISDN);
				}
			});
	}

	ChaeckDefinitionValidity(startMSISDNs, endMSISDNs) {


		const totalMsisdn = (Number(endMSISDNs) - Number(startMSISDNs));

		if (totalMsisdn > 100000) {
			this.infoAlertShow = true;

			this.infoAlertMessage = "More than 100K numbers.";

		}
		else if (totalMsisdn >= 0) {
			console.log("Start for ChaeckDefinitionValidity");
			this.isLoading = true;
			this.definitionDataService.CheckValidityDefinitionWorkRequest(startMSISDNs, endMSISDNs).subscribe(
				data => {
					console.log(data);

					if (data == true) {

						this.infoAlertShow = false;

					}

					else {

						this.infoAlertShow = true;

						this.infoAlertMessage = "All or some numbers from " + startMSISDNs + " and " + endMSISDNs + " already have Definition Work Request";

					}
					this.isLoading = false;

				},
				err => {
					console.error(err);
					this.infoAlertShow = true;
					this.isLoading = false;
					this.infoAlertMessage = "All or some numbers from " + startMSISDNs + " and " + endMSISDNs + " already have Definition Work Request";

				},
				() => console.log('Done ChaeckDefinitionValidity')
			);
		}

	}



	// event handler for the select element's change event
	onProductNameSelects(event: any) {

		// update the ui
		const selectedProductID = event.target.value;
		// const selectedProductName = event.target.name;
		//console.log(selectedProductID);
		this.mySeriesDefinitionForm.get('serviceClassName').setValue(this.listServiceClass[selectedProductID]);
		this.mySeriesDefinitionForm.get('communityID').setValue(this.listCommunityID[selectedProductID]);
	}


	// event handler for the select element's change event
	onProductTypeSelect(event: any) {

		// update the ui
		const selectedProductTypeID: number = event.target.value;

		this.definitionDataService.GetProducts(selectedProductTypeID).subscribe(
			data => {
				this.listCommunityID = [];
				this.listServiceClass = [];
				this.listProduct = [];
				this.mySeriesDefinitionForm.get('serviceClassName').setValue('');
				this.mySeriesDefinitionForm.get('communityID').setValue('');

				//console.log ("this.listCommunityID.length "+this.listCommunityID.length);
				//console.log ("this.listServiceClass.length "+this.listServiceClass.length);

				for (let index in data) {
					//console.log (data[index]);
					this.listProduct.push(
						{
							id: data[index].id,
							productName: data[index].productName
						}

					);
					this.listCommunityID[data[index].id] = data[index].communityID;
					this.listServiceClass[data[index].id] = data[index].serviceClass.serviceClassName;
				}
				// return data;
			},
			err => console.error(err),
			() => console.log('done loading Product List based on ProductTypes')
		);
	}

	topFunction() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}

	// FORM SUBMISSION
	onSeriesProvisionSubmit() {
		console.log("submit start")
		console.log("valid" + this.mySeriesDefinitionForm.valid);
		if (this.mySeriesDefinitionForm.valid && !this.isDisableBtn) {
			this.topFunction();
			this.isLoading = true;
			this.isDisableBtn = true;
			if (this.searchType.value === "discrete") {
				this.formFieldData = this.workFlowsService.FormatWorkRequestNameForAPI(this.WR_Name);
				this.fileName = this.formFieldData;
				const fd = new FormData();
				fd.append('nsa-file', this.selectedFile, this.fileName + ".csv");
				var result = this.fileoperationService.uploadCSV(fd);
				result.subscribe(res => { console.log(res); this.submittoAPI() });
			}
			else {
				this.submittoAPI();
			}
		}
	}

	submittoAPI() {
		console.log("submit to API")
		this.formFieldData = this.workFlowsService.FormatWorkRequestNameForAPI(this.WR_Name);
		this.LogKeyValuePairs(this.mySeriesDefinitionForm);
		this.workFlowsService.CreateNewWorkRequest(this._global.wrid_NumberSeriesDefinition, this.groupID, this.userID, this.formFieldData).subscribe(
			res => {
				if (res !== "") {
					this.successAlertShow = true;
					this.successAlertMessage = " has been created successfully and forwarded to " + res.message;
					this.isLoading = false;
				}
			},
			err => {
				console.log("err.status : " + err.status);
				this.dangerAlertShow = true;
				this.dangerAlertMessage = " ." + err.error.message;
				this.isLoading = false;
			}

		);
	}

	LogKeyValuePairs(group: FormGroup): void {

		// Loop through each control key in the FormGroup
		Object.keys(group.controls).forEach((key: string) => {
			// Get the control. The control can be a nested form group
			const abstractControl = group.get(key);
			// If the control is nested form group, recursively call
			// this same method (logKeyValuePairs) passing it
			// the FormGroup so we can get to the form controls in it
			if (abstractControl instanceof FormGroup) {
				this.LogKeyValuePairs(abstractControl);
				// If the control is a FormControl
			} else {

				console.log("Key : " + key + " , Value : " + abstractControl.value);
				if (this.formFieldData) {

					if (key == 'discDefFile') {
						this.formFieldData = this.formFieldData + "," + this.fileName + ".csv";
					}
					else this.formFieldData = this.formFieldData + "," + abstractControl.value;
				}
				else {
					//this.mySeriesDefinitionForm.get(key).setValue("TOTOTOTO");
					//console.log("Key : "+key+" , Value : "+abstractControl.value);
					this.formFieldData = abstractControl.value;
				}

			}
		});
	}
	onFileChange(event) {
		this.isLoading = true;
		this.selectedFile = <File>event.target.files[0];
		this.formFieldData = this.workFlowsService.FormatWorkRequestNameForAPI(this.WR_Name);
		this.fileName = this.formFieldData;
		const fd = new FormData();
		fd.append('nsa-file', this.selectedFile, this.fileName + ".csv");
		var result = this.fileoperationService.uploadCSV(fd);
		result.subscribe(
			res => {
				let index = res.message.lastIndexOf(":");
				let file = res.message.substring(index);
				this.workFlowsService.checkFileValidity(this.fileName + ".csv").subscribe(
					response => {
						console.log(response);
						if (response.message === "Valid") {
							this.infoAlertShow = false;
							this.isLoading = false;
						}
						else {
							this.infoAlertShow = true;
							this.infoAlertMessage = "All or some numbers in " + this.selectedFile.name + " already have Definition Work Request";
							this.isLoading = false;
						}
					});
			}
		);
	}

	clearForm(event: any) {
		//console.log(event);
		this.dangerAlertShow = false;
		this.successAlertShow = false;
		this.mySeriesDefinitionForm.reset();
	}
	backButton(event: any) {
		//console.log(event);
		this.router.navigateByUrl('/nsa/seriesprovision');
	}
}
