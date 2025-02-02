import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { FilterComponent } from './filter/filter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FormsModule } from '@angular/forms';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BackendService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ChartsModule } from 'ng2-charts';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainPageComponent,
    DetailViewComponent,
    FilterComponent,
    CardComponent,
    WeatherDetailComponent
  ],
  imports: [
    MatButtonModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatCardModule,
    SwiperModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
    BackendService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
