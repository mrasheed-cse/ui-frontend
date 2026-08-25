import {
    NgModule,
    Component,
    Pipe,
    OnInit,
} from '@angular/core';

import {DatePipe} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
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
    styleUrls: ['./nsa_styles.css'],
    // styleUrls: ['./search_po.component.scss'],
    providers: [AppGlobals, LoginService, DatePipe, MfsRecyclingSummaryReportService, SharedMessageService],
    standalone: false
})
export class DownloadsMfsRecyclingSummaryReportComponent implements OnInit {
    myDownloadForm: UntypedFormGroup;
    selectedTaggingType: UntypedFormControl;
    selectedMfs: UntypedFormControl;

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

    createFormControls() {
        this.selectedTaggingType = new UntypedFormControl('', Validators.required);
        this.selectedMfs = new UntypedFormControl('', Validators.required);
    }

    createForm() {
        this.myDownloadForm = new UntypedFormGroup({
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

    downloadFile(response : any) :void {
        console.log(response);
        console.log(response.headers);
        let filename = "attachment.csv";

        // Get filename from content-disposition header
        const contentDisposition = response.headers.get('content-disposition');

        if (contentDisposition) {
            let arr = contentDisposition.split(';');
            if (arr.length > 1) {
                arr.forEach(element => {
                    if (element.trim().startsWith('filename=')) {
                        let arr2 = element.split('=');
                        if (arr2.length > 1) {
                            filename = arr2[1].trim().replace(/"/g, '');
                        }
                    }
                })
            }
        }

        // Create blob and download
        const blob = new Blob([response.body],
            { type: response.headers.get('content-type') });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
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
