import {Component, OnInit} from '@angular/core';
import {AppGlobals} from './../../../app.global';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DefinitionDataService} from '../services/definitiondata.service';
import {IsmsworkflowsService} from '../services/ismsworkflows.service';
import {FileoperationService} from '../../nsa/services/fileoperation.service';

import {LoginService} from '../../pages/LoginService';
import {LoggedInUser} from '../../pages/loggedInUser';

@Component({
    selector: 'app-requisitiondetails-form',
    templateUrl: './requisitiondetails-form.component.html',
    styleUrls: ['./requisitiondetails-form.component.scss'],
    providers: [AppGlobals, LoginService, IsmsworkflowsService, FileoperationService]
})
export class RequisitiondetailsFormComponent implements OnInit {

    requisition: any;
    requsitionLines: Array<any>;
    employeeDetails: any;
    requisitionDetails: any;
    requisitionId: number;
    currentLoggedInUser: LoggedInUser;
    userName: string;
    groupID: number;
    userID: string;
    requisition_comments: string;
    requisition_existing_comments: Array<any>;
    cmpEnvironment: string;

    constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private ismsworkflowsService: IsmsworkflowsService, private fileoperationService: FileoperationService) {

        this.requisition_comments = '';
        this.requisition_existing_comments = [];
        this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

        if (this.currentLoggedInUser) {
            this.userName = this.currentLoggedInUser.userName
            this.groupID = this.currentLoggedInUser.groupID
            this.userID = this.currentLoggedInUser.userID
        } else {
            this.router.navigate(['pages/login']);
        }

        this.requisitionId = parseInt(this.route.snapshot.paramMap.get('requisition_id'));
        this.ismsworkflowsService.findRequisitionDetails(this.requisitionId).subscribe(
            res => {
                console.log('response is : ' + res.message);
                if (res !== '') {
                    this.requisition = res;
                    this.requsitionLines = res.requisitionLines;
                    this.employeeDetails = res.employeeDetails;
                    this.requisitionDetails = res.requisitionDetails;
                    this.cmpEnvironment = res.requisitionDetails.cmpFlag == 0 ? 'No' : 'Yes';
                    this.getComments(this.requisitionDetails['id'], '', '');
                }

            },
            err => {

            }
        );
    }

    ngOnInit() {

    }

    approveOrRejectRequest(requisitionId, status, userId) {

        this.ismsworkflowsService.approveOrRejectRequest(requisitionId, status, userId, this.requisition_comments).subscribe(
            res => {
                console.log('response is : ' + res.message);
                if (res !== '') {
                    alert(res.message);
                    this.router.navigate(['nsa/newrequisition']);
                }
            },
            err => {

            }
        );

    }


    approve() {
        console.log(this.requisitionDetails);
        this.approveOrRejectRequest(this.requisitionDetails['id'], 'ACCEPT', this.userID);

    }

    reject() {
        this.approveOrRejectRequest(this.requisitionDetails['id'], 'REJECT', this.userID);
    }

    rfi() {
        this.approveOrRejectRequest(this.requisitionDetails['id'], 'RFI', this.userID);
    }

    rafm() {
        this.approveOrRejectRequest(this.requisitionDetails['id'], 'RAFM', this.userID);
    }

    deleteRequisitionLine(lineItem) {

        if (confirm('Are you sure?')) {
            let numberOfLines: number;
            numberOfLines = this.requsitionLines.length;

            if (numberOfLines <= 1) {
                alert('There is only 1 line item. This cannot be deleted');
                return;
            }

            /////////////////////////////////// /////////////////
            this.ismsworkflowsService.deleteRequisitionLine(lineItem['id']).subscribe(
                res => {
                    console.log('response is : ' + res.message);
                    alert('Requisition line deleted successfully');
                    window.location.reload();
                    if (res !== '') {

                    }
                },
                err => {

                }
            );
            ////////////// //////////////////////////// /////////
        }

    }

    DownloadFile(fileNameToDownload: string) {
        console.log('fileNameToDownload: ' + fileNameToDownload);
        if (fileNameToDownload == '0') {
            alert('No File uploaded to download');
        } else {
            this.fileoperationService.DownloadFile(fileNameToDownload).subscribe((res) => {
                console.log(res);
                var downloadURL = window.URL.createObjectURL(res);
                var link = document.createElement('a');
                link.href = downloadURL;
                link.download = fileNameToDownload;
                link.click();
            });
        }
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

}
