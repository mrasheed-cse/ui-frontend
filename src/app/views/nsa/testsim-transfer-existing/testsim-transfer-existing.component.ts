import {
  NgModule,
  Component,
  Pipe,
  OnInit,
  ViewChild
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkflowsService } from './../services/workflows.service';
import { AppGlobals } from './../../../app.global';
import { Router } from '@angular/router';

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-testsim-transfer-existing',
  templateUrl: './testsim-transfer-existing.component.html',
  styleUrls: ['./testsim-transfer-existing.component.scss'],
  providers: [WorkflowsService,AppGlobals,LoginService],
})
export class TestsimTransferExistingComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private defaultColGroupDef;
  private columnTypes;
  private rowData: any[];
  private rowDataTable2: any[];

  requisitionList: Array<Object>;
  msisdnList: Array<Object>;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;
  userID: string;
  todayDate: Date;
	routerUrlAndParams: string;
  public isLoading:boolean = false;
  isDataFound: boolean = true;
  showDetail: boolean = false;
  selectedSimActionId: number;

  constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService) {

    this.isLoading = false;
    this.showDetail = false;
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
    this.requisitionList = [];
    this.msisdnList = [];

    this.columnDefs = _global.agGrid_defaultColDef;
    this.columnTypes = _global.agGrid_columnTypes;

    this.columnDefs = [
        {headerName: 'SL', field: 'serial', sortable: true, filter: false, checkboxSelection: true, width: 90 },
        {headerName: 'Work Request #', field: 'workRequestBriefName', sortable: true, filter: true, width: 210 },
        {headerName: 'Request Type', field: 'requestType', sortable: true, filter: true, width: 220 },
        {headerName: 'Initiate date', field: 'requestedOn', sortable: true, filter: true, width: 210 },
        {headerName: 'Status', field: 'workRequestStatus', sortable: true, filter: true, width: 210 },
        {headerName: 'Update date', field: 'requestUpdateDate', sortable: true, filter: true, width: 210 },
        {headerName: 'Pending At', field: 'pendingAt', sortable: true, filter: true, width: 210 }
    ];

    this.rowData = [];

  } //end of constructor

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.loadPendingList();
    }, 2000);
  }

  loadPendingList(){
    //GetPendingTaskList
    this.workFlowsService.ownRequestsForSimAction(this._global.wrid_testSimTransfer,this.userID).subscribe(
        data => {
          if(data !=null){
            console.log(data);
            this.isDataFound = true;

            if(data.length > 0){
              for(var i = 0; i < data.length; i++){
                this.requisitionList.push(data[i]);
              }
            }

            for(var i = 0; i < this.requisitionList.length; i++){
              this.requisitionList[i]['serial'] = (i+1);
            }
            console.log(this.requisitionList);
            this.rowData = this.requisitionList;

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

  initTasks(){
    this.selectedSimActionId = 0;
    this.requisitionList = [];
    this.msisdnList = [];
    this.isLoading = true;
    this.showDetail = false;

    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.loadPendingList();
    }, 2000);
  }

  ngOnInit () {

    this.initTasks();

  }

  getIdForDetails(){

    var selectedIds = "";

    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );

    for(var i = 0; i < selectedData.length; i++){
        selectedIds = selectedData[i]['simActionId'];
    }

    var selectedIdsAsInt = parseInt( selectedIds );
    this.details(selectedIdsAsInt);
  }

  details(simActionId){

    this.isLoading = true;
    this.selectedSimActionId = simActionId;

    this.workFlowsService.simActionRequestDetailsPendingForApproval(simActionId).subscribe(
      res  =>  {
        if(res !== ""){
          this.msisdnList = res;

          for(var i = 0; i < this.msisdnList.length; i++){
            this.msisdnList[i]['selected'] = false;
            this.msisdnList[i]['isApproved'] = false;
            this.msisdnList[i]['isRejected'] = false;
            this.msisdnList[i]['locked'] = false;
            if(this.msisdnList[i]['approvalStatus'] == 2){
              this.msisdnList[i]['isRejected'] = true;
              this.msisdnList[i]['locked'] = true;
            }
          }

          this.isLoading = false;
          this.showDetail = true;
        }
      },
      err  =>  {

      }
    );
    this.isLoading = false;
  }


  cancel(){
    this.initTasks();
  }

}
