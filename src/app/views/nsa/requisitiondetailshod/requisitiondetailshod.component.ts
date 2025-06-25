import {Component, OnInit} from '@angular/core';
import {AppGlobals} from './../../../app.global';
import {LoginService} from '../../pages/LoginService';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DefinitionDataService} from '../services/definitiondata.service';
import {IsmsworkflowsService} from '../services/ismsworkflows.service';
import {LoggedInUser} from '../../pages/loggedInUser';
import {FileoperationService} from '../../nsa/services/fileoperation.service';

@Component({
    selector: 'app-requisitiondetailshod',
    templateUrl: './requisitiondetailshod.component.html',
    styleUrls: ['./requisitiondetailshod.component.scss'],
    providers: [AppGlobals, LoginService, IsmsworkflowsService, FileoperationService]
})
export class RequisitiondetailshodComponent implements OnInit {

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
                    this.cmpEnvironment = res.requisitionDetails.cmpFlag == 0 ? 'No' : 'Yes';
                    this.getComments(this.requisitionDetails['id'], "", "");
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

        this.approveOrRejectRequest(this.requisitionDetails['id'], 'ACCEPT', this.userID);
    }

    reject() {
        this.approveOrRejectRequest(this.requisitionDetails['id'], 'REJECT', this.userID);
    }

    rfi() {
        this.approveOrRejectRequest(this.requisitionDetails['id'], 'RFI', this.userID);
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
