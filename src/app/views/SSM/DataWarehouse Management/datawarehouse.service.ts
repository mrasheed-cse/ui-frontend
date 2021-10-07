import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment.prod';
import {Router} from '@angular/router';
import {catchError,} from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';


import {AppGlobals} from './../../../app.global';
import {ViewDatawarehouse} from "./showdatawarehouse.component";


@Injectable()
export class DatawarehouseService {
    private headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    private options = {
        headers: this.headers,
        responseType: 'text' as 'json'
    }

    serverUrl: string;

    constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) {
        this.serverUrl = environment.apiUrl;
    }

    uploadCsv(fileToUpload: File, type: string) {
        const url = environment.apiUrl + "datawarehouse/uploadCSv/" + type;
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(url, formData);
    }

    private prepareSearchFormdata(data: ViewDatawarehouse) : any {
        const formData: FormData = new FormData();
        if(data.searchType == "discrete" && data.selectedFile) {
            formData.append('searchFile', data.selectedFile, data.selectedFile.name);
        }
        formData.append('searchType', data.searchType);
        formData.append('searchOn', data.searchOn);
        if(data.searchType == "sequence") {
            formData.append('searchStart', data.searchStart);
            formData.append('searchEnd', data.searchEnd);
        }
        return formData;
    }

    getDataAdc(data: ViewDatawarehouse): any {
        return this.http.post(this.serverUrl + 'datawarehouse/getdataADC/', this.prepareSearchFormdata(data));
    }

    getDataAuc(data: ViewDatawarehouse): any {
        return this.http.post(this.serverUrl + 'datawarehouse/getdataAUC/', this.prepareSearchFormdata(data));
    }

    editADCData(icc_number: string, imsi: string, ki: string, pin1: string, pin2: string, puk1: string, puk2: string, id: number): any {
        return this.http.post(this.serverUrl + 'datawarehouse/editADC/', {
            id: id, icc_number: icc_number,
            imsi: imsi,
            ki: ki,
            pin1: pin1, pin2: pin2, puk1: puk1, puk2: puk2
        })

    }

    deleteAdcData(id: number): any {
        return this.http.get(this.serverUrl + 'datawarehouse/deleteADC/' + id)

    }

    editAUCData(id: number, imsi: string, eki: string, kind: string, a3a8ind: string): any {
        return this.http.post(this.serverUrl + 'datawarehouse/editAUC/', {
            id: id,
            imsi: imsi,
            eki: eki,
            kind: kind,
            a3a8ind: a3a8ind
        })
    }

    deleteAUCData(id: number): any {
        return this.http.get(this.serverUrl + 'datawarehouse/deleteAUC/' + id)
    }

    SimmasterData(data: ViewDatawarehouse): any {
        return this.http.post(this.serverUrl + 'datawarehouse/getSimmasterdata/', this.prepareSearchFormdata(data));
    }
}