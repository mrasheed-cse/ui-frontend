import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { LoginService } from '../../pages/LoginService';
import { SSMService } from '../../SSM/SSM.service';
import { LoggedInUser } from '../../pages/loggedInUser';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { AppGlobals } from './../../../app.global';
import{PlanManagementService } from '../../SSM/SimCardPlan Management/plan_management.service';
@Component({
  selector: 'app-pre-PlanGenerate',
  templateUrl: './rep-pre-plangenerate.component.html',
  styles: ['./nsa_styles.css'],
  providers: [SSMService,LoginService,AppGlobals,PlanManagementService]
})
export class RepPrePlanGenerate implements OnInit {

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


  repprePlanGenerationForm: FormGroup;
	artWork: FormControl;
    vendor: FormControl;
    IMSI: FormControl;
   


  public listArtWorks = [];
  public listVendors = [];
  public listIMSIs = [];

  inputFileList: Array<Object>;

  constructor(private router: Router, private planManagemetService: PlanManagementService,private loginService: LoginService, private http: HttpClient,
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
    this.createFormControls();
    this.createForm();    	
  }

  createFormControls() {
    
	this.artWork = new  FormControl('', Validators.required);
    this.vendor = new FormControl('', Validators.required);
    this.IMSI = new FormControl('');
  
  }

  createForm() {
    this.repprePlanGenerationForm = new FormGroup({
		artWork: this.artWork,
        vendor: this.vendor,
        IMSI: this.IMSI
    
    });
  }

  // FORM SUBMISSION
  Submit() {
		console.log("this.isDisableBtn is "+this.isDisableBtn);
		console.log("this.repprePlanGenerationForm.valid is "+this.repprePlanGenerationForm.valid);
        this.totalUploadableQuantity=0;	
  if (this.repprePlanGenerationForm.valid  && !this.isDisableBtn) {		
	this.isLoading = true;
    //this.isDisableBtn = true;
    this.currPage = 1;
    this.LoadFilteredInputFiles();
    
  }
}

private padToSevenDigits(num: number): string {
    return ('0000000' + num).slice(-7);
}

    private padToTwoDigits(num: number): string {
        return ('00' + num).slice(-2);
    }

    private padToThreeDigits(num: number): string {
        return ('000' + num).slice(-3);
    }


LoadFilteredInputFiles(){
  
  var selectedArtwork = this.repprePlanGenerationForm.controls.artWork.value;
  var selectedVendor = this.repprePlanGenerationForm.controls.vendor.value;
  var selectedIMSI = this.repprePlanGenerationForm.controls.IMSI.value;

  console.log("SelectedIMSI "+selectedIMSI);
  if(selectedIMSI=="" || selectedIMSI.length==0)
    selectedIMSI=-1;
    console.log("SelectedIMSI "+selectedIMSI);

  this.ssmService.getFilteredInputFiles(selectedArtwork,selectedVendor,selectedIMSI,2,this.currPage, this._global.defaultPageSize).subscribe(
    data => {
        if(data !=null){
          console.log(data);
          var dataSize = Number(data.totalFilteredInputFiles);
          if(dataSize>0){        
          this.isDataFound = true;
          this.inputFileList = data.filteredInputFiles;
          this.inputFileList.forEach(x=>
            {
              x['iccidStartnum']= x['startIccid'] + x['planQuantity'];
              x['iccidEndnum']=x['startIccid'] + x['receivedQuantity']-1;
              x['iccidStart'] = "898801"+ this.padToTwoDigits(x['iccidOrder']) + this.padToThreeDigits(x['imsiType']) + this.padToSevenDigits(x['iccidStartnum']);
              x['iccidEnd'] = "898801"+ this.padToTwoDigits(x['iccidOrder']) + this.padToThreeDigits(x['imsiType']) + this.padToSevenDigits(x['iccidEndnum']);
            }
          )
          this.isNoDataFound=false;
          
          var resultOfMod = dataSize%Number(this._global.defaultPageSize);
          this.totalPages = Math.floor(dataSize/Number(this._global.defaultPageSize));
          console.log(resultOfMod);
          console.log(this.totalPages);
          
          if(resultOfMod>0)
            this.totalPages=this.totalPages+1;
          console.log("Total Page "+this.totalPages);
          this.isLoading = false;
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
checkUncheckAll() {
    //alert(this.masterSelected);
    this.totalUploadableQuantity= 0;
    this.ifids="";
    
    for (let i = 0; i < this.inputFileList.length; i++) {
      this.inputFileList[i]['checked'] =this.masterSelected;
      if(this.masterSelected){
      this.totalUploadableQuantity= this.totalUploadableQuantity+Number(this.inputFileList[i]['receivedQuantity'])-Number(this.inputFileList[i]['planQuantity']);
      if(this.ifids.length>0)
        this.ifids=this.ifids+",";
      this.ifids =this.ifids+this.inputFileList[i]['id'];
  }
}
}

ModifyLoadedAmount(args: any){
console.log(args);
console.log(args.target.value);
var size= this.inputFileList.length;
const selectedInputFileID: number =args.target.value;

this.totalUploadableQuantity= 0;
    this.ifids="";
    
    for (let i = 0; i < this.inputFileList.length; i++) {      
      if(this.inputFileList[i]['checked']){
      this.totalUploadableQuantity= this.totalUploadableQuantity+Number(this.inputFileList[i]['receivedQuantity'])-Number(this.inputFileList[i]['planQuantity']);
      if(this.ifids.length>0)
        this.ifids=this.ifids+",";
      this.ifids =this.ifids+this.inputFileList[i]['id'];
  }
}

/*


    for(var i = 0; i < size; i++){
      
        if(this.inputFileList[i]['id']==selectedInputFileID){
          if(args.target.checked){
            
            this.totalUploadableQuantity= this.totalUploadableQuantity+Number(this.inputFileList[i]['receivedQuantity'])-Number(this.inputFileList[i]['planQuantity']);
            
           
        }
        else{
          this.totalUploadableQuantity= this.totalUploadableQuantity-(Number(this.inputFileList[i]['receivedQuantity'])-Number(this.inputFileList[i]['planQuantity']));
        }
        break;  
    }
}
*/
}

GoForPlanGenerate(){
    var size= this.inputFileList.length;
    
   
    for(var i = 0; i < size; i++){
    
        console.log(this.inputFileList[i]);
        if(this.inputFileList[i]['checked']){
        }
    }

    //this.router.navigateByUrl('/nsa/plangenerate/');
    this.router.navigateByUrl('/nsa/rep-plangenerate/'+this.totalUploadableQuantity+'/'+this.ifids);
}
}

