import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecycleCandidateMsisdn} from './recycleCandidateMsisdn';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class MsisdnService {
    constructor(private httpClient: HttpClient) {
    }

    getAnalyzeData(st: any, ed: any): Observable<RecycleCandidateMsisdn[]> {
        let url = environment.apiUrl + "msisdn_recycle_list_analyze/start/" + st + "/" + ed;
        return this.httpClient.get<RecycleCandidateMsisdn[]>(url);
    }

    generateMsisdnList(st: any, ed: any, analyze: boolean): Observable<string> {
        let url = environment.apiUrl + "msisdn_recycle_list_generate/start/" + st + "/" + ed;
        if(analyze) {
            url += "?analyze"
        }
        return this.httpClient.get<string>(url, {responseType: "text" as 'json'});
    }

    postFile(fileToUpload: File) {
        const url = environment.apiUrl + "msisdn_recycle_list_upload/start";
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.httpClient.post(url, formData);
    }
}