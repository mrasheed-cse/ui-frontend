import {  NgModule,
  Component,
  Pipe,
  OnInit,
  } from '@angular/core';
  import {ReactiveFormsModule, FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import {throwError as _throw,  Observable } from 'rxjs';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import{ViewJourney } from './viewvouschejourney.service';
import {DatePipe} from '@angular/common';





@Component({
    selector: 'app-voucherGen',
    templateUrl: './viewvoucher_journey.component.html',
      styleUrls: ['../search_po.component.scss'],
      providers: [AppGlobals,LoginService,ViewJourney,DatePipe],
})
export class VoucherJourney implements OnInit {
	
	
	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  			viewall:boolean=false;
  			isDetail:boolean=false;
  			listVoucherHopsdata: Array<Object>;
  			voucherDetail:any[]=[];
  			filteredData:any[];
  			public searchText : string;
  			public vendor:string;
  			Status: string
  			item:string
  			endSerial:number;
  			  private offset: number;
  public currPage: number;
	public totalPages: number;
  			constructor(private datePipe: DatePipe,private router: Router,private fb:FormBuilder,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private viewService: ViewJourney ) {
    
 
    this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
     
      }
    else {
      this.router.navigate(['pages/login']);
    }
    }	
  					 
    ngOnInit(){
	
	 this.firstPage();
		
	}
	
	getAllData(){
		this.viewall=true;
		this.viewService.getAllVoucher(this.currPage,this._global.ScratchvoucherPageSize).subscribe(
			data=>{ 
				 var dataSize = Number(data.totalSize);
				  if(dataSize>0){    this.filteredData=data.response;
				  this.listVoucherHopsdata=data.response;
				  
				  
        var resultOfMod = dataSize%Number(this._global.ScratchvoucherPageSize);        
        this.totalPages = Math.floor(dataSize/Number(this._global.ScratchvoucherPageSize));
        
        if(resultOfMod>0)
          this.totalPages=this.totalPages+1;
        console.log("Total Page "+this.totalPages);
        //alert(dataSize);
      }
      else{
	alert("No Data Found")
      }
				 
				
				
			})
			}
	
	
	
  			
  	
poChange(){
	if(this.searchText!=null){this.listVoucherHopsdata=[];
	for(let index in this.filteredData){
			
		if(this.filteredData[index].ponumber===this.searchText){
			this.listVoucherHopsdata.push(
					{
						
						ponumber: this.filteredData[index].ponumber,
						batchNo: this.filteredData[index].batchNo,
						vendor: this.filteredData[index].vendor,
						batchQuantity: this.filteredData[index].batchQuantity,
						ItemNumber: this.filteredData[index].ItemNumber,
						poQuantity:this.filteredData[index].poQuantity,
						deliveredQuantity:this.filteredData[index].deliveredQuantity
						
					}
					);
			
		}
		
}}
else{this.firstPage()}
	
}

firstPage(){
  
  
    this.currPage=1;
    this.getAllData();
  
  
}

lastPage(){
  
    this.currPage=this.totalPages;
    this.getAllData();
}


prevPage(){
if(this.currPage <= 0){
  //first page .. do nothing
}
else{
  this.currPage--;
  this.getAllData();
}
}


nextPage(){
  
  if(this.currPage == this.totalPages){
    //last page .. do nothing
  }
  else{
    this.currPage++;
    this.getAllData();
  }
  
}

vendorChange(){
	if(this.vendor!=null){this.listVoucherHopsdata=[];
	for(let index in this.filteredData){
			
		if(this.filteredData[index].vendor===this.vendor){
			this.listVoucherHopsdata.push(
					{
						
						ponumber: this.filteredData[index].ponumber,
						batchNo: this.filteredData[index].batchNo,
						vendor: this.filteredData[index].vendor,
						batchQuantity: this.filteredData[index].batchQuantity,
						ItemNumber: this.filteredData[index].ItemNumber,
						poQuantity:this.filteredData[index].poQuantity,
						deliveredQuantity:this.filteredData[index].deliveredQuantity
					}
					);
			
		}
		
}}


else{this.firstPage()}
	
}
itemChange(){
	if(this.item!=null){this.listVoucherHopsdata=[];
	for(let index in this.filteredData){
			
		if(this.filteredData[index].ItemNumber===this.item){
			this.listVoucherHopsdata.push(
					{
						
						ponumber: this.filteredData[index].ponumber,
						batchNo: this.filteredData[index].batchNo,
						vendor: this.filteredData[index].vendor,
						batchQuantity: this.filteredData[index].batchQuantity,
						ItemNumber: this.filteredData[index].ItemNumber,
						poQuantity:this.filteredData[index].poQuantity,
						deliveredQuantity:this.filteredData[index].deliveredQuantity
					}
					);
			
		}
		
}}


else{this.firstPage()}
	
}	
download(ponumber: any,batchNo: any ,vendor :any ,batchQuantity :any,ItemNumber:any,poQuantity:any,deliveredQuantity:any){
	
 this.viewService.downloadFile(ponumber,batchNo,vendor,batchQuantity,ItemNumber,poQuantity,deliveredQuantity,true).subscribe(
                    data => {
                            var link = document.createElement('a');
                            link.href = window.URL.createObjectURL(data);
                            link.download = "Scratch Card.csv";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        })
	
}
	

  			}