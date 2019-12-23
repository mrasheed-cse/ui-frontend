import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { LoginService } from '../../views/pages/LoginService';
import { LoggedInUser } from '../../views/pages/loggedInUser'; 
// Import navigation elements
import { navigation, navigation_grpID_Sourcing, navigation_grpID_CNP,navigation_grpID_VDSO,navigation_grpID_BSS_Planning, navigation_blankdata, navigation_grpID_Wipro_Billing, navigation_grpID_RAFM, navigation_grpID_Wipro_CIM, navigation_grpID_Wipro_OSS 
  , navigation_grpID_SSM, navigation_grpID_CLC,navigation_grpID_GENERAL, navigation_grpID_ADMIN
} from './../../_nav';
import { AppGlobals } from './../../app.global';
@Component({
  selector: 'app-sidebar-nav',
  template: `
    <nav class="sidebar-nav-cst">
      <ul class="nav">
        <li class="nav-item"><a class="navbar-brand navbar-brand-cst"></a></li>
        <ng-template ngFor let-navitem [ngForOf]="navigation">
          <li *ngIf="isDivider(navitem)" class="nav-divider"></li>
          <ng-template [ngIf]="isTitle(navitem)">
            <app-sidebar-nav-title [title]='navitem'></app-sidebar-nav-title>
          </ng-template>
          <ng-template [ngIf]="!isDivider(navitem)&&!isTitle(navitem)">
            <app-sidebar-nav-item [item]='navitem'></app-sidebar-nav-item>
          </ng-template>
        </ng-template>

      </ul>
    </nav>`,
  providers: [LoginService, AppGlobals]
})
export class AppSidebarNavComponent {

  public navigation2 = navigation;  
  public navigation = null;
  currentLoggedInUser: LoggedInUser;	
  groupID: number;
  
  	constructor(private loginService: LoginService, private _global: AppGlobals) { 
	
  this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
  
  //this.navigation = this.loginService.LoadMenu();
  
  this.loginService.LoadMenu().subscribe(
    data => {
      if(data !=null){
        //console.log(data);
        this.navigation = data;
      }
      else{
        
      }
    },
  err => console.error(err),
  () => console.log('Done loading menu')
  );
  
  console.log("this.navigation");
  console.log(this.navigation);
	
  /*
  if (this.currentLoggedInUser) {		
		this.groupID = this.currentLoggedInUser.groupID;
    console.log('Current user groupID : ' + this.groupID);
    
		if (this.groupID == this._global.groupID_Sourcing){
			this.navigation = navigation_grpID_Sourcing;
//			console.log('navigation_grpID_Sourcing');
		}
		else if (this.groupID == this._global.groupID_CNP){
			this.navigation = navigation_grpID_CNP;
		//	console.log('navigation_grpID_CNP');
		}
		else if (this.groupID == this._global.groupID_BSS_Planning){
			this.navigation = navigation_grpID_BSS_Planning;
			//console.log('navigation_grpID_BSS_Planning');
		}
		
		else if (this.groupID == this._global.groupID_VDSO){
			this.navigation = navigation_grpID_VDSO;
			//console.log('navigation_grpID_VDSO');
		}
		else if (this.groupID == this._global.groupID_Wipro_Billing){
			this.navigation = navigation_grpID_Wipro_Billing;
			//console.log('navigation_grpID_Wipro_Billing');
		}
		
		else if (this.groupID == this._global.groupID_RAFM){
			this.navigation = navigation_grpID_RAFM;
			//console.log('navigation_grpID_RAFM');
		}
		
		else if (this.groupID == this._global.groupID_CIM){
			this.navigation = navigation_grpID_Wipro_CIM;
			//console.log('navigation_grpID_Wipro_CIM');
    }
    else if (this.groupID == this._global.groupID_OSS){
			this.navigation = navigation_grpID_Wipro_OSS;		
    }
//  , navigation_grpID_SSM, navigation_grpID_CLC,navigation_grpID_HOD,navigation_grpID_GENERAL, navigation_grpID_ADMIN, navigation_grpID_VENDOR

    else if (this.groupID == this._global.groupID_SSM){
			this.navigation = navigation_grpID_SSM;
			
		}
    else if (this.groupID == this._global.groupID_CLC){
			this.navigation = navigation_grpID_CLC;
			
    }
    else if (this.groupID == this._global.groupID_GENERAL){
			this.navigation = navigation_grpID_GENERAL;
			
    }
    else if (this.groupID == this._global.groupID_ADMIN){
			this.navigation = navigation_grpID_ADMIN;
			
		}
    
		else {
			this.navigation = navigation_blankdata;
			//console.log('navigation_blankdata');
		}
		
	}
   */
  
	}

  public isDivider(item) {
    return item.divider ? true : false
  }

  public isTitle(item) {
    return item.title ? true : false
  }

  
}

import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-nav-item',
  template: `
    <li *ngIf="!isDropdown(); else dropdown" [ngClass]="hasClass() ? 'nav-item ' + item.class : 'nav-item'">
      <app-sidebar-nav-link [link]='item'></app-sidebar-nav-link>
    </li>
    <ng-template #dropdown>
      <li [ngClass]="hasClass() ? 'nav-item nav-dropdown ' + item.class : 'nav-item nav-dropdown'"
          [class.open]="isActive()"
          routerLinkActive="open"
          appNavDropdown>
        <app-sidebar-nav-dropdown [link]='item'></app-sidebar-nav-dropdown>
      </li>
    </ng-template>
    `
})
export class AppSidebarNavItemComponent {
  @Input() item: any;

  public hasClass() {
    return this.item.class ? true : false
  }

  public isDropdown() {
    return this.item.children ? true : false
  }

  public thisUrl() {
    return this.item.url
  }

  public isActive() {
    return this.router.isActive(this.thisUrl(), false)
  }

  constructor( private router: Router )  { }

}

@Component({
  selector: 'app-sidebar-nav-link',
  template: `
    <a *ngIf="!isExternalLink(); else external"
      [ngClass]="hasVariant() ? 'nav-link nav-link-' + link.variant : 'nav-link'"
      routerLinkActive="active"
      [routerLink]="[link.url]"
      (click)="hideMobile()">
      <i *ngIf="isIcon()" class="{{ link.icon }}"></i>
      {{ link.name }}
      <span *ngIf="isBadge()" [ngClass]="'badge badge-' + link.badge.variant">{{ link.badge.text }}</span>
    </a>
    <ng-template #external>
      <a [ngClass]="hasVariant() ? 'nav-link nav-link-' + link.variant : 'nav-link'" href="{{link.url}}">
        <i *ngIf="isIcon()" class="{{ link.icon }}"></i>
        {{ link.name }}
        <span *ngIf="isBadge()" [ngClass]="'badge badge-' + link.badge.variant">{{ link.badge.text }}</span>
      </a>
    </ng-template>
  `
})
export class AppSidebarNavLinkComponent {
  @Input() link: any;

  public hasVariant() {
    return this.link.variant ? true : false
  }

  public isBadge() {
    return this.link.badge ? true : false
  }

  public isExternalLink() {
    return this.link.url.substring(0, 4) === 'http' ? true : false
  }

  public isIcon() {
    return this.link.icon ? true : false
  }

  public hideMobile() {
    if (document.body.classList.contains('sidebar-mobile-show')) {
      document.body.classList.toggle('sidebar-mobile-show')
    }
  }

  constructor() { }
}

@Component({
  selector: 'app-sidebar-nav-dropdown',
  template: `
    <a class="nav-link nav-dropdown-toggle" appNavDropdownToggle>
      <i *ngIf="isIcon()" class="{{ link.icon }}"></i>
      {{ link.name }}
      <span *ngIf="isBadge()" [ngClass]="'badge badge-' + link.badge.variant">{{ link.badge.text }}</span>
    </a>
    <ul class="nav-dropdown-items-cst">
      <ng-template ngFor let-child [ngForOf]="link.children">
        <app-sidebar-nav-item [item]='child'></app-sidebar-nav-item>
      </ng-template>
    </ul>
  `
})
export class AppSidebarNavDropdownComponent {
  @Input() link: any;

  public isBadge() {
    return this.link.badge ? true : false
  }

  public isIcon() {
    return this.link.icon ? true : false
  }

  constructor() { }
}

@Component({
  selector: 'app-sidebar-nav-title',
  template: ''
})
export class AppSidebarNavTitleComponent implements OnInit {
  @Input() title: any;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const nativeElement: HTMLElement = this.el.nativeElement;
    const li = this.renderer.createElement('li');
    const name = this.renderer.createText(this.title.name);

    this.renderer.addClass(li, 'nav-title');

    if ( this.title.class ) {
      const classes = this.title.class;
      this.renderer.addClass(li, classes);
    }

    if ( this.title.wrapper ) {
      const wrapper = this.renderer.createElement(this.title.wrapper.element);

      this.renderer.appendChild(wrapper, name);
      this.renderer.appendChild(li, wrapper);
    } else {
      this.renderer.appendChild(li, name);
    }
    this.renderer.appendChild(nativeElement, li)
  }
}

export const APP_SIDEBAR_NAV = [
  AppSidebarNavComponent,
  AppSidebarNavDropdownComponent,
  AppSidebarNavItemComponent,
  AppSidebarNavLinkComponent,
  AppSidebarNavTitleComponent
];
