import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Misidn } from '../../views/nsa/misidn';
import { environment } from '../../../environments/environment.prod';
import {Observable} from 'rxJs';
@Injectable()
export class MsisdnService {

  constructor(private httpClient: HttpClient) { }


  getGenerateData(st:any,ed:any):Observable<Misidn[]>{
    return this.httpClient.get<Misidn[]>(environment.apiUrl + "msisdn_recycle_list_download/start/" + st + "/" + ed);
  }
  getAnalyzeData(st:any,ed:any):Observable<Misidn[]>{
    let url=environment.apiUrl + "msisdn_recycle_list_download/start/" + st + "/" + ed;
    console.log(url);
    return this.httpClient.get<Misidn[]>(url); 
}

  postFile(fileToUpload: File) {
    const url = environment.apiUrl + "";
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(url, formData);

  }
}
