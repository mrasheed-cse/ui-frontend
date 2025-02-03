import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AppGlobals} from 'app/app.global';
import {environment} from 'environments/environment';

@Injectable()
export class UploadCSVMFSDeTaggingService {
    private headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    private options = {
        headers: this.headers,
        responseType: 'text' as 'json'
    }

    serverUrl: string;

    constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) {
        this.serverUrl = environment.apiUrl;
    }

    uploadMFSDeTaggingCsv(userId: string, filename: string, mfs: string): any {
        const url = environment.apiUrl + 'NSAFMSDeTaggingFileUpload';
        const formData: FormData = new FormData();

        formData.append('createdBy', userId);
        formData.append('filename', filename);
        formData.append('mfs', mfs);

        return this.http.post(url, formData);
    }
}
