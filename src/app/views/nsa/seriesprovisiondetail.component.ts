import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-seriesprovisiondetail',
  templateUrl: './seriesprovisiondetail.component.html',
  styles: []
})
export class SeriesprovisiondetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router:Router) {
    this.activatedRoute.queryParams.subscribe(params => {
        let date = params['wr_ID'];
        console.log(date); // Print the parameter to the console. 
    });
  }
  ngOnInit() {
  }

}
