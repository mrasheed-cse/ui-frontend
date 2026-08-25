import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AgGridModule } from 'ag-grid-angular';

import { TestsimCreditLimitextExistingComponent } from './testsim-credit-limitext-existing/testsim-credit-limitext-existing.component';
import { TestsimCreditlimitextSsmComponent } from './testsim-creditlimitext-ssm/testsim-creditlimitext-ssm.component';
import { TestsimLostSsmComponent } from './testsim-lost-ssm/testsim-lost-ssm.component';
import { TestsimLostComponent } from './testsim-lost/testsim-lost.component';
import { TestsimLostdamagedExistingComponent } from './testsim-lostdamaged-existing/testsim-lostdamaged-existing.component';
import { TestsimRechargeExistingComponent } from './testsim-recharge-existing/testsim-recharge-existing.component';
import { TestsimRechargeSsmComponent } from './testsim-recharge-ssm/testsim-recharge-ssm.component';
import { TestsimSurrenderExistingComponent } from './testsim-surrender-existing/testsim-surrender-existing.component';
import { TestsimSurrenderSsmComponent } from './testsim-surrender-ssm/testsim-surrender-ssm.component';
import { TestsimTransferExistingComponent } from './testsim-transfer-existing/testsim-transfer-existing.component';
import { TestsimTransferSsmComponent } from './testsim-transfer-ssm/testsim-transfer-ssm.component';
import { TestsimTransferComponent } from './testsim-transfer/testsim-transfer.component';

/**
 * 12 straggler components that still failed AOT template-checking even
 * after being extracted into the (57-declaration) NsaTestSimModule.
 * Splitting them into this much smaller module resolves them. See
 * project_nsa_module_ngtsc_scale_bug memory for the full investigation.
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
    TestsimCreditLimitextExistingComponent,
    TestsimCreditlimitextSsmComponent,
    TestsimLostSsmComponent,
    TestsimLostComponent,
    TestsimLostdamagedExistingComponent,
    TestsimRechargeExistingComponent,
    TestsimRechargeSsmComponent,
    TestsimSurrenderExistingComponent,
    TestsimSurrenderSsmComponent,
    TestsimTransferExistingComponent,
    TestsimTransferSsmComponent,
    TestsimTransferComponent,
  ],
  exports: [
    TestsimCreditLimitextExistingComponent,
    TestsimCreditlimitextSsmComponent,
    TestsimLostSsmComponent,
    TestsimLostComponent,
    TestsimLostdamagedExistingComponent,
    TestsimRechargeExistingComponent,
    TestsimRechargeSsmComponent,
    TestsimSurrenderExistingComponent,
    TestsimSurrenderSsmComponent,
    TestsimTransferExistingComponent,
    TestsimTransferSsmComponent,
    TestsimTransferComponent,
  ],
})
export class NsaTestSimStraysModule { }
