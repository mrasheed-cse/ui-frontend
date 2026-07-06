import {  NgModule,
    Component,
    Pipe,
    OnInit,
    ViewChild} from '@angular/core';
    import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
  import {DatePipe} from '@angular/common';
  import {HttpClient, HttpErrorResponse} from '@angular/common/http';
  import {environment} from '../../../environments/environment';
  import {Router} from '@angular/router';
  import {_throw} from 'rxjs/observable/throw';
  import { AppGlobals } from './../../app.global';
  import { LoginService } from '../pages/LoginService';
  import { LoggedInUser } from '../pages/loggedInUser';
  import{SSMService } from './SSM.service';

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
              userName: string;
              groupID: number;
              userID: string;
              todayDate: Date;
              routerUrlAndParams: string;
              isDataFound: boolean ;
              fileToUpload: File = null;
              fileuploadstatus: string;
              fileName: string;
              fileerror: boolean = false;
              filesuccess: boolean = false;
              uploading: boolean = false;
              isConverted:boolean=false;
              isLoading:boolean=false;
              readonly environment = environment;
              fileDownloadUrl = this.environment.apiUrl+"/huawei_auc_conversion/download";
              selectedSimType: string;
              simType: FormControl;
                
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
        console.log(this.fileToUpload.name);
          
        if (this.fileToUpload == undefined || !(this.fileToUpload.name.toUpperCase().endsWith(".TXT"))) {
            this.fileuploadstatus = 'Please select a .txt file';
            this.fileerror = true;
        } else {
                this.uploading = true
                this.isLoading=true
                this.ssmService.huaweiAucFileConversion(this.fileToUpload,this.selectedSimType).subscribe((res => {
                  this.uploading = false
                  if (res == null) {
                      this.fileuploadstatus = 'File Upload Fail';
                      this.fileerror = true;
                      this.isLoading=false;
                  } else if(res['message']==="2"){
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
                }), err => {
                    this.uploading = false
                    this.fileuploadstatus = err.error.message;
                    this.fileerror = true;
                    this.isLoading=false;
                })
                console.log(this.fileToUpload.size);
            }
        }
      handleFileInput(files: FileList) {
        
        if (this.selectedSimType == undefined || this.selectedSimType == null)
            alert('Please select SIM Type');
        else
            this.fileerror = false;
            this.filesuccess = false;
            this.fileToUpload = files.item(0);
            this.fileName = this.fileToUpload.name;
      }

      downloadHuaweiAucConvertedFile(){
          this.ssmService.downloadHuaweiAucConvertedFile()
              .subscribe(
                  response => {
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

      downloadFile(response : any) :void {
          console.log(response);
          console.log(response.headers);
          let filename = "HuaweiHlr.txt";

          // Get filename from content-disposition header
          const contentDisposition = response.headers.get('content-disposition');

          if (contentDisposition) {
              let arr = contentDisposition.split(';');
              if (arr.length > 1) {
                  arr.forEach(element => {
                      if (element.trim().startsWith('filename=')) {
                          let arr2 = element.split('=');
                          if (arr2.length > 1) {
                              filename = arr2[1].trim().replace(/"/g, '');
                          }
                      }
                  })
              }
          }

          // Create blob and download
          const blob = new Blob([response.body],
              { type: response.headers.get('content-type') });

          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.click();

          // Cleanup
          window.URL.revokeObjectURL(url);
      }
  }
