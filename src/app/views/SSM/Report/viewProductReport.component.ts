import {Component, OnInit,} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppGlobals} from './../../../app.global';
import {LoginService} from '../../pages/LoginService';
import {LoggedInUser} from '../../pages/loggedInUser';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {ReportService} from'./report.service';
import {DatePipe} from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
@Component({
    selector: 'bar-chart',
    templateUrl: './viewProductReport.component.html',
    providers: [AppGlobals, LoginService, DatePipe, ReportService,ChartsModule],
})
export class ViewProductReport implements OnInit {
	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  		 isInitial:boolean=true;
   		StartDate:Date;
   		startMon:string;
   		endMon: string;
   		EndDate: Date;
		listproductDropDown=[];
		productName:string;
		
    constructor(private report: ReportService,private loginService:
  			 LoginService,private router: Router) {this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();

    if (this.currentLoggedInUser) {
      this.userName = this.currentLoggedInUser.userName
      this.groupID = this.currentLoggedInUser.groupID
      this.userID = this.currentLoggedInUser.userID
    

    }
    else {
      this.router.navigate(['pages/login']);
    }
   
    }
    
    	
	search(){
		 const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
		var endyear=this.EndDate.getFullYear()
		this.startMon=monthNames[this.StartDate.getMonth()]
		console.log(endyear);
	}

    ngOnInit(): void {
	this.getproductName("3");
    }



    getproductName(listno:string){
	this.report.getDropdown(listno).subscribe(
		data=>
			{
				//console.log(data);
				for (let index in data) {
					this.listproductDropDown.push(
					{
						id:data[index].id,
						groupName: data[index].groupName,
					}
					);
				}
			},
    err => console.error(err));
			
		}
		
		
		
    
    }