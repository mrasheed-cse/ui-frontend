import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Constants} from 'ag-grid-community';
import {AppGlobals} from 'app/app.global';
import {environment} from 'environments/environment';

@Injectable()
export class UpdatePressNoticeDateService {
    private headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    private options = {
        headers: this.headers,
        responseType: 'text' as 'json'
    }

    serverUrl: string;

    constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) {
        this.serverUrl = environment.apiUrl;
    }

    getListIds(): any {
        const url = environment.apiUrl + 'GetListIds';
        return this.http.get(url);
    }

    updatePressNoticeDate(userId: string, listId: string, date: string): any {
        const url = environment.apiUrl + 'UpdatePressNoticeDate';

        let requestData = {
            createdBy: userId,
            listId: listId,
            date: date
        }
        return this.http.post(url, requestData);
    }

}
