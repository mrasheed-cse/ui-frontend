import {
    NgModule,
    Component,
    Pipe,
    OnInit
} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {WorkflowsService} from './../services/workflows.service';
import {IsmsworkflowsService} from '../services/ismsworkflows.service';
import {AppGlobals} from './../../../app.global';
import {Router, ActivatedRoute} from '@angular/router';
import {FileoperationService} from '../services/fileoperation.service';

import {LoginService} from '../../pages/LoginService';
import {LoggedInUser} from '../../pages/loggedInUser';

@Component({
    selector: 'app-activation-pendingapprovals',
    templateUrl: './activation-pendingapprovals.component.html',
    styleUrls: ['./activation-pendingapprovals.component.scss'],
    providers: [WorkflowsService, AppGlobals, LoginService, IsmsworkflowsService, FileoperationService],
})
export class ActivationPendingapprovalsComponent implements OnInit {

    requisition: any;
    requisitionList: Array<Object>;
    currentLoggedInUser: LoggedInUser;
    userName: string;
    groupID: number;
    userID: string;
    todayDate: Date;
    routerUrlAndParams: string;
    public isLoading: boolean = false;
    public showDetail: boolean = false;
    public requisitionIdSelected: number = 0;
    isDataFound: boolean = true;
    selectAll: boolean = false;

    handleSelectAll(event: any) {

        console.log(event);

        if (event != null && event != '' && event != undefined) {
            event = parseInt(event);
        } else {
            return;
        }

        var status = false;
        if (event == 1) {
            status = true;
        }

        for (var i = 0; i < this.requisition['msisdnDetails'].length; i++) {
            this.requisition['msisdnDetails'][i]['selected'] = status;
        }
    }

    constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private workflowsService: WorkflowsService, private ismsworkflowsService: IsmsworkflowsService, private fileoperationService: FileoperationService) {

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
        //this.requisitionList = _global.dataTempForNewActRequest;

    } //end of constructor


    ngOnInit() {

        //this.isLoading = true;

        setTimeout(() => {    //<<<---    using ()=> syntax
            this.getRequisitionDetails();
        }, 2000);

    }


    getMsisdnDetails() {
        this.workflowsService.newSimActivationDetails(this.requisitionIdSelected, this.userID).subscribe(
            res => {
                if (res !== '') {
                    this.requisition['msisdnDetails'] = res;

                    for (var i = 0; i < this.requisition['msisdnDetails'].length; i++) {
                        this.requisition['msisdnDetails']['selected'] = false;
                    }

                    this.isLoading = false;
                }
            },
            err => {

            }
        );
    }

    getRequisitionDetails() {

        this.requisitionIdSelected = parseInt(this.route.snapshot.paramMap.get('requisition_id'));
        //this.requisition = this._global.dataTempForNewActRequestDetails;
        this.requisition = {};
        this.isLoading = true;
        //return;

        this.ismsworkflowsService.findRequisitionDetails(this.requisitionIdSelected).subscribe(
            res => {
                console.log('response is : ' + res.message);
                if (res !== '') {
                    this.requisition['requisitionDetails'] = res.requisitionDetails;
                    this.getMsisdnDetails();
                }
                this.isLoading = false;
            },
            err => {
                this.isLoading = false;
            }
        );


    }


    approve() {

        var allRqnLineNumbers = '';
        var approvedSimActivationIds = '';

        for (var i = 0; i < this.requisition['msisdnDetails'].length; i++) {
            if (this.requisition['msisdnDetails'][i]['selected']) {

                if (this.requisition['msisdnDetails'][i]['simStatus'] == 'Requested For Activation' &&
                    this.requisition['msisdnDetails'][i]['declarationStatus'] == 'Agreed') {
                    allRqnLineNumbers += this.requisition['msisdnDetails'][i]['requisitionLineMsisdnId'] + ',';
                    approvedSimActivationIds += this.requisition['msisdnDetails'][i]['simActivationId'] + ',';
                } else {
                    var msg = 'Only MSISDNs which are in status \'Requested For Activation\', and with declaration status \'Agreed\', can be selected. Please deselect MSISDN in row ' + (i + 1) + '.';
                    alert(msg);
                    return;
                }

            }
        }

        //console.log(allRqnLineNumbers);return;

        if (confirm('For each MSISDN, please confirm that activation from Bluebox has been completed')) {
            //// //////////////////// //////////////
            this.workflowsService.updateSimActivationReq(
                this.requisition['requisitionDetails']['id'],
                this.userID,
                allRqnLineNumbers,
                '',
                approvedSimActivationIds,
                'UPDATE').subscribe(
                res => {
                    console.log('response is : ' + res.message);
                    if (res !== '') {

                    }
                },
                err => {

                }
            );

            setTimeout(() => {    //<<<---    using ()=> syntax

                /////////////////// //////////////////////////
                this.isLoading = false;
                alert('This request has been submitted.');
                this.router.navigate(['nsa/testsimdashboard']);
                /////////// ////////////// ///////////////////

            }, 5000);


            ///////// /////////////// //////////////
        }

    }

    exportFile() {
        this.requisitionIdSelected = parseInt(this.route.snapshot.paramMap.get('requisition_id'));

        this.workflowsService.exportNewSimActivationDetails(this.requisitionIdSelected, this.userID).subscribe(
            response => {
                if (response) {
                    this.downloadFile(response);
                }
            },
            err => {
                console.log(err);
            }
        );
    }

    downloadFile(response: HttpResponse<Blob>): void {
        this.fileoperationService.downloadBlobFile(response, 'download.csv');
    }
}

