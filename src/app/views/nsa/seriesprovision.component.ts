import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { DataTableResource } from 'angular4-smart-table';
import PendingTasks from './models/PendingTasks';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { WorkflowsService } from './services/workflows.service';
import { AppGlobals } from './../../app.global';

@Component({
  selector: 'app-seriesprovision',
  templateUrl: './seriesprovision.component.html',
   styleUrls: ['./demo.component.css'],
  providers: [WorkflowsService,AppGlobals]
})
export class SeriesprovisionComponent implements OnInit {

	pendingTasksList: PendingTasks;
	
	 isCollapsed: boolean = true;
	constructor(private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService) {	

	 //GetPendingTaskList

	this.workFlowsService.LoadPendingTask(this._global.wrid_NumberSeriesProvisioning,3).subscribe(
      data => { 
				console.log(data);
				this.pendingTasksList = data;
				/*
				"pendingAt": "CNP",
    "nextAction": "Update or Action required at CNP end",
    "lastAction": "Create New Work request and Cancel Work Request",
    "lastActionDate": "2019-39-11 12:39:14",
    "wr_ID": "1",
    "wr_Name": "PROV/001/03/2019"
				*/
			
				for (let index in data) {
					//console.log (data[index]);
					console.log('response is : '+index +' ' +this.pendingTasksList[index].pendingAt);
					console.log('response is : '+index +' ' +this.pendingTasksList[index].nextAction);
					console.log('response is : '+index +' ' +this.pendingTasksList[index].lastAction);
					console.log('response is : '+index +' ' +this.pendingTasksList[index].lastActionDate);
					console.log('response is : '+index +' ' +this.pendingTasksList[index].wr_ID);
					console.log('response is : '+index +' ' +this.pendingTasksList[index].wr_Name);
					console.log('response is : '+index);
				}		
			},
		err => console.error(err),
		() => console.log('done loading PendingTask List')
		);
    }



  ngOnInit () {

	this.createFormControls();
    this.createForm();
  
  }

  
	
datepickerConfig: Partial<BsDatepickerConfig>;
	
   mySearchForm: FormGroup;  
   wrname: FormControl;
   wrstatus: FormControl;
   startDate: FormControl;
   endDate: FormControl;

  wrstatuses: string[] = [
    'In Progress',
    'Complete'
  ];

   
	

  onSearchSubmit() {
  if (this.mySearchForm.valid) {
    console.log('Form Submitted!');
    console.log(this.mySearchForm.value);
    //this.myModelForm.reset();
  }
}

  createFormControls() {
    
    this.wrname = new FormControl('', Validators.required);
    this.wrstatus = new FormControl('');
	this.startDate = new FormControl('');
	this.endDate = new FormControl('');
  }

  createForm() {
    this.mySearchForm = new FormGroup({
      wrname: this.wrname,
      wrstatus: this.wrstatus,
      startDate: this.startDate,
	  endDate: this.endDate
    });
  }
  
   onTaskSelect(aTask) {
        //this.selectedContactId = aTask.wr_ID;
		//this.router.navigateByUrl('/nsa/seriesprovisiondetail');
    }
	
}
