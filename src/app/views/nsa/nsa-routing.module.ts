import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingpageComponent } from './landingpage.component';
import { SeriesprovisionComponent } from './seriesprovision.component';
import { DiscreteprovisionComponent } from './discreteprovision.component';
import { SeriesprovisionformComponent } from './seriesprovisionform.component';
import { SeriesprovisiondetailComponent } from './seriesprovisiondetail.component';

const routes: Routes = [
  {
    path: '',
    component: LandingpageComponent,
    data: {
      title: 'Landing page'
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
    path: 'seriesprovisiondetail/:wr_ID',
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

