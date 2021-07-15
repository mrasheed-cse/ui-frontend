import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkflowsService } from './../services/workflows.service';
import { AppGlobals } from './../../../app.global';

import { LoginService } from '../../pages/LoginService';

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
