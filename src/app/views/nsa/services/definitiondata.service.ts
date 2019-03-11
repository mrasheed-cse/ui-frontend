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

	
	
}
