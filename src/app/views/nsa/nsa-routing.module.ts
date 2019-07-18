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
      title: 'New Requisition'
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
      title: 'Approval'
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsaRoutingModule { }

