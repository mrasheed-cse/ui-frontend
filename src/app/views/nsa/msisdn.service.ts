import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Misidn } from '../../views/nsa/misidn';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxJs';
@Injectable()
export class MsisdnService {

  constructor(private httpClient: HttpClient) { }


 
  
  
  getAnalyzeData(st:any,ed:any):Observable<Misidn[]>{
    let url=environment.apiUrl + "msisdn_recycle_list_analyze/start/" + st + "/" + ed;
    console.log(url);
    return this.httpClient.get<Misidn[]>(url); 
}

getGenerateData(st:any,ed:any):Observable<Misidn[]>{

  let url=environment.apiUrl + "msisdn_recycle_list_generate/start/" + st + "/" + ed;
  console.log(url);
  return this.httpClient.get<Misidn[]>(url); 
}

  postFile(fileToUpload: File) {
    const url = environment.apiUrl + "msisdn_recycle_list_upload/start";
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(url, formData);

  }
}
