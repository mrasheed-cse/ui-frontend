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
import {UploadCSVRecycleSMSService} from './services/uploadCsvRecycleSms.service';


@Component({
    selector: 'app-uploadCsvFile',
    templateUrl: './uploadfileswith-Csv.component.html',
    styleUrls: ['./nsa_styles.css'],
    // styleUrls: ['./search_po.component.scss'],
    providers: [AppGlobals, LoginService, DatePipe, UploadCSVRecycleSMSService, FileoperationService],
})
export class UploadRecycleCsvFile implements OnInit {
    myRecycledSmsForm: UntypedFormGroup;
    listId: UntypedFormControl;
    unusedSince: UntypedFormControl;
    msisdnCount: UntypedFormControl;
    recycledSmsFile: UntypedFormControl;

    currentLoggedInUser: LoggedInUser;
    userName: string;
    groupID: number;
    userID: string;
    fileToUpload: File = null;
    fileName: string;
    isLoading: boolean = false;

    todayDate: Date = new Date();

    //datepickerConfig: Partial<BsDatepickerConfig>;

    bsConfig = {
        dateInputFormat: 'DD-MM-YYYY', // Customize date format
        containerClass: 'theme-green', // Choose a theme
        isAnimated: true, // Enable animation
        showWeekNumbers: false // Hide week numbers
    };


    constructor(private datePipe: DatePipe, private router: Router, private loginService:
    LoginService, private http: HttpClient, private _global: AppGlobals, private datawarehouseservice: UploadCSVRecycleSMSService, private fileoperationService: FileoperationService) {
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
        this.listId = new UntypedFormControl('', Validators.required);
        this.unusedSince = new UntypedFormControl('', Validators.required);
        this.msisdnCount = new UntypedFormControl('', Validators.required);
    }

    createForm() {
        this.myRecycledSmsForm = new UntypedFormGroup({
            listId: this.listId,
            unusedSince: this.unusedSince,
            msisdnCount: this.msisdnCount,
            recycledSmsFile: this.recycledSmsFile
        });
    }

    submit() {
        this.isLoading = true;

        const {listId, unusedSince, msisdnCount} = this.myRecycledSmsForm.value;

        if (this.myRecycledSmsForm.invalid) {
            this.isLoading = false;
            return;
        }

        if (this.fileToUpload == undefined || !this.fileToUpload.name.endsWith('.csv') || !this.fileToUpload.name.startsWith('ListId')) {
            alert('Please select a csv file with file name starting with ListId');
            this.isLoading = false;
        } else {
            const fd = new FormData();
            this.isLoading = true;
            this.fileName = this.fileToUpload.name;

            fd.append('nsa-file', this.fileToUpload, this.fileName);

            let result = this.fileoperationService.uploadRecycledCSV(fd);
            result.subscribe(
                res => {
                    if (res != undefined && res.success == true) {
                        let formattedDate = this.datePipe.transform(unusedSince, 'dd-MM-yyyy');
                        this.datawarehouseservice.uploadCsv(this.userID, this.fileName, listId, formattedDate, msisdnCount).subscribe(
                            data => {
                                if (data != undefined && data.success == true) {
                                    alert("File has been uploaded and processed successfully");
                                } else if(data != undefined) {
                                    let msg = "Failed to upload file.";
                                    if (data.errMsg != undefined && data.errMsg != "") {
                                        msg = msg + "\n" + data.errMsg;
                                    }
                                    alert(msg);
                                } else {
                                    let msg = "Failed to upload file.";
                                    alert("Failed to upload file.");
                                }
                                this.fileToUpload = null;
                                this.isLoading = false;
                            }, err => {
                                console.log(err);
                                if (err != undefined && err.error != null) {
                                    let msg = "Failed to upload file.";
                                    if (err.error.errMsg != undefined && err.error.errMsg != "") {
                                        msg = msg + "\n" + err.error.errMsg;
                                    }
                                    alert(msg);
                                } else {
                                    let msg = "Failed to upload file.";
                                    alert(msg);
                                }
                                this.fileToUpload = null;
                                this.isLoading = false;
                            }
                        );
                    } else if (res != undefined) {
                        console.log(res);
                        let msg = "Failed to upload file.";
                        if (res.errMsg != undefined && res.errMsg != "") {
                            msg = msg + "\n" + res.errMsg;
                        }
                        alert(msg);
                    } else {
                        let msg = "Failed to upload file.";
                        alert(msg);
                    }
                },
                err => {
                    console.log(err);
                    if (err != undefined && err.error != undefined) {
                        let msg = "Failed to upload file.";
                        if (err.error.errMsg != undefined && err.error.errMsg != "") {
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

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        this.fileName = this.fileToUpload.name
    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }
}
