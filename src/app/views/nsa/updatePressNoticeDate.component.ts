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
import {UpdatePressNoticeDateService} from './services/updatePressNoticeDate.service';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';


@Component({
    selector: 'app-uploadCsvFile',
    templateUrl: './update-press-notice-date.component.html',
    styles: ['./nsa_styles.css'],
    // styleUrls: ['./search_po.component.scss'],
    providers: [AppGlobals, LoginService, DatePipe, UpdatePressNoticeDateService],
})
export class UpdatePressNoticeDate implements OnInit {
    updatePressNoticeForm: FormGroup;
    selectedListId: FormControl;
    pressNoticeDate: FormControl;

    currentLoggedInUser: LoggedInUser;
    userName: string;
    groupID: number;
    userID: string;
    listIdList: string [] = [];
    todayDate: Date = new Date();

    //datepickerConfig: Partial<BsDatepickerConfig>;

    bsConfig = {
        dateInputFormat: 'DD-MM-YYYY', // Customize date format
        containerClass: 'theme-green', // Choose a theme
        isAnimated: true, // Enable animation
        showWeekNumbers: false // Hide week numbers
    };


    constructor(private router: Router, private http: HttpClient, private appGlobal: AppGlobals, private loginService: LoginService,
                private datePipe: DatePipe, private updatePressNoticeDateService: UpdatePressNoticeDateService) {
        this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

        if (this.currentLoggedInUser) {
            this.userName = this.currentLoggedInUser.userName;
            this.groupID = this.currentLoggedInUser.groupID;
            this.userID = this.currentLoggedInUser.userID;
        } else {
            this.router.navigate(['pages/login']);
        }
    }

    createFormControls() {
        this.selectedListId = new FormControl('', Validators.required);
        this.pressNoticeDate = new FormControl('', Validators.required);
    }

    createForm() {
        this.updatePressNoticeForm = new FormGroup({
            selectedListId: this.selectedListId,
            pressNoticeDate: this.pressNoticeDate
        });
    }

    submit() {
        if (this.updatePressNoticeForm.invalid) {
            return;
        }

        debugger;

        if (this.selectedListId != null && this.selectedListId.value != null && this.pressNoticeDate != null && this.pressNoticeDate.value != null) {
            let formattedDate = this.datePipe.transform(this.pressNoticeDate.value, 'dd-MM-yyyy');

            this.updatePressNoticeDateService.updatePressNoticeDate(this.userID, this.selectedListId.value, formattedDate).subscribe(
                res => {
                    if (res != undefined && res.success) {
                        let msg = "Press notice date updated successfully" +
                            "\n" +
                            "It will take additional 30 minutes to be visible in reporting.";
                        alert(msg);
                        this.getListIds();
                    } else if (res != undefined) {
                        let msg = "Failed to update press notice date";
                        if (res.errMsg  != undefined && res.errMsg != "") {
                            msg = msg + "\n" + res.errMsg;
                        }
                        alert(msg);
                    } else {
                        let msg = "Failed to update press notice date";
                        alert(msg);
                    }
                }, err => {
                    if (err != undefined) {
                        let msg = "Failed to update press notice date";
                        if (err.errMsg  != undefined && err.errMsg != "") {
                            msg = msg + "\n" + err.errMsg;
                        }
                        alert(msg);
                    } else {
                        let msg = "Failed to update press notice date";
                        alert(msg);
                    }
                }
            );
        }
    }

    getListIds() {
        this.listIdList = [];
        this.updatePressNoticeDateService.getListIds().subscribe(
            res => {
                console.log(res);
                this.listIdList = res;
            }, err => {
                console.log(err);
            }
        )
    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
        this.getListIds();
    }
}
