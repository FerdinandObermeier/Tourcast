import { Component, AfterViewInit, SimpleChanges, ViewChild } from '@angular/core';
import { SwiperConfigInterface, SwiperScrollbarInterface, SwiperPaginationInterface, SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements AfterViewInit {
  
  currentSlide: number = 0;
  public disabled: boolean = false;
  index = 0;
  private today = new Date();
  private currentDay;
  private uebermorgen;
  private days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  constructor() {
    this.currentDay = this.today.getDay();
    this.uebermorgen = this.getWeekday(this.currentDay, 2);
  }
  
  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;




  ngAfterViewInit() {
  }


  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // this.indexSwiper = this.mySwiper.activeIndex
    console.log("hi");
  }
  
  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    pagination: false,
  };

  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };


  public onIndexChange(index: number) {
    this.currentSlide = index;
  }

  goToSlideNumber(slide: number){
    this.index = slide;
    this.onIndexChange(slide);
  }

  getWeekday(currentDay:number, offset:number){
    return this.days[(currentDay + offset) % 7];
  }
}
