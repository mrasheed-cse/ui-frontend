import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingpageComponent } from './landingpage.component';
import { SeriesprovisionComponent } from './seriesprovision.component';
import { SeriesprovisionformComponent } from './seriesprovisionform.component';
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
import { DiscreteprovisionComponent } from './discreteprovision.component';
import { DiscreteprovisionformComponent } from './discreteprovisionform.component';
import { DiscreteprovisiondetailsComponent } from './discreteprovisiondetails.component';
import { MasterdatamgmtComponent } from './masterdatamgmt.component';
import { NewrequisitioninitiateComponent } from './newrequisitioninitiate.component';
import { NewrequisitiondetailsComponent } from './newrequisitiondetails.component';
import { NewrequisitionComponent } from './newrequisition.component';
import {RequisitiondetailsFormComponent} from './requisitiondetails-form/requisitiondetails-form.component';
import { RequisitionassignComponent } from './requisitionassign/requisitionassign.component';
import { RequisitiondetailshodComponent } from './requisitiondetailshod/requisitiondetailshod.component';
import { RequisitiondetailsdeliveryComponent } from './requisitiondetailsdelivery/requisitiondetailsdelivery.component';
import { RequisitioneditComponent } from './requisitionedit/requisitionedit.component';
import { NewsimactivationreqComponent } from './newsimactivationreq/newsimactivationreq.component';
import { TestsimdashboardComponent } from './testsimdashboard/testsimdashboard.component';
import { ActivationrequeststatusComponent } from './activationrequeststatus/activationrequeststatus.component';
import { TestsimTransferSsmComponent } from './testsim-transfer-ssm/testsim-transfer-ssm.component';
import { TestsimTransferHodComponent } from './testsim-transfer-hod/testsim-transfer-hod.component';
import { TestsimTransferComponent } from './testsim-transfer/testsim-transfer.component';
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
import { TestsimMysimsComponent } from './testsim-mysims/testsim-mysims.component';
import { ActivationPendingregistrationsComponent } from './activation-pendingregistrations/activation-pendingregistrations.component';
import { TestsimRequisitionhistoryreportComponent } from './testsim-requisitionhistoryreport/testsim-requisitionhistoryreport.component';
import { TestsimMsisdnreportSsmComponent } from './testsim-msisdnreport-ssm/testsim-msisdnreport-ssm.component';
import { TestsimMsisdnreportComponent } from './testsim-msisdnreport/testsim-msisdnreport.component';
import { ActivationPendingapprovalsComponent } from './activation-pendingapprovals/activation-pendingapprovals.component';


const routes: Routes = [
  {
    path: '',
    component: LandingpageComponent,
    data: {
      title: 'Landing page'
    }
  },
  {
    path: 'discprovision',
    component: DiscreteprovisionComponent,
    data: {
      title: 'Discreteprovision'
    }
  },
  {
    path: 'discprovisionform',
    component: DiscreteprovisionformComponent,
    data: {
      title: 'Discreteprovision form'
    }
  },
  {
    path: 'discprovisiondetail/:wr_BriefName/:wr_BriefId/:hopSequence',
    component: DiscreteprovisiondetailsComponent,
    data: {
      title: 'Discreteprovision details'
    }
  },
  {
    path: 'nsareport',
    component: NsareportComponent,
    data: {
      title: 'Report Module'
    }
  },
  {
    path: 'sdpmigration',
    component: SdpmigrationComponent,
    data: {
      title: 'Sdp Migration'
    }
  },
  {
    path: 'seriesdefinition',
    component: SeriesDefinitionComponent,
    data: {
      title: 'Series Definition'
    }
  },
  {
    path: 'seriesdefintionform',
    component: SeriesDefinitionFormComponent,
    data: {
      title: 'Series Definition Form'
    }
  },
  {
    path: 'seriesdefinitiondetail/:wr_BriefName/:wr_BriefId/:hopSequence',
    component: SeriesDefinitionDetailsComponent,
    data: {
      title: 'Series Definition Workflow'
    }
  },
  {
    path: 'deprovision',
    component: DeProvisionComponent,
    data: {
      title: 'De-Provision'
    }
  },
  {
    path: 'deprovisionform',
    component: DeProvisionFormComponent,
    data: {
      title: 'De-Provision Form'
    }
  },
  {
    path: 'deprovisiondetail/:wr_BriefName/:wr_BriefId/:hopSequence',
    component: DeProvisionDetailsComponent,
    data: {
      title: 'De-Provision Workflow'
    }
  },
  {
    path: 'reprovision',
    component: ReProvisionComponent,
    data: {
      title: 'Re-Provision'
    }
  },
  {
    path: 'reprovisionform',
    component: ReProvisionFormComponent,
    data: {
      title: 'Re-Provision Form'
    }
  },
  {
    path: 'reprovisionsearch',
    component: ReprovisionsearchComponent,
    data: {
      title: 'Re-Provision Search Form'
    }
  },

  {
    path: 'reprovisiondetail/:wr_BriefName/:wr_BriefId/:hopSequence',
    component: ReProvisionDetailsComponent,
    data: {
      title: 'Re-Provision Workflow'
    }
  },


  {
    path: 'mnpreprovision',
    component: MnpreProvisionComponent,
    data: {
      title: 'MNP Re-Provision'
    }
  },
  {
    path: 'mnpreprovisionform',
    component: MnpreProvisionFormComponent,
    data: {
      title: 'MNP Re-Provision Form'
    }
  },
  {
    path: 'mnpreprovisionsearch',
    component: MnpreprovsearchComponent,
    data: {
      title: 'MNP Re-Provision Search Form'
    }
  },
  {
    path: 'mnpreprovisiondetail/:wr_BriefName/:wr_BriefId/:hopSequence',
    component: MnpreProvisionDetailsComponent,
    data: {
      title: 'MNP Re-Provision Workflow'
    }
  },


  {
    path: 'seriesprovision',
    component: SeriesprovisionComponent,
    data: {
      title: 'Series Provision'
    }
  },
  {
    path: 'seriesprovisionform',
    component: SeriesprovisionformComponent,
    data: {
      title: 'Series Provision Form'
    }
  },
  {
    path: 'seriesprovisiondetail/:wr_BriefName/:wr_BriefId/:hopSequence',
    component: SeriesprovisiondetailComponent,
    data: {
      title: 'Series Provision Workflow'
    }
  },
  {
    path: 'discreteprovision',
    component: DiscreteprovisionComponent,
    data: {
      title: 'Discrete Provision'
    }
  },
  {
    path: 'apn',
    component: ApnComponent,
    data: {
      title: 'APN'
    }
  },
  {
    path: 'apnform',
    component: ApnformComponent,
    data: {
      title: 'Apn Form'
    }
  },
  {
    path: 'apndetails/:wr_BriefName/:wr_BriefId/:hopSequence',
    component: ApndetailsComponent,
    data: {
      title: 'APN Creation Workflow'
    }
  },
  {
    path: 'masterdatamgmt',
    component: MasterdatamgmtComponent,
    data: {
      title: 'Master Data Management'
    }
  },
  {
    path: 'newrequisition',
    component: NewrequisitionComponent,
    data: {
      title: 'Pending for Approval'
    }
  },
  {
    path: 'newrequisitioninitiation',
    component: NewrequisitioninitiateComponent,
    data: {
      title: 'New requisition initiate'
    }
  },
  {
    path: 'newrequisitiondetails',
    component: NewrequisitiondetailsComponent,
    data: {
      title: 'My Requests (Requisition Details)'
    }
  },
  {
    path: 'requisitionedit/:requisition_id',
    component: RequisitioneditComponent,
    data: {
      title: 'Requisition Details (Revision by end user)'
    }
  },
  {
    path: 'requisitiondetailsassesment/:requisition_id',
    component: RequisitiondetailsFormComponent,
    data: {
      title: 'Requisition Details (Assessment) - SSM User Group'
    }
  },
  {
    path: 'requisitionassign/:requisition_id',
    component: RequisitionassignComponent,
    data: {
      title: 'Requisition Details (assignment) - SSM User Group'
    }
  },
  {
    path: 'requisitiondetailshod/:requisition_id',
    component: RequisitiondetailshodComponent,
    data: {
      title: 'Requisition Details - for HOD User'
    }
  },
  {
    path: 'requisitiondetailsdelivery/:requisition_id',
    component: RequisitiondetailsdeliveryComponent,
    data: {
      title: 'Requisition Details (Delivery) - CLC User Group'
    }
  },
  {
    path: 'newsimactivationreq',
    component: NewsimactivationreqComponent,
    data: {
      title: 'New Test SIM Activation Request'
    }
  },
  {
    path: 'testsimdashboard',
    component: TestsimdashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'activationrequeststatus',
    component: ActivationrequeststatusComponent,
    data: {
      title: 'Existing Test SIM Activation Requests'
    }
  },
  {
    path: 'activation-pendingregistrations',
    component: ActivationPendingregistrationsComponent,
    data: {
      title: 'Activation Requests - Pending for Registration'
    }
  },
  {
    path: 'activation-pendingapprovals',
    component: ActivationPendingapprovalsComponent,
    data: {
      title: 'Activation Requests - Pending for Approval'
    }
  },
  {
    path: 'testsim-msisdnreport',
    component: TestsimMsisdnreportComponent,
    data: {
      title: 'MSISDN Status Report'
    }
  },
  {
    path: 'testsim-msisdnreport-ssm',
    component: TestsimMsisdnreportSsmComponent,
    data: {
      title: 'MSISDN Status Report (for SSM)'
    }
  },
  {
    path: 'testsim-requisitionhistoryreport',
    component: TestsimRequisitionhistoryreportComponent,
    data: {
      title: 'Requisition History Report'
    }
  },
  /*{
    path: 'testsim-requeststatus',
    component: Testsimrequeststatuscomponent,
    data: {
      title: 'Request status'
    }
  },*/
  {
    path: 'testsim-mysims',
    component: TestsimMysimsComponent,
    data: {
      title: 'My SIMs'
    }
  },
  {
    path: 'testsim-timeext',
    component: TestsimTimeextComponent,
    data: {
      title: 'Time Limit Extension'
    }
  },
  {
    path: 'testsim-timeext-ssm',
    component: TestsimTimeextSsmComponent,
    data: {
      title: 'Time Limit Extension - SSM approval'
    }
  },
  {
    path: 'testsim-timeext-hod',
    component: TestsimTimeextHodComponent,
    data: {
      title: 'Time Limit Extension - HOD approval'
    }
  },
  {
    path: 'testsim-creditlimitext',
    component: TestsimCreditlimitextComponent,
    data: {
      title: 'Credit Limit Extension'
    }
  },
  {
    path: 'testsim-creditlimitext-ssm',
    component: TestsimCreditlimitextSsmComponent,
    data: {
      title: 'Credit Limit Extension - SSM Approval'
    }
  },
  {
    path: 'testsim-creditlimitext-hod',
    component: TestsimCreditlimitextHodComponent,
    data: {
      title: 'Credit Limit Extension - HOD Approval'
    }
  },
  {
    path: 'testsim-recharge',
    component: TestsimRechargeComponent,
    data: {
      title: 'Recharge'
    }
  },
  {
    path: 'testsim-recharge-ssm',
    component: TestsimRechargeSsmComponent,
    data: {
      title: 'Recharge - SSM approval'
    }
  },
  {
    path: 'testsim-recharge-hod',
    component: TestsimRechargeHodComponent,
    data: {
      title: 'Recharge - HOD approval'
    }
  },
  {
    path: 'testsim-surrender',
    component: TestsimSurrenderComponent,
    data: {
      title: 'Surrender'
    }
  },
  {
    path: 'testsim-surrender-hod',
    component: TestsimSurrenderHodComponent,
    data: {
      title: 'Surrender - HOD approval'
    }
  },
  {
    path: 'testsim-surrender-ssm',
    component: TestsimSurrenderSsmComponent,
    data: {
      title: 'Surrender - SSM approval'
    }
  },
  {
    path: 'testsim-damaged',
    component: TestsimDamagedComponent,
    data: {
      title: 'Damaged Test SIM'
    }
  },
  {
    path: 'testsim-damaged-ssm',
    component: TestsimDamagedSsmComponent,
    data: {
      title: 'Damaged Test SIM - SSM approval'
    }
  },
  {
    path: 'testsim-damaged-hod',
    component: TestsimDamagedHodComponent,
    data: {
      title: 'Damaged Test SIM - HOD approval'
    }
  },
  {
    path: 'testsim-lost',
    component: TestsimLostComponent,
    data: {
      title: 'Lost Test SIM'
    }
  },
  {
    path: 'testsim-lost-ssm',
    component: TestsimLostSsmComponent,
    data: {
      title: 'Lost Test SIM - SSM approval'
    }
  },
  {
    path: 'testsim-lost-hod',
    component: TestsimLostHodComponent,
    data: {
      title: 'Lost Test SIM - HOD approval'
    }
  },
  {
    path: 'testsim-transfer',
    component: TestsimTransferComponent,
    data: {
      title: 'Transfer'
    }
  },
  {
    path: 'testsim-transfer-hod',
    component: TestsimTransferHodComponent,
    data: {
      title: 'Transfer - HOD approval'
    }
  },
  {
    path: 'testsim-transfer-ssm',
    component: TestsimTransferSsmComponent,
    data: {
      title: 'Transfer - SSM approval'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsaRoutingModule { }
