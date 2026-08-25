import {Component, OnInit} from '@angular/core';
import {AppGlobals} from './../../../app.global';
import {LoginService} from '../../pages/LoginService';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {DefinitionDataService} from '../services/definitiondata.service';
import {IsmsworkflowsService} from '../services/ismsworkflows.service';
import {LoggedInUser} from '../../pages/loggedInUser';
import {environment} from '../../../../environments/environment';
import {FileoperationService} from '../../nsa/services/fileoperation.service';
import {WorkflowsService} from '../services/workflows.service';

@Component({
    selector: 'app-requisitionview',
    templateUrl: './requisitionview.component.html',
    styleUrls: ['./requisitionview.component.scss'],
    providers: [AppGlobals, LoginService, DefinitionDataService, IsmsworkflowsService, FileoperationService, WorkflowsService]
})
export class RequisitionviewComponent implements OnInit {

    requisition: any;
    requsitionLines: any;
    employeeDetails: any;
    requisitionDetails: any;
    requisitionId: number;
    currentLoggedInUser: LoggedInUser;
    userName: string;
    groupID: number;
    userID: string;
    requisition_comments: string;
    requisition_existing_comments: Array<any>;
    serverUrl: string;
    cmpEnvironment: string

    public listRequisitionType = [];
    public listPurposeCategory = [];
    public listLocation = [];
    public listUsageCategory = [];
    public listProduct = [];
    public listImsiType = [];
    public listSpecialRequirement = [];
    public successAlertMessage: string = '';

    loadMasterData() {
        this.listSpecialRequirement = environment.dataSpecialRequirementTypes;

//GetRequisitionType
        this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_RequisitionType).subscribe(
            data => {
                //console.log(data);
                for (let index in data) {
                    //console.log (data[index]);
                    this.listRequisitionType.push(
                        {
                            id: data[index].id,
                            ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
                        }
                    );
                }
            },
            err => console.error(err),
            () => console.log('done loading Provisioning Type Name List')
        );
//GetPurposeCategory

        this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_PurposeType).subscribe(
            data => {
                //console.log(data);
                for (let index in data) {
                    //console.log (data[index]);
                    this.listPurposeCategory.push(
                        {
                            id: data[index].id,
                            ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
                        }
                    );
                }
            },
            err => console.error(err),
            () => console.log('done loading Provisioning Type Name List')
        );

        //GetLocation

        this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_Location).subscribe(
            data => {
                //console.log(data);
                for (let index in data) {
                    //console.log (data[index]);
                    this.listLocation.push(
                        {
                            id: data[index].id,
                            ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
                        }
                    );
                }
            },
            err => console.error(err),
            () => console.log('done loading Provisioning Type Name List')
        );

        //GetUsageCategory

        this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_UsageCategory).subscribe(
            data => {
                //console.log(data);
                for (let index in data) {
                    //console.log (data[index]);
                    this.listUsageCategory.push(
                        {
                            id: data[index].id,
                            ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
                        }
                    );
                }
            },
            err => console.error(err),
            () => console.log('done loading usage category Name List')
        );

        //GetProducts
        this.definitionDataService.getAllMasterProduct().subscribe(
            data => {
                //console.log(data);
                for (let index in data) {
                    //console.log (data[index]);
                    this.listProduct.push(
                        {
                            id: data[index].id,
                            ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName,
                            masterProductId: data[index].masterProductId
                        }
                    );
                }
            },
            err => console.error(err),
            () => console.log('done loading Product Name List')
        );

        //GetIMSI Type

        this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_ImsiType).subscribe(
            data => {
                //console.log(data);
                for (let index in data) {
                    //console.log (data[index]);
                    this.listImsiType.push(
                        {
                            id: data[index].id,
                            ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
                        }
                    );
                }
            },
            err => console.error(err),
            () => console.log('done loading IMSI Type Name List')
        );
    }

    constructor(private route: ActivatedRoute, private router: Router, private definitionDataService: DefinitionDataService,
                private loginService: LoginService, private http: HttpClient, private _global: AppGlobals,
                private ismsworkflowsService: IsmsworkflowsService, private fileoperationService: FileoperationService,
                private workFlowsService: WorkflowsService) {

        this.requisition_comments = '';
        this.requisition_existing_comments = [];
        this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
        this.serverUrl = environment.apiUrl;

        if (this.currentLoggedInUser) {
            this.userName = this.currentLoggedInUser.userName
            this.groupID = this.currentLoggedInUser.groupID
            this.userID = this.currentLoggedInUser.userID
        } else {
            this.router.navigate(['pages/login']);
        }

        this.loadMasterData();

        //call API here to get real data
        this.requisitionId = parseInt(this.route.snapshot.paramMap.get('requisition_id'));
        this.ismsworkflowsService.findRequisitionDetails(this.requisitionId).subscribe(
            res => {
                console.log('response is : ' + res.message);
                if (res !== '') {
                    this.requisition = res;
                    this.requsitionLines = res.requisitionLines;
                    this.employeeDetails = res.employeeDetails;
                    this.requisitionDetails = res.requisitionDetails;
                    this.cmpEnvironment = (this.requisitionDetails.cmpFlag == 0) ? 'No' : 'Yes';
                    this.getComments(this.requisitionDetails['id'], '', '');
                }
            },
            err => {

            }
        );
    }

    ngOnInit() {
    }

    getComments(requisitionId, comment, userId) {

        this.ismsworkflowsService.getAllComments(requisitionId, comment, userId).subscribe(
            res => {
                console.log('response is : ' + res.message);
                if (res !== '') {
                    this.requisition_existing_comments = res;
                }
            },
            err => {

            }
        );

    }

    DownloadFile(fileNameToDownload: string) {
        console.log('fileNameToDownload: ' + fileNameToDownload);
        if (fileNameToDownload == '0') {
            alert('No File uploaded to download');
        } else {
            this.fileoperationService.DownloadFile(fileNameToDownload).subscribe((res) => {
                console.log(res);
                var downloadURL = window.URL.createObjectURL(res as any);
                var link = document.createElement('a');
                link.href = downloadURL;
                link.download = fileNameToDownload;
                link.click();
            });
        }
    }

    DownloadChallan(challanNumber, requisitionId) {
        this.workFlowsService.DownloadChallanSim(challanNumber,requisitionId).subscribe((data) => {
            const blob = new Blob([data], {type: 'application/pdf'});

            var downloadURL = window.URL.createObjectURL(data);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = challanNumber+".pdf";
            link.click();

        });
    }
}
