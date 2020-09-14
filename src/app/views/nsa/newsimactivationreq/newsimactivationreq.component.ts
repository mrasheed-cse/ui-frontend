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
  selector: 'app-newsimactivationreq',
  templateUrl: './newsimactivationreq.component.html',
  styleUrls: ['./newsimactivationreq.component.scss'],
	providers: [WorkflowsService,AppGlobals,LoginService],
})
export class NewsimactivationreqComponent implements OnInit {

  requisitionList: Array<Object>;
  rawDataFromBackend: Array<Object>;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;
  userID: string;
  todayDate: Date;
	routerUrlAndParams: string;
  public isLoading:boolean = false;
  isDataFound: boolean = true;

  constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workflowsService: WorkflowsService) {

    this.isLoading = false;
    let isValid = true;
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
    }
    else {
      this.router.navigate(['pages/login']);
    }
    //this.requisitionList = _global.dataTempForNewActRequest;

  } //end of constructor

  loadPendingList(){
    //GetPendingTaskList
    this.workflowsService.newSimActivation(0,this.userID).subscribe(
        data => {
          if(data !=null){
            console.log(data);
            this.isDataFound = true;
            this.rawDataFromBackend = data;
            this.requisitionList = [];

            if(this.rawDataFromBackend != null && this.rawDataFromBackend.length > 0){

              for(var i = 0; i < this.rawDataFromBackend.length; i++){
               
                var found = false;

                for(var j = 0; j < this.requisitionList.length; j++){
                  if(this.rawDataFromBackend[i]['requisitionId'] == this.requisitionList[j]['id']){
                    found = true;
                    break;
                  }
                }

                if(!found){
                  var objToInsert = {};
                  objToInsert['id'] = this.rawDataFromBackend[i]['requisitionId'];
                  objToInsert['requisitionNo'] = this.rawDataFromBackend[i]['requisitionNo'];
                  objToInsert['deliveryStatus'] = "Delivered";
                  objToInsert['totalSims'] = 0;
                  objToInsert['inactiveSims'] = 0;
                  objToInsert['requestedForActivation'] = 0;
                  objToInsert['activatedSims'] = 0;
                  objToInsert['deactiveSims'] = 0;

                  this.requisitionList.push(objToInsert);
                }
              }


              for(var i = 0; i < this.requisitionList.length; i++){
               
                for(var j = 0; j < this.rawDataFromBackend.length; j++){
                  if(this.rawDataFromBackend[j]['requisitionId'] == this.requisitionList[i]['id']){
                    
                    this.requisitionList[i]['totalSims'] += this.rawDataFromBackend[j]['numberOfMsisdn'];
                    if(this.rawDataFromBackend[j]['simStatus'] == null){
                      this.requisitionList[i]['inactiveSims'] += this.rawDataFromBackend[j]['numberOfMsisdn'];;
                    }
                    if(this.rawDataFromBackend[j]['simStatus'] == 0){
                      this.requisitionList[i]['inactiveSims'] += this.rawDataFromBackend[j]['numberOfMsisdn'];;
                    }
                    if(this.rawDataFromBackend[j]['simStatus'] == 1){
                      this.requisitionList[i]['activatedSims'] += this.rawDataFromBackend[j]['numberOfMsisdn'];;
                    }
                    if(this.rawDataFromBackend[j]['simStatus'] == 2){
                      this.requisitionList[i]['deactiveSims'] += this.rawDataFromBackend[j]['numberOfMsisdn'];;
                    }
                    if(this.rawDataFromBackend[j]['simStatus'] == 3){
                      this.requisitionList[i]['requestedForActivation'] += this.rawDataFromBackend[j]['numberOfMsisdn'];;
                    }
                  }
                }
                
              }


            }
            else{
              this.requisitionList = [];
            }

            this.isLoading = false;
          }
          else{
            this.isDataFound = false;
            this.isLoading = false;
          }
        },
      err => console.error(err),
      () => console.log('Done loading PendingTask List')
      );
    //Get Today Date
    this.todayDate = new Date();
    this.isLoading = false;
  }


  ngOnInit () {

    this.isLoading = true;

    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.loadPendingList();
    }, 2000);

  }


  detailsAction(aTask){

      //router.navigate(['user', user.id, 'details']);
      //this.router.navigate(['/nsa/requisitiondetailsassesment/',aTask['id']]);
      return '../newsimactivationreq_dt/'.toString();

  }

}
