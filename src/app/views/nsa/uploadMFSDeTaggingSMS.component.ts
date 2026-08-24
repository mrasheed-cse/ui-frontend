import {DatePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {
    NgModule,
    Component,
    Pipe,
    OnInit,
} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppGlobals} from 'app/app.global';
import {LoggedInUser} from '../pages/loggedInUser';
import {LoginService} from '../pages/LoginService';
import {FileoperationService} from './services/fileoperation.service';
import {UploadCSVMFSDeTaggingService} from './services/uploadCsvMFSDeTagging.service';


@Component({
    selector: 'app-uploadCsvFile',
    templateUrl: './uploadfileswith-mfsdetagging-csv.component.html',
    styleUrls: ['./nsa_styles.css'],
    // styleUrls: ['./search_po.component.scss'],
    providers: [AppGlobals, LoginService, DatePipe, UploadCSVMFSDeTaggingService, FileoperationService],
})
export class UploadMFSDeTaggingCsvFile implements OnInit {
    myRecycledSmsForm: UntypedFormGroup;
    recycledSmsFile: UntypedFormControl;
    selectedMfs: UntypedFormControl;

    currentLoggedInUser: LoggedInUser;
    userName: string;
    groupID: number;
    userID: string;
    fileToUpload: File = null;
    fileName: string;
    isLoading: boolean = false

    mfsList = [
        {key: 'UPAY', value: 'UPAY'},
        {key: 'BKASH', value: 'bkash'},
        {key: 'NAGAD', value: 'Nagad'},
        {key: 'ROCKET', value: 'Rocket'},
        {key: 'GOLD', value: 'Gold'},
        {key: 'TEST', value: 'Test'},
        {key: 'OTHERS', value: 'Others'}];


    constructor(private datePipe: DatePipe, private router: Router, private loginService: LoginService, private http: HttpClient,
                private _global: AppGlobals, private datawarehouseservice: UploadCSVMFSDeTaggingService, private fileoperationService: FileoperationService) {
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
        this.recycledSmsFile = new UntypedFormControl('', Validators.required);
        this.selectedMfs = new UntypedFormControl('', Validators.required);
    }

    createForm() {
        this.myRecycledSmsForm = new UntypedFormGroup({
            selectedMfs: this.selectedMfs,
            recycledSmsFile: this.recycledSmsFile
        });
    }

    submit() {
        this.isLoading = true;

        if (this.myRecycledSmsForm.invalid) {
            this.isLoading = false;
            return;
        }

        const {selectedMfs} = this.myRecycledSmsForm.value;

        if (this.fileToUpload == undefined || !this.fileToUpload.name.endsWith('.csv')) {
            alert('Please select a csv file with file name starting with De-Tagging');
            this.isLoading = false;
        } else {
            const fd = new FormData();
            this.isLoading = true;
            this.fileName = this.fileToUpload.name;

            fd.append('nsa-file', this.fileToUpload, this.fileName);
            fd.append("createdBy", this.userID);
            fd.append("mfs", selectedMfs);

            let result = this.fileoperationService.uploadMFSDeTaggingCSV(fd);
            result.subscribe(
                res => {
                    if (res != undefined && res.success == true) {
                        this.datawarehouseservice.uploadMFSDeTaggingCsv(this.userID, this.fileName, selectedMfs).subscribe(
                            data => {
                                if (data != undefined && data.success) {
                                    alert("The MFS De-Tagging operation has been completed successfully." +
                                        "\n" +
                                        "Total: " + data.total +
                                        "\n" +
                                        "Success: " + data.successCount +
                                        "\n" +
                                        "Failure: " + data.failCount);
                                } else if (data != undefined) {
                                    let msg = "The MFS De-Tagging operation has failed.";
                                    if (data.errMsg  != undefined && data.errMsg != "") {
                                        msg = msg + "\n" + data.errMsg;
                                    }
                                    alert(msg);
                                } else {
                                    let msg = "The MFS De-Tagging operation has failed.";
                                    alert(msg);
                                }
                                this.isLoading = false;
                                this.fileToUpload = null;
                            },
                            err => {
                                console.log(err);
                                if (err != undefined && err.error != undefined) {
                                    let msg = "The MFS De-Tagging operation has failed.";
                                    if (err.error.errMsg  != undefined && err.error.errMsg != "") {
                                        msg = msg + "\n" + err.error.errMsg;
                                    }
                                    alert(msg);
                                } else {
                                    let msg = "The MFS De-Tagging operation has failed.";
                                    alert(msg);
                                }
                                this.isLoading = false;
                                this.fileToUpload = null;
                            }
                        );
                    } else if (res != undefined) {
                        console.log(res);
                        let msg = "The MFS De-Tagging operation has failed.";
                        if (res.errMsg  != undefined && res.errMsg != "") {
                            msg = msg + "\n" + res.errMsg;
                        }
                        alert(msg);
                    } else {
                        let msg = "The MFS De-Tagging operation has failed.";
                        alert(msg);
                    }
                },
                err => {
                    console.log(err);
                    if (err != undefined && err.error != undefined) {
                        let msg = "The MFS De-Tagging operation has failed.";
                        if (err.error.errMsg  != undefined && err.error.errMsg != "") {
                            msg = msg + "\n" + err.error.errMsg;
                        }
                        alert(msg);
                    } else {
                        let msg = "The MFS De-Tagging operation has failed.";
                        alert(msg);
                    }
                    this.isLoading = false;
                    this.fileToUpload = null;
                }
            );
        }
    }

    onMFSChange(): void {
        console.log('Selected option:', this.selectedMfs);
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        this.fileName = this.fileToUpload.name;
    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }
}
