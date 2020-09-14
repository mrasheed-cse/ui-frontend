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
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';

import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-test-sim-action-list-limit-ext',
  templateUrl: './test-sim-action-list-limit-ext.component.html',
  styleUrls: ['./test-sim-action-list-limit-ext.component.scss'],
	providers: [WorkflowsService,AppGlobals,LoginService],
})
export class TestSimActionListLimitExtComponent implements OnInit {

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
  approvalFilterMarker: number;

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

  constructor(private router: Router,private loginService: LoginService,private activatedRoute: ActivatedRoute, private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService) {

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
        {headerName: 'MSISDN', field: 'msisdn', sortable: true, filter: true, width: 160 },
        {headerName: 'Req #', field: 'workRequestBriefName', sortable: true, filter: true, width: 200 },
        {headerName: 'Req Type', field: 'type', sortable: true, filter: true, width: 200 },
        {headerName: 'User', field: 'nsaUsersName', sortable: true, filter: true, width: 100 },        
        {headerName: 'SIM Status', field: 'simStatusAsString', sortable: true, filter: true, width: 100 },
        {headerName: 'Approval Status', field: 'approvalStatusAsString', sortable: true, filter: true, width: 150 },
        {headerName: 'Pending at', field: 'hop', sortable: true, filter: true, width: 100 },
        {headerName: 'Req date', field: 'requestDateAsString', sortable: false, filter: true, width: 200 },
        {headerName: 'New credit limit', field: 'newCreditLimit', sortable: false, filter: true, width: 150 },
        //{headerName: 'Test start date', field: 'testStartDateAsString', sortable: true, filter: true, width: 130, type: ["dateColumn", "nonEditableColumn"] },
        //{headerName: 'Test end date', field: 'testEndDateAsString', sortable: true, filter: true, width: 130, type: ["dateColumn", "nonEditableColumn"] },
        //{headerName: 'Credit limit', field: 'assignedCreditLimit', sortable: false, filter: false, width: 100, type: "numberColumn" } 
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
    this.workFlowsService.loadSimActionListWithSearch(
      this.userID, 
      this._global.wrid_testSimCreditLimitExtension, 
      this.approvalFilterMarker, 
      this.offset, 
      this.searchOptions_msisdn, 
      this.searchOptions_rqnNo, 
      +(this.searchOptions_simStatus)).subscribe(
        data => {
          if(data !=null){            
            console.log(data);
            console.log(data.length);
            this.isDataFound = true;
            this.rowData = data;
            if(data.length > 0) this.totalPages = +(data[0]['totalPages']);
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
  }

  search(){
    this.offset = 0;
    this.currPage = 1;
    this.loadPendingList();
  }
  clearSearch(){
    this.searchOptions_simStatus = "1";
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
    this.listSimStatus = this._global.listSimStatus;
    this.searchOptions_simStatus = "1";
    this.searchOptions_msisdn = "";
    this.searchOptions_rqnNo = "";
    this.isLoading = true;
    this.selectedIds = "";

    var url = window.location.href;
    var urlparts = url.split("?t=");
    var markerFromPrevPage = urlparts[1];
    
    var markerFromPrevPage = this.activatedRoute.snapshot.queryParamMap.get("t");
    
                             
    console.log("t = "+markerFromPrevPage);

    if(markerFromPrevPage != null && markerFromPrevPage != undefined && markerFromPrevPage != ""){
      if(markerFromPrevPage == "total") this.approvalFilterMarker = this._global.simActionListPage_totalMarker;
      if(markerFromPrevPage == "approved") this.approvalFilterMarker = this._global.simActionListPage_approvedMarker;
      if(markerFromPrevPage == "pending") this.approvalFilterMarker = this._global.simActionListPage_pendingMarker;
      if(markerFromPrevPage == "rejected") this.approvalFilterMarker = this._global.simActionListPage_rejectedMarker;                
    }

    this.isLoading = false;
  }


  

  
  onBtExport() {
    var params = {};
    this.gridApi.exportDataAsCsv(params);
  }

}
