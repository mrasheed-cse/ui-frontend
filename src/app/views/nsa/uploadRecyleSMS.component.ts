import {DatePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {
    NgModule,
    Component,
    Pipe,
    OnInit,
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppGlobals} from 'app/app.global';
import {LoggedInUser} from '../pages/loggedInUser';
import {LoginService} from '../pages/LoginService';
import {FileoperationService} from './services/fileoperation.service';
import {UploadCSVRecycleSMSService} from './services/uploadCsvRecycleSms.service';


@Component({
    selector: 'app-uploadCsvFile',
    templateUrl: './uploadfileswith-Csv.component.html',
    styles: ['./nsa_styles.css'],
    // styleUrls: ['./search_po.component.scss'],
    providers: [AppGlobals, LoginService, DatePipe, UploadCSVRecycleSMSService, FileoperationService],
})
export class UploadRecycleCsvFile implements OnInit {
    myRecycledSmsForm: FormGroup;
    listId: FormControl;
    unusedSince: FormControl;
    msisdnCount: FormControl;
    recycledSmsFile: FormControl;

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
        this.recycledSmsFile = new FormControl('', Validators.required);
        this.listId = new FormControl('', Validators.required);
        this.unusedSince = new FormControl('', Validators.required);
        this.msisdnCount = new FormControl('', Validators.required);
    }

    createForm() {
        this.myRecycledSmsForm = new FormGroup({
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
                    let formattedDate = this.datePipe.transform(unusedSince, 'dd-MM-yyyy');
                    debugger;
                    this.datawarehouseservice.uploadCsv(this.userID, this.fileName, listId, formattedDate, msisdnCount).subscribe(
                        data => {
                            console.log(data);
                            if (data != undefined && data.success == true) {
                                alert('File has been placed for uploading and processing, after completion you will be notified.');
                            } else {
                                alert('Failed to upload file.');
                            }
                            this.fileToUpload = null;
                            this.isLoading = false;
                        }, err => {
                            console.log(err);
                            alert('Failed to upload file.');
                            this.fileToUpload = null;
                            this.isLoading = false;
                        }
                    );
                },
                error => {
                    console.log(error);
                    alert("Failed to upload file.");
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
