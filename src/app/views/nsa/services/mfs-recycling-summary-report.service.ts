import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AppGlobals} from 'app/app.global';
import {environment} from 'environments/environment';

@Injectable()
export class MfsRecyclingSummaryReportService {
    private headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    private options = {
        headers: this.headers,
        responseType: 'text' as 'json'
    }

    serverUrl: string;

    constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) {
        this.serverUrl = environment.apiUrl;
    }

    getSummary(pageNumber: number, pageSize: number): any {
        const url = environment.apiUrl + 'get-mfs-summary-report-of-list';

        const params = new HttpParams().set("pageNumber", pageNumber.toString()).set("pageSize", pageSize.toString());

        return this.http.get(url, { params });
    }

    downloadMSISDN(listId: string, mfs: string): any {
        const url = environment.apiUrl + 'download-mfs-summary-report-of-list';

        const params = new HttpParams().set("listId", listId).set("mfs", mfs);

        return this.http.get(url, { params, observe: 'response', responseType: 'blob' });
    }
}
