import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import {catchError,} from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';


//import { AppGlobals } from './../../app.global';


@Injectable()
export class SSMService {
	
private headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

 private header2=new HttpHeaders().set('Content-Type', 'application/octet-stream');
 private options = {
    headers: this.headers,
	responseType: 'text' as 'json'
 }
private options2 = {
    headers: this.header2,
	responseType: 'text' as 'text'
 }

	serverUrl: string;
	
	constructor(private router: Router, private http: HttpClient) { 
		this.serverUrl = environment.apiUrl;  		
	}
	
	
	getPoInformation(poNumber:string,filter:string): any{
		console.log(this.serverUrl)
	return this.http.post(this.serverUrl + 'poInformation/search/', {
			poNumber:poNumber,
			filter:filter});
	}
	
getImsiAndICCID(imsi:string,quantity:string,vendor:string):any	{
	return this.http.post(this.serverUrl + 'inputFileprocessing/getImsiData/', {
			imsi:imsi,quantity:quantity,vendor:vendor});
	
}
	
	saveData(poNumber:string,startImsi:string,quantity:string,startIccid:string,stk:string,artwork:string,vendor:string,ImsiType:string):any{
		console.log(startImsi)
		return this.http.post(this.serverUrl + 'inputFileprocessing/SaveData/', {
			poNumber:poNumber,
			startImsi:startImsi,
			quantity:quantity,
			startIccid:startIccid,
			stk:stk,
			artwork:artwork,
			vendor:vendor,
			imsiType:ImsiType
		});
		
	}
	
	DownloadCSV(fileNameToDownload: string){
	  console.log(this.serverUrl +"poInformation/downloadCSV/");
	  console.log(fileNameToDownload);
        return this.http.post(this.serverUrl +"poInformation/downloadCSV/", fileNameToDownload,this.options);
    }

	
	GetAllIMSI(): any {	
		//console.log("In GetAllIMSI()"); 		
		return this.http.get(this.serverUrl + 'IMSI_Group/');
	}
	
	getAllVendor(): any {	
		return this.http.get(this.serverUrl + 'inputFileprocessing/vendor/');
	}
	
	
		getAllArtwork(): any {	
		return this.http.get(this.serverUrl + 'inputFileprocessing/artwork/');
	}
	
		getAllstk(): any {	
		return this.http.get(this.serverUrl + 'inputFileprocessing/stk/');
	}
	
	
	getDenoMination(): any {	
		return this.http.get(this.serverUrl + 'vouchergeneration/denomination/');
	}
	getCardGroup(poNumber:string): any {	
		console.log("SErvice "+poNumber)
		return this.http.post(this.serverUrl + 'vouchergeneration/cardgroup/',{
			poNumber:poNumber}
			);
	}
	getvoucherSerial(): any {	
		return this.http.get(this.serverUrl + 'vouchergeneration/voucherserial/');
	}
	
	getvoucherSerialHidden(): any {	
		return this.http.get(this.serverUrl + 'vouchergeneration/voucherserialhidden/');
	}
	
	getVendorWiseSFTP(): any {	
		return this.http.get(this.serverUrl + 'vouchergeneration/vendorwisesftp/');
	}
	getMaxBatchNo():any{
			return this.http.get(this.serverUrl +'vouchergeneration/getBatchNo');
	}
	
	getSerial(denomination:string,cardgroup:string):any{
		return this.http.post(this.serverUrl +'vouchergeneration/getSerial',{
			denomination:denomination,
			cardgroup:cardgroup
			
		});
		
	}

	getMaxSerial():any{
		return this.http.get(this.serverUrl +'vouchergeneration/getMaxSerial');
		
	}
	
	checkPoExsist(poNumber:string): any{
	return this.http.post(this.serverUrl + 'sctrachVoucher/searchPo/', {
			poNumber:poNumber});
	}
	
	saveScratch(ponumber:string,denomination:string,serial:string,requestDate:any,quantity:string,vendor:string,pr:string
	,networkexpiredate:any,expirydate:any,cardgroup:string,serialDigitCount:string,hiddenNumberCount:string,sftplocation:string,createdBy:string,itemName:string): any{
	return this.http.post(this.serverUrl + 'sctrachVoucher/Save/', {
			ponumber:ponumber,denomination:denomination,
			serial:serial,requestDate:requestDate,quantity:quantity,
			vendor:vendor,pr:pr,networkexpiredate:networkexpiredate,
			expirydate:expirydate,cardgroup:cardgroup,serialDigitCount:serialDigitCount,
			hiddenNumberCount:hiddenNumberCount,sftplocation:sftplocation,createdBy:createdBy
			,itemName:itemName});
	}
	
	getAllCard(): any {	
		return this.http.get(this.serverUrl + 'vouchergeneration/allCard/');
	}
	
	deleteDenomination(linkno: number): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/deleteDenomination/" + linkno).pipe(catchError(this.handleError));
    }
	deleteVendor(linkno: number): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/deleteVendor/" + linkno).pipe(catchError(this.handleError));
    }
	
	deleteVoucherSerial(linkno: number): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/deletevoucherSerial/" + linkno).pipe(catchError(this.handleError));
    }
	
	deleteCardGroup(linkno: number): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/deletecardGroup/" + linkno).pipe(catchError(this.handleError));
    }
	deleteHiddenSerial(linkno: number): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/deletehiddenSerial/" + linkno).pipe(catchError(this.handleError));
    }
	deleteVendorSftp(linkno: number): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/deleteVendorSftp/" + linkno).pipe(catchError(this.handleError));
    }

	
	saveDenomination(linkno: string): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/saveDenomination/" + linkno).pipe(catchError(this.handleError));
    }
    saveVendor(linkno: string): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/saveVendor/" + linkno).pipe(catchError(this.handleError));
    }
	
	saveVoucherSerial(linkno: number): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/saveVoucherSerial/" + linkno).pipe(catchError(this.handleError));
    }
	getDenominationId(name:number):any{
		
		return this.http.get(environment.apiUrl + "admin/getdenominationby/" + name).pipe(catchError(this.handleError));
		
		
	}
	saveCardGroup(value: string,mapValue:number): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/saveCardGroup/" + value+"/"+mapValue).pipe(catchError(this.handleError));
    }
	saveHiddenSerial(linkno: number): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/saveHiddenSerial/" + linkno).pipe(catchError(this.handleError));
    }
	saveVendorSftp(linkno: string): Observable<any> {
        return this.http.get(environment.apiUrl + "admin/saveVendorSftp/" + linkno).pipe(catchError(this.handleError));
    }
	
    	deleteArtwork(linkno: number): Observable<any> {
        return this.http.get(environment.apiUrl + "simAdmin/deleteArtwork/" + linkno).pipe(catchError(this.handleError));
    }
	saveArtwork(linkno: string): Observable<any> {
        return this.http.get(environment.apiUrl + "simAdmin/saveArtwork/" + linkno).pipe(catchError(this.handleError));
    }
    
    deleteSTK(linkno: number): Observable<any> {
        return this.http.get(environment.apiUrl + "simAdmin/deleteStk/" + linkno).pipe(catchError(this.handleError));
    }
    saveStk(linkno: string): Observable<any> {
        return this.http.get(environment.apiUrl + "simAdmin/saveStk/" + linkno).pipe(catchError(this.handleError));
    }
    
    getApproval1HopData(hop:number): Observable<any>{
	  return this.http.get(environment.apiUrl + "voucherManagement/getScratchVoucherHop/" +hop).pipe(catchError(this.handleError));
	
}

setSeccondHop(username:string,idList:string,comment:string,fileName:string){
	
	return this.http.post(this.serverUrl + 'voucherManagement/SaveSecondHop/', {
		userName:username,
		idList:idList,
		batchComment:comment,
		fileName:fileName
			});
}
cancelHop(username:string,idList:string,comment:string){
	
	return this.http.post(this.serverUrl + 'voucherManagement/cancelHop/', {
		userName:username,
		idList:idList,
		batchComment:comment
			});
}

SaveBatch(username:string,idList:string,batchComment:string,comment:string){
	
	return this.http.post(this.serverUrl + 'sctrachVoucher/batchcomment/', {
		userName:username,
		idList:idList,
		batchComment:batchComment
			});
}

SaveFinal(username:string,idList:string,comment:string){
	
	return this.http.post(this.serverUrl + 'sctrachVoucher/savefinalhop/', {
		userName:username,
		idList:idList,
		batchComment:comment
			});
}
 postFile(fileToUpload: File, idList:string) {
        const url = environment.apiUrl + "voucherManagement/uploadstart/"+idList;
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(url, formData);
    }


	handleError(error: HttpErrorResponse) {
        if (error instanceof ErrorEvent) {
        } else {
            switch (error.status) {
                case 404:
                   
                    break;
            }
        }
        return _throw(error);
    }
    
    setHop(username:string,selectedIdList:string,comment:string){
	
	return this.http.post(this.serverUrl + 'voucherManagement/saveHop/', {
		userName:username,
		idList:selectedIdList,
		batchComment:comment
			});

	
	}
	 getScratchDatabyId(id:number): any{
	  return this.http.get(environment.apiUrl + "voucherManagement/getScratchVoucherdataByid/" +id).pipe(catchError(this.handleError));
	
}


deleteSimdropdown(id:number) :Observable<any> {
        return this.http.get(environment.apiUrl + "simAdmin/deleteDropdown/" + id).pipe(catchError(this.handleError));
    }
    
    addSimdropdown(value:string ,type:string) :Observable<any> {
        return this.http.get(environment.apiUrl + "simAdmin/addDropdown/" + value +"/"+type).pipe(catchError(this.handleError));
    }
    
    aucFileConersion(fileToUpload: File) {
        const url = environment.apiUrl + "auc_conversion/start";
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(url, formData);
    }
    
    downloadAucFile() {
        const url = environment.apiUrl + "auc_conversion/download";
        console.log(environment.apiUrl + "auc_conversion/download");
        return this.http.get(environment.apiUrl + 'auc_conversion/download',this.options2);
	}
	

	getFilteredInputFiles(artWork:string ,vendor:string,imsiType:number,filterFor:number,currPage:number,pageSize:number): any{
		return this.http.post(this.serverUrl + 'FilterInputFile/', {
            artWork: artWork,
			vendor: vendor,
			imsiType: imsiType,
			filterFor: filterFor,
			currentPage: currPage,
			pageSize: pageSize
        });
  }
  
  getAllPoInputfiles():any{
	return this.http.get(this.serverUrl + 'vouchergeneration/getpodetail');
}

  UpdateReceivedQuantity(data:any):any {
	  
	  console.log(this.serverUrl+'ReceivedQuantityManipulation/,{updateReceivedQuantityRequests: '+data+'});');
	  return this.http.post(this.serverUrl+'ReceivedQuantityManipulation/',data);
  }
getBatchDetails(batchNumber:number):any{
	
	return this.http.get(environment.apiUrl + "sctrachVoucher/getvoucherhistory/"+batchNumber).pipe(catchError(this.handleError));
	
	
	
}
getFilenameFromDB(id:number):any{
	
	return this.http.get(environment.apiUrl + "sctrachVoucher/getfilenamefromdb/"+id).pipe(catchError(this.handleError));
	
	
}
	
	}