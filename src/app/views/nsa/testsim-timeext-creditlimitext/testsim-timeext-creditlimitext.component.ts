import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkflowsService } from './../services/workflows.service';
import { AppGlobals } from './../../../app.global';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';

@Component({
  selector: 'app-testsim-timeext-creditlimitext',
  templateUrl: './testsim-timeext-creditlimitext.component.html',
  styleUrls: ['./testsim-timeext-creditlimitext.component.scss'],
  providers: [WorkflowsService,AppGlobals,LoginService],
})
export class TestsimTimeextCreditlimitextComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
