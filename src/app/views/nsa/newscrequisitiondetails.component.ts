import {
  NgModule,
  Component,
  Pipe,
  OnInit
} from '@angular/core';
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
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

@Component({
  selector: 'app-newscrequisitiondetails',
  templateUrl: './newscrequisitiondetails.component.html',
  styles: [],
  providers: [WorkflowsService,AppGlobals,LoginService],
})
export class NewscrequisitiondetailsComponent implements OnInit {

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

    mySearchForm: FormGroup;
   wrname: FormControl;
   wrstatus: FormControl;
   startDate: FormControl;
   endDate: FormControl;

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


  constructor(private route:ActivatedRoute, private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService) {

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
    this.workFlowsService.LoadPersonalScDetails(0,this.userID, this.requestedSimAtatus).subscribe(
        data => {
          if(data !=null){
            //console.log(data);
            this.isDataFound = true;
            this.requisitionList = data;

            for(var i = 0; i < this.requisitionList.length; i++){
              this.requisitionList[i]['show'] = true;
            }

          }
          else{
            this.isDataFound = false;
          }
        },
      err => console.error(err),
      () => console.log('Done loading PendingTask List')
      );
    //Get Today Date
    this.isLoading = false;
    this.todayDate = new Date();



} //end of constructor



ngOnInit () {

this.createFormControls();
  this.createForm();

}

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

downloadChallan(){
  this.workFlowsService.DownloadChallan().subscribe(
    res  =>  {
      console.log('response is : '+res.message);
      if(res !== ""){
        // alert(res.message);
        // this.router.navigate(['nsa/newscrequisition']);
      } else {
        alert('failed to download Challan');
      }
    },
    err  =>  {

    }

  );

}

createFormControls() {
  this.wrname = new FormControl('',Validators.pattern(this.wrNamePattern));
  this.wrstatus = new FormControl('');
  this.startDate = new FormControl('');
  this.endDate = new FormControl('');
}

createForm() {
  this.mySearchForm = new FormGroup({
    wrname: this.wrname,
    wrstatus: this.wrstatus,
    startDate: this.startDate,
  endDate: this.endDate
  });
}

onTaskSelect(aTask) {
      //this.selectedContactId = aTask.wr_ID;
      //this.router.navigateByUrl('/nsa/seriesprovisiondetail');
}

editAction(aTask){
  return '../screquisitionedit/'.toString();
}

viewAction(aTask){
  return '../screquisitionview/'.toString();
}

}
