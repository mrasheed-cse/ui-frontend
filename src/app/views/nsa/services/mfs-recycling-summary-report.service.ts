import {HttpClient, HttpHeaders} from '@angular/common/http';
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
        return this.http.get(url + "/" + pageNumber + "/" + pageSize);
    }

    downloadMSISDN(listId: string, mfs: string): any {
        const url = environment.apiUrl + 'download-mfs-summary-report-of-list';
        return this.http.get(url + "/" + listId + "/" + mfs, {
            observe: 'response',
            responseType: 'blob'
        });
    }
}
