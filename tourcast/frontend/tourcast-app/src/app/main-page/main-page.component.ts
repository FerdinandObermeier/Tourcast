import { Component, AfterViewInit } from '@angular/core';
import 'swiper';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements AfterViewInit {

  mySwiper: Swiper;

  constructor() { }

    ngAfterViewInit() {
      this.mySwiper = new Swiper('.swiper-container', {
        paginationClickable: true,
      });
    }


}
