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
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { DefinitionDataService } from './services/definitiondata.service';
import { WorkflowsService } from './services/workflows.service';
import { FileoperationService } from './services/fileoperation.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

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

	
	myReProvisionSearchForm: FormGroup;
	
	productType: FormControl;
	productName: FormControl;
	HLR: FormControl;
	IMSI: FormControl;
	batchID: FormControl;
	
	formFieldData: string;
	

  public listIMSI = [];
  public listProductType = [];
  public listProduct = [];
  	public listHLR = [];
 
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
	
		
  this.listHLR = [{'id':1, 'name':'HLR1'}, {'id':2, 'name': 'HLR2'}, {'id':3, 'name': 'HLR3'}];
 
	
	
}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
	
  }

  createFormControls() {
    
	this.productType = new FormControl('');		
	this.productName= new FormControl('');
	this.HLR= new FormControl('');
	this.IMSI= new FormControl('');
	this.batchID = new FormControl('');
  }

  createForm() {
    this.myReProvisionSearchForm = new FormGroup({
		productType: this.productType,
		productName: this.productName,
		HLR: this.HLR,
		IMSI: this.IMSI,
		batchID: this.batchID
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
	
    console.log('Form Submitted!');
    console.log(this.myReProvisionSearchForm.value);
		this.successSearchShow = true;
		const productTypeVal = this.myReProvisionSearchForm.get('productType').value;
		const productNameVal =  this.myReProvisionSearchForm.get('productName').value;	
		const HLRVal = this.myReProvisionSearchForm.get('HLR').value;
		const IMSIVal = this.myReProvisionSearchForm.get('IMSI').value;
		const batchIDVal = this.myReProvisionSearchForm.get('batchID').value;
		this.workFlowsService.ReprovisonEligibilitySearch(productTypeVal,productNameVal,HLRVal,IMSIVal,batchIDVal);
	
  }
  }
  
  clearForm(event: any){
		//console.log(event);
		this.dangerAlertShow = false;
		this.successAlertShow = false;	
		this.myReProvisionSearchForm.reset();		
	}
  
  downloadCSVFiles() {
        var nameOfFileToDownload = "ReProvEligibile.csv";
		console.log("nameOfFileToDownload : "+nameOfFileToDownload);
  
        var result = this.fileoperationService.downloadCSV(nameOfFileToDownload);
		console.log(result);
        result.subscribe(
            data => {
				//saveAs(data, nameOfFileToDownload);
				
				console.log("ToTOOO");
				console.log(data);
                
				var blob = new Blob([data], { type: 'text/csv' });
 
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(blob, nameOfFileToDownload);
                } else {
                    var a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = nameOfFileToDownload;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
				
            },
            err => {
                alert("Server error while downloading file.");
            }
        );
    }

 
}
