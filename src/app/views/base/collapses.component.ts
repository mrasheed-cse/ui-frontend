import { Component } from '@angular/core';

@Component({
    templateUrl: 'collapses.component.html',
    standalone: false
})
export class CollapsesComponent {

  constructor() { }

  isCollapsed: boolean = false;

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

}
