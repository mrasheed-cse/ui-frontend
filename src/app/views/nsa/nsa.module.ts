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
import { DiscreteprovisionformComponent } from './discreteprovisionform.component';
import { DiscreteprovisiondetailsComponent } from './discreteprovisiondetails.component';
import { MasterdatamgmtComponent } from './masterdatamgmt.component';
import { NewrequisitioninitiateComponent } from './newrequisitioninitiate.component';
import { NewrequisitiondetailsComponent } from './newrequisitiondetails.component';
import { NewrequisitionComponent } from './newrequisition.component';
import { RequisitiondetailsFormComponent } from './requisitiondetails-form/requisitiondetails-form.component';
import { RequisitionassignComponent } from './requisitionassign/requisitionassign.component';
import { RequisitiondetailshodComponent } from './requisitiondetailshod/requisitiondetailshod.component';
import { RequisitiondetailsdeliveryComponent } from './requisitiondetailsdelivery/requisitiondetailsdelivery.component';
import { RequisitioneditComponent } from './requisitionedit/requisitionedit.component';

import { TestsimdashboardComponent } from './testsimdashboard/testsimdashboard.component';
import { NewsimactivationreqComponent } from './newsimactivationreq/newsimactivationreq.component';
import { ActivationrequeststatusComponent } from './activationrequeststatus/activationrequeststatus.component';
import { ActivationPendingregistrationsComponent } from './activation-pendingregistrations/activation-pendingregistrations.component';
import { ActivationPendingapprovalsComponent } from './activation-pendingapprovals/activation-pendingapprovals.component';
import { TestsimMsisdnreportComponent } from './testsim-msisdnreport/testsim-msisdnreport.component';
import { TestsimMsisdnreportSsmComponent } from './testsim-msisdnreport-ssm/testsim-msisdnreport-ssm.component';
import { TestsimRequisitionhistoryreportComponent } from './testsim-requisitionhistoryreport/testsim-requisitionhistoryreport.component';
import { TestsimMysimsComponent } from './testsim-mysims/testsim-mysims.component';
import { TestsimTimeextComponent } from './testsim-timeext/testsim-timeext.component';
import { TestsimTimeextSsmComponent } from './testsim-timeext-ssm/testsim-timeext-ssm.component';
import { TestsimTimeextHodComponent } from './testsim-timeext-hod/testsim-timeext-hod.component';
import { TestsimTimeextCreditlimitextComponent } from './testsim-timeext-creditlimitext/testsim-timeext-creditlimitext.component';
import { TestsimCreditlimitextComponent } from './testsim-creditlimitext/testsim-creditlimitext.component';
import { TestsimCreditlimitextSsmComponent } from './testsim-creditlimitext-ssm/testsim-creditlimitext-ssm.component';
import { TestsimCreditlimitextHodComponent } from './testsim-creditlimitext-hod/testsim-creditlimitext-hod.component';
import { TestsimRechargeComponent } from './testsim-recharge/testsim-recharge.component';
import { TestsimRechargeSsmComponent } from './testsim-recharge-ssm/testsim-recharge-ssm.component';
import { TestsimRechargeHodComponent } from './testsim-recharge-hod/testsim-recharge-hod.component';
import { TestsimSurrenderComponent } from './testsim-surrender/testsim-surrender.component';
import { TestsimSurrenderHodComponent } from './testsim-surrender-hod/testsim-surrender-hod.component';
import { TestsimSurrenderSsmComponent } from './testsim-surrender-ssm/testsim-surrender-ssm.component';
import { TestsimDamagedComponent } from './testsim-damaged/testsim-damaged.component';
import { TestsimDamagedSsmComponent } from './testsim-damaged-ssm/testsim-damaged-ssm.component';
import { TestsimDamagedHodComponent } from './testsim-damaged-hod/testsim-damaged-hod.component';
import { TestsimLostComponent } from './testsim-lost/testsim-lost.component';
import { TestsimLostSsComponent } from './testsim-lost-ss/testsim-lost-ss.component';
import { TestsimLostSsmComponent } from './testsim-lost-ssm/testsim-lost-ssm.component';
import { TestsimLostHodComponent } from './testsim-lost-hod/testsim-lost-hod.component';
import { TestsimTransferComponent } from './testsim-transfer/testsim-transfer.component';
import { TestsimTransferHodComponent } from './testsim-transfer-hod/testsim-transfer-hod.component';
import { TestsimTransferSsmComponent } from './testsim-transfer-ssm/testsim-transfer-ssm.component';
import { TestsimDeactivationComponent } from './testsim-deactivation/testsim-deactivation.component';
import { TestsimDeactivationHodComponent } from './testsim-deactivation-hod/testsim-deactivation-hod.component';
import { TestsimDeactivationSsmComponent } from './testsim-deactivation-ssm/testsim-deactivation-ssm.component';
import { NewsimactivationreqDetailsComponent } from './newsimactivationreq-details/newsimactivationreq-details.component';

import { TestsimCreditlimitextNewComponent } from './testsim-creditlimitext-new/testsim-creditlimitext-new.component';
import { TestsimCreditLimitextExistingComponent } from './testsim-credit-limitext-existing/testsim-credit-limitext-existing.component';
import { TestsimRechargeNewComponent } from './testsim-recharge-new/testsim-recharge-new.component';
import { TestsimRechargeExistingComponent } from './testsim-recharge-existing/testsim-recharge-existing.component';
import { TestsimDeactivationNewComponent } from './testsim-deactivation-new/testsim-deactivation-new.component';
import { TestsimDeactivationExistingComponent } from './testsim-deactivation-existing/testsim-deactivation-existing.component';
import { TestsimSurrenderNewComponent } from './testsim-surrender-new/testsim-surrender-new.component';
import { TestsimSurrenderExistingComponent } from './testsim-surrender-existing/testsim-surrender-existing.component';
import { TestsimLostdamagedNewComponent } from './testsim-lostdamaged-new/testsim-lostdamaged-new.component';
import { TestsimLostdamagedExistingComponent } from './testsim-lostdamaged-existing/testsim-lostdamaged-existing.component';
import { TestsimTransferNewComponent } from './testsim-transfer-new/testsim-transfer-new.component';
import { TestsimTransferExistingComponent } from './testsim-transfer-existing/testsim-transfer-existing.component';

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
  declarations: [
    LandingpageComponent,
    SeriesprovisionComponent,
    DiscreteprovisionComponent,
    SeriesprovisionformComponent,
    SeriesprovisiondetailComponent,
    SeriesDefinitionComponent,
    SeriesDefinitionFormComponent,
    SeriesDefinitionDetailsComponent,
    DeProvisionComponent,
    DeProvisionFormComponent,
    DeProvisionDetailsComponent,
    ReProvisionComponent,
    ReProvisionFormComponent,
    ReProvisionDetailsComponent,
    MnpreProvisionComponent,
    MnpreProvisionFormComponent,
    MnpreProvisionDetailsComponent,
    ReprovisionsearchComponent,
    ApnformComponent,
    ApnComponent,
    ApndetailsComponent,
    MnpreprovsearchComponent,
    NsareportComponent,
    SdpmigrationComponent,
    DiscreteprovisionformComponent,
    DiscreteprovisiondetailsComponent,
    MasterdatamgmtComponent,
    NewrequisitioninitiateComponent,
    NewrequisitiondetailsComponent,
    NewrequisitionComponent,
    RequisitiondetailsFormComponent,
    RequisitionassignComponent,
    RequisitiondetailshodComponent,
    RequisitiondetailsdeliveryComponent,
    RequisitioneditComponent,
    TestsimdashboardComponent,
    NewsimactivationreqComponent,
    ActivationrequeststatusComponent,
    ActivationPendingregistrationsComponent,
    ActivationPendingapprovalsComponent,
    TestsimMsisdnreportComponent,
    TestsimMsisdnreportSsmComponent,
    TestsimRequisitionhistoryreportComponent,
    TestsimMysimsComponent,
    TestsimTimeextComponent,
    TestsimTimeextSsmComponent,
    TestsimTimeextHodComponent,
    TestsimTimeextCreditlimitextComponent,
    TestsimCreditlimitextComponent,
    TestsimCreditlimitextSsmComponent,
    TestsimCreditlimitextHodComponent,
    TestsimRechargeComponent,
    TestsimRechargeSsmComponent,
    TestsimRechargeHodComponent,
    TestsimSurrenderComponent,
    TestsimSurrenderHodComponent,
    TestsimSurrenderSsmComponent,
    TestsimDamagedComponent,
    TestsimDamagedSsmComponent,
    TestsimDamagedHodComponent,
    TestsimLostComponent,
    TestsimLostSsComponent,
    TestsimLostSsmComponent,
    TestsimLostHodComponent,
    TestsimTransferComponent,
    TestsimTransferHodComponent,
    TestsimTransferSsmComponent,
    TestsimDeactivationComponent,
    TestsimDeactivationHodComponent,
    TestsimDeactivationSsmComponent,
    NewsimactivationreqDetailsComponent,    
    TestsimCreditlimitextNewComponent,
    TestsimCreditLimitextExistingComponent,
    TestsimRechargeNewComponent,
    TestsimRechargeExistingComponent,
    TestsimDeactivationNewComponent,
    TestsimDeactivationExistingComponent,
    TestsimSurrenderNewComponent,
    TestsimSurrenderExistingComponent,
    TestsimLostdamagedNewComponent,
    TestsimLostdamagedExistingComponent,
    TestsimTransferNewComponent,
    TestsimTransferExistingComponent,
  ]
})
export class NsaModule { }
