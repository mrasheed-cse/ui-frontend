import {Component, OnInit,} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {DatawarehouseService} from '../DataWarehouse Management/datawarehouse.service'
import {AppGlobals} from './../../../app.global';
import {LoginService} from '../../pages/LoginService';
import {LoggedInUser} from '../../pages/loggedInUser';
import {DatePipe} from '@angular/common';






@Component({
    selector: 'app-voucherGen',
    templateUrl: './showdatawarehouse.component.html',
    styleUrls: ['../search_po.component.scss'],
    providers: [AppGlobals, LoginService, DatePipe, DatawarehouseService],
})
export class ViewDatawarehouse implements OnInit {
    currentLoggedInUser: LoggedInUser;
    userName: string;
    groupID: number;
    userID: string;
    isInitial: boolean = true;
    searchFor: string;
    isDataFoundADC: boolean = false;
    isDataFoundAUC: boolean = false;
    rowData = [];
    isEditADC: boolean = false;
    puk2: string;
    puk1: string;
    pin1: string;
    pin2: string;
    icc_number: string;
    ki: string;
    imsi: string;
    id: number;
    isEditAUC: boolean = false;
    eki: string;
    kind: string;
    a3a8ind: string;
    isDataFoundSimmaster: boolean = false;
    isDataFoundTinTin: boolean = false;
    searchType: any;
    searchEnd: any;
    searchStart: any;
    searchFile: any;
    selectedFile: any;
    searchOn: any;
    searchSequence: any;
    tintinType:any;
    public isLoading:boolean = false;
    isReportFound : boolean = true;
    fileList : any;

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
        this.refresh();
    }

    search(isExport: boolean) {
        
        if(!isExport) {
            this.isInitial = false;
            this.rowData = [];
        }
        if ((this.searchSequence == null && this.searchFor=='sim') || this.searchType == null || ((this.searchType == "discrete" && !this.searchFile) || (this.searchType == "sequence" && (!this.searchStart || !this.searchEnd)))) {            
            alert("Select All Required Values")
            this.isInitial = true;
        } else if (this.searchType == "sequence" && !(this.searchStart.length == this.searchEnd.length) )
         {
            alert("Start and end value length should be same.")
            this.isInitial = true;
        }
        else if (this.searchOn == "iccid" && this.searchType == "sequence" && 
            (this.searchStart.length == this.searchEnd.length)  &&
            !(this.searchStart.length == 12 || this.searchStart.length == 18 || this.searchStart.length == 20 || 
                this.searchStart.length == 26 || this.searchStart.length == 28)
        ) {
            alert("KIT input should be in either 12, 18, 20, 26, 28 digits");
            console.log("Length of searchStart is "+this.searchStart.trim().length);
            console.log("Length of searchEnd is "+this.searchEnd.trim().length);
            this.isInitial = true;
        }
         else {
            this.isLoading=true;
            if (this.searchFor == "auc") {  
                this.searchSequence='all';              
                this.datawarehouseservice.getDataAuc(this, isExport).subscribe(
                    result => {
                        this.isDataFoundAUC = true;
                        this.isLoading=false;
                        if(isExport) {
                            alert("Request has been submitted successfully and report will be available to download when completed.");
                            this.refresh();
                        } else {

                            alert("Total input = " + result.totalInput + "\n" + "Total output = " + result.totalOutput);

                            for (let index in result.data) {
                                this.rowData.push(
                                    {
                                        id: result.data[index].id,
                                        imsi: result.data[index].imsi,
                                        eki: result.data[index].eki,
                                        kind: result.data[index].kind,
                                        a3a8ind: result.data[index].a3a8ind,

                                    }
                                );
                            }
                        }
                    },
                    err => {
                        this.isLoading=false;
                        console.log(err);
                        const errorMessage = err.error as string; // already a string
                        alert(errorMessage || 'Operation Failed.');
                    });
            } else if (this.searchFor == "adc") {
                this.searchSequence='all';              
                this.datawarehouseservice.getDataAdc(this, isExport).subscribe(
                    result => {
                        this.isDataFoundADC = true;
                        this.isLoading=false;
                        if(isExport) {
                            alert("Request has been submitted successfully and report will be available to download when completed.");
                            this.refresh();
                        } else {

                            alert("Total input = " + result.totalInput + "\n" + "Total output = " + result.totalOutput);

                            for (let index in result.data) {
                                this.rowData.push(
                                    {
                                        id: result.data[index].id,
                                        iccnumber: result.data[index].icc_number,
                                        imsi: result.data[index].imsi,
                                        ki: result.data[index].ki,
                                        pin1: result.data[index].pin1,
                                        pin2: result.data[index].pin2,
                                        puk1: result.data[index].puk1,
                                        puk2: result.data[index].puk2,
                                    }
                                );
                            }
                        }
                    },
                    err => {
                        this.isLoading=false;
                        console.log(err);
                        const errorMessage = err.error as string; // already a string
                        alert(errorMessage || 'Operation Failed.');
                    });
            } else if (this.searchFor === "sim") {
                this.datawarehouseservice.SimmasterData(this, isExport).subscribe(
                    result => {
                        this.isDataFoundSimmaster = true;
                        this.isLoading=false;
                        if(isExport) {
                            alert("Request has been submitted successfully and report will be available to download when completed.");
                            this.refresh();
                        } else {

                            alert("Total input = " + result.totalInput + "\n" + "Total output = " + result.totalOutput);

                            this.rowData = result.data;
                        }
                    },
                    err => {
                        this.isLoading=false;
                        console.log(err);
                        const errorMessage = err.error as string; // already a string
                        alert(errorMessage || 'Operation Failed.');
                    });
            } else if(this.searchFor==="tintin")
            {
                this.searchSequence='all';
                this.datawarehouseservice.TinTinData(this, isExport).subscribe(
                    result => {
                        this.isDataFoundTinTin = true;
                        this.isLoading=false;
                        if(isExport) {
                            alert("Request has been submitted successfully and report will be available to download when completed.");
                            this.refresh();
                        }
                        else {

                            alert("Total input = " + result.totalInput + "\n" + "Total output = " + result.totalOutput);

                            this.rowData = result.data;
                        }
                    },
                    err => {
                        this.isLoading=false;
                        console.log(err);
                        const errorMessage = err.error as string; // already a string
                        alert(errorMessage || 'Operation Failed.');
                    });
            }
        }
    }

    editADC(Id: number) {
        this.isEditADC = true;
        this.isDataFoundADC = false;
        var data = this.rowData;
        this.id = Id;
        for (let index in data) {
            if (Number(data[index].id) == Id) {
                this.icc_number = data[index].iccnumber,
                    this.imsi = data[index].imsi,
                    this.ki = data[index].ki,
                    this.pin1 = data[index].pin1,
                    this.pin2 = data[index].pin2,
                    this.puk1 = data[index].puk1,
                    this.puk2 = data[index].puk1
            }

        }


    }

    submitADC() {
        this.datawarehouseservice.editADCData(this.icc_number, this.imsi, this.ki, this.pin1, this.pin2, this.puk1, this.puk2, this.id).subscribe(
            data => {
                if (data != null) {
                    alert("Data Edited Sucessfully ")
                    this.isDataFoundADC = false;
                    this.isEditADC = false;
                    this.isInitial = true;
                }

            }
        )

    }

    deleteADC(id: number) {

        this.datawarehouseservice.deleteAdcData(id).subscribe(
            data => {
                if (data != null) {
                    alert("Data Sucessfully Deleted")
                    this.isDataFoundADC = false;
                    this.isInitial = true;
                }

            })
    }

    editAUC(Id: number) {
        this.isEditAUC = true;
        this.isDataFoundAUC = false;
        var data = this.rowData;
        console.log(data);
        this.id = Id;
        for (let index in data) {
            if (Number(data[index].id) == Id) {
                this.imsi = data[index].imsi,
                    this.eki = data[index].eki,
                    this.kind = data[index].kind,
                    this.a3a8ind = data[index].a3a8ind
            }

        }


    }

    submitAUC() {
        this.datawarehouseservice.editAUCData(this.id, this.imsi, this.eki, this.kind, this.a3a8ind).subscribe(
            data => {
                if (data != null) {
                    alert("Data Edited Sucessfully ")
                    this.isDataFoundAUC = false;
                    this.isEditAUC = false;
                    this.isInitial = true;
                }

            }
        )
    }

    deleteAUC(id: number) {
        this.datawarehouseservice.deleteAUCData(id).subscribe(
            data => {
                if (data != null) {
                    alert("Data Sucessfully Deleted")
                    this.isDataFoundAUC = false;
                    this.isInitial = true;
                }

            })
    }

    Back() {
        this.isDataFoundAUC = false;
        this.isInitial = true;
        this.isEditAUC = false;
        this.isDataFoundADC = false;
        this.isEditADC = false;
        this.isDataFoundSimmaster = false;
        this.isDataFoundTinTin = false;
        this.rowData = [];
    }

    loadReport() {
        this.fileList = [];
        this.isReportFound = false;
        this.datawarehouseservice.getReportList(this.userID).subscribe(
            result => {
                //console.log(result);
                this.fileList = result;
                this.isReportFound = true;
            },
            err => {
                console.log(err);
                this.fileList = [];
                this.isReportFound = false;
            }
        )
    }

    refresh () {
        this.loadReport();
    }


    downloadReport(filename: string) {
        this.datawarehouseservice.downloadReport(filename).subscribe(
            data => {
                console.log('Downloading file...');
                this.downloadFile(data);
            },
            err => {
                console.log(err);
            }
        );
    }

    downloadFile(response: any): void {
        console.log(response);
        console.log(response.headers);
        let filename = 'download.txt';

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
}
