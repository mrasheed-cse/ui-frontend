import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {HttpClient} from '@angular/common/http';
import {WorkflowsService} from './services/workflows.service';
import {AppGlobals} from './../../app.global';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

import {LoginService} from '../pages/LoginService';
import {LoggedInUser} from '../pages/loggedInUser';

@Component({
    selector: 'app-newscrequisition',
    templateUrl: './newscrequisition.component.html',
    styleUrls: ['./demo.component.css'],
    providers: [WorkflowsService, AppGlobals, LoginService],
})
export class NewscrequisitionComponent implements OnInit {
    requisitionList: Array<Object>;
    currentLoggedInUser: LoggedInUser;
    userName: string;
    groupID: number;
    userID: string;

    public dangerAlertShow: boolean = false;
    public dangerAlertMessage: string = "";
    public successSearchShow: boolean = false;
    public successAlertMessage: string = "";

    isDataFound: boolean = true;
    isCollapsed: boolean = true;

    mySearchForm: UntypedFormGroup;
    wrname: UntypedFormControl;
    wrstatus: UntypedFormControl;
    startDate: UntypedFormControl;
    endDate: UntypedFormControl;

    wrNamePattern: string = "(RQN).\*";
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
    public isLoading: boolean = false;

    constructor(private router: Router, private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private workFlowsService: WorkflowsService) {

        this.isLoading = false;
        let isValid = true;
        this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

        if (this.currentLoggedInUser) {
            this.userName = this.currentLoggedInUser.userName
            this.groupID = this.currentLoggedInUser.groupID
            this.userID = this.currentLoggedInUser.userID
        } else {
            this.router.navigate(['pages/login']);
        }
        //this.requisitionList = _global.dataTemp;

    } //end of constructor


    loadPendingScList() {
        //GetPendingTaskList
        this.workFlowsService.LoadScRequisitionList(0, this.userID).subscribe(
            data => {
                if (data != null) {
                    console.log(data);
                    this.isDataFound = true;
                    this.requisitionList = data;
                    for (var i = 0; i < this.requisitionList.length; i++) {
                        this.requisitionList[i]['show'] = true;
                    }
                    this.isLoading = false;
                } else {
                    this.isDataFound = false;
                }
            },
            err => console.error(err),
            () => console.log('Done loading PendingTask List')
        );
        //Get Today Date
        this.todayDate = new Date();
    }


    ngOnInit() {

        this.createFormControls();
        this.createForm();
        this.isLoading = true;

        setTimeout(() => {    //<<<---    using ()=> syntax
            this.loadPendingScList();
        }, 5000);


    }

    datepickerConfig: Partial<BsDatepickerConfig>;

    clearSearch() {
        for (var i = 0; i < this.requisitionList.length; i++) {
            this.requisitionList[i]['show'] = true;
        }
    }

    onSearchSubmit() {

        if (this.wrname.value || this.startDate.value || this.endDate.value || this.wrstatus.value) {
            console.log('Form Submitted!');
            console.log(this.mySearchForm.value);
            this.successSearchShow = false;
            this.dangerAlertShow = false;

            for (var i = 0; i < this.requisitionList.length; i++) {
                this.requisitionList[i]['show'] = false;

                if (this.wrname.value != null && this.wrname.value != undefined && this.wrname.value != "" && this.wrname.value == this.requisitionList[i]['requisitionNo']) {
                    this.requisitionList[i]['show'] = true;
                }

                if (this.startDate.value != null && this.startDate.value != undefined && this.startDate.value != ""
                    &&
                    this.endDate.value != null && this.endDate.value != undefined && this.endDate.value != "") {
                    //var sdate = moment(this.requisitionList[i]['requisitionDt']).format('DD-MM-YYYY');
                    var sdate = new Date(this.requisitionList[i]['requisitionDt'].replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))

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

                    if (sdate >= startDateOfForm && sdate <= endDateOfForm) {
                        this.requisitionList[i]['show'] = true;
                    }
                }


            }

        }

    }

    createFormControls() {
        this.wrname = new UntypedFormControl('', Validators.pattern(this.wrNamePattern));
        this.wrstatus = new UntypedFormControl('');
        this.startDate = new UntypedFormControl('');
        this.endDate = new UntypedFormControl('');
    }

    createForm() {
        this.mySearchForm = new UntypedFormGroup({
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

    detailsAction(aTask) {

        return '../screquisitiondetailsassesment/'.toString();

    }

}
