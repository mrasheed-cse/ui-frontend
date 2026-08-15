import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { DefinitionDataService } from './services/definitiondata.service';






import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser'; 


import { AppGlobals } from './../../app.global';
@Component({
  selector: 'app-masterdatamgmt',
  templateUrl: './masterdatamgmt.component.html',
  styles: [],
  providers: [DefinitionDataService,LoginService, AppGlobals]
})
export class MasterdatamgmtComponent implements OnInit {

  public isLoading:boolean = false;
  public dangerAlertShow:boolean = false;
	public dangerAlertMessage:string = "";
	public successAlertShow:boolean = false;
  public successAlertMessage:string = "";
  isCollapsedNewItem: boolean = true;
  isCollapseddetailItem: boolean = true;
  
  createNewMasterDataForm: FormGroup;
  newmasterdata: FormControl;
  responseData: string;
  listMasterDataItem = [];
  currentLoggedInUser: LoggedInUser;
  userName: string;
  groupName: string;
  groupId: number;
  
  masterDataDetailForm: FormGroup;
  newDetailItem: FormControl;
  selectMasterDataItem: FormControl;
  constructor(private router: Router,private loginService: LoginService,private _global: AppGlobals, private http: HttpClient, private definitionDataService: DefinitionDataService) {
   
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
	
    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName;
      this.groupId = this.currentLoggedInUser.groupID;
      this.groupName = this.currentLoggedInUser.groupName.toLowerCase();
      console.log('Current user: ' + this.userName+" group Name: "+this.groupName+"group Id: "+this.groupId);
      
    } 
    else {
      //console.log('Current user not found');
      this.router.navigate(['pages/login']);
    }
   
    this.definitionDataService.GetMasterDataItems().subscribe(
      data => { 
            //console.log(data);
            for (let index in data) {
              //console.log (data[index]);
              this.listMasterDataItem.push(
              {
                id:data[index].id,
                masterDataItemName: data[index].masterDataItemName
              }
              ); 
            }		
          },
        err => console.error(err),
        () => console.log('done loading master data item detail List')
        );
  }

  createForm(){
  this.createNewMasterDataForm = new FormGroup({
   newmasterdata: this.newmasterdata
  });

  this.masterDataDetailForm = new FormGroup({
    selectMasterDataItem: this.selectMasterDataItem,
    newDetailItem: this.newDetailItem
  });
}
  
  createFormControls() {
    this.newmasterdata = new FormControl('', [
      Validators.required,
      Validators.minLength(11) ,
      Validators.maxLength(11)
    ]);

    this.selectMasterDataItem = new FormControl('',[
      Validators.required,
      Validators.minLength(11) ,
      Validators.maxLength(11)
    ]);


    this.newDetailItem = new FormControl('',[
      Validators.required,
      Validators.minLength(11) ,
      Validators.maxLength(11)
    ]);
  }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  clearForm(){
    this.masterDataDetailForm.reset();		
    this.createNewMasterDataForm.reset();
  }
  
  topFunction() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  
  onCreateNewMasterDataSubmit(){
    this.topFunction();
    this.isLoading = true;
    console.log('Form submitted!');
    console.log(this.createNewMasterDataForm.value);
    console.log('this.Loading '+this.isLoading);
    this.definitionDataService.CreateNewMasterDataItem(this.createNewMasterDataForm.get('newmasterdata').value).subscribe(
      res  =>  {
        console.log('response is : '+res.toString);
        
        if(res !== null){
          console.log("res.status : "+res);		
          this.successAlertShow = true;
          this.successAlertMessage = "Master data saved successfully";
          this.isLoading = false;
          this.clearForm();
        }
          },
          err  =>  {		  
          console.log("err.status : "+err.status);		  
         this.dangerAlertShow = true;
         this.dangerAlertMessage = "There was an error in Master Data New Item Creation";
        this.isLoading = false;
          }
        
          );
  }

   
  onMasterDataDetailSubmit(){
    this.topFunction();
    this.isLoading = true;
    console.log('Master Data Detail Form submitted!');
    console.log('this.Loading '+this.isLoading);
    this.definitionDataService.CreateNewMasterDataDetailItem(this.masterDataDetailForm.get('selectMasterDataItem').value,this.masterDataDetailForm.get('newDetailItem').value,this.userName).subscribe(
      res  =>  {
        
      //  console.log('response is : '+res.message);
        
        if(res !== null){
          console.log("res.status : "+res);		
          this.successAlertShow = true;
          this.successAlertMessage = "Master data detail saved successfully";
          this.isLoading = false;
          this.clearForm();
        }
          },
          err  =>  {		  
        console.log("err.status : "+err.status);		  
        this.dangerAlertShow = true;
        this.dangerAlertMessage = " There was an error in Master Data Detail Item Creation";
        this.isLoading = false;
          }
        
          );
  }



}
