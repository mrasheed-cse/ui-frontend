import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { LoginService } from '../../pages/LoginService';
import { SSMService } from '../../SSM/SSM.service';
import { LoggedInUser } from '../../pages/loggedInUser';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-received-quantity-manipulation',
  templateUrl: './received-quantity-manipulation.component.html',
  styles: ['./nsa_styles.css'],
  providers: [SSMService,LoginService]
})
export class ReceivedQuantityManipulation implements OnInit {

  serverUrl: string;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	userID: string;
  groupID: number;

  
	public isLoading:boolean = false;
 
  public isDisableBtn:boolean = false; 
  public isDataFound:boolean = false;


  updateReceivedQuantityForm: FormGroup;
	artWork: FormControl;
	vendor: FormControl;


  public listArtWorks = [];
  public listVendors = [];

  inputFileList: Array<Object>;

  constructor(private router: Router,private loginService: LoginService, private http: HttpClient,
    private ssmService: SSMService) {

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
	this.ssmService.getAllVendor().subscribe(
		data => {
					//console.log(data);
					for (let index in data) {
						//console.log (data[index]);
						this.listVendors.push(
						{
							id:data[index].id,
							vendorName: data[index].groupName
						}
						);
					}
				},
			err => console.error(err),
			() => console.log('Vendor loading done.')
      );
      
      this.inputFileList=[];

   }

   ngOnInit() {
    this.createFormControls();
    this.createForm();    	
  }

  createFormControls() {
    
	this.artWork = new  FormControl('');
	this.vendor = new FormControl('');
  }

  createForm() {
    this.updateReceivedQuantityForm = new FormGroup({
		artWork: this.artWork,
		vendor: this.vendor
    });
  }

  // FORM SUBMISSION
  Submit() {
		console.log("this.isDisableBtn is "+this.isDisableBtn);
		console.log("this.updateReceivedQuantityForm.valid is "+this.updateReceivedQuantityForm.valid);
		
  if (this.updateReceivedQuantityForm.valid  && !this.isDisableBtn) {
		
	this.isLoading = true;
  this.isDisableBtn = true;

  var selectedArtwork = this.updateReceivedQuantityForm.controls.artWork.value;
  var selectedVendor = this.updateReceivedQuantityForm.controls.vendor.value;

  this.ssmService.getFilteredInputFiles(selectedArtwork,selectedVendor,-1,1).subscribe(
    data => {
      if(data !=null){
        console.log(data);
        this.isDataFound = true;
        this.inputFileList = data;
        this.isLoading = false;
      }
      else{
        this.isDataFound = false;
        this.isLoading = false;
      }
    },
  err => console.error(err),
  () => console.log('Done loading FilteredInputFiles List')
  );

  }
}


}
