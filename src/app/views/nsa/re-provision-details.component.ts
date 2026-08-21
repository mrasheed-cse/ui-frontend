import {
	NgModule,
	Component,
	Pipe,
	OnInit
  } from '@angular/core';
  import {Router, ActivatedRoute} from '@angular/router';
  import { WorkflowsService } from './services/workflows.service';
  import { FileoperationService } from './services/fileoperation.service';
  
  
  
  
  
  import { AppGlobals } from './../../app.global';
  import PreviousHopFieldNameValue from './models/PreviousHopFieldNameValue';
  import { LoginService } from '../pages/LoginService';
  import { LoggedInUser } from '../pages/loggedInUser';
  
  @Component({
	selector: 'app-re-provision-details',
	templateUrl: './re-provision-details.component.html',
	  styles: [],
	providers: [WorkflowsService,AppGlobals,LoginService,FileoperationService]
  })
  export class ReProvisionDetailsComponent implements OnInit {
	  wr_BriefId : number;
	  hop_sequence : number;
	  wrBriefName : string;
	  userGroup_id : number;
	  
	  
	  
	  fieldNameValueList: PreviousHopFieldNameValue;
	  
	  currentLoggedInUser: LoggedInUser;
	  userName: string;
	  userID: string;	  
	  groupID: number;
	
	  public dangerAlertShow:boolean = false;
	  public dangerAlertMessage:string = "";
	  public successAlertShow:boolean = false;
	  public successAlertMessage:string = "";
	  public isDone:boolean = false;
	  public isDoneDisable:boolean = false;
	  public isLoading:boolean = false;
  
	  
	  
	constructor(private loginService: LoginService,private activatedRoute: ActivatedRoute, private router:Router, public _global: AppGlobals, private workFlowsService: WorkflowsService, private fileoperationService: FileoperationService) {
		
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
		  //LoadPreviousHopsField(wrID: number,wrBriefId: number,groupID: number,current_hop_seq: number) : any {
		  this.workFlowsService.LoadPreviousHopsField(this._global.wrid_ReProvisioning,this.wr_BriefId,this.groupID,this.hop_sequence).subscribe(
			  data => { 
					  //console.log(data);
					  this.fieldNameValueList = data;
					  const totalData = this.fieldNameValueList.length;
					  console.log(totalData);
					  if (totalData%2==1){   
						  console.log("totalData is odd");
						  
						  this.fieldNameValueList.push({fieldName: "", fieldValue: ""});
  
					  }
					  
				  /*
				  for (let index in data) {
					  console.log (data[index]);					     
					  console.log('fieldName is : '+index +' ' +this.fieldNameValueList[index].fieldName);
					  console.log('fieldValue is : '+index +' ' +this.fieldNameValueList[index].fieldValue);
					  console.log('index is : '+index);
				  }
				  */				
			  },
			  err => console.error(err),
			  () => console.log('Done loading LoadPreviousHopsField List')
			  );  
  
  }
  
	  
	 
	topFunction() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}

  
  backButton(event: any){
		  //console.log(event);
		  this.router.navigateByUrl('/nsa/reprovision');	
	  }
  onDoneClick(event: any){
			//console.log(event);
			this.topFunction();
		  this.isLoading = true;		 
		   this.isDoneDisable = true;
		   if(this.hop_sequence==4) // LAST HOP IN Re-PROVISION
			  this.isDone = true;
			this.workFlowsService.UpdateExistiongWorkRequest(this.workFlowsService.FormatWorkRequestNameForAPI(this.wrBriefName),this._global.wrid_ReProvisioning, this.groupID,this.userName,this.hop_sequence,"",this.isDone).subscribe(
		res  =>  {
			console.log('response is : '+res.message);
		  
		  if(res !== ""){	
			  this.isLoading = false;
			  this.successAlertShow = true;
			  if(this.hop_sequence==4)
				  this.successAlertMessage = " has been completed successfully.";
			  else
					this.successAlertMessage = " has been saved successfully ";
					
					if(res.message!=""){
						if(res.message.indexOf("HOP:") !== -1){
							
							var rs = res.message.replace("HOP:", "");
							alert(rs);
							
						this.successAlertMessage = this.successAlertMessage +"	and forwarded to "+rs+" .";
						}
						else
						this.successAlertMessage = this.successAlertMessage +"	"+res.message+" .";
					}
		  }
		},
		err  =>  {		  
			console.log("err.status : "+err.status);		  
			this.dangerAlertShow = true;
		  this.dangerAlertMessage = " .";
		  this.isLoading = false;
		}
		
		);
		
		
		  
	  }  
	  
		downloadCSVFiles(requiredFile: string) {

			var nameOfFileToDownload;
		nameOfFileToDownload = requiredFile.replace(".", this.workFlowsService.FormatWorkRequestNameForAPI(this.wrBriefName)+".");
		console.log("Download File Name : "+nameOfFileToDownload);
		
			var result = this.fileoperationService.downloadCSV(nameOfFileToDownload);
			//console.log(result);
			result.subscribe(
				data => {
				//	console.log("ToTOOO");
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
					},
					err => {
						alert("Server error while downloading file.");
					}
				);
		}
	
  
  }