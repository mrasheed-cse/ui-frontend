import { Component, OnInit } from '@angular/core';
import { MsisdnService } from '../nsa/msisdn.service';

@Component({
  selector: 'app-uploadrecycle',
  templateUrl: './uploadrecycle.component.html',
  styleUrls: ['./uploadrecycle.component.css']
})
export class UploadrecycleComponent implements OnInit {

  fileToUpload: File = null;
  fileenable: boolean = false;
  fileuploadstatus: string;
  filestatus: boolean = false;
  constructor(private msisdnService: MsisdnService) { }
  ngOnInit(): void {
  }
  dndUpload() {
    if (this.fileToUpload == undefined || this.fileToUpload == null) {
      this.fileenable = true;
    } else {
      this.msisdnService.postFile(this.fileToUpload).subscribe((res => {
        if (res == null) {
          this.fileuploadstatus = 'File Upload Fail';
          this.filestatus = true;
        } else {
          this.fileuploadstatus = 'File Upload Success';
          this.filestatus = true;
        }
      }), err => {
        this.fileuploadstatus = 'File Upload Fail';
        this.filestatus = true;
      })
      console.log(this.fileToUpload.size);
    }
  }
  handleFileInput(files: FileList) {
    this.fileenable = false;
    this.filestatus = false;
    this.fileToUpload = files.item(0);
    let fileName = this.fileToUpload.name;
    this.fileuploadstatus=fileName;
    this.filestatus = true;

  }



}
