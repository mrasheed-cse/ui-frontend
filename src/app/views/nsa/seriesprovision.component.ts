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
import seriesProvision from './demodata';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-seriesprovision',
  templateUrl: './seriesprovision.component.html',
   styleUrls: ['./demo.component.css']
})
export class SeriesprovisionComponent implements OnInit {

 constructor(private httpService: HttpClient) {
        this.itemResource.count().then(count => this.itemCount = count);
    }

arrWRs: string [];

  ngOnInit () {

	this.createFormControls();
    this.createForm();
  
  }

  itemResource = new DataTableResource(seriesProvision);
    items = [];
    itemCount = 0;
	
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

   
	

  reloadItems(params) {
        this.itemResource.query(params).then(items => this.items = items);
    }

    // special properties:

    rowClick(rowEvent) {
        console.log('Clicked: ' + rowEvent.row.item.wr_name);
    }

    rowDoubleClick(rowEvent) {
        alert('Double clicked: ' + rowEvent.row.item.wr_name);
    }

    rowTooltip(item) { return item.jobTitle; }
	
	 isCollapsed: boolean = true;

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }
  

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
	
}
