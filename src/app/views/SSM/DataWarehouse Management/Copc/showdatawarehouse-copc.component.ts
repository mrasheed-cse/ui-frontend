import {Component, OnInit,} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {DatawarehouseService} from '../datawarehouse.service'
import {AppGlobals} from '../../../../app.global';
import {LoginService} from '../../../pages/LoginService';
import {LoggedInUser} from '../../../pages/loggedInUser';
import {DatePipe} from '@angular/common';






@Component({
    selector: 'app-voucherGen',
    templateUrl: './showdatawarehouse-copc.component.html',
    styleUrls: ['../../search_po.component.scss'],
    providers: [AppGlobals, LoginService, DatePipe, DatawarehouseService],
    standalone: false
})
export class ViewDatawarehouseCopc implements OnInit {
    currentLoggedInUser: LoggedInUser;
    userName: string;
    groupID: number;
    userID: string;

    searchType: any;
    searchEnd: any;
    searchStart: any;
    searchFile: any;
    selectedFile: any;

    public isLoading: boolean = false;

    constructor(private datePipe: DatePipe, private router: Router, private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private datawarehouseservice: DatawarehouseService) {
        console.log('test');
        this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
        if (this.currentLoggedInUser) {
            this.userName = this.currentLoggedInUser.userName
            this.groupID = this.currentLoggedInUser.groupID
            this.userID = this.currentLoggedInUser.userID
        } else {
            this.router.navigate(['pages/login']);
        }
    }

    ngOnInit() {
    }

    export(exportType: string) {

        if (this.searchType == null || ((this.searchType == 'discrete' && !this.searchFile) || (this.searchType == 'sequence' && (!this.searchStart || !this.searchEnd)))) {
            alert('Select All Required Values')
        } else if (this.searchType == 'sequence' && !(this.searchStart.length == this.searchEnd.length)) {
            alert('Start and end value length should be same.')
        } else if (this.searchType == 'sequence' && (this.searchStart.length == this.searchEnd.length) &&
            !(this.searchStart.length == 12 || this.searchStart.length == 18 || this.searchStart.length == 20 ||
                this.searchStart.length == 26 || this.searchStart.length == 28)
        ) {
            alert('KIT input should be in either 12, 18, 20, 26, 28 digits');
            console.log('Length of searchStart is ' + this.searchStart.trim().length);
            console.log('Length of searchEnd is ' + this.searchEnd.trim().length);
        } else {
            this.isLoading = true;

            if (exportType == 'ICCID') {
                this.datawarehouseservice.SimmasterDataCopcIccid(this).subscribe(
                    data => {
                        // let filename = 'download.xlsx';
                        //
                        // // Get filename from content-disposition header
                        // const contentDisposition = data.headers.get('content-disposition');
                        //
                        // if (contentDisposition) {
                        //     let arr = contentDisposition.split(';');
                        //     if (arr.length > 1) {
                        //         arr.forEach(element => {
                        //             if (element.trim().startsWith('filename=')) {
                        //                 let arr2 = element.split('=');
                        //                 if (arr2.length > 1) {
                        //                     filename = arr2[1].trim().replace(/"/g, '');
                        //                 }
                        //             }
                        //         })
                        //     }
                        // }

                        // Create blob and download
                        // const blob = new Blob([data.body], {type: data.headers.get('content-type')});
                        //
                        // const url = window.URL.createObjectURL(blob);
                        // const link = document.createElement('a');
                        // link.href = url;
                        // link.download = filename;
                        // link.click();
                        //
                        // // Cleanup
                        // window.URL.revokeObjectURL(url);


                        var link = document.createElement('a');
                        link.href = window.URL.createObjectURL(data);
                        link.download = "IccIdList.xlsx";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        this.isLoading = false;
                    },
                    err => console.error(err)
                );
            } else if (exportType == 'MSISDN') {
                this.datawarehouseservice.SimmasterDataCopcMsisdn(this).subscribe(
                    data => {
                        var link = document.createElement('a');
                        link.href = window.URL.createObjectURL(data);
                        link.download = 'MsisdnList.xlsx';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        this.isLoading = false;
                    },
                    err => console.error(err)
                );
            } else if (exportType == 'Both') {
                this.datawarehouseservice.SimmasterDataCopcIccidAndMsisdn(this).subscribe(
                    data => {
                        var link = document.createElement('a');
                        link.href = window.URL.createObjectURL(data);
                        link.download = 'COPC_Exports.zip';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        this.isLoading = false;
                    },
                    err => console.error(err)
                );
            }
        }
    }
}
