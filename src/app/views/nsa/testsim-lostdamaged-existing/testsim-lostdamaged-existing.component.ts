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
import {FileoperationService} from '../services/fileoperation.service';

@Component({
    selector: 'app-testsim-lostdamaged-existing',
    templateUrl: './testsim-lostdamaged-existing.component.html',
    styleUrls: ['./testsim-lostdamaged-existing.component.scss'],
    providers: [WorkflowsService, AppGlobals, LoginService, FileoperationService],
    standalone: false
})
export class TestsimLostdamagedExistingComponent implements OnInit {

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

  constructor(public router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService, private fileoperationService: FileoperationService) {

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
      {headerName: 'SL', field: 'serial', sortable: true, filter: false, checkboxSelection: true, width: 90},
      {headerName: 'Work Request #', field: 'workRequestBriefName', sortable: true, filter: true, width: 210},
      {headerName: 'Request Type', field: 'requestType', sortable: true, filter: true, width: 220},
      {headerName: 'Initiate date', field: 'requestedOn', sortable: true, filter: true, width: 210},
      {headerName: 'Status', field: 'workRequestStatus', sortable: true, filter: true, width: 210},
      {headerName: 'Update date', field: 'requestUpdateDate', sortable: true, filter: true, width: 210},
      {headerName: 'Pending At', field: 'pendingAt', sortable: true, filter: true, width: 210},
      {headerName: 'SO No.', field: 'soNumber', sortable: true, filter: true, width: 210},
      {headerName: 'Challan No.', field: 'challanNumber', sortable: true, filter: true, width: 210},
      {
        headerName: 'Challan Download',
        width: 210,
        cellRenderer: (params) => {
          const button = document.createElement('button');
          button.innerText = 'Download';
          button.className = 'btn btn-sm btn-primary';

          // Hide button when pendingAt is NONE
          if (!params.data.challanNumber) {
            return '';
          }
          button.addEventListener('click', () => {

            // Select the row
            params.node.setSelected(true, true);

            // Call component method
            this.downloadChallan(params.data.challanNumber, params.data.simActionId);
          });

          return button;
        }
      }
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

  downloadChallan(challanNumber, simActionId) {
    this.workFlowsService.DownloadChallanForReplacementSim(challanNumber, simActionId).subscribe((data) => {
      const blob = new Blob([data], {type: 'application/pdf'});

      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = challanNumber+".pdf";
      link.click();

    });
  }

  loadPendingList(){
    //GetPendingTaskList
    this.isLoading = true;
    this.workFlowsService.ownRequestsForDualSimAction(this._global.wrid_testSimLost+","+this._global.wrid_testSimDamaged,this.userID).subscribe(
        data => {
          if(data !=null){
            console.log(data);
            this.isDataFound = true;
           
            if(data.length > 0){
              for(var i = 0; i < data.length; i++){
                this.requisitionList.push(data[i]);
                this.requisitionList[i]['serial'] = (i+1);
              }

             
              console.log(this.requisitionList);
              this.rowData = this.requisitionList;

            }           
          }
          else{
            this.isDataFound = false;          
          }
        },
      err => console.error(err),
      () => {
        console.log('Done loading PendingTask List');    
        this.isLoading = false;   
      }
      );
    //Get Today Date
    this.todayDate = new Date();
 
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

  }


  cancel(){
    this.initTasks();
  }

  downloadGdFile(gdFileName) {
    this.fileoperationService.downloadLostSimGd(gdFileName).subscribe(
      (data: Blob) => {
        if (!data || data.size === 0 || data.type.indexOf('pdf') === -1) {
          const reader = new FileReader();
          reader.onload = () => {
            console.error('Failed to download GD file:', reader.result);
            alert('Failed to download file. It may be missing or corrupted on the server.');
          };
          reader.readAsText(data);
          return;
        }

        const blob = new Blob([data], {type: 'application/pdf'});

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = gdFileName;
        link.click();
      },
      err => {
        console.error(err);
        alert('Failed to download file.');
      }
    );
  }

}
