import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements AfterViewInit {

  mySwiper: Swiper;

  constructor() { }

  // this.mySwiper = new Swiper('.swiper-container', {
  //       pagination: {
  //         el: '.swiper-pagination',
  //         dynamicBullets: true,
  //       },
  //     });

      ngAfterViewInit() {
        this.mySwiper = new Swiper('.swiper-container', {
            // pagination: '.swiper-pagination',
            // paginationClickable: true,
            pagination: {
              el: '.swiper-pagination',
              dynamicBullets: true,
            },
            // nextButton: '.swiper-button-next',
            // prevButton: '.swiper-button-prev'
        });
      }
  

}
