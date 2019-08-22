import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testsimdashboard',
  templateUrl: './testsimdashboard.component.html',
  styleUrls: ['./testsimdashboard.component.scss']
})
export class TestsimdashboardComponent implements OnInit {

  numberOfTestSims : number;

  constructor() { }

  ngOnInit() {
    this.numberOfTestSims = 0;
  }

}
