import {  NgModule,
    Component,
    Pipe,
    OnInit,
    ViewChild} from '@angular/core';
    import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
  import {DatePipe} from '@angular/common';
  import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
  import {environment} from '../../../environments/environment';
  import {Router} from '@angular/router';
  import {throwError as _throw} from 'rxjs';
  import { AppGlobals } from './../../app.global';
  import { LoginService } from '../pages/LoginService';
  import { LoggedInUser } from '../pages/loggedInUser';
  import{SSMService, AucConversionResponse } from './SSM.service';

  interface simType {
    value: string;
    viewValue: string;
  }

  @Component({
      selector: 'app-searchPO',
      templateUrl: './huaweiauc.component.html',
        styleUrls: ['./search_po.component.scss'],
        providers: [AppGlobals,LoginService,SSMService],
  })
  export class HuaweiAucProcessor implements OnInit {
              currentLoggedInUser: LoggedInUser;
              userName!: string;
              groupID!: number;
              userID!: string;
              todayDate!: Date;
              routerUrlAndParams!: string;
              isDataFound = false;
              fileToUpload: File | null = null;
              fileuploadstatus = '';
              fileName = '';
              fileerror: boolean = false;
              filesuccess: boolean = false;
              uploading: boolean = false;
              isConverted:boolean=false;
              isLoading:boolean=false;
              readonly environment = environment;
              fileDownloadUrl = this.environment.apiUrl+"/huawei_auc_conversion/download";
              selectedSimType = '';
              simType!: FormControl;
                
      constructor(private router: Router,private loginService: LoginService,private http: HttpClient, private _global: AppGlobals, private ssmService: SSMService ) {
      this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
  
      if (this.currentLoggedInUser) {
        this.userName = this.currentLoggedInUser.userName
        this.groupID = this.currentLoggedInUser.groupID
        this.userID = this.currentLoggedInUser.userID
        this.isDataFound = false;
        this.fileDownloadUrl = this.environment.apiUrl+"/huawei_auc_conversion/download";
        console.log(this.fileDownloadUrl);
      }
      else {
        this.router.navigate(['pages/login']);
      }
      }

    createFormControls() {
        this.simType = new FormControl('', Validators.required);
    }
  
     ngOnInit() { 
     console.log(this.fileDownloadUrl);
      }

      simTypes: simType[] = [
        {value: '1', viewValue: '2G/3G'},
        {value: '2', viewValue: '4G'},
      ];

  
      downloadXMLFile(){
          alert('1');
          this.ssmService.downloadAucFile();
          alert('2');
      }
       
     dndUpload() {
        this.fileerror = false;
        this.filesuccess = false;
        const file = this.fileToUpload;
        console.log(file ? file.name : '');
          
        if (!file || !(file.name.toUpperCase().endsWith(".TXT"))) {
            this.fileuploadstatus = 'Please select a .txt file';
            this.fileerror = true;
        } else {
                this.uploading = true
                this.isLoading=true
                this.ssmService.huaweiAucFileConversion(file,this.selectedSimType).subscribe((res: AucConversionResponse | null) => {
                  this.uploading = false
                  if (res == null) {
                      this.fileuploadstatus = 'File Upload Fail';
                      this.fileerror = true;
                      this.isLoading=false;
                  } else if(res.message === "2"){
                        console.log(res['message']+"  111")
                        this.fileuploadstatus = 'File data row is Greater Than 100000';
                        this.fileerror = true;
                        this.isLoading=false;
                    } else {
                        console.log(res['message']+"  222")
                        this.isConverted=true;
                        this.filesuccess = true;
                        this.isLoading=false;
                    }
                }, (err: HttpErrorResponse) => {
                    this.uploading = false
                    this.fileuploadstatus = err.error && err.error.message ? err.error.message : 'File Upload Fail';
                    this.fileerror = true;
                    this.isLoading=false;
                })
                console.log(file.size);
            }
        }
      handleFileInput(files: FileList) {
        
        if (this.selectedSimType == undefined || this.selectedSimType == null) {
            alert('Please select SIM Type');
            return;
        }

        this.fileerror = false;
        this.filesuccess = false;
        this.fileToUpload = files.item(0);
        this.fileName = this.fileToUpload ? this.fileToUpload.name : '';
      }

      downloadHuaweiAucConvertedFile(){
          this.ssmService.downloadHuaweiAucConvertedFile()
              .subscribe(
                  (response: HttpResponse<Blob>) => {
                      this.isLoading = false;
                      this.downloadFile(response);
                  },
                  error => {
                      console.log(error);
                      alert('Failed to download file')
                      this.isLoading = false;
                  }
              );
      }

      downloadFile(response: HttpResponse<Blob>) :void {
          this.ssmService.downloadBlobFile(response, 'HuaweiHlr.txt');
      }
  }
