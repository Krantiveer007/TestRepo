import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { PrivateViewComponent } from 'src/app/private-view/private-view.component';
import { WelcomeViewComponent } from './welcome-view/welcome-view.component';

const appRoutes: Routes = [
  { path: 'welcomePage/login', component: LoginComponent },
  {
    path: 'welcomePage',
    component: WelcomeViewComponent,
    data: { title: 'ION Trading' }
  },
  {
    path: '',
    redirectTo: '/welcomePage',
    pathMatch: 'full'
  },
  {
    path: 'welcomePage/privateView', component: PrivateViewComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrivateViewComponent,
    WelcomeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
