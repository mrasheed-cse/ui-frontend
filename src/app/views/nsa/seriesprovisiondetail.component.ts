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
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import { AppGlobals } from './../../app.global';
import PreviousHopFieldNameValue from './models/PreviousHopFieldNameValue';

@Component({
  selector: 'app-seriesprovisiondetail',
  templateUrl: './seriesprovisiondetail.component.html',
  styles: [],
  providers: [WorkflowsService,AppGlobals]
})
export class SeriesprovisiondetailComponent implements OnInit {

	wr_BriefId : number;
	hop_sequence : number;
	wrBriefName : string;
	userGroup_id : number;
	fieldNameValueList: PreviousHopFieldNameValue;
	
	nullObj: PreviousHopFieldNameValue;


	
	
	/*
	mySeriesProvisionForm: FormGroup;
	HLR: FormControl;
	SAPC: FormControl;	
	cnpComment: FormControl;	
	SDP: FormControl;
	CSP: FormControl;
	EOICK: FormControl;
	emaPort: FormControl;
	bssComment: FormControl;
	
	public listHLR = [];
	public listSAPC = [];
	public listSDP = [];  
	public listEmaPort = [];
	
	
	*/
  constructor(private activatedRoute: ActivatedRoute, private router:Router, private _global: AppGlobals, private workFlowsService: WorkflowsService) {
	  
		// LOAD QUERY STRING DATA
		this.wr_BriefId = Number(this.activatedRoute.snapshot.paramMap.get('wr_BriefId'));
		console.log(this.wr_BriefId);
		this.hop_sequence = Number(this.activatedRoute.snapshot.paramMap.get('hopSequence'));
		console.log(this.hop_sequence);
		this.wrBriefName = this.activatedRoute.snapshot.paramMap.get('wr_BriefName');
		this.userGroup_id = Number(this.activatedRoute.snapshot.paramMap.get('userGroup_id'));
		console.log(this.userGroup_id);
		
		//LOAD PREVIOUS HOPS DATA
		//LoadPreviousHopsField(wrID: number,wrBriefId: number,userGroup_id: number,current_hop_seq: number) : any {
		this.workFlowsService.LoadPreviousHopsField(this._global.wrid_NumberSeriesProvisioning,this.wr_BriefId,this.userGroup_id,this.hop_sequence).subscribe(
			data => { 
					//console.log(data);
					this.fieldNameValueList = data;
					const totalData = this.fieldNameValueList.length;
					//console.log(totalData);
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
			() => console.log('Error loading LoadPreviousHopsField List')
			);  
			
			// LOAD DROPDOWNS DATA
			/*
			this.listHLR = [{'id':1, 'name':'HLR1'}, {'id':2, 'name': 'HLR2'}, {'id':3, 'name': 'HLR3'}];
	this.listSAPC = [{'id':1, 'name':'SYUPCC01'}];
	this.listSDP = [{'id':1, 'name':'SDP1'}, {'id':2, 'name': 'SDP2'}, {'id':3, 'name': 'SDP3'}];
	this.listEmaPort = [{'id':1, 'name':'3001'}, {'id':2, 'name': '3002'}];
 */
      }
	  
  ngOnInit() {
    this.createFormControls();
    this.createForm();
	//this.onMSISDNChanges();
  }

  createFormControls() {
/*
	if(this.hop_sequence == 2){
		this.HLR = new FormControl('', [Validators.required]);	
		this.SAPC= new FormControl('', Validators.required);
		this.cnpComment= new FormControl('');		
	}
	else if(this.hop_sequence == 3){
		this.SDP= new FormControl('', Validators.required);
		this.CSP =	new FormControl({value: 0, disabled: true}, Validators.required);
		this.EOICK =	new FormControl({value: 0, disabled: true}, Validators.required);
		this.emaPort= new FormControl('', Validators.required);
		this.bssComment= new FormControl('');	
	}
	*/
  }

  createForm() {
	  /*
	if(this.hop_sequence == 2){
		this.mySeriesProvisionForm = new FormGroup({		
			HLR: this.HLR,
			SAPC: this.SAPC,
			cnpComment: this.cnpComment
		});
	}
	else if(this.hop_sequence == 3){
		this.mySeriesProvisionForm = new FormGroup({
			SDP: this.SDP,
			CSP: this.CSP,
			EOICK: this.EOICK,
			emaPort: this.emaPort,
			bssComment: this.bssComment
		});
	}   
*/	
  }
  
   // event handler for the select element's change event
    onSDPSelect (event: any) {	  
	
    // update the ui
	const selectedSDPID = event.target.value;
	//console.log(selectedSDPID);
	//this.mySeriesProvisionForm.get('CSP').setValue(selectedSDPID);
	//this.mySeriesProvisionForm.get('EOICK').setValue(selectedSDPID);
  }

  onSeriesProvisionSubmit() {
	 /*
  if (this.mySeriesProvisionForm.valid) {
	
    console.log('Form Submitted!');
    console.log(this.mySeriesProvisionForm.value);
  }*/
  }
  
clearForm(event: any){
	//	this.mySeriesProvisionForm.reset();		
	}
  
  
}
