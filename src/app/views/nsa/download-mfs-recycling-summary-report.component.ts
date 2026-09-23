import {
    NgModule,
    Component,
    Pipe,
    OnInit,
} from '@angular/core';

import {DatePipe} from '@angular/common';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppGlobals} from 'app/app.global';
import {LoggedInUser} from '../pages/loggedInUser';
import {LoginService} from '../pages/LoginService';
import {FileoperationService} from './services/fileoperation.service';
import {MfsRecyclingSummaryReportService} from './services/mfs-recycling-summary-report.service';
import {SharedMessageService} from './services/shared-message.service';


@Component({
    selector: 'download-mfs-recycling-summary-report',
    templateUrl: './download-mfs-recycling-summary-report.html',
    styles: ['./nsa_styles.css'],
    // styleUrls: ['./search_po.component.scss'],
    providers: [AppGlobals, LoginService, DatePipe, FileoperationService, MfsRecyclingSummaryReportService, SharedMessageService],
})
export class DownloadsMfsRecyclingSummaryReportComponent implements OnInit {
    myDownloadForm: FormGroup;
    selectedTaggingType: FormControl;
    selectedMfs: FormControl;

    currentLoggedInUser: LoggedInUser;
    userName: string;
    groupID: number;
    userID: string;

    isLoading = false;

    listId: string | null = null

    MFS_RECYCLING_LIST_ID_TO_DOWNLOAD_MSISDN : string = 'MFS_RECYCLING_LIST_ID_TO_DOWNLOAD_MSISDN';

    taggingTypes = [
        {key: 'NON_MFS', value: 'Non-MFS'},
        {key: 'MFS', value: 'MFS'}];

    mfsList = [
        {key: 'ALL', value: 'ALL'},
        {key: 'UPAY', value: 'UPAY'},
        {key: 'BKASH', value: 'bkash'},
        {key: 'NAGAD', value: 'Nagad'},
        {key: 'ROCKET', value: 'Rocket'},
        {key: 'GOLD', value: 'Gold'},
        {key: 'TEST', value: 'Test'},
        {key: 'OTHERS', value: 'Others'}];


    constructor(private datePipe: DatePipe, private router: Router, private loginService: LoginService, private http: HttpClient,
                private _global: AppGlobals, private summaryService: MfsRecyclingSummaryReportService,
                private sharedMessageService: SharedMessageService, private fileoperationService: FileoperationService) {
        this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

        if (this.currentLoggedInUser) {
            this.userName = this.currentLoggedInUser.userName
            this.groupID = this.currentLoggedInUser.groupID
            this.userID = this.currentLoggedInUser.userID

        } else {
            this.router.navigate(['pages/login']);
        }

    }

    createFormControls() {
        this.selectedTaggingType = new FormControl('', Validators.required);
        this.selectedMfs = new FormControl('', Validators.required);
    }

    createForm() {
        this.myDownloadForm = new FormGroup({
            selectedTaggingType: this.selectedTaggingType,
            selectedMfs: this.selectedMfs
        });
    }

    submit() {
        if (this.listId == null || this.listId === '') {
            alert("No lisId found");
            return;
        }

        let mfs = this.getMfs();
        if (mfs != null) {
            this.isLoading = true;
            this.summaryService.downloadMSISDN(this.listId, mfs).subscribe(
                response => {
                    this.isLoading = false;
                    this.downloadFile(response);
                },
                error => {
                    console.log(error);
                    alert("Failed to download file")
                    this.isLoading = false;
                }
            );
        }
    }

    getMfs() {
        let ret : string = null;
        if (this.selectedTaggingType != null && this.selectedTaggingType.value != null && this.selectedTaggingType.value != '') {
            if (this.selectedTaggingType.value === 'NON_MFS') {
                ret = "NONE";
            } else if (this.selectedMfs != null && this.selectedMfs.value != null && this.selectedMfs.value != '') {
                ret = this.selectedMfs.value;
            }
        }
        return ret;
    }

    downloadFile(response: HttpResponse<Blob>): void {
        this.fileoperationService.downloadBlobFile(response, 'attachment.csv');
    }

    onTaggingTypeChange() : void {
        console.log('Selected tagging type:', this.selectedTaggingType.value);
    }

    onMFSChange(): void {
        console.log('Selected mfs option:', this.selectedMfs.value);
    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();

        this.listId = this.sharedMessageService.getMessage(this.MFS_RECYCLING_LIST_ID_TO_DOWNLOAD_MSISDN);
        console.log("GETTING ListId= " + this.listId);
    }
}
