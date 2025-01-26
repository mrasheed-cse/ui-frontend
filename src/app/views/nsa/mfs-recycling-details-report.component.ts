import {
    NgModule,
    Component,
    Pipe,
    OnInit
} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../../app.global';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../pages/LoginService';
import {LoggedInUser} from '../pages/loggedInUser';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileoperationService} from './services/fileoperation.service';
import {MfsRecyclingReportService} from './services/mfs-recycling-report.service';

@Component({
    selector: 'mfs-recycling-summary-report',
    templateUrl: './mfs-recycling-details-report.html',
    styles: [],
    providers: [AppGlobals, LoginService, DatePipe, FileoperationService, MfsRecyclingReportService],
})
export class MfsRecyclingDetailsReportComponent implements OnInit {
    recycleForm: FormGroup;
    recycleFile: FormControl;

    currentLoggedInUser: LoggedInUser;
    userName: string;
    groupID: number;
    userID: string;

    fileToUpload: File = null;
    fileName: string;

    isLoading: boolean = false

    isReportFound = false;
    isReportLoading = false;
    fileList = [];

    constructor(private datePipe: DatePipe, private router: Router, private loginService: LoginService, private http: HttpClient,
                private _global: AppGlobals, private fileoperationService: FileoperationService,
                private reportService: MfsRecyclingReportService) {

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
        this.recycleFile = new FormControl('', Validators.required);
    }

    createForm() {
        this.recycleForm = new FormGroup({
            recycleFile: this.recycleFile
        });
    }

    submit() {
        if (this.recycleForm.invalid) {
            return;
        }

        if (this.fileToUpload == undefined || !this.fileToUpload.name.endsWith('.csv')) {
            alert('Please select a csv file');
        } else {
            this.isLoading = true;
            const fd = new FormData();

            fd.append("createdBy", this.userID);
            fd.append('nsa-file', this.fileToUpload, this.fileName);

            let result = this.fileoperationService.uploadMFSRecyclingReportCSV(fd);
            result.subscribe(
                res => {
                    if (res != undefined && res.success == true) {
                        this.reportService.uploadMSISDN(this.userID, this.fileName).subscribe(
                            result => {
                                alert("Processing of the uploaded file.\nYou will be notified through email once the report is ready to download.");
                                this.isLoading = false;
                                this.fileToUpload = null;
                            },
                            err => {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    const errorMessage = reader.result as string;
                                    alert(errorMessage || "Failed to upload file.");
                                };
                                reader.readAsText(err.error);

                                this.isLoading = false;
                                this.fileToUpload = null;
                            }
                        );
                    } else if (res != undefined) {
                        let msg = "Failed to upload file.";
                        if (res.errMsg  != undefined && res.errMsg != "") {
                            msg = msg + "\n" + res.errMsg;
                        }
                        alert(msg);
                    } else {
                        console.log(res);
                        let msg = "Failed to upload file.";
                        alert(msg);
                    }
                },
                err => {
                    console.log(err);
                    if (err != undefined && err.error != undefined) {
                        let msg = "Failed to upload file.";
                        if (err.error.errMsg  != undefined && err.error.errMsg != "") {
                            msg = msg + "\n" + err.error.errMsg;
                        }
                        alert(msg);
                    } else {
                        let msg = "Failed to upload file.";
                        alert(msg);
                    }
                    this.isLoading = false;
                    this.fileToUpload = null;
                }
            );
        }
    }

    downloadFile(response: any): void {
        console.log(response);
        console.log(response.headers);
        let filename = 'download.csv';

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
        const blob = new Blob([response.body], {type: response.headers.get('content-type')});

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
    }


    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        this.fileName = this.fileToUpload.name;
    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
        this.loadReport();
    }

    downloadReport (fileName: string) {
        this.reportService.downloadReport(this.userID, fileName).subscribe(
            result => {
                //console.log(result);
                this.downloadFile(result);
            },
            err => {
                console.log(err);
            }
        )
    }

    loadReport() {
        this.isReportFound = false;
        this.isReportLoading = true;
        this.reportService.getReportList(this.userID).subscribe(
            result => {
                //console.log(result);
                this.fileList = result;

                this.isReportFound = true;
                this.isReportLoading = false;
            },
            err => {
                console.log(err);
                this.fileList = [];

                this.isReportFound = false;
                this.isReportLoading = false;
            }
        )
    }
}
