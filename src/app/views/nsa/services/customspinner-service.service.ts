import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class CustomspinnerService {
  
  constructor(private ngxSpinner: NgxSpinnerService) { }

  show(){
    this.ngxSpinner.show();
  }

  hide(){
    var root = this;
    setTimeout(function(){
      root.ngxSpinner.hide();
    }, 1500);
  }
}
