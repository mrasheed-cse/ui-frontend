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
  selector: 'app-apndetails',
  templateUrl: './apndetails.component.html',
  styles: [],
  providers: [WorkflowsService,AppGlobals,LoginService,FileoperationService]
})
export class ApndetailsComponent implements OnInit {
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

	
	
  constructor(private loginService: LoginService,private activatedRoute: ActivatedRoute, private router:Router, private _global: AppGlobals, private workFlowsService: WorkflowsService, private fileoperationService: FileoperationService) {
	  
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
		this.workFlowsService.LoadPreviousHopsField(this._global.wrid_ApnCreation,this.wr_BriefId,this.groupID,this.hop_sequence).subscribe(
			data => { 
					//console.log(data);
					this.fieldNameValueList = data;
					const totalData = this.fieldNameValueList.length;
					console.log(totalData);
					if (totalData%2==1){   
						console.log("totalData is odd");
						
						this.fieldNameValueList.push({fieldName: " ", fieldValue: " "});

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

	
  

backButton(event: any){
		//console.log(event);
		this.router.navigateByUrl('/nsa/apn');	
	}
onDoneClick(event: any){
		//console.log(event);
		this.isLoading = true;		 
		 this.isDoneDisable = true;
		 if(this.hop_sequence==2) // LAST HOP IN APN Creation
			this.isDone = true;
		  this.workFlowsService.UpdateExistiongWorkRequest(this.workFlowsService.FormatWorkRequestNameForAPI(this.wrBriefName),this._global.wrid_ApnCreation, this.groupID,this.userID,this.hop_sequence,"Done",this.isDone).subscribe(
      res  =>  {
		console.log('response is : '+res.message);
		
		if(res !== ""){	
			this.isLoading = false;
			this.successAlertShow = true;
			if(this.hop_sequence==2)
				this.successAlertMessage = " has been completed successfully.";
			else
				this.successAlertMessage = " has been saved successfully.";
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
	

  
}
