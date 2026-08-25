import {
    NgModule,
    Component,
    Pipe,
    OnInit
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {AppGlobals} from '../../app.global';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../pages/LoginService';
import {LoggedInUser} from '../pages/loggedInUser';
import {MfsRecyclingSummaryReportService} from './services/mfs-recycling-summary-report.service';
import {DatePipe} from '@angular/common';
import {SharedMessageService} from './services/shared-message.service';

@Component({
    selector: 'mfs-recycling-summary-report',
    templateUrl: './mfs-recycling-summary-report.component.html',
    styles: [],
    providers: [AppGlobals, LoginService, DatePipe, MfsRecyclingSummaryReportService, SharedMessageService],
})
export class MfsRecyclingSummaryReportComponent implements OnInit {

    summaryReports = [];

    currentLoggedInUser: LoggedInUser;
    userName: string;
    groupID: number;
    userID: string;

    public isLoading: boolean = false;

    public currPage: number;
    public totalPages: number;
    public pageSize: number;

    MFS_RECYCLING_LIST_ID_TO_DOWNLOAD_MSISDN : string = 'MFS_RECYCLING_LIST_ID_TO_DOWNLOAD_MSISDN';


    constructor(private datePipe: DatePipe, private route: ActivatedRoute, private router: Router, private loginService: LoginService,
                private http: HttpClient, private _global: AppGlobals, private summaryService: MfsRecyclingSummaryReportService,
                private sharedMessageService: SharedMessageService) {

        this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

        if (this.currentLoggedInUser) {
            this.userName = this.currentLoggedInUser.userName
            this.groupID = this.currentLoggedInUser.groupID
            this.userID = this.currentLoggedInUser.userID
        } else {
            this.router.navigate(['pages/login']);
        }
    }

    loadSummaryReports() {
        this.isLoading = true;
        this.summaryReports = [];
        this.summaryService.getSummary(this.currPage, this.pageSize).subscribe(
            result => {
                if (result.success) {
                    this.totalPages = result.totalPages;
                    this.summaryReports = result.summaryList;
                }
                this.isLoading = false;
            },
            error => {
                console.log(error);
                alert("Failed to load summary reports");
                this.isLoading = false;
            }
        );
    }

    downloadMSISDN(listId: string) {
        console.log("SETTING ListId = " + listId);
        this.sharedMessageService.setMessage(this.MFS_RECYCLING_LIST_ID_TO_DOWNLOAD_MSISDN, listId);
        this.router.navigateByUrl('/nsa/download-mfs-recycling-summary');
    }

    ngOnInit() {
        this.currPage = 1;
        this.totalPages = 1;
        //this.pageSize = this._global.defaultPageSize;
        this.pageSize = 10;
        this.loadSummaryReports();
    }

    prevPage() {
        if (this.currPage <= 1) {
            //first page .. do nothing
        } else {
            this.currPage--;
            this.loadSummaryReports();
        }
    }

    nextPage() {
        if (this.currPage >= this.totalPages) {
            //last page .. do nothing
        } else {
            this.currPage++;
            this.loadSummaryReports()
        }
    }
}
