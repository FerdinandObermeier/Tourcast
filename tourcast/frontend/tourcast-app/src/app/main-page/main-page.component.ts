import { Component, AfterViewInit, SimpleChanges } from '@angular/core';
import 'swiper';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements AfterViewInit {

  // do this to make swiper work
  // `npm install --save @types/swiper`
  mySwiper: Swiper;
  indexSwiper: number = 0;

  constructor() {
    
  }



  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container', {
      paginationClickable: true,   
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // this.indexSwiper = this.mySwiper.activeIndex
    console.log("hi");
  }

}
