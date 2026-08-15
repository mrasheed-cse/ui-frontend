import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { DefinitionDataService } from './services/definitiondata.service';
import { WorkflowsService } from './services/workflows.service';
import { FileoperationService } from './services/fileoperation.service';






import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser';


import { AppGlobals } from './../../app.global';

@Component({
  selector: 'app-mnpre-provision-form',
  templateUrl: './mnpre-provision-form.component.html',
  styles: ['./demo.component.css'],
  providers: [DefinitionDataService,WorkflowsService,AppGlobals,LoginService,FileoperationService]
})
export class MnpreProvisionFormComponent implements OnInit {

	WR_Name: string;
	serverUrl: string;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	userID: string;
	groupID: number;


	public dangerAlertShow:boolean = false;
	public dangerAlertMessage:string = "";
	public successAlertShow:boolean = false;
	public successAlertMessage:string = "";
	public isLoading:boolean = false;
  public isDisableBtn:boolean = false;



	myMNPReProvisionForm: FormGroup;
	reProvisionFile: FormControl;
	quantity: FormControl;
	startICCID: FormControl;
	startICCID19: FormControl;
	endICCID: FormControl;
	startIMSI: FormControl;
	endIMSI: FormControl;
	productType: FormControl;
	productName: FormControl;
	serviceClassName: FormControl;
	communityID: FormControl;
	zone: FormControl;
	simType: FormControl;
	needByDate: FormControl;
	srcComment: FormControl;
	formFieldData: string;

	selectedFile: File = null;
	fileName: string = "";

	todayDate: Date;


  public listSimType = [];
  public listProductType = [];
  public listProduct = [];
  public listServiceClass = [];
  public listCommunityID = [];
  public listZone = [];

  //listZone = [{'id':1, 'name':'Dhaka'}, {'id':2, 'name': 'Ctd'}, {'id':3, 'name': 'Khulna'}];


constructor(private router: Router,private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private definitionDataService: DefinitionDataService, private workFlowsService: WorkflowsService, private fileoperationService: FileoperationService) {

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
	this.definitionDataService.GetWR_Name(this._global.wrid_MnpReProvisioning).subscribe(
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
		()=> console.log('done loading Work Request Name')
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

	//GetZoneNames
	this.definitionDataService.GetZoneNames().subscribe(
	data => {
				this.listZone = [];
				//console.log("this.listZone "+this.listZone.length);
				for (let index in data) {
				//console.log (data[index]);
				this.listZone.push(
					{
						id:data[index].id,
						name: data[index].zoneName
					}
					);
				}
		// return data;
			},
		err => console.error(err),
		() => console.log('done loading Zone List')
		);
	//GetSimType
	this.definitionDataService.GetSimTypes().subscribe(
		data => {
					//console.log(data);
					for (let index in data) {
						//console.log (data[index]);
						this.listSimType.push(
						{
							id:data[index].id,
							simTypeName: data[index].simTypeName
						}
						);
					}
				},
			err => console.error(err),
			() => console.log('done loading Provisioning Type Name List')
			);
		//Get Today Date
		this.todayDate = new Date();

}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
	this.onStartICCIDChanges();
	}

	datepickerConfig: Partial<BsDatepickerConfig>;

  createFormControls() {
    this.reProvisionFile = new FormControl('', Validators.required);
	this.quantity =	new FormControl('');
	this.startICCID = new FormControl('', [
		Validators.required,
		Validators.minLength(18) ,
		Validators.maxLength(18)
	]);
	this.startICCID19 = 	new FormControl({value: '', disabled: true}, Validators.required);
	this.endICCID = 	new FormControl({value: '', disabled: true}, Validators.required);
	this.startIMSI = 	new FormControl({value: '', disabled: true}, Validators.required);
	this.endIMSI = 	new FormControl({value: '', disabled: true}, Validators.required);
	this.productType = new FormControl('', [Validators.required]);
	this.productName= new FormControl('', Validators.required);
	this.serviceClassName=	new FormControl({value: '', disabled: true}, Validators.required);
	this.communityID= 	new FormControl({value: '', disabled: true}, Validators.required);
	this.zone= new FormControl('');
	this.simType = new  FormControl('');
	this.needByDate = new FormControl('');
	this.srcComment= new FormControl('');
  }

  createForm() {
    this.myMNPReProvisionForm = new FormGroup({
		reProvisionFile: this.reProvisionFile,
		quantity: this.quantity,
		startICCID: this.startICCID,
		startICCID19: this.startICCID19,
		endICCID: this.endICCID,
		startIMSI: this.startIMSI,
		endIMSI: this.endIMSI,
		productType: this.productType,
		productName: this.productName,
		serviceClassName: this.serviceClassName,
		communityID: this.communityID,
		zone: this.zone,
		simType: this.simType,
		needByDate: this.needByDate,
		srcComment: this.srcComment

    });
  }

 // event handler for the select element's change event
    onProductNameSelects (event: any) {

    // update the ui
	const selectedProductID = event.target.value;
	// const selectedProductName = event.target.name;
	//console.log(selectedProductID);
	this.myMNPReProvisionForm.get('serviceClassName').setValue(this.listServiceClass[selectedProductID]);
	this.myMNPReProvisionForm.get('communityID').setValue(this.listCommunityID[selectedProductID]);
  }


// event handler for the select element's change event
  onProductTypeSelect (event: any) {

    // update the ui
	const selectedProductTypeID: number = event.target.value;

	this.definitionDataService.GetProducts(selectedProductTypeID).subscribe(
		data => {
				this.listCommunityID = [];
				this.listServiceClass = [];
				this.listProduct = [];
				this.myMNPReProvisionForm.get('serviceClassName').setValue('');
				this.myMNPReProvisionForm.get('communityID').setValue('');

				//console.log ("this.listCommunityID.length "+this.listCommunityID.length);
				//console.log ("this.listServiceClass.length "+this.listServiceClass.length);

				for (let index in data) {
					//console.log (data[index]);
					this.listProduct.push(
					{
						id:data[index].id,
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


onStartICCIDChanges() {

	var lastDigit: string;

    this.myMNPReProvisionForm.get('startICCID').valueChanges
    .subscribe(selectedStartICCID => {
			lastDigit = this.definitionDataService.LuhnAlgorithmFor19thDigit(selectedStartICCID);


			var startICCIDval = selectedStartICCID +lastDigit;
			var totalQuantity = this.myMNPReProvisionForm.get('quantity').value;

			var endICCIDval = this.definitionDataService.LongNumberAddition(startICCIDval,totalQuantity+"");

			var startIMSIval = '47001'+selectedStartICCID.substr(8,10);
			var endIMSIval = this.definitionDataService.LongNumberAddition(startIMSIval,totalQuantity+"");

			this.myMNPReProvisionForm.get('startICCID19').setValue(startICCIDval);
			this.myMNPReProvisionForm.get('endICCID').setValue(endICCIDval);

			this.myMNPReProvisionForm.get('startIMSI').setValue(startIMSIval);
			this.myMNPReProvisionForm.get('endIMSI').setValue(endIMSIval);
			 });


}

topFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

  // FORM SUBMISSION
  onMNPReProvisionSubmit() {

  if (this.myMNPReProvisionForm.valid && !this.isDisableBtn) {
	  this.topFunction();
	this.isLoading = true;
	this.isDisableBtn = true;
    console.log('Form Submitted!');
    console.log(this.myMNPReProvisionForm.value);




  this.formFieldData = this.workFlowsService.FormatWorkRequestNameForAPI(this.WR_Name);
  this.fileName = this.formFieldData;
  console.log(this.formFieldData);
  const fd = new FormData();
  fd.append('nsa-file',this.selectedFile,this.fileName+".csv");// File Name will be the WR_Name in server
  console.log(this.selectedFile.name);

  this.LogKeyValuePairs(this.myMNPReProvisionForm);
  console.log(this.formFieldData);

  var result = this.fileoperationService.uploadCSV(fd);
		//console.log(result);
        result
		.subscribe(res => {
			//console.log(res);
		});


  this.workFlowsService.CreateNewWorkRequest(this._global.wrid_MnpReProvisioning, this.groupID,this.userID,this.formFieldData).subscribe(
      res  =>  {
				console.log('response is : '+res.message);

				if(res !== ""){
					this.isLoading = false;
					this.successAlertShow = true;
					this.successAlertMessage = " has been created successfully and forwarded to "+res.message+". ";
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

      console.log("Key : "+key+" , Value : "+abstractControl.value);

	  if (this.formFieldData){
		  if (key == 'needByDate'){
			  this.formFieldData=this.formFieldData+","+this.FormatTheDate(abstractControl.value);
		  }
		  else if (key == 'reProvisionFile'){
			  this.formFieldData=this.formFieldData+","+this._global.wrid_FileUploadPath+this.fileName+".csv";
		  }
		  else
			this.formFieldData=this.formFieldData+","+abstractControl.value;
	  }
		else {
			//this.myMNPReProvisionForm.get(key).setValue("TOTOTOTO");
			//console.log("Key : "+key+" , Value : "+abstractControl.value);
			this.formFieldData=abstractControl.value;
		}

    }
  });
}

FormatTheDate(selectedNeedByDate:any):string {

	console.log("selectedNeedByDate : "+selectedNeedByDate);
		var date = new Date(selectedNeedByDate);
    var month = ("0" + (date.getMonth()+1)).slice(-2);
    var day  = ("0" + date.getDate()).slice(-2);
    var formattedDate=[day,month,date.getFullYear()].join("/");
	console.log("formattedDate : "+formattedDate);
	return formattedDate;

}
onFileChange(event) {
    this.selectedFile = <File>event.target.files[0];
  }

clearForm(event: any){
		//console.log(event);
		this.dangerAlertShow = false;
		this.successAlertShow = false;
		this.myMNPReProvisionForm.reset();
	}
 backButton(event: any){
		//console.log(event);
		this.router.navigateByUrl('/nsa/mnpreprovisionsearch');
	}

}
