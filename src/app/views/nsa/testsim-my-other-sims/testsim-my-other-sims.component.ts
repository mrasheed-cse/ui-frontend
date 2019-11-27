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
import { environment } from '../../../../environments/environment.prod';

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-testsim-my-other-sims',
  templateUrl: './testsim-my-other-sims.component.html',
  styleUrls: ['./testsim-my-other-sims.component.scss'],
	providers: [WorkflowsService,AppGlobals,LoginService],
})
export class TestsimMyOtherSimsComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private defaultColGroupDef;
  private columnTypes;
  private rowData: any[];
  private rowDataTable2: any[];  

  selectedIds: string;
  requisitionList: Array<Object>;
  requisitionListOther: Array<Object>;
	currentLoggedInUser: LoggedInUser;
	userName: string;
	groupID: number;
  userID: string;
  todayDate: Date;
	routerUrlAndParams: string;
  public isLoading:boolean = false;
  isDataFound: boolean = true;
  isDataFoundOther: boolean = true;

  selectAll:boolean = false;

  handleSelectAll(event: any){

    console.log(event);

    if(event != null && event != "" && event != undefined) event = parseInt(event);
    else return;

    var status = false;
    if(event == 1){
      status = true;
    }

    for(var i = 0; i < this.requisitionList.length; i++){
      this.requisitionList[i]['selected'] = status;
    }
  }

  constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService) {

    this.selectedIds = "";
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

    this.columnDefs = _global.agGrid_defaultColDef;
    this.columnTypes = _global.agGrid_columnTypes;

    this.columnDefs = [
        {headerName: 'MSISDN', field: 'msisdn', sortable: true, filter: true, checkboxSelection: true, width: 160 },
        {headerName: 'RQN #', field: 'requisitionNo', sortable: true, filter: true, width: 200 },
        {headerName: 'RQN Type', field: 'requisitionType', sortable: true, filter: true, width: 200 },
        {headerName: 'SIM Status', field: 'simStatus', sortable: true, filter: true, width: 100 },
        {headerName: 'RQN Date', field: 'requisitionDateAsString', sortable: true, filter: true, width: 130, type: ["dateColumn", "nonEditableColumn"] },
        {headerName: 'Test start date', field: 'testStartDateAsString', sortable: true, filter: true, width: 130, type: ["dateColumn", "nonEditableColumn"] },
        {headerName: 'Test end date', field: 'testEndDateAsString', sortable: true, filter: true, width: 130, type: ["dateColumn", "nonEditableColumn"] },
        {headerName: 'Credit limit', field: 'assignedCreditLimit', sortable: false, filter: false, width: 100, type: "numberColumn" } 
    ];

    this.rowData = [];    

  } //end of constructor

  loadOtherSims(){
    this.isLoading = true;
    this.workFlowsService.loadMyNonActiveSims(this.userID).subscribe(
      data => {
        if(data !=null){
          console.log(data);
          this.isDataFoundOther = true;
          this.rowDataTable2 = data;
          this.isLoading = false;
        }
        else{
          this.isDataFoundOther = false;
        }
      },
    err => console.error(err),
    () => console.log('Done loading PendingTask List')
    );
    this.isLoading = false;
  }


  onGridReady(params) {    
  }

  onGridReadyTable2(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;    
    this.loadOtherSims();
  }

  ngOnInit () {

    this.isLoading = true;
    this.selectedIds = "";

    

  }


  detailsAction(aTask){

      //router.navigate(['user', user.id, 'details']);
      //this.router.navigate(['/nsa/requisitiondetailsassesment/',aTask['id']]);
      return '../newsimactivationreq_dt/'.toString();

  }

  getSelectedIds(){

    this.selectedIds = "";

    const selectedNodes = this.agGrid.api.getSelectedNodes();

    console.log(selectedNodes);

    const selectedData = selectedNodes.map( node => node.data );

    console.log(selectedData);

    //const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
    //console.log(`Selected nodes: ${selectedDataStringPresentation}`);

    for(var i = 0; i < selectedData.length; i++){
        this.selectedIds += selectedData[i]['requisitionLineMsisdnId'] + ",";      
    }

    if(this.selectedIds != "" && this.selectedIds.length > 0){
      this.selectedIds = this.selectedIds.substr(0, this.selectedIds.length - 1);
    }

    console.log(this.selectedIds);
  }

  timeExtension(){
    this.getSelectedIds();
    this.router.navigate(['nsa/testsim-timeext', this.selectedIds]);
  }

  creditLimitExtension(){
    this.getSelectedIds();
    this.router.navigate(['nsa/testsim-creditlimitext', this.selectedIds]);
  }

  recharge(){
    this.getSelectedIds();
    this.router.navigate(['nsa/testsim-recharge', this.selectedIds]);
  }

  surrender(){
    this.getSelectedIds();
    this.router.navigate(['nsa/testsim-surrender', this.selectedIds]);
  }

  damaged(){
    this.getSelectedIds();
    this.router.navigate(['nsa/testsim-damaged', this.selectedIds]);
  }

  lost(){
    this.getSelectedIds();
    this.router.navigate(['nsa/testsim-lost', this.selectedIds]);
  }

  transfer(){
    this.getSelectedIds();
    this.router.navigate(['nsa/testsim-transfer', this.selectedIds]);
  }

}
