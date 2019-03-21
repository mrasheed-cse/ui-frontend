import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NsaRoutingModule } from './nsa-routing.module';
import { LandingpageComponent } from './landingpage.component';
import { SeriesprovisionComponent } from './seriesprovision.component';
import { DiscreteprovisionComponent } from './discreteprovision.component';
import { DataTableModule } from 'angular4-smart-table';
import { SeriesprovisionformComponent } from './seriesprovisionform.component';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { SeriesprovisiondetailComponent } from './seriesprovisiondetail.component';
import { TabledemoComponent } from './tabledemo.component';

@NgModule({
  imports: [
    CommonModule,
	DataTableModule,
	ReactiveFormsModule,
	FormsModule,
	HttpClientModule,
    CollapseModule.forRoot(),
	BsDatepickerModule.forRoot(),
    NsaRoutingModule
  ],
  declarations: [LandingpageComponent, SeriesprovisionComponent, DiscreteprovisionComponent, SeriesprovisionformComponent, SeriesprovisiondetailComponent, TabledemoComponent]
})
export class NsaModule { }
