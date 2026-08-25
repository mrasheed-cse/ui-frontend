import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AgGridModule } from 'ag-grid-angular';

import { TestsimMsisdnreportComponent } from './testsim-msisdnreport/testsim-msisdnreport.component';
import { TestsimMsisdnreportSsmComponent } from './testsim-msisdnreport-ssm/testsim-msisdnreport-ssm.component';
import { TestsimRequisitionhistoryreportComponent } from './testsim-requisitionhistoryreport/testsim-requisitionhistoryreport.component';
import { TestsimMysimsComponent } from './testsim-mysims/testsim-mysims.component';
import { TestsimTimeextComponent } from './testsim-timeext/testsim-timeext.component';
import { TestsimTimeextSsmComponent } from './testsim-timeext-ssm/testsim-timeext-ssm.component';
import { TestsimTimeextHodComponent } from './testsim-timeext-hod/testsim-timeext-hod.component';
import { TestsimTimeextCreditlimitextComponent } from './testsim-timeext-creditlimitext/testsim-timeext-creditlimitext.component';
import { TestsimCreditlimitextComponent } from './testsim-creditlimitext/testsim-creditlimitext.component';
import { TestsimCreditlimitextHodComponent } from './testsim-creditlimitext-hod/testsim-creditlimitext-hod.component';
import { TestsimRechargeComponent } from './testsim-recharge/testsim-recharge.component';
import { TestsimRechargeHodComponent } from './testsim-recharge-hod/testsim-recharge-hod.component';
import { TestsimSurrenderComponent } from './testsim-surrender/testsim-surrender.component';
import { TestsimSurrenderHodComponent } from './testsim-surrender-hod/testsim-surrender-hod.component';
import { TestsimDamagedComponent } from './testsim-damaged/testsim-damaged.component';
import { TestsimDamagedSsmComponent } from './testsim-damaged-ssm/testsim-damaged-ssm.component';
import { TestsimDamagedHodComponent } from './testsim-damaged-hod/testsim-damaged-hod.component';
import { TestsimLostSsComponent } from './testsim-lost-ss/testsim-lost-ss.component';
import { TestsimLostHodComponent } from './testsim-lost-hod/testsim-lost-hod.component';
import { TestsimTransferHodComponent } from './testsim-transfer-hod/testsim-transfer-hod.component';
import { TestsimDeactivationComponent } from './testsim-deactivation/testsim-deactivation.component';
import { TestsimDeactivationHodComponent } from './testsim-deactivation-hod/testsim-deactivation-hod.component';
import { TestsimDeactivationSsmComponent } from './testsim-deactivation-ssm/testsim-deactivation-ssm.component';
import { TestsimCreditlimitextNewComponent } from './testsim-creditlimitext-new/testsim-creditlimitext-new.component';
import { TestsimRechargeNewComponent } from './testsim-recharge-new/testsim-recharge-new.component';
import { TestsimDeactivationNewComponent } from './testsim-deactivation-new/testsim-deactivation-new.component';
import { TestsimDeactivationExistingComponent } from './testsim-deactivation-existing/testsim-deactivation-existing.component';
import { TestsimSurrenderNewComponent } from './testsim-surrender-new/testsim-surrender-new.component';
import { TestsimLostdamagedNewComponent } from './testsim-lostdamaged-new/testsim-lostdamaged-new.component';
import { TestsimTransferNewComponent } from './testsim-transfer-new/testsim-transfer-new.component';
import { TestsimMyOtherSimsComponent } from './testsim-my-other-sims/testsim-my-other-sims.component';
import { TestSimRequisitionComponent } from './isms-reports/test-sim-requisition.component';
import { TestSimActivationComponent } from './isms-reports/test-sim-activation.component';
import { TestSimRechargeComponent } from './isms-reports/test-sim-recharge.component';
import { TestSimDeactivationComponent } from './isms-reports/test-sim-deactivation.component';
import { TestSimSurrenderComponent } from './isms-reports/test-sim-surrender.component';
import { TestSimTransferComponent } from './isms-reports/test-sim-transfer.component';
import { TestSimActionListTimeExtComponent } from './test-sim-action-list-time-ext/test-sim-action-list-time-ext.component';
import { TestSimActionListLimitExtComponent } from './test-sim-action-list-limit-ext/test-sim-action-list-limit-ext.component';
import { TestSimActionListRechargeComponent } from './test-sim-action-list-recharge/test-sim-action-list-recharge.component';
import { TestSimActionListSurrenderComponent } from './test-sim-action-list-surrender/test-sim-action-list-surrender.component';
import { TestSimActionListLostComponent } from './test-sim-action-list-lost/test-sim-action-list-lost.component';
import { TestSimActionListDamagedComponent } from './test-sim-action-list-damaged/test-sim-action-list-damaged.component';
import { TestSimActionListTransferComponent } from './test-sim-action-list-transfer/test-sim-action-list-transfer.component';
import { TestSimActionListDeactivateComponent } from './test-sim-action-list-deactivate/test-sim-action-list-deactivate.component';

/**
 * The testsim-* component family, pulled out of NsaModule into its own
 * module. NsaModule has 150+ declarations, and under Angular 16.2's ngtsc
 * these components stopped resolving routerLink/formGroup/bsDatepicker
 * directives at AOT template-check time despite NsaModule importing
 * RouterModule/ReactiveFormsModule/FormsModule/BsDatepickerModule
 * correctly -- fixing a few at a time kept surfacing more (ngtsc appears
 * to silently under-check very large NgModules). Isolating the whole
 * family in one smaller module resolves it in one pass.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDatepickerModule,
    TooltipModule,
    AgGridModule,
  ],
  declarations: [
    TestsimMsisdnreportComponent,
    TestsimMsisdnreportSsmComponent,
    TestsimRequisitionhistoryreportComponent,
    TestsimMysimsComponent,
    TestsimTimeextComponent,
    TestsimTimeextSsmComponent,
    TestsimTimeextHodComponent,
    TestsimTimeextCreditlimitextComponent,
    TestsimCreditlimitextComponent,
    TestsimCreditlimitextHodComponent,
    TestsimRechargeComponent,
    TestsimRechargeHodComponent,
    TestsimSurrenderComponent,
    TestsimSurrenderHodComponent,
    TestsimDamagedComponent,
    TestsimDamagedSsmComponent,
    TestsimDamagedHodComponent,
    TestsimLostSsComponent,
    TestsimLostHodComponent,
    TestsimTransferHodComponent,
    TestsimDeactivationComponent,
    TestsimDeactivationHodComponent,
    TestsimDeactivationSsmComponent,
    TestsimCreditlimitextNewComponent,
    TestsimRechargeNewComponent,
    TestsimDeactivationNewComponent,
    TestsimDeactivationExistingComponent,
    TestsimSurrenderNewComponent,
    TestsimLostdamagedNewComponent,
    TestsimTransferNewComponent,
    TestsimMyOtherSimsComponent,
    TestSimRequisitionComponent,
    TestSimActivationComponent,
    TestSimRechargeComponent,
    TestSimDeactivationComponent,
    TestSimSurrenderComponent,
    TestSimTransferComponent,
    TestSimActionListTimeExtComponent,
    TestSimActionListLimitExtComponent,
    TestSimActionListRechargeComponent,
    TestSimActionListSurrenderComponent,
    TestSimActionListLostComponent,
    TestSimActionListDamagedComponent,
    TestSimActionListTransferComponent,
    TestSimActionListDeactivateComponent,
  ],
  exports: [
    TestsimMsisdnreportComponent,
    TestsimMsisdnreportSsmComponent,
    TestsimRequisitionhistoryreportComponent,
    TestsimMysimsComponent,
    TestsimTimeextComponent,
    TestsimTimeextSsmComponent,
    TestsimTimeextHodComponent,
    TestsimTimeextCreditlimitextComponent,
    TestsimCreditlimitextComponent,
    TestsimCreditlimitextHodComponent,
    TestsimRechargeComponent,
    TestsimRechargeHodComponent,
    TestsimSurrenderComponent,
    TestsimSurrenderHodComponent,
    TestsimDamagedComponent,
    TestsimDamagedSsmComponent,
    TestsimDamagedHodComponent,
    TestsimLostSsComponent,
    TestsimLostHodComponent,
    TestsimTransferHodComponent,
    TestsimDeactivationComponent,
    TestsimDeactivationHodComponent,
    TestsimDeactivationSsmComponent,
    TestsimCreditlimitextNewComponent,
    TestsimRechargeNewComponent,
    TestsimDeactivationNewComponent,
    TestsimDeactivationExistingComponent,
    TestsimSurrenderNewComponent,
    TestsimLostdamagedNewComponent,
    TestsimTransferNewComponent,
    TestsimMyOtherSimsComponent,
    TestSimRequisitionComponent,
    TestSimActivationComponent,
    TestSimRechargeComponent,
    TestSimDeactivationComponent,
    TestSimSurrenderComponent,
    TestSimTransferComponent,
    TestSimActionListTimeExtComponent,
    TestSimActionListLimitExtComponent,
    TestSimActionListRechargeComponent,
    TestSimActionListSurrenderComponent,
    TestSimActionListLostComponent,
    TestSimActionListDamagedComponent,
    TestSimActionListTransferComponent,
    TestSimActionListDeactivateComponent,
  ],
})
export class NsaTestSimModule { }
