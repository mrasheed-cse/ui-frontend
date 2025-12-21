import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';

import {AppGlobals} from './../../../app.global';
import {ViewDatawarehouse} from "./showdatawarehouse.component";
import {ViewDatawarehouseCopc} from './Copc/showdatawarehouse-copc.component';

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

    uploadCsv(fileToUpload: File, type: string):any {
        const url = environment.apiUrl + "datawarehouse/uploadCSv/" + type;
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(url, formData);
    }

    private prepareSearchFormdata(data: ViewDatawarehouse, isExport: boolean) : any {
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
        formData.append('sequence', data.searchSequence);
        formData.append('export', isExport ? "1" : "0");
        if(data.searchFor=='tintin')
        {
            formData.append('tintinType',data.tintinType);
        }
        formData.append('userName', data.userID);

        return formData;
    }

    private prepareSearchFormdataCopc(data: ViewDatawarehouse) : any {
        const formData: FormData = new FormData();

        formData.append('searchType', data.searchType);

        if(data.searchType == "discrete" && data.selectedFile) {
            formData.append('searchFile', data.selectedFile, data.selectedFile.name);
        }

        if(data.searchType == "sequence") {
            formData.append('searchStart', data.searchStart);
            formData.append('searchEnd', data.searchEnd);
        }

        formData.append('sequence', 'all');

        return formData;
    }


    getDataAdc(data: ViewDatawarehouse, isExport: boolean): any {
        // @ts-ignore
        return this.http.post(this.serverUrl + 'datawarehouse/getdataADC/', this.prepareSearchFormdata(data, isExport), {responseType: "json"});
    }

    getDataAuc(data: ViewDatawarehouse, isExport: boolean): any {
        // @ts-ignore
        return this.http.post(this.serverUrl + 'datawarehouse/getdataAUC/', this.prepareSearchFormdata(data, isExport), {responseType: "json"});
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

    SimmasterDataCopcIccid(data: ViewDatawarehouseCopc): any {
        // @ts-ignore
        return this.http.post(this.serverUrl + 'datawarehouse/exportCopcIccid/', this.prepareSearchFormdataCopc(data), {responseType: "blob"});
    }

    SimmasterDataCopcMsisdn(data: ViewDatawarehouseCopc): any {
        // @ts-ignore
        return this.http.post(this.serverUrl + 'datawarehouse/exportCopcMsisdn/', this.prepareSearchFormdataCopc(data), {responseType: "blob"});
    }

    SimmasterDataCopcIccidAndMsisdn(data: ViewDatawarehouseCopc): any {
        // @ts-ignore
        return this.http.post(this.serverUrl + 'datawarehouse/exportCopcIccidAndMsisdn/', this.prepareSearchFormdataCopc(data), {responseType: "blob"});
    }


    SimmasterData(data: ViewDatawarehouse, isExport: boolean): any {
        // @ts-ignore
        return this.http.post(this.serverUrl + 'datawarehouse/getSimmasterdata/', this.prepareSearchFormdata(data, isExport), {responseType: "json"});
    }
    TinTinData(data: ViewDatawarehouse, isExport: boolean): any {
        // @ts-ignore
        return this.http.post(this.serverUrl + 'datawarehouse/getTinTinData/', this.prepareSearchFormdata(data, isExport), {responseType: "json"});
    }

    getReportList(userID: string): any {
        const url = environment.apiUrl + 'datawarehouse/get-data-warehouse-report-list';

        const params = new HttpParams();

        return this.http.get(url, {params});
    }

    downloadReport(fileName : string): any {
        const url = environment.apiUrl + 'datawarehouse/download-data-warehouse-report';

        const params = new HttpParams().set("fileName", fileName);

        return this.http.get(url, { params, observe: 'response', responseType: 'blob' });
    }
}
