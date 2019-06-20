import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { DefinitionDataService } from './services/definitiondata.service';
import { WorkflowsService } from './services/workflows.service';
import { Observable } from 'rxjs/Observable';
import { AppGlobals } from './../../app.global';
import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser'; 




@Component({
  selector: 'app-newrequisitioninitiate',
  templateUrl: './newrequisitioninitiate.component.html',
  styles: [],
  providers: [DefinitionDataService,WorkflowsService,AppGlobals,LoginService]
})
export class NewrequisitioninitiateComponent implements OnInit {


  employeeID: string;
  mobileNo: string;
  WR_Name: string;
	serverUrl: string;
  currentLoggedInUser: LoggedInUser;
	  userName: string;
	  groupID: number;

    constructor(private loginService: LoginService, private router:Router, public _global: AppGlobals, private workFlowsService: WorkflowsService, private definitionDataService: DefinitionDataService) {
		
      // Get Current User Profile
      
      this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
      
      if (this.currentLoggedInUser) {
        this.userName = this.currentLoggedInUser.userName
        this.groupID = this.currentLoggedInUser.groupID
        //console.log('Current user: ' + this.userName);
        
      } 
      else {
      //console.log('Current user not found');
      this.router.navigate(['pages/login']);
      }
      
      	//GetWR_Name
	this.definitionDataService.GetWR_Name(this._global.wrid_NumberSeriesProvisioning).subscribe(
    data => {
        //console.log(data);				
        const dataStr = JSON.stringify(data);
  
        JSON.parse(dataStr, (key, value) => {
          if (typeof value === 'string') {
            this.WR_Name = value;
            return value;
          }
        }); 
        // console.log(this.WR_Name);
      },
      err => console.error(err),
      ()=> console.log('done loading Work Request Name')
      );	
        
      this.employeeID="3124";
      this.mobileNo= "01711501394";
      
      }
    

  ngOnInit() {
  }

}
