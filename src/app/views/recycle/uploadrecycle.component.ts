import {Component, OnInit} from '@angular/core';
import {MsisdnService} from '../nsa/msisdn.service';

@Component({
    selector: 'app-uploadrecycle',
    templateUrl: './uploadrecycle.component.html',
    styleUrls: ['./uploadrecycle.component.css']
})
export class UploadRecycleComponent implements OnInit {
    fileToUpload: File = null;
    fileuploadstatus: string;
    fileName: string;
    fileerror: boolean = false;
    filesuccess: boolean = false;
    uploading: boolean = false;

    constructor(private msisdnService: MsisdnService) {
    }

    ngOnInit(): void {
    }

    dndUpload() {
        this.fileerror = false;
        this.filesuccess = false;
        if (this.fileToUpload == undefined || !this.fileToUpload.name.endsWith(".csv")) {
            this.fileuploadstatus = 'Please select a csv file';
            this.fileerror = true;
        } else {
            this.uploading = true
            this.msisdnService.postFile(this.fileToUpload).subscribe((res => {
                this.uploading = false
                if (res == null) {
                    this.fileuploadstatus = 'File Upload Fail';
                    this.fileerror = true;
                } else {
                    this.fileuploadstatus = 'File Upload Success';
                    this.filesuccess = true;
                }
            }), err => {
                this.uploading = false
                this.fileuploadstatus = err.error.message;
                this.fileerror = true;
            })
            console.log(this.fileToUpload.size);
        }
    }

    handleFileInput(files: FileList) {
        this.fileerror = false;
        this.filesuccess = false;
        this.fileToUpload = files.item(0);
        this.fileName = this.fileToUpload.name;
    }
}