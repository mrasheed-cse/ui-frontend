import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    templateUrl: '404.component.html',
    standalone: false
})
export class P404Component {

  constructor(private router: Router) { }
  
  homeButton(event: any){
		//console.log(event);
		this.router.navigateByUrl('/pages/login');
	}

}
