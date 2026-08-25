import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AppGlobals} from 'app/app.global';
import {environment} from 'environments/environment';

@Injectable()
export class MfsRecyclingReportService {

    serverUrl: string;

    constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) {
        this.serverUrl = environment.apiUrl;
    }

    uploadMSISDN(userId: string, fileName: string): any {
        const url = environment.apiUrl + 'get-mfs-status-of-msisdn-list';

        const params = new HttpParams().set("createdBy", userId).set("filename", fileName);

        return this.http.get(url, { params, observe: 'response', responseType: 'blob' });
    }

    getReportList(userID: string): any {
        const url = environment.apiUrl + 'get-mfs-report-list';

        const params = new HttpParams().set("createdBy", userID);

        return this.http.get(url, {params});
    }

    downloadReport(userID: string, fileName : string): any {
        const url = environment.apiUrl + 'download-mfs-report';

        const params = new HttpParams().set("createdBy", userID).set("fileName", fileName);

        return this.http.get(url, { params, observe: 'response', responseType: 'blob' });
    }
}
