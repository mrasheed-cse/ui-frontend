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
  selector: 'app-testsim-deactivation',
  templateUrl: './testsim-deactivation.component.html',
  styleUrls: ['./testsim-deactivation.component.scss'],
	providers: [WorkflowsService,AppGlobals,LoginService],
})
export class TestsimDeactivationComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private defaultColGroupDef;
  private columnTypes;
  private rowData: any[];
  private rowDataTable2: any[];  
  private offset: number;
		  private currPage: number;
		  private totalPages: number;
		  listSimStatus: Array<any>;
		  searchOptions_simStatus: String;
		  searchOptions_msisdn: String;
		  searchOptions_rqnNo: String;

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

  

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.loadPendingList();
    }, 2000);
  }

  onGridReadyTable2(params) {
  }

  loadPendingList(){

    //GetPendingTaskList
    this.workFlowsService.loadMyInactiveSimsWithSearch(this.userID, this.offset, this.searchOptions_msisdn, this.searchOptions_rqnNo, +(this.searchOptions_simStatus)).subscribe(
        data => {
          if(data !=null){            
            console.log(data);
            this.isDataFound = true;
            this.rowData = data;
            if(data.length > 0) this.totalPages = +(data[0]['totalPages']);
            this.isLoading = false;
          }
          else{
            this.isDataFound = false;
          }
        },
      err => console.error(err),
      () => console.log('Done loading PendingTask List')
      );
    //Get Today Date
    this.todayDate = new Date();
  }

  search(){
    this.offset = 0;
    this.currPage = 1;
    this.loadPendingList();
  }
  clearSearch(){
    this.searchOptions_simStatus = "0";
    this.searchOptions_msisdn = "";
    this.searchOptions_rqnNo = "";
    this.search();
  }

  prevPage(){
    if(this.offset <= 0){
      //first page .. do nothing
    }
    else{
      this.isLoading = true;
      this.offset = this.offset - this._global.defaultPageSize;
      this.currPage--;
      this.loadPendingList();
    }
  }

  nextPage(){
    if(this.currPage >= this.totalPages){
      //last page .. do nothing
    }
    else{
      this.isLoading = true;
      this.offset = this.offset + this._global.defaultPageSize;
      this.currPage++;
      this.loadPendingList();
    }
  }


  ngOnInit () {

    this.offset = 0; this.currPage = 1; this.totalPages = 50000;
    this.listSimStatus = this._global.listSimStatusAlt;
    this.searchOptions_simStatus = "0";
    this.searchOptions_msisdn = "";
    this.searchOptions_rqnNo = "";
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



  onBtExport() {
    var params = {};
    this.gridApi.exportDataAsCsv(params);
  }

}
