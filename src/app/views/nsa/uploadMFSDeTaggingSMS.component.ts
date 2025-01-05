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
import {UploadCSVMFSDeTaggingService} from './services/uploadCsvMFSDeTagging.service';


@Component({
    selector: 'app-uploadCsvFile',
    templateUrl: './uploadfileswith-mfsdetagging-csv.component.html',
    styles: ['./nsa_styles.css'],
    // styleUrls: ['./search_po.component.scss'],
    providers: [AppGlobals, LoginService, DatePipe, UploadCSVMFSDeTaggingService, FileoperationService],
})
export class UploadMFSDeTaggingCsvFile implements OnInit {
    myRecycledSmsForm: FormGroup;
    recycledSmsFile: FormControl;
    selectedMfs: FormControl;

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
        this.recycledSmsFile = new FormControl('', Validators.required);
        this.selectedMfs = new FormControl('', Validators.required);
    }

    createForm() {
        this.myRecycledSmsForm = new FormGroup({
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

        if (this.fileToUpload == undefined || !this.fileToUpload.name.endsWith('.csv') || !this.fileToUpload.name.startsWith('De-Tagging')) {
            alert('Please select a csv file with file name starting with De-Tagging');
            this.isLoading = false;
        } else {
            const fd = new FormData();
            this.isLoading = true;
            this.fileName = this.fileToUpload.name;

            fd.append('nsa-file', this.fileToUpload, this.fileName);
            let result = this.fileoperationService.uploadMFSDeTaggingCSV(fd);
            result.subscribe(
                res => {
                    console.log(res);
                    let requestData = {fileName: this.fileName}

                    console.log(requestData);
                    this.datawarehouseservice.uploadMFSDeTaggingCsv(this.userID, this.fileName, selectedMfs).subscribe(
                        data => {
                            console.log(data);
                            if (data != null && data.success) {
                                alert("The MFS De-Tagging operation has been completed successfully." +
                                    "\n" +
                                    "Total: " + data.total +
                                    "\n" +
                                    "Success: " + data.successCount +
                                    "\n" +
                                    "Failure: " + (data.failCount + data.invalid + data.duplicate));
                            } else {
                                alert("The MFS De-Tagging operation has failed.");
                            }
                            this.isLoading = false;
                            this.fileToUpload = null;
                        },
                        err => {
                            console.log(err);
                            alert("The MFS De-Tagging operation has failed.");
                            this.isLoading = false;
                            this.fileToUpload = null;
                        }
                    );
                },
                error => {
                    console.log(error);
                    alert("The MFS De-Tagging operation has failed.");
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
