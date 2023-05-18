import {Component, OnInit,} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DatawarehouseService} from '../DataWarehouse Management/datawarehouse.service'
import {AppGlobals} from './../../../app.global';
import {LoginService} from '../../pages/LoginService';
import {LoggedInUser} from '../../pages/loggedInUser';
import {DatePipe} from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

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
    public isLoading:boolean = false;

    constructor(private datePipe: DatePipe, private router: Router, private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private datawarehouseservice: DatawarehouseService) {
       console.log('test');
       debugger;
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
                    data => {
                        this.isDataFoundAUC = true;
                        this.isLoading=false;
                        if(isExport) {
                            var link = document.createElement('a');
                            link.href = window.URL.createObjectURL(data);
                            link.download = "Sim AUC.auc";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        } else {

                            for (let index in data) {
                                this.rowData.push(
                                    {
                                        id: data[index].id,
                                        imsi: data[index].imsi,
                                        eki: data[index].eki,
                                        kind: data[index].kind,
                                        a3a8ind: data[index].a3a8ind,

                                    }
                                );
                            }
                        }
                    },
                    err => console.error(err),);
            } else if (this.searchFor == "adc") {
                this.searchSequence='all';              
                this.datawarehouseservice.getDataAdc(this, isExport).subscribe(
                    data => {
                        this.isDataFoundADC = true;
                        this.isLoading=false;
                        if(isExport) {
                            var link = document.createElement('a');
                            link.href = window.URL.createObjectURL(data);
                            link.download = "Sim ADC.adc";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        } else {
                            console.log('test');
                            for (let index in data) {
                                this.rowData.push(
                                    {
                                        id: data[index].id,
                                        iccnumber: data[index].icc_number,
                                        imsi: data[index].imsi,
                                        ki: data[index].ki,
                                        pin1: data[index].pin1,
                                        pin2: data[index].pin2,
                                        puk1: data[index].puk1,
                                        puk2: data[index].puk2,
                                    }
                                );
                            }
                        }
                    },
                    err => console.error(err),);
            } else if (this.searchFor === "sim") {
                this.datawarehouseservice.SimmasterData(this, isExport).subscribe(
                    data => {
                        this.isDataFoundSimmaster = true;
                        this.isLoading=false;
                        if(isExport) {
                            var link = document.createElement('a');
                            link.href = window.URL.createObjectURL(data);
                            link.download = "Sim Master Record.csv";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        } else {
                            this.rowData = data;
                            for (let entry of data) {
                                entry.Print_Date = this.datePipe.transform(entry.Print_Date, "dd-MM-yyyy")
                                entry.Pckg_Date = this.datePipe.transform(entry.Pckg_Date, "dd-MM-yyyy")
                                entry.Deliv_Date = this.datePipe.transform(entry.Deliv_Date, "dd-MM-yyyy")
                            }
                        }
                    },
                    err => console.error(err));
            } else if(this.searchFor==="tintin")
            {
                this.datawarehouseservice.TinTinData(this, isExport).subscribe(
                    data => {
                        this.isDataFoundTinTin = true;
                        this.isLoading=false;
                        if(isExport) {
                            var link = document.createElement('a');
                            link.href = window.URL.createObjectURL(data);
                            link.download = "TinTin.csv";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        } else {
                            this.rowData = data;
                        }
                    },
                    err => console.error(err));
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
}