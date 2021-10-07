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
import {_throw} from 'rxjs/observable/throw';
import { AppGlobals } from './../../../app.global';
import { LoginService } from '../../pages/LoginService';
import { LoggedInUser } from '../../pages/loggedInUser';
import{ViewJourney } from './viewvouschejourney.service';
import { Observable } from 'rxjs/Observable';
import {DatePipe} from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

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
  			listVoucherHopsdata=[];
  			voucherDetail=[];
  			
  			
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
	
	 this.getAllData();
		
	}
	
	getAllData(){
		this.viewall=true;
		this.viewService.getAllVoucher().subscribe(
			data=>{
				
				
					for (let index in data) {
			
			this.listVoucherHopsdata.push(
					{
						
						ponumber: data[index].ponumber,
						batchNo: data[index].batchNo,
						currentHop: data[index].currentHop,
						lastHop: data[index].lastHop,
						pendingFor: data[index].pendingFor,
						vendor: data[index].vendor,
						cardGroup: data[index].cardGroup,
						id:data[index].id,
					}
					);
					
				}
				
			})
			}
	
	
	details(id:number){
		
		this.viewall=false;
		this.isDetail=true;
		
	}
  			
  			}