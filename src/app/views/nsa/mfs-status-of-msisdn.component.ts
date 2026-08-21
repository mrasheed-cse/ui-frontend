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
import {MfsStatusOfMsisdnReportService} from './services/mfs-status-of-msisdn-report.service';

@Component({
    selector: 'app-uploadCsvFile',
    templateUrl: './mfs-status-of-msisdn.component.html',
    styleUrls: ['./nsa_styles.css'],
    providers: [AppGlobals, LoginService, DatePipe, MfsStatusOfMsisdnReportService],
})
export class MfsStatusOfMsisdnComponent implements OnInit {

    mySearchForm: FormGroup;
    msisdnControl: FormControl;
    msisdnIn: string = "";


    currentLoggedInUser: LoggedInUser;
    userName: string;
    groupID: number;
    userID: string;

    isLoading: boolean = false;
    isDataFound : boolean = false;

    statusReport = [];

    constructor(private datePipe: DatePipe, private route: ActivatedRoute, private router: Router, private loginService: LoginService,
                private http: HttpClient, private _global: AppGlobals, private mfsService : MfsStatusOfMsisdnReportService) {

        this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

        if (this.currentLoggedInUser) {
            this.userName = this.currentLoggedInUser.userName
            this.groupID = this.currentLoggedInUser.groupID
            this.userID = this.currentLoggedInUser.userID
        } else {
            this.router.navigate(['pages/login']);
        }
    }

    search() {
        if (this.msisdnControl.value != null && this.msisdnControl.value.length > 0) {
            this.isLoading = true;
            this.isDataFound = false;
            this.msisdnIn = this.msisdnControl.value;
            this.mfsService.searchByMsisdn(this.msisdnIn).subscribe(
                result => {
                    debugger;
                    this.statusReport = result;
                    this.isLoading = false;
                    if (result.length > 0) {
                        this.isDataFound = true;
                    }
                },
                error => {
                    alert("Failed to get MFS status for MSISDN");
                    this.isLoading = false;
                    this.isDataFound = false;
                }
            );
        }
    }

    createFormControls() {
        this.msisdnControl = new FormControl('', Validators.required);
    }

    createForm() {
        this.mySearchForm = new FormGroup({
            msisdnControl: this.msisdnControl
        });
    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }
}
