import { Component, OnInit } from '@angular/core';
import { MsisdnService } from '../nsa/msisdn.service';

@Component({
  selector: 'app-uploadrecycle',
  templateUrl: './uploadrecycle.component.html',
  styleUrls: ['./uploadrecycle.component.css']
})
export class UploadrecycleComponent implements OnInit {

  fileToUpload: File = null;
  fileenable:boolean=false;
  constructor( private msisdnService: MsisdnService) { }
  ngOnInit(): void {
  }
  dndUpload() {
    if (this.fileToUpload == undefined || this.fileToUpload == null) {
     this.fileenable=true;
    } else {
   this.msisdnService.postFile(this.fileToUpload).subscribe((res)=>{
     console.log(res);
     this.fileenable=false;
   },err=>{
    
   })
    }
  }
  handleFileInput(files: FileList) {
    this.fileenable=false;
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload.size);
  }

  

}
