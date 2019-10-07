// import {ActionReducer} from '@ngrx/store';  
// import LogRocket from 'logrocket';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MetricsComponent } from './metrics/metrics.component';
import { GrafanaDashboardComponent } from './grafana-dashboard/grafana-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    MetricsComponent,
    GrafanaDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
