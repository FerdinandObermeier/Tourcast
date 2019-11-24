import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { FilterComponent } from './filter/filter.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs'; 

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainPageComponent,
    DetailViewComponent,
    FilterComponent,
  ],
  imports: [
    MatButtonModule,
    BrowserModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
