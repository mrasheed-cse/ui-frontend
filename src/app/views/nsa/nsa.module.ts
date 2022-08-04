import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NsaRoutingModule } from './nsa-routing.module';
import { LandingpageComponent } from './landingpage.component';
import { SeriesprovisionComponent } from './seriesprovision.component';
import { DiscreteprovisionComponent } from './discreteprovision.component';
import { DataTableModule } from 'angular4-smart-table';
import { SeriesprovisionformComponent } from './seriesprovisionform.component';
import { HttpClientModule } from '@angular/common/http';
import {GenerateanalyzeComponent} from '../recycle/generateanalyze.component';

import { AgGridModule } from 'ag-grid-angular';
import {UploadRecycleComponent} from "../recycle/uploadrecycle.component";
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
import { RequisitionviewComponent } from './requisitionview/requisitionview.component';
import {GenerateComponent} from '../recycle/generate.component';
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
import { TestsimMyOtherSimsComponent } from './testsim-my-other-sims/testsim-my-other-sims.component';
import { PreventKeysDirective } from './prevent-keys.directive';
import { TestSimActionListTimeExtComponent } from './test-sim-action-list-time-ext/test-sim-action-list-time-ext.component';
import { TestSimActionListLimitExtComponent } from './test-sim-action-list-limit-ext/test-sim-action-list-limit-ext.component';
import { TestSimActionListRechargeComponent } from './test-sim-action-list-recharge/test-sim-action-list-recharge.component';
import { TestSimActionListSurrenderComponent } from './test-sim-action-list-surrender/test-sim-action-list-surrender.component';
import { TestSimActionListLostComponent } from './test-sim-action-list-lost/test-sim-action-list-lost.component';
import { TestSimActionListDamagedComponent } from './test-sim-action-list-damaged/test-sim-action-list-damaged.component';
import { TestSimActionListTransferComponent } from './test-sim-action-list-transfer/test-sim-action-list-transfer.component';
import { TestSimActionListDeactivateComponent } from './test-sim-action-list-deactivate/test-sim-action-list-deactivate.component';


import { TestSimRequisitionComponent } from './isms-reports/test-sim-requisition.component';
import { TestSimActivationComponent } from './isms-reports/test-sim-activation.component';
import { CreditLimitExtensionComponent } from './isms-reports/credit-limit-extension.component';
import { TestSimRechargeComponent } from './isms-reports/test-sim-recharge.component';
import { TestSimDeactivationComponent } from './isms-reports/test-sim-deactivation.component';
import { TimeLimitChangeComponent } from './isms-reports/time-limit-change.component';
import { TestSimSurrenderComponent } from './isms-reports/test-sim-surrender.component';
import { DamageSimComponent } from './isms-reports/damage-sim.component';
import { LostSimComponent } from './isms-reports/lost-sim.component';
import { TestSimTransferComponent } from './isms-reports/test-sim-transfer.component';
import { LostdamagedetailsdeliveryComponent } from './lostdamagedetailsdelivery/lostdamagedetailsdelivery.component';
import { LostdamagenewsimconnectionComponent } from './lostdamagenewsimconnection/lostdamagenewsimconnection.component';
import { SearchPO } from '../SSM/search_po.component';
import { InputFileProcessing } from '../SSM/inputfileprocessing.component';
import{AucProcessor} from '../SSM/auc.component';
import{SimAdmin} from '../SSM/sim_card_admin.component';
import{PlanGenerate} from'../SSM/SimCardPlan Management/plangenerate.component'
import{SimConfiguration} from '../SSM/SimCardPlan Management/simconfiguration.component';
import{SimPackaging} from '../SSM/SimCardPlan Management/simpackaging.compontent';
import{BatchTestingDone} from '../SSM/SimCardPlan Management/batchtestingdone.component';
import{BatchTesting} from '../SSM/SimCardPlan Management/batchtesting.component';
import{PlanActivation} from '../SSM/SimCardPlan Management/planactivation.component';
import{ReturnAndReceive} from '../SSM/SimCardPlan Management/returnandreceive.component';

import{UploadDataWh} from'../SSM/DataWarehouse Management/uploaddata.component';
import{ViewDatawarehouse} from'../SSM/DataWarehouse Management/showdatawarehouse.component';
import{VoucherGeneration} from '../SSM/ScratchCard/voucher_generation.component';
import{VoucherAdmin} from '../SSM/ScratchCard/voucher_admin.component';
import{VoucherManagementApproval} from '../SSM/ScratchCard/voucher_management_pending.component';
import{VoucherGenerationForward} from '../SSM/ScratchCard/voucher_generation_forward_technology.component';
import{VoucherManagementExsisting} from '../SSM/ScratchCard/voucher_management_exsisting.component';
import{VoucherManagementActivationAndView} from '../SSM/ScratchCard/voucher_management_file_and_clc.component';
import {AuthGuard} from './services/AuthGuard.service';
import{UploadForcast} from'../SSM/Report/uploadforcast.component'
import {LoginService} from '../pages/LoginService';
import{ViewProductReport} from'../SSM/Report/viewProductReport.component'
import{VoucherJourney} from '../SSM/ScratchCard/viewvoucher_journey.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ReceivedQuantityManipulation } from '../SSM/SimCardPlan Management/received-quantity-manipulation.component'
import{UnplannedSimManagement} from '../SSM/SimCardPlan Management/unpairedsimmanagement.component';
import { PrePlanGenerate } from '../SSM/SimCardPlan Management/pre-plangenerate.component';

import{SearchVoucherHistory} from '../SSM/ScratchCard/search_voucher_history.component';

import{StockReport}  from'../SSM/Report/stockreport.component';

import{RepPlanGenerate} from'../SSM/SimCardPlan Management/rep-plangenerate.component';
import { RepPrePlanGenerate } from '../SSM/SimCardPlan Management/rep-pre-plangenerate.component';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AgGridModule.withComponents([]),
    NsaRoutingModule,
    ChartsModule
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
    RequisitionviewComponent,
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
    TestsimMyOtherSimsComponent,    
    PreventKeysDirective, TestSimRequisitionComponent, TestSimActivationComponent, CreditLimitExtensionComponent, TestSimRechargeComponent, TestSimDeactivationComponent, TimeLimitChangeComponent, TestSimSurrenderComponent, DamageSimComponent, LostSimComponent, TestSimTransferComponent,
    TestSimActionListTimeExtComponent,
    TestSimActionListLimitExtComponent,
    TestSimActionListRechargeComponent,
    TestSimActionListSurrenderComponent,
    TestSimActionListLostComponent,
    TestSimActionListDamagedComponent,
    TestSimActionListTransferComponent,
    TestSimActionListDeactivateComponent,
    LostdamagedetailsdeliveryComponent,
    LostdamagenewsimconnectionComponent,
    SearchPO,
    InputFileProcessing,
    AucProcessor,
    VoucherGeneration,
    VoucherAdmin,
    SimAdmin,
    VoucherManagementApproval,
    VoucherGenerationForward,VoucherManagementExsisting,VoucherManagementActivationAndView,
    PlanGenerate,
    RepPlanGenerate,
    SimConfiguration,
    SimPackaging,
    BatchTestingDone,
    BatchTesting,
    PlanActivation,
    UploadDataWh,
    ViewDatawarehouse,
    ReturnAndReceive,
    UploadRecycleComponent,
    GenerateanalyzeComponent,
    GenerateComponent,
    UploadForcast,
    VoucherJourney,ViewProductReport,
    ReceivedQuantityManipulation,
    UnplannedSimManagement,
    PrePlanGenerate,
    RepPrePlanGenerate,
    SearchVoucherHistory,
    StockReport
  ],
  providers:[DatePipe, LoginService, AuthGuard]})
export class NsaModule { }
