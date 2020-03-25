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
  selector: 'app-testsim-creditlimitext-new',
  templateUrl: './testsim-creditlimitext-new.component.html',
  styleUrls: ['./testsim-creditlimitext-new.component.scss'],
	providers: [WorkflowsService,AppGlobals,LoginService],
})
export class TestsimCreditlimitextNewComponent implements OnInit {

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
  selectedTLEs: string;
  selectedCLEs: string;
  selectedTLEstatus: string;
  selectedCLEstatus: string;
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
  tmp: Array<number>;

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

    this.tmp = [];
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
        {headerName: 'MSISDN', field: 'msisdn', sortable: true, filter: true, checkboxSelection: true, width: 160, headerCheckboxSelection: true },
        {headerName: 'RQN #', field: 'requisitionNo', sortable: true, filter: true, width: 200 },
        {headerName: 'RQN Type', field: 'requisitionType', sortable: true, filter: true, width: 200 },
        {headerName: 'SIM Status', field: 'simStatus', sortable: true, filter: true, width: 100 },
        {headerName: 'RQN Date', field: 'requisitionDateAsString', sortable: true, filter: true, width: 130, type: ["dateColumn", "nonEditableColumn"] },
        {headerName: 'Test start date', field: 'testStartDateAsString', sortable: true, filter: true, width: 130, type: ["dateColumn", "nonEditableColumn"] },
        {headerName: 'Test end date', field: 'testEndDateAsString', sortable: true, filter: true, width: 130, type: ["dateColumn", "nonEditableColumn"] },
        {headerName: 'Credit limit', field: 'assignedCreditLimit', sortable: false, filter: false, width: 80, type: "numberColumn" } ,
        {headerName: 'TLE', field: 'simActionWorkRequestBriefName', sortable: true, filter: true, width: 200},
        {headerName: 'Pending At', field: 'pendingAt', sortable: true, filter: true, width: 130},
        {headerName: 'CLE', field: 'simActionWorkRequestBriefName2', sortable: true, filter: true, width: 200 },
        {headerName: 'Pending At', field: 'pendingAt2', sortable: false, filter: false, width: 130 } 
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
    this.isDataFound = true;
    this.isLoading = true;
    //GetPendingTaskList
    this.workFlowsService.loadMySimsforDualActionsWithSearch(this.userID, this.offset, this.searchOptions_msisdn, this.searchOptions_rqnNo, +(this.searchOptions_simStatus), this._global.wrid_testSimTimeLimitExtension, this._global.wrid_testSimCreditLimitExtension).subscribe(
        data => {
          if(data !=null){            
            //console.log(data);
           
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
   // this.isLoading = false;
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

    this.isLoading = true;
    this.selectedIds = "";
    this.offset = 0; this.currPage = 1; this.totalPages = 50000;
    this.listSimStatus = this._global.listSimStatus;
    this.searchOptions_simStatus = "1";
    this.searchOptions_msisdn = "";
    this.searchOptions_rqnNo = "";
    this.isLoading = false;
  }


  detailsAction(aTask){

      //router.navigate(['user', user.id, 'details']);
      //this.router.navigate(['/nsa/requisitiondetailsassesment/',aTask['id']]);
      return '../newsimactivationreq_dt/'.toString();

  }

  getSelectedIds(){

    this.tmp = [];
    this.selectedIds = "";
    this.selectedCLEs = "";
    this.selectedTLEs = "";
    this.selectedCLEstatus = "";
    this.selectedTLEstatus = "";
    

    const selectedNodes = this.agGrid.api.getSelectedNodes();
    //console.log("selectedNodes ");
    //console.log(selectedNodes);
    const selectedData = selectedNodes.map( node => node.data );
    //console.log("selectedData ");
    //console.log(selectedData);
    //console.log(selectedData.length);

    for(var i = 0; i < selectedData.length; i++){
        this.selectedIds += selectedData[i]['requisitionLineMsisdnId'] + ",";      
        //console.log(selectedData[i]['simActionWorkRequestBriefName2'] );
        this.selectedCLEs +=selectedData[i]['simActionWorkRequestBriefName2'] == null ? "," : selectedData[i]['simActionWorkRequestBriefName2'] + ",";      
        this.selectedTLEs +=selectedData[i]['simActionWorkRequestBriefName'] == null ? "," : selectedData[i]['simActionWorkRequestBriefName2']+ ",";      
        this.selectedCLEstatus +=selectedData[i]['pendingAt2'] == null ? "," : selectedData[i]['simActionWorkRequestBriefName2']+ ",";      
        this.selectedTLEstatus +=selectedData[i]['pendingAt'] == null ? "," : selectedData[i]['simActionWorkRequestBriefName2']+ ",";      
       // console.log(this.selectedIds);
       // console.log(this.selectedTLEs);
       // console.log(this.selectedCLEs);
       // console.log(this.selectedCLEstatus);
       // console.log(this.selectedTLEstatus);

    }
    if(this.selectedIds != "" && this.selectedIds.length > 0){
      this.selectedIds = this.selectedIds.substr(0, this.selectedIds.length - 1);
      this.selectedTLEs = this.selectedTLEs.substr(0, this.selectedTLEs.length - 1);        
      this.selectedCLEs = this.selectedCLEs.substr(0, this.selectedCLEs.length - 1);      
      this.selectedTLEstatus = this.selectedTLEstatus.substr(0, this.selectedTLEstatus.length - 1);        
      this.selectedCLEstatus = this.selectedCLEstatus.substr(0, this.selectedCLEstatus.length - 1);      

      //console.log(this.selectedIds);
      //console.log(this.selectedTLEs);
      //console.log(this.selectedCLEs);
      //console.log(this.selectedCLEstatus);
      //console.log(this.selectedTLEstatus);
    }
    
  }

  timeExtension(){
    this.getSelectedIds();

    var selectedIdsAsArray = this.selectedIds.split(',');
    var selectedTLEsAsArray = this.selectedTLEs.split(',');
    var selectedTLEstatusAsArray = this.selectedTLEstatus.split(',');
    //console.log("selectedIdsAsArray");
    //console.log(selectedIdsAsArray);
    //console.log(selectedTLEsAsArray);
    for(var i = 0; i < selectedIdsAsArray.length; i++){
      this.tmp.push(  parseInt(selectedIdsAsArray[i]) );    
      if(selectedTLEsAsArray[i]!="" && selectedTLEstatusAsArray[i]!="END" ){
        //console.log(selectedTLEsAsArray[i].length);
        alert("One or more pending requests exist against selected MSISDNs. For example, "+selectedTLEsAsArray[i]);
        return;
      }
    }
    //console.log('Routing with IDs to show details.');
    //console.log(this.selectedIds);
    this.router.navigate(['nsa/testsim-timeext', this.selectedIds]);

    /*
    this.isLoading = true;
    this.workFlowsService.doPendingSimActionExistsForRqnLineMsisdnId(this.tmp).subscribe(
      data => {
        console.log(data);
        if(data['message'] == "SUCCESS") this.router.navigate(['nsa/testsim-timeext', this.selectedIds]);
      },
    err => {
      console.error(err);
      //alert("One or more pending requests exist against selected MSISDNs");
      
    },
    () => console.log('Done loading PendingTask List')
    );
    this.isLoading = false;
    */
    
  }

  creditLimitExtension(){
    this.getSelectedIds();

    var selectedIdsAsArray = this.selectedIds.split(',');
    var selectedCLEsAsArray = this.selectedCLEs.split(',');
    var selectedCLEstatusAsArray = this.selectedCLEstatus.split(',');

    for(var i = 0; i < selectedIdsAsArray.length; i++){
      this.tmp.push(  parseInt(selectedIdsAsArray[i]) );
      if(selectedCLEsAsArray[i].length!=0 && selectedCLEstatusAsArray[i]!="END"){
        alert("One or more pending requests exist against selected MSISDNs. For example, "+selectedCLEsAsArray[i]);
        return;
      }
    }

    this.router.navigate(['nsa/testsim-creditlimitext', this.selectedIds]);

    /*
    this.isLoading = true;
    this.workFlowsService.doPendingSimActionExistsForRqnLineMsisdnId(this.tmp).subscribe(
      data => {
        console.log(data);
        if(data['message'] == "SUCCESS")     this.router.navigate(['nsa/testsim-creditlimitext', this.selectedIds]);
      },
    err => {
      console.error(err);
      alert("One or more pending requests exist against selected MSISDNs");
      
    },
    () => console.log('Done loading PendingTask List')
    );
    this.isLoading = false;
    */
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
