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
  import {Router, ActivatedRoute} from '@angular/router';
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
  import { AppGlobals } from './../../app.global';
  import PreviousHopFieldNameValue from './models/PreviousHopFieldNameValue';
  import { LoginService } from '../pages/LoginService';
  import { LoggedInUser } from '../pages/loggedInUser'; 
  import { saveAs } from 'file-saver';
  
  @Component({
	selector: 'app-mnpre-provision-details',
	templateUrl: './mnpre-provision-details.component.html',
	  styles: [],
	providers: [WorkflowsService,AppGlobals,LoginService,FileoperationService]
	})
	
  export class MnpreProvisionDetailsComponent implements OnInit {
	  wr_BriefId : number;
	  hop_sequence : number;
	  wrBriefName : string;
	  userGroup_id : number;
	  
	  fieldNameValueList: PreviousHopFieldNameValue;
	  
	  currentLoggedInUser: LoggedInUser;
	  userName: string;
	  groupID: number;
	
	  public dangerAlertShow:boolean = false;
	  public dangerAlertMessage:string = "";
	  public successAlertShow:boolean = false;
	  public successAlertMessage:string = "";
	  public isDone:boolean = false;
	  public isDoneDisable:boolean = false;
	  public isLoading:boolean = false;
  
	constructor(private loginService: LoginService,private activatedRoute: ActivatedRoute, private router:Router, private _global: AppGlobals, private workFlowsService: WorkflowsService, private fileoperationService: FileoperationService) {
		
	  // Get Current User Profile
	  
	  this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
	  
	  if (this.currentLoggedInUser) {
		  this.userName = this.currentLoggedInUser.userName
		  this.groupID = this.currentLoggedInUser.groupID
	  } 
	  else {
			this.router.navigate(['pages/login']);
	  }
	}
		
	ngOnInit() {
	  this.LoadQueryStringData();
	  this.LoadPreviousHopsData();
	}
  
	LoadQueryStringData(){
		// LOAD QUERY STRING DATA
		  this.wr_BriefId = Number(this.activatedRoute.snapshot.paramMap.get('wr_BriefId'));
		  console.log(this.wr_BriefId);
		  
		  this.hop_sequence = Number(this.activatedRoute.snapshot.paramMap.get('hopSequence'));		
		  console.log(this.hop_sequence);
		  
		  this.wrBriefName = this.activatedRoute.snapshot.paramMap.get('wr_BriefName');
	}
	
  LoadPreviousHopsData(){
		  //LOAD PREVIOUS HOPS DATA
		  this.workFlowsService.LoadPreviousHopsField(this._global.wrid_MnpReProvisioning,this.wr_BriefId,this.groupID,this.hop_sequence).subscribe(
			  data => {
					  this.fieldNameValueList = data;
					  const totalData = this.fieldNameValueList.length;
					  console.log(totalData);
					  if (totalData%2==1){   
						  console.log("totalData is odd");
						  this.fieldNameValueList.push({fieldName: " ", fieldValue: " "});
					  }
			  },
			  err => console.error(err),
			  () => console.log('Done loading LoadPreviousHopsField List')
			  );
  }
  
  backButton(event: any){
		this.router.navigateByUrl('/nsa/mnpreprovision');	
	}
	
  onDoneClick(event: any){
		this.isLoading = true;		 
		this.isDoneDisable = true;
		if(this.hop_sequence==3) // LAST HOP IN De-PROVISION
			this.isDone = true;
		this.workFlowsService.UpdateExistiongWorkRequest(this.workFlowsService.FormatWorkRequestNameForAPI(this.wrBriefName),this._global.wrid_MnpReProvisioning, this.groupID,this.userName,this.hop_sequence,"",this.isDone).subscribe(
		res  =>  {
		  console.log('response is : '+res);
		  if(res === true){
			  this.isLoading = false;
			  this.successAlertShow = true;
			  if(this.hop_sequence==3)
				  this.successAlertMessage = " has been completed successfully.";
			  else
				  this.successAlertMessage = " has been saved successfully.";
		  }
		},
		err  =>  {		  
			console.log("err.status : "+err.status);		  
			this.dangerAlertShow = true;
		  this.dangerAlertMessage = " could not be saved.";
		  this.isLoading = false;
		}
		);
	}

  downloadCSVFiles() {
		var nameOfFileToDownload = this.workFlowsService.FormatWorkRequestNameForAPI(this.wrBriefName)+".csv";
		console.log("nameOfFileToDownload : "+nameOfFileToDownload);
	
		var result = this.fileoperationService.downloadCSV(nameOfFileToDownload);
		console.log(result);
		result.subscribe(
		  data => {
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