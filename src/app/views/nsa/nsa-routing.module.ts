import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingpageComponent } from './landingpage.component';
import { SeriesprovisionComponent } from './seriesprovision.component';
import { DiscreteprovisionComponent } from './discreteprovision.component';
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


const routes: Routes = [
  {
    path: '',
    component: LandingpageComponent,
    data: {
      title: 'Landing page'
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsaRoutingModule { }

