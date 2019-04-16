import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment.prod';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

import { AppGlobals } from './../../../app.global';

@Injectable()
export class DefinitionDataService {
	
	serverUrl: string;
	dataOutput: string = "";
	
	constructor(private router: Router, private http: HttpClient, private _global: AppGlobals) { 
		this.serverUrl = environment.apiUrl;  
		//console.log("serverUrl "+ this.serverUrl);
	}
  
	//GetWR_Name by wr_number
	GetWR_Name(theWrNumber: number): any {	
  
		//console.log("In GetWR_Name() for theWrNumber "+ theWrNumber);	
	
		return this.http.post(this.serverUrl + 'WorkRequestName/'+theWrNumber, {
			wr_number: theWrNumber
		});
	}
	
	//GetAllIMSI
	GetAllIMSI(): any {	
		//console.log("In GetAllIMSI()"); 		
		return this.http.get(this.serverUrl + 'IMSI_Group/');
	}
	
	
	//GetProductTypes
	GetProductTypes(): any {	
		//console.log("In GetProductTypes()"); 		
		return this.http.get(this.serverUrl + 'Product_Type/');
	}
	
	// GetProducts By Product Type
	GetProducts(selectedProductTypeID: number): any {
		//console.log("In GetProducts() for type " + selectedProductTypeID); 
		return this.http.post(this.serverUrl + 'GP_Products/' + selectedProductTypeID, {
			productTypeID: selectedProductTypeID
			}
		)
	}
	
	//GetZoneNames
	GetZoneNames(): any {	
		//console.log("In GetZoneNames()"); 		
		return this.http.get(this.serverUrl + 'GpZones/');
	}

	//GetHLRNames
	GetHLRNames(): any {	
		//console.log("In GetHLRNames()"); 		
		return this.http.get(this.serverUrl + 'GpHLRs/');
	}

	//GetSDPNames
	GetSDPNames(): any {	
		//console.log("In GetSDPNames()"); 		
		return this.http.get(this.serverUrl + 'GpSDPs/');
	}

	//GetSAPCNames
	GetSAPCNames(): any {	
		//console.log("In GetSAPCNames()"); 		
		return this.http.get(this.serverUrl + 'GpSAPCs/');
	}

	//GetEmaPortNames
	GetEmaPortNames(): any {	
		//console.log("In GetEmaPortNames()"); 		
		return this.http.get(this.serverUrl + 'GpEmaPorts/');
	}

	// GetDetails from Definition Work Request
	GetDefinitionDetails(startMSISDN: string, endMSISDN: string): any {
		//console.log("In GetProducts() for type " + selectedProductTypeID); 
		return this.http.post(this.serverUrl + 'DefinedNumberDataRequest' , {
			startMSISDN: startMSISDN,
			endMSISDN: endMSISDN
			}
		)
	}
	
	//GetSimTypes
	GetSimTypes(): any {	
		//console.log("In GetSimTypes()"); 		
		return this.http.get(this.serverUrl + 'GetSimType/');
	}

	

	LuhnAlgorithmFor19thDigit(inputString: string): string{		
		
		console.log(inputString);
		var sumResult: number = 0;
		var securityDigit: number = 0;
		var tempVar: string;
		var tempVarNum: number;
		var i: number = 0;
		
		for (i = 1; i <= inputString.length; i++) {
			if(i%2==0){
				tempVar= (Number(inputString.charAt(i-1))*2).toString();
				
				if(tempVar.length>1){
					tempVarNum= Number(tempVar.charAt(0))+Number(tempVar.charAt(1));
				}else{
					tempVarNum= Number(tempVar);
				}
				
				//alert(tempVar);
				
				sumResult+= tempVarNum;
			}else{
				sumResult+= (Number(inputString.charAt(i-1))*1);
			}
		}
		
		sumResult= sumResult % 10;
		if(sumResult!=0){
			securityDigit= 10- sumResult;
		}
    
    return securityDigit.toString();
  
	}
	
	
}
