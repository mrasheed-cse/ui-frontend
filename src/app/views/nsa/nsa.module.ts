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
import { NsaLegacyFormsModule } from './nsa-legacy-forms.module';
import { NsaTestSimModule } from './nsa-testsim.module';
import { NsaTestSimStraysModule } from './nsa-testsim-strays.module';
import { LandingpageComponent } from './landingpage.component';
import { DiscreteprovisionComponent } from './discreteprovision.component';
import { HttpClientModule } from '@angular/common/http';

import { AgGridModule } from 'ag-grid-angular';
import {UploadRecycleComponent} from "../recycle/uploadrecycle.component";
import { SeriesprovisiondetailComponent } from './seriesprovisiondetail.component';
import { SeriesDefinitionDetailsComponent } from './series-definition-details.component';
import { DeProvisionComponent } from './de-provision.component';
import { DeProvisionFormComponent } from './de-provision-form.component';
import { DeProvisionDetailsComponent } from './de-provision-details.component';
import{UploadfileswithBatchIdComponent} from './uploadfileswith-batch-id.component';
import { ReProvisionDetailsComponent } from './re-provision-details.component';
import { MnpreProvisionComponent } from './mnpre-provision.component';
import { MnpreProvisionFormComponent } from './mnpre-provision-form.component';
import { MnpreProvisionDetailsComponent } from './mnpre-provision-details.component';
import { ApnformComponent } from './apnform.component';
import { ApnComponent } from './apn.component';
import { ApndetailsComponent } from './apndetails.component';
import { MnpreprovsearchComponent } from './mnpreprovsearch.component';
import { NsareportComponent } from './nsareport.component';
import { DiscreteprovisionformComponent } from './discreteprovisionform.component';
import { DiscreteprovisiondetailsComponent } from './discreteprovisiondetails.component';
import { MasterdatamgmtComponent } from './masterdatamgmt.component';
import { NewrequisitioninitiateComponent } from './newrequisitioninitiate.component';
//test sc cr 
import { NewscrequisitioninitiateComponent } from './newscrequisitioninitiate.component'
import {NewscrequisitiondetailsComponent} from './newscrequisitiondetails.component';
import {NewscrequisitionComponent} from './newscrequisition.component';
import {NewscreportComponent} from './newscreport.component';
import { NewrequisitiondetailsComponent } from './newrequisitiondetails.component';
import { NewrequisitionComponent } from './newrequisition.component';
import { RequisitionviewComponent } from './requisitionview/requisitionview.component';
import {GenerateComponent} from '../recycle/generate.component';
import { NewsimactivationreqComponent } from './newsimactivationreq/newsimactivationreq.component';
import { ActivationrequeststatusComponent } from './activationrequeststatus/activationrequeststatus.component';
import { ActivationPendingregistrationsComponent } from './activation-pendingregistrations/activation-pendingregistrations.component';
import { ActivationPendingapprovalsComponent } from './activation-pendingapprovals/activation-pendingapprovals.component';
import { NewsimactivationreqDetailsComponent } from './newsimactivationreq-details/newsimactivationreq-details.component';

import { PreventKeysDirective } from './prevent-keys.directive';


import { CreditLimitExtensionComponent } from './isms-reports/credit-limit-extension.component';
import { AMSReportComponent } from './isms-reports/ams-report.component';
import { TimeLimitChangeComponent } from './isms-reports/time-limit-change.component';
import { DamageSimComponent } from './isms-reports/damage-sim.component';
import { LostSimComponent } from './isms-reports/lost-sim.component';
import { LostdamagedetailsdeliveryComponent } from './lostdamagedetailsdelivery/lostdamagedetailsdelivery.component';
import { LostdamagenewsimconnectionComponent } from './lostdamagenewsimconnection/lostdamagenewsimconnection.component';
import { SearchPO } from '../SSM/search_po.component';
import { InputFileProcessing } from '../SSM/inputfileprocessing.component';
import{AucProcessor} from '../SSM/auc.component';
import { HuaweiAucProcessor } from '../SSM/huaweiauc.component';
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
import { NgChartsModule } from 'ng2-charts';
import { ReceivedQuantityManipulation } from '../SSM/SimCardPlan Management/received-quantity-manipulation.component'
import{UnplannedSimManagement} from '../SSM/SimCardPlan Management/unpairedsimmanagement.component';
import { PrePlanGenerate } from '../SSM/SimCardPlan Management/pre-plangenerate.component';

import{SearchVoucherHistory} from '../SSM/ScratchCard/search_voucher_history.component';

import{StockReport}  from'../SSM/Report/stockreport.component';

import{RepPlanGenerate} from'../SSM/SimCardPlan Management/rep-plangenerate.component';
import { RepPrePlanGenerate } from '../SSM/SimCardPlan Management/rep-pre-plangenerate.component';
import { SCRequisitionviewComponent } from './screquisitionview/screquisitionview.component';
import { TestscDeactivationComponent } from './testscdeactivation.component';
import {MfsRecyclingSummaryReportComponent} from './mfs-recycling-summary-report.component';
import {DownloadsMfsRecyclingSummaryReportComponent} from './download-mfs-recycling-summary-report.component';
import {SharedMessageService} from './services/shared-message.service';
import {MfsRecyclingDetailsReportComponent} from './mfs-recycling-details-report.component';
import {MfsStatusOfMsisdnComponent} from './mfs-status-of-msisdn.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ViewDatawarehouseCopc} from '../SSM/DataWarehouse Management/Copc/showdatawarehouse-copc.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //HttpClientModule,
    CollapseModule,
    BsDatepickerModule.forRoot(),
    AgGridModule,
    NsaRoutingModule,
    NsaLegacyFormsModule,
    NsaTestSimModule,
    NsaTestSimStraysModule,
    NgChartsModule,
    TooltipModule
  ],
  declarations: [
    LandingpageComponent,
    DiscreteprovisionComponent,
    SeriesprovisiondetailComponent,
    SeriesDefinitionDetailsComponent,
    DeProvisionComponent,
    DeProvisionFormComponent,
    DeProvisionDetailsComponent,
    UploadfileswithBatchIdComponent,
    ReProvisionDetailsComponent,
    MnpreProvisionComponent,
    MnpreProvisionFormComponent,
    MnpreProvisionDetailsComponent,
    ApnformComponent,
    ApnComponent,
    ApndetailsComponent,
    MnpreprovsearchComponent,
    NsareportComponent,
    DiscreteprovisionformComponent,
    DiscreteprovisiondetailsComponent,
    MasterdatamgmtComponent,
    NewrequisitioninitiateComponent,
    //test sc cr
    NewscrequisitioninitiateComponent,
    NewscrequisitiondetailsComponent,
    TestscDeactivationComponent,
    NewscrequisitionComponent,
    NewscreportComponent,
    NewrequisitiondetailsComponent,
    NewrequisitionComponent,
    RequisitionviewComponent,
    SCRequisitionviewComponent,
    NewsimactivationreqComponent,
    ActivationrequeststatusComponent,
    ActivationPendingregistrationsComponent,
    ActivationPendingapprovalsComponent,
    NewsimactivationreqDetailsComponent,    
    
    PreventKeysDirective, CreditLimitExtensionComponent, TimeLimitChangeComponent, DamageSimComponent, LostSimComponent,    LostdamagedetailsdeliveryComponent,
    LostdamagenewsimconnectionComponent,
    AMSReportComponent,
    SearchPO,
    InputFileProcessing,
    AucProcessor,
    HuaweiAucProcessor,
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
    ViewDatawarehouseCopc,
    ReturnAndReceive,
    UploadRecycleComponent,
    GenerateComponent,
    UploadForcast,
    VoucherJourney,ViewProductReport, UploadfileswithBatchIdComponent,
    ReceivedQuantityManipulation,
    UnplannedSimManagement,
    PrePlanGenerate,
    RepPrePlanGenerate,
    SearchVoucherHistory,
    StockReport,
    //    SCRequisitionviewComponent,
    MfsRecyclingSummaryReportComponent,
    DownloadsMfsRecyclingSummaryReportComponent,
    MfsRecyclingDetailsReportComponent,
    MfsStatusOfMsisdnComponent,
  ],
  providers:[DatePipe, LoginService, AuthGuard, SharedMessageService]})
export class NsaModule { }
