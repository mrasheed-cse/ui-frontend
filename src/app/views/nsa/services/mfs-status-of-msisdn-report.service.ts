import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AppGlobals} from 'app/app.global';
import {environment} from 'environments/environment';

@Injectable()
export class MfsStatusOfMsisdnReportService {

    serverUrl: string;

    constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) {
        this.serverUrl = environment.apiUrl;
    }


    searchByMsisdn(msisdn: string): any {
        const url = environment.apiUrl + 'get-mfs-status-of-msisdn';

        const params = new HttpParams().set('msisdn', msisdn);

        return this.http.get(url, {params});
    }
}
