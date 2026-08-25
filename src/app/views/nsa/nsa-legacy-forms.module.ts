import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { GenerateanalyzeComponent } from '../recycle/generateanalyze.component';
import { UpdatePressNoticeDate } from './updatePressNoticeDate.component';
import { UploadRecycleCsvFile } from './uploadRecyleSMS.component';
import { UploadMFSTaggingCsvFile } from './uploadMFSTagging.component';
import { UploadMFSDeTaggingCsvFile } from './uploadMFSDeTaggingSMS.component';
import { TestsimdashboardComponent } from './testsimdashboard/testsimdashboard.component';
import { SeriesprovisionformComponent } from './seriesprovisionform.component';
import { SeriesprovisionComponent } from './seriesprovision.component';
import { SeriesDefinitionComponent } from './series-definition.component';
import { SeriesDefinitionFormComponent } from './series-definition-form.component';
import { SdpmigrationComponent } from './sdpmigration.component';
import {RequisitionEditNewComponent} from './requisition-edit/requisition-edit.component';
import { RequisitionassignComponent } from './requisitionassign/requisitionassign.component';
import { RequisitiondetailsFormComponent } from './requisitiondetails-form/requisitiondetails-form.component';
import {RequisitiondetailsRAFMComponent} from './requisitiondetails-rafm/requisitiondetails-rafm.component';
import { RequisitiondetailsdeliveryComponent } from './requisitiondetailsdelivery/requisitiondetailsdelivery.component';
import { RequisitiondetailshodComponent } from './requisitiondetailshod/requisitiondetailshod.component';
import { RequisitioneditComponent } from './requisitionedit/requisitionedit.component';
import { SCRequisitiondetailsFormComponent } from './screquisitiondetails-form/screquisitiondetails-form.component';
import { SCRequisitioneditComponent } from './screquisitionedit/screquisitionedit.component';
import { ReProvisionFormComponent } from './re-provision-form.component';
import { ReProvisionComponent } from './re-provision.component';
import { ReprovisionsearchComponent } from './reprovisionsearch.component';

/**
 * A handful of components pulled out of NsaModule into their own module.
 * NsaModule has 150+ declarations, and under Angular 16.2's ngtsc these
 * specific components stopped resolving formGroup/ngModel/bsDatepicker/
 * routerLink directives at AOT template-check time despite NsaModule
 * importing ReactiveFormsModule/FormsModule/BsDatepickerModule/RouterModule
 * correctly. Isolating them in a small module with the same imports
 * resolves it.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDatepickerModule,
    CollapseModule,
  ],
  declarations: [
    GenerateanalyzeComponent,
    UpdatePressNoticeDate,
    UploadRecycleCsvFile,
    UploadMFSTaggingCsvFile,
    UploadMFSDeTaggingCsvFile,
    TestsimdashboardComponent,
    SeriesprovisionformComponent,
    SeriesprovisionComponent,
    SeriesDefinitionComponent,
    SeriesDefinitionFormComponent,
    SdpmigrationComponent,
    RequisitionEditNewComponent,
    RequisitionassignComponent,
    RequisitiondetailsFormComponent,
    RequisitiondetailsRAFMComponent,
    RequisitiondetailsdeliveryComponent,
    RequisitiondetailshodComponent,
    RequisitioneditComponent,
    SCRequisitiondetailsFormComponent,
    SCRequisitioneditComponent,
    ReProvisionFormComponent,
    ReProvisionComponent,
    ReprovisionsearchComponent,
  ],
  exports: [
    GenerateanalyzeComponent,
    UpdatePressNoticeDate,
    UploadRecycleCsvFile,
    UploadMFSTaggingCsvFile,
    UploadMFSDeTaggingCsvFile,
    TestsimdashboardComponent,
    SeriesprovisionformComponent,
    SeriesprovisionComponent,
    SeriesDefinitionComponent,
    SeriesDefinitionFormComponent,
    SdpmigrationComponent,
    RequisitionEditNewComponent,
    RequisitionassignComponent,
    RequisitiondetailsFormComponent,
    RequisitiondetailsRAFMComponent,
    RequisitiondetailsdeliveryComponent,
    RequisitiondetailshodComponent,
    RequisitioneditComponent,
    SCRequisitiondetailsFormComponent,
    SCRequisitioneditComponent,
    ReProvisionFormComponent,
    ReProvisionComponent,
    ReprovisionsearchComponent,
  ],
})
export class NsaLegacyFormsModule { }
