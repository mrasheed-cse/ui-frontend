import {Component, OnInit,} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppGlobals} from './../../../app.global';
import {LoginService} from '../../pages/LoginService';
import {LoggedInUser} from '../../pages/loggedInUser';
import {DatePipe} from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

import {ReportService} from'./report.service';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import{PlanManagementService } from '../../SSM/SimCardPlan Management/plan_management.service';

import { SSMService } from '../../SSM/SSM.service';
@Component({
    selector: 'app-voucherGen',
    templateUrl: './stockreport.component.html',
    styleUrls: ['../search_po.component.scss'],
    providers: [AppGlobals,SSMService, LoginService, DatePipe, ReportService,PlanManagementService],
})
export class StockReport implements OnInit {

  serverUrl: string;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	userID: string;
  groupID: number;

  
	public isLoading:boolean = false;
 
  public isDisableBtn:boolean = false; 
  public isDataFound:boolean = false;
  public isValidInput:boolean = false;
  public masterSelected:boolean = false;
  public isNoDataFound:boolean = false;
  private offset: number;
  private currPage: number;
    private totalPages: number;
    public totalUploadableQuantity: number;
    private ifids: string="";


  prePlanGenerationForm: FormGroup;
	artWork: FormControl;
    vendor: FormControl;
    IMSI: FormControl;


  public listArtWorks = [];
  public listVendors = [];
  public listIMSIs = [];

  inputFileList: Array<Object>;

  constructor(private router: Router, private planManagemetService: PlanManagementService, private reportsService:ReportService, private loginService: LoginService, private http: HttpClient,
    private ssmService: SSMService, private _global: AppGlobals) {

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

  //GetArtWorks
	this.ssmService.getAllArtwork().subscribe(
		data => {
					//console.log(data);
					for (let index in data) {
						//console.log (data[index]);
						this.listArtWorks.push(
						{
							id:data[index].id,
							artWorkName: data[index].groupName
						}
						);
					}
				},
			err => console.error(err),
			() => console.log('Art work loading done.')
			);

       //GetAllVendor
    
      //GetAllIMSI()

      this.ssmService.GetAllIMSI().subscribe(
		data => {
					//console.log(data);
					for (let index in data) {
						//console.log (data[index]);
						this.listIMSIs.push(
						{
							id:data[index].id,
							imsiName: data[index].groupName
						}
						);
					}
				},
			err => console.error(err),
			() => console.log('IMSI loading done.')
      );

      this.inputFileList=[];
      this.totalUploadableQuantity = 0;

   }

   ngOnInit() {
	   this.planManagemetService.getDropdown("7").subscribe(
		
        data => {
              //console.log(data);
              for (let index in data) {
                this.listVendors.push(
                {
                  id:data[index].id,
                  group_name: data[index].groupName,
                
                }
                );
              }
            },
          err => console.error(err),
          () => console.log('Vendor loading done.')
          );
    this.createFormControls();
    this.createForm();    	
  }

  createFormControls() {
    
	this.artWork = new  FormControl('', Validators.required);
    this.vendor = new FormControl('', Validators.required);
    this.IMSI = new FormControl('');
  }

  createForm() {
    this.prePlanGenerationForm = new FormGroup({
		artWork: this.artWork,
        vendor: this.vendor,
        IMSI: this.IMSI
    });
  }

  // FORM SUBMISSION
  Submit() {
		console.log("this.isDisableBtn is "+this.isDisableBtn);
		console.log("this.prePlanGenerationForm.valid is "+this.prePlanGenerationForm.valid);
        this.totalUploadableQuantity=0;	
  if (this.prePlanGenerationForm.valid  && !this.isDisableBtn) {		
	this.isLoading = true;
    //this.isDisableBtn = true;
    this.currPage = 1;
    this.LoadFilteredInputFiles();
    
  }
}

LoadFilteredInputFiles(){
  
  var selectedArtwork = this.prePlanGenerationForm.controls.artWork.value;
  var selectedVendor = this.prePlanGenerationForm.controls.vendor.value;
  var selectedIMSI = this.prePlanGenerationForm.controls.IMSI.value;

  console.log("SelectedIMSI "+selectedIMSI);
  if(selectedIMSI=="" || selectedIMSI.length==0)
    selectedIMSI=-1;
    console.log("SelectedIMSI "+selectedIMSI);

  this.reportsService.getFilteredInputFiles(selectedArtwork,selectedVendor,selectedIMSI,this.currPage, this._global.defaultPageSize2).subscribe(
    data => {
	console.log("data "+data)
        if(data !=null){
          console.log(data);
          var dataSize = Number(data.totalQuantity);
          console.log(dataSize)
          if(dataSize>0){        
          this.isDataFound = true;
          this.inputFileList = data.stockReport;
  
          this.isNoDataFound=false;
          console.log("this.inputFileList",this.inputFileList)
          var resultOfMod = dataSize%Number(this._global.defaultPageSize2);        
          this.totalPages = Math.floor(dataSize/Number(this._global.defaultPageSize2));
          console.log(resultOfMod+"test");
          console.log(this.totalPages);
          
          if(resultOfMod>0){
            this.totalPages=this.totalPages+1;
          console.log("Total Page "+this.totalPages);
          this.isLoading = false;}
          
          
          //alert(dataSize);
        }
        else{
          this.isDataFound = false;
          this.isLoading = false;
          this.isNoDataFound=true;
        }
        console.log("this.isNoDataFound "+this.isNoDataFound);
      }
      },
    err => console.error(err),
    () => console.log('Done loading FilteredInputFiles List')
    );
    this.isLoading = false;

}

firstPage(){
  
  
    this.isLoading = true;    
    this.currPage=1;
    this.LoadFilteredInputFiles();
  
  
}

lastPage(){
  
  
    this.isLoading = true;    
    this.currPage=this.totalPages;
    this.LoadFilteredInputFiles();
  
  
}
prevPage(){
  
if(this.currPage <= 0){
  //first page .. do nothing
}
else{
  this.isLoading = true;    
  this.currPage--;
  this.LoadFilteredInputFiles();
}

}
nextPage(){
  
  if(this.currPage == this.totalPages){
    //last page .. do nothing
  }
  else{
    this.isLoading = true;    
    this.currPage++;
    this.LoadFilteredInputFiles();
  }
  
}
	
}