import {  NgModule,
  Component,
  Pipe,
  OnInit,
  ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {_throw} from 'rxjs/observable/throw';
import { AppGlobals } from './../../app.global';
import { LoginService } from '../pages/LoginService';
import { LoggedInUser } from '../pages/loggedInUser';
import { AgGridAngular } from 'ag-grid-angular';
import{SSMService } from './SSM.service';
@Component({
    selector: 'app-searchPO',
    templateUrl: './search_po.component.html',
    styleUrls: ['./search_po.component.scss'],
    providers: [AppGlobals,LoginService,SSMService,DatePipe],
})
export class SearchPO implements OnInit {
	
 serverUrl: string;
  private rowData: any[];
  private offset: number;
  private rawDataFromBackend : any[];
		  	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
 			todayDate: Date;
			routerUrlAndParams: string;
  			isDataFound: boolean ;
  			isInitial:boolean=true;
  			nodataFound:boolean=false;
  			isDataFoundOther: boolean = true;
  			 isLoading:boolean = false;
			PoNumber: string;
	constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private ssmService: SSMService ,private datepipe:DatePipe) {
		this.serverUrl = environment.apiUrl; 
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
      this.isDataFound = false;
    }
    else {
      this.router.navigate(['pages/login']);
    }

   
    this.rowData = [];    

		
    }//Cons End
    
   
  
search(){
	this.isDataFound = true;
	this.isInitial=false;
	 this.isLoading = true;
	this.rowData = [];    
	this.ssmService.getPoInformation(this.PoNumber,"PO").subscribe(
		 data => {
          if(data !=null){         
	console.log("DATA= ",data)   
           this.isDataFound = true;
           
           this.nodataFound=false;
          this.rawDataFromBackend=data;
         
          for (let index in data) {
					this.rowData.push(
					{
						id:data[index].id,
						amount: data[index].amount,
						availableQuantity: data[index].availableQuantity,
						itemDescription: data[index].itemDescription,
						itemNumber: data[index].itemNumber,
						price: data[index].price,
						totalQuantity: data[index].totalQuantity,
						supplier: data[index].supplier,
						poDate: this.datepipe.transform(data[index].poDate,"dd-MM-yyyy"),
						poExpireDate: this.datepipe.transform(data[index].poExpireDate,"dd-MM-yyyy")
					
					}
					);
				}
          
          
	       
	       
          
          
			 this.isLoading = false;
          }
          else{
	 		this.isDataFound = false;
            this.isInitial = true;
            this.isLoading = false;
            this.nodataFound=true;
          }
        },
      err =>{ console.error(err)
     	alert("Please Enter Valid PO Number ")
     	this.isLoading=false;
     	this.isDataFound = false;
            this.isInitial = true;
     	
      
      }
     	);
}


  downloadCSVFiles() {
        var nameOfFileToDownload = "Purchase Order_"+this.rowData[0].id+".csv";
		console.log("nameOfFileToDownload : "+nameOfFileToDownload);

        var result = this.ssmService.DownloadCSV(nameOfFileToDownload);
		console.log(result);
        result.subscribe(
            data => {
				

				

				var blob = new Blob([data], { type: 'text/csv' });

                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
		
                    window.navigator.msSaveOrOpenBlob(blob, nameOfFileToDownload);
                } else {
                    var a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = nameOfFileToDownload;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            },
            err => {console.error(err),
                alert("Server error while downloading file.");
            }
        );
    }
 
 Back(){
	
	this.isInitial=true;
	this.isDataFound=false;
	this.nodataFound=false;
}

    ngOnInit() {
    this.offset = 0; 
   
    }

}
