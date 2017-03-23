import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router'; //used for routes 1/5

import { AppComponent } from './app.component';
import { AboutComponent } from './app.about.component';
import { HomeComponent } from './app.home.component';
import { CommServerService } from './services/service.url';
import { DetailsComponent } from './app.details.component';
// http://valor-software.com/ng2-charts/ for more info
import { ChartsModule } from 'ng2-charts/ng2-charts';

//used for routes 2/5
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'client/home', redirectTo: '/' },
  { path: 'client/about', component: AboutComponent },
  { path: 'client/urls/:short', component: DetailsComponent },
]


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent, //used for routes 3/5
    HomeComponent,   //used for routes 4/5
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),  //used for routes 5/5
    ChartsModule
  ],
  providers: [CommServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
