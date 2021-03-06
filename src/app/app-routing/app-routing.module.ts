import { StarterComponent } from './../starter/starter.component'; 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { LogoutComponent } from '../logout/logout.component'; 

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
      { path: 'starter', component: StarterComponent },
      { path: 'auth', component: AppComponent },
      { path: 'logout', component: LogoutComponent }
    ])
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
