import { Component, AfterViewInit, SimpleChanges, ViewChild } from '@angular/core';
import { SwiperConfigInterface, SwiperScrollbarInterface, SwiperPaginationInterface, SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { BackendService } from '../services/http.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  
  currentSlide: number = 0;
  public disabled: boolean = false;
  index = 0;
  private today = new Date();
  private currentDay;
  uebermorgen;
  private days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  cards:any; 

  
  constructor(
    private backendService: BackendService 
  ) {
    this.currentDay = this.today.getDay();
    this.uebermorgen = this.getWeekday(this.currentDay, 2);
    this.weatherBalloon(); // comment out to disable weather API calls
  }
  
  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.backendService.getCards().subscribe((data) => {
      this.cards = data;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
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

  // async getCardsFromBackend() {
  //    this.cards = await this.backendService.getCards();
  // }

  
  weatherBalloon() {
    var key = '{yourkey}';
    var t = this.index;
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + 'Munich,de'+ '&appid=' + 'af1875e8d01249f1e639f3e308a0a892'+'&units=metric')  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      // console.log(data);
      var act=0;
      if(t==0){
        act=data.main.temp;
      }
      else if(t==1){
        act=1;
      }
      document.getElementById('temperature').innerHTML=' '+act + '°C';
    })
    .catch(function() {
      // catch any errors
    });
  }
}
