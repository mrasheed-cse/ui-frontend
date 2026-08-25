import {Component, OnInit,} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppGlobals} from './../../../app.global';
import {LoginService} from '../../pages/LoginService';
import {LoggedInUser} from '../../pages/loggedInUser';
import {ReportService} from'./report.service';
import {DatePipe} from '@angular/common';




@Component({
    selector: 'bar-chart',
    templateUrl: './viewProductReport.component.html',
    providers: [AppGlobals, LoginService, DatePipe, ReportService],
})
export class ViewProductReport implements OnInit {
	currentLoggedInUser: LoggedInUser;
			userName: string;
			groupID: number;
  			userID: string;
  		 isInitial: boolean=true;
   		StartDate:Date;
   		startMon:string;
   		endMon: string;
   		EndDate: Date;
		listproductDropDown=[];
		dataVal=[];
		productName: any;
		Forecast=[];
		actual=[];
		public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      y: {
        ticks: {
          beginAtZero: true
        }
      }
    }
  };
  public barChartLabels :any;
  public barChartType: any = 'bar';
  public barChartLegend = true;
  public barChartData = [ ]
		
    constructor(private datePipe: DatePipe,private report: ReportService,private loginService:
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
		
		var strtDate=this.datePipe.transform(this.StartDate,"dd-MM-yyyy")
		var enDate=this.datePipe.transform(this.EndDate,"dd-MM-yyyy")
		this.report.getTotalQuantiy(this.productName,strtDate,enDate).subscribe(
			
			data=>{
				for (let index in data) {
					this.dataVal.push(
					{
						productName:data[index].productName,
						forcastQuantity: data[index].forcastQuantity,
						actualQuantity: data[index].actualQuantity
						
					})
					}
					
					for(let index in this.dataVal){
				console.log("Forecast data for "+this.dataVal[index].productName+"  is " +this.dataVal[index].forcastQuantity+" Actual is" +this.dataVal[index].actualQuantity)
				this.actual.push(this.dataVal[index].actualQuantity);
			this.Forecast.push(this.dataVal[index].forcastQuantity)
		}
				console.log("A")
			console.log(this.actual)
			console.log(this.Forecast)
			
			this.isInitial=false;
		this.barChartData=[{data: this.Forecast, label: 'Forecast Data'},
    {data:this.actual, label: 'Actual Data'}]
		this.barChartLabels=this.productName;
			
				
			}
			
			
			
			
			
		)
		
		
		
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
		
		Back(){
			this.isInitial=true;
			this.barChartLabels=[];
			this.actual=[];
			this.Forecast=[];
			this.StartDate=null
			this.EndDate=null
			this.dataVal=[];
		}
		
		Download(){
			
     this.report.generateCSV(this.dataVal).subscribe(
	
	data=>{if(data!=null){
		this.downloadFile();
		console.log("Saved")
	
	}
		
	}
     
     
     );
		
		}
		
		
		downloadFile(){
			
			
			
        var nameOfFileToDownload = "ProductReport"+".csv";
		console.log("nameOfFileToDownload : "+nameOfFileToDownload);

        var result = this.report.DownloadCSV(nameOfFileToDownload);
		console.log(result);
        result.subscribe(
            data => {
				

				

				var blob = new Blob([data as any], { type: 'text/csv' });

                if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
		
                    (window.navigator as any).msSaveOrOpenBlob(blob, nameOfFileToDownload);
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
		
    
    }