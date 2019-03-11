import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
 {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    data: {
      title: 'Example Pages'
    },
    children: [
      {
        path: '404',
        component: P404Component,
        data: {
          title: 'Page 404'
        }
      },
      {
        path: '500',
        component: P500Component,
        data: {
          title: 'Page 500'
        }
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Register Page'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, HttpClientModule, CommonModule],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
