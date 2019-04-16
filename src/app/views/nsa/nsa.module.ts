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
import { SeriesDefinitionComponent } from './series-definition.component';
import { SeriesDefinitionFormComponent } from './series-definition-form.component';
import { SeriesDefinitionDetailsComponent } from './series-definition-details.component';
import { DeProvisionComponent } from './de-provision.component';
import { DeProvisionFormComponent } from './de-provision-form.component';
import { DeProvisionDetailsComponent } from './de-provision-details.component';
import { ReProvisionComponent } from './re-provision.component';
import { ReProvisionFormComponent } from './re-provision-form.component';
import { ReProvisionDetailsComponent } from './re-provision-details.component';
import { MnpreProvisionComponent } from './mnpre-provision.component';
import { MnpreProvisionFormComponent } from './mnpre-provision-form.component';
import { MnpreProvisionDetailsComponent } from './mnpre-provision-details.component';
import { ReprovisionsearchComponent } from './reprovisionsearch.component';
import { ApnformComponent } from './apnform.component';
import { ApnComponent } from './apn.component';
import { ApndetailsComponent } from './apndetails.component';
import { MnpreprovsearchComponent } from './mnpreprovsearch.component';
import { NsareportComponent } from './nsareport.component';
import { SdpmigrationComponent } from './sdpmigration.component';


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
  declarations: [LandingpageComponent, SeriesprovisionComponent, DiscreteprovisionComponent, SeriesprovisionformComponent, SeriesprovisiondetailComponent, SeriesDefinitionComponent, SeriesDefinitionFormComponent, SeriesDefinitionDetailsComponent, DeProvisionComponent, DeProvisionFormComponent, DeProvisionDetailsComponent, ReProvisionComponent, ReProvisionFormComponent, ReProvisionDetailsComponent, MnpreProvisionComponent, MnpreProvisionFormComponent, MnpreProvisionDetailsComponent, ReprovisionsearchComponent, ApnformComponent, ApnComponent, ApndetailsComponent, MnpreprovsearchComponent, NsareportComponent, SdpmigrationComponent]
})
export class NsaModule { }
