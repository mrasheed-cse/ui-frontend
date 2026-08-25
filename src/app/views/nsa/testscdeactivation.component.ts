import {
    NgModule,
    Component,
    Pipe,
    OnInit
  } from '@angular/core';
  import {ReactiveFormsModule, FormsModule, UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
  import {BrowserModule} from '@angular/platform-browser';
  import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
  import { DataTableResource } from 'angular4-smart-table';
  import { RequisitionList } from './models/RequisitionList';
  import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
  import { HttpClient } from '@angular/common/http';
  import { HttpErrorResponse } from '@angular/common/http';
  import { WorkflowsService } from './services/workflows.service';
  import { AppGlobals } from './../../app.global';
  import { ActivatedRoute,Router } from '@angular/router';
  
  import { LoginService } from '../pages/LoginService';
  import { LoggedInUser } from '../pages/loggedInUser';

  
// import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
// import { debug } from 'console';
  
  @Component({
    selector: 'app-testscdeactivation',
    templateUrl: './testscdeactivation.component.html',
    styles: [],
    providers: [WorkflowsService, AppGlobals, LoginService],
    standalone: false
})
  export class TestscDeactivationComponent implements OnInit {
  
    requisitionList: Array<Object>;
      currentLoggedInUser: LoggedInUser;
      userName: string;
      groupID: number;
      userID: string;
  
      public dangerAlertShow:boolean = false;
      public dangerAlertMessage:string = "";
      public successSearchShow:boolean = false;
    public successAlertMessage:string = "";
    public isLoading:boolean = false;
  
      isDataFound: boolean = true;
      isCollapsed: boolean = true;
      isEditEnable: boolean=true;
      isEditDone: number=-1;
      deativationDisable:boolean=false;
      showDeativationButton:boolean=true;
      public isLoadedData: number=-1;
      newArray: any[] = [];
  
      mySearchForm: UntypedFormGroup;
     wrname: UntypedFormControl;
     wrstatus: UntypedFormControl;
     startDate: UntypedFormControl;
     endDate: UntypedFormControl;
  
      wrNamePattern:string = "(RQN).\*";
      searchWR: string;
      searchWRNumber: string;
      searchWrCreatedBy: string;
      searchWrCreationDate: string;
      searchLastApprover: string;
      searchLextApprover: string;
      searchStatus: string;
      searchPendingGroupID: number;
      searchHopSequence: number;
      todayDate: Date;
    routerUrlAndParams: string;
    requestedSimAtatus: string;

    options = ['yes','No'];
    selectedOption: string='';

    public listSuppilerName = [];

    prePlanGenerationForm: UntypedFormGroup;
	NGVS: UntypedFormControl;
    vendor: UntypedFormControl;
    IMSI: UntypedFormControl;
    isRep:UntypedFormControl;

    headerDateData: any;
    checkButtonEnable:boolean=false;

    

  
  
    constructor(private route:ActivatedRoute, private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService) {
  
      this.headerDateData = {};

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
        //this.requisitionList = _global.dataTemp;
  
  //      this.router.navigate(['nsa/testsim-timeext', this.selectedIds]);
            //call API here to get real dat
        if(this.route.snapshot.paramMap.get('requestedSimAtatus') != null)
          this.requestedSimAtatus = this.route.snapshot.paramMap.get('requestedSimAtatus');
        else 
        this.requestedSimAtatus = "All"; // ALL 
  //console.log("requestedSimAtatus "+ this.requestedSimAtatus);
        
  
        this.isLoading = true;
      //GetPendingTaskList
      this.workFlowsService.LoadPreDeactivationScDetails(this.userID).subscribe(
          data => {
            if(data !=null){
              console.log(data);
              this.isDataFound = true;
              this.requisitionList = data;

          
            for(var i = 0; i < data.length; i++){
              const fetchDataLoaded = data[i]
              if(fetchDataLoaded.ngvsVoucherStatusUpdated != null){
                this.isLoadedData=i
                this.newArray.push(i);
                console.log(this.newArray,'newArray');
              } else {
                this.newArray.push(-1);
              }

            }
            console.log(this.newArray,'newArrrrrrray');
            
          
          
            }
            else{
              this.isDataFound = false;
            }
          },
        err => console.error(err),
        () => console.log('Done loading PendingTask List')
        );

        

    
      this.isLoading = false;
      this.todayDate = new Date();
  
     

            this.workFlowsService.getDropdown().subscribe(
		
              data => {
                    //console.log(data);
                    for (let index in data) {
                      this.listSuppilerName.push(
                      {
                        id:data[index].id,
                        group_name: data[index].groupName,
                      
                      }
                      );
                    }
                  },
                err => console.error(err),
                () => console.log('Vendor loading done.')
                );
  
  
  } //end of constructor




  
  
  
  datepickerConfig: Partial<BsDatepickerConfig>;
  
  clearSearch(){
    for(var i = 0; i < this.requisitionList.length; i++){
      this.requisitionList[i]['show'] = true;
    }
  }
  
  onSearchSubmit() {
  
    if (this.wrname.value || this.startDate.value || this.endDate.value || this.wrstatus.value) {
        console.log('Form Submitted!');
        console.log(this.mySearchForm.value);
        this.successSearchShow = false;
        this.dangerAlertShow = false;
  
        for(var i = 0; i < this.requisitionList.length; i++){
          this.requisitionList[i]['show'] = false;
  
          if(this.wrname.value != null && this.wrname.value != undefined && this.wrname.value != "" && this.wrname.value == this.requisitionList[i]['requisitionNo']){
            this.requisitionList[i]['show'] = true;
          }
          if(this.wrstatus.value != null && this.wrstatus.value != undefined && this.wrstatus.value != "" && this.wrstatus.value == this.requisitionList[i]['rejectionRfiStatus']){
            this.requisitionList[i]['show'] = true;
          }
  
          if(this.startDate.value != null && this.startDate.value != undefined && this.startDate.value != ""
          &&
          this.endDate.value != null && this.endDate.value != undefined && this.endDate.value != ""){
            //var sdate = moment(this.requisitionList[i]['requisitionDt']).format('DD-MM-YYYY');
            var sdate = new Date(this.requisitionList[i]['requisitionDt'].replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
  
            var startDateOfForm = this.startDate.value;
            var endDateOfForm = this.endDate.value;
  
            startDateOfForm.setHours(0);
            startDateOfForm.setMinutes(0);
            startDateOfForm.setSeconds(0);
  
            endDateOfForm.setHours(23);
            endDateOfForm.setMinutes(59);
            endDateOfForm.setSeconds(59);
  
            console.log("sdate");
            //console.log(this.requisitionList[i]['requisitionDt']);
            console.log(sdate);
            console.log(this.startDate.value);
            console.log(this.endDate.value);
  
            if(sdate >= startDateOfForm && sdate <= endDateOfForm){
              this.requisitionList[i]['show'] = true;
            }
          }
  
  
        }
  
    }
  }
  
  

  submitDeactivationData(requisition,requisitionId,i){
    if (( !!requisition.ngvsVoucherStatusUpdated&&requisition.ngvsVoucherStatusUpdated !==null)&&
    (!! requisition.smsReceived&&      requisition.smsReceived !==null)&&
     (!! requisition.atPackageAdded && requisition.atPackageAdded !==null)&&
    // (!!  requisition.scStartSlNo &&  requisition.scStartSlNo !==null)&&
    // (!!  requisition.scEndSlNo&& requisition.scEndSlNo !==null)&&
     (!! requisition.supplierName&&requisition.supplierName !==null)&&
      (!!requisition.testResult&&requisition.testResult !==null)){

        requisition.username=this.userID;
    this.workFlowsService.SubmitDeactivationData(requisition).subscribe(
      (data) => {
        console.log('response is : ',data);  
        if(data !== ""){
          if(data.message=="Success"){
            alert("Data Saved Successfully");
            this.deativationDisable=true;
            this.newArray.splice(i,1);
            this.newArray.splice(i,0,i);

          }
          else {
            alert(data.message);
          }
        }
    },
    err  =>  {	
      console.log("err.status : " ,err.status);
      console.log("err.status : " , err);

      alert("Unable to process.");
      // this.deativationDisable=true;
    }
    );
      }
      else{ 
          alert("All fields are mendatory, Please insert Data")
  
      }
    
  }

  finalDeactivation(requisition,requisitionId,index){
    if (confirm("do you like to deactivate?")) {
      //do nothing here
    }
    else {
      // this.isLoading = false;
      return;
    }
    requisition.username=this.userID;
    this.workFlowsService.FinalDeactivation(requisition).subscribe(
      (data) => {
    
        console.log('response is : '+data.message);  
        if(data !== ""){
          this.successAlertMessage=data.message;
          alert(this.successAlertMessage);
          window.location.reload();

        }
    },
    err  =>  {	
      console.log("err.status : " + err.status);
      alert("Unable to Deactivate.");

           
    }
    );
  }



  ngOnInit () {
  
    this.createFormControls();
      this.createForm();
    
    }
  
  
  
    createFormControls() {
      
    this.NGVS = new  UntypedFormControl('', Validators.required);
      // this.vendor = new FormControl('', Validators.required);
      // this.IMSI = new FormControl('');
      // this.isRep=  new FormControl('');
    }
  
    createForm() {
      this.prePlanGenerationForm = new UntypedFormGroup({
        NGVS: this.NGVS
          // vendor: this.vendor,
          // IMSI: this.IMSI,
          // isRep: this.isRep
      });
    }
    
  

  
  onTaskSelect(aTask) {
        //this.selectedContactId = aTask.wr_ID;
        //this.router.navigateByUrl('/nsa/seriesprovisiondetail');
  }
  
  // editAction(aTask){
  //   return '../screquisitionedit/'.toString();
  // }

  editAction(id,index: number){
    
    // return '../screquisitionedit/'.toString();
     this.isEditDone=index;
     this.deativationDisable=false;
    //  this.isEditEnable = false;

  }
  
  viewAction(aTask){
    return '../screquisitionview/'.toString();
  }
  
  }
  