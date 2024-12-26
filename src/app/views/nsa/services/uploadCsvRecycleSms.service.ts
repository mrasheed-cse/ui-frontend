import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Constants } from "ag-grid-community";
import { AppGlobals } from "app/app.global";
import { environment } from "environments/environment";

@Injectable()
export class UploadCSVRecycleSMSService {
    private headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    private options = {
        headers: this.headers,
        responseType: 'text' as 'json'
    }

    serverUrl: string;

    constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) {
        this.serverUrl = environment.apiUrl;
    }

    uploadCsv(userId: string, filename: string,unusedmsdn :string,list:string,count:string):any {
        const url = environment.apiUrl + "NsaRecycleSMSFileUpload";
        const ll=null;
        const formData: FormData = new FormData();

        formData.append('createdBy', userId);
        formData.append('filename',filename);
        formData.append('unsedMsisdn',unusedmsdn)
        formData.append('list',list)
        formData.append('count',count)

        return this.http.post(url, formData);
    }
  
}
