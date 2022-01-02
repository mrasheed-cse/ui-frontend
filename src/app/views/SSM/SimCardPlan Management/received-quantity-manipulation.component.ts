import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { LoginService } from '../../pages/LoginService';
import { SSMService } from '../../SSM/SSM.service';
import { LoggedInUser } from '../../pages/loggedInUser';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { AppGlobals } from './../../../app.global';

@Component({
  selector: 'app-received-quantity-manipulation',
  templateUrl: './received-quantity-manipulation.component.html',
  styles: ['./nsa_styles.css'],
  providers: [SSMService,LoginService,AppGlobals]
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
  public isValidInput:boolean = false;
  private offset: number;
  private currPage: number;
	private totalPages: number;


  updateReceivedQuantityForm: FormGroup;
	artWork: FormControl;
	vendor: FormControl;


  public listArtWorks = [];
  public listVendors = [];

  inputFileList: Array<Object>;

  constructor(private router: Router,private loginService: LoginService, private http: HttpClient,
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
  this.currPage = 1;
  this.LoadFilteredInputFiles();
  }
}

LoadFilteredInputFiles(){

  var selectedArtwork = this.updateReceivedQuantityForm.controls.artWork.value;
  var selectedVendor = this.updateReceivedQuantityForm.controls.vendor.value;


  this.ssmService.getFilteredInputFiles(selectedArtwork,selectedVendor,-1,1,this.currPage, this._global.defaultPageSize2).subscribe(
    data => {
      if(data !=null){
        console.log(data);
        var dataSize = Number(data.totalFilteredInputFiles);
        if(dataSize>0){        
        this.isDataFound = true;
        this.inputFileList = data.filteredInputFiles;

        for (let index in data.filteredInputFiles){
          this.inputFileList[index]['newReceivedQuantity']=0;
        }
        
        var resultOfMod = dataSize%Number(this._global.defaultPageSize2);        
        this.totalPages = Math.floor(dataSize/Number(this._global.defaultPageSize2));
        
        if(resultOfMod>0)
          this.totalPages=this.totalPages+1;
        console.log("Total Page "+this.totalPages);
        this.isLoading = false;
        //alert(dataSize);
      }
      else{
        this.isDataFound = false;
        this.isLoading = false;
      }
      console.log("this.isDataFound "+this.isDataFound);
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

UpdateReceivedQunatity(){
  this.isLoading = true;
  
  var obj={};
  obj['request'] = [];
  var size= this.inputFileList.length;
 // alert(size);
  var count=0;
  this.isValidInput=true;
  
  for(var i = 0; i < size; i++){
    
    console.log(this.inputFileList[i]);
    console.log(this.inputFileList[i]['newReceivedQuantity']);

     if(this.inputFileList[i]['newReceivedQuantity']>0){
      

      if(Number(this.inputFileList[i]['newReceivedQuantity'])>Number(this.inputFileList[i]['totalQuantity'])-Number(this.inputFileList[i]['receivedQuantity'])){
        //alert(Number(this.inputFileList[i]['newReceivedQuantity'])); 
        //alert(Number(this.inputFileList[i]['totalQuantity'])-Number(this.inputFileList[i]['receivedQuantity']));
        alert("At row "+(i+1)+", ‘Quantity Received’ can’t be greater than ‘Quantity Yet To Receive’");
        this.isValidInput=false;
        this.isLoading = false;
        count=0;
        return;
       }
      var obj2={};
      console.log(this.inputFileList[i]['id']);
      obj2['fileInputId']=this.inputFileList[i]['id'];
      console.log(obj2['fileInputId']);
      obj2['receivedQuantity']=Number(this.inputFileList[i]['newReceivedQuantity']);
      console.log(obj2['newReceivedQuantity']);
      console.log(obj2);
      obj['request'].push(obj2);
      count++;
     }     
  }
  
  if(count>0){
  console.log(obj);
  console.log("Selected Received Quantity is "+count);

  this.ssmService.UpdateReceivedQuantity(obj).subscribe(
    res  =>  {
      console.log('response is : '+res.message);
				this.isLoading = false;
				if(res !== ""){
          alert(res.message);
        
          this.LoadFilteredInputFiles();
        
      }
    },
    err  =>  {
      this.isLoading = false;
    },
    () => {
      
      this.isLoading = false;
      
    }
  );
}
  
}
}


