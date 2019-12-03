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
  uebermorgen;
  private days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  private weatherToday;
  private weatherTomorrow;
  private weatherDayAfterTomorrow;
  
  constructor() {
    this.currentDay = this.today.getDay();
    this.uebermorgen = this.getWeekday(this.currentDay, 2);
    weatherBalloon(this.index); // comment out to disable weather API calls
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
    
    weatherBalloon(index);
  }

  goToSlideNumber(slide: number){
    this.index = slide;
    this.onIndexChange(slide);
  }

  getWeekday(currentDay:number, offset:number){
    return this.days[(currentDay + offset) % 7];
  }
  
  
}
function weatherBalloon(t:number) {
  var key = '{yourkey}';
  
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + 'Munich,de'+ '&appid=' + 'af1875e8d01249f1e639f3e308a0a892'+'&units=metric')  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    console.log(data);
    var i;
   
    //var i: number= parseFloat(data.main.temp);
    var iconName;
    
    if(t==0){
      i= data.list[0].main.temp;
      iconName=data.list[0].weather[0].main;

    }
    else if(t==1){
      i= data.list[7].main.temp;
      iconName=data.list[7].weather[0].main;
    }
    else{
      i= i= data.list[15].main.temp;
      iconName=data.list[15].weather[0].main;
      
    }
    document.getElementById('temperature').innerHTML=' '+i + '°C';
    setIcon(iconName);
    
    
    
    /*this.weatherToday=i;
    
    this.weatherTomorrow=3;
    this.weatherDayAfterTomorrow=4;
    this.setWeather();
    */
  })
  .catch(function() {
    // catch any errors
  });
}

 function setIcon(iconName: String){
   var iconNameFA;
    if(iconName==='Clear'){
      iconNameFA='fa-sun'
    }
    else if(iconName==='Snow'){
      iconNameFA='fa-snowflake'
    }
    else if(iconName==='Rain'){
      iconNameFA='fa-showers-heavy'
    }
    else if(iconName==='Clouds'){
      iconNameFA='fa-cloud';
    }
    else if(iconName==='Thunderstorm'){
      iconNameFA='fa-bolt';
    }
    //iconNameFA='fa-bolt';
    //var elem= document.getElementById('iconforWeather');
    document.getElementsByClassName('fas')[0].classList.add(iconNameFA);
    console.log(iconName);
    return;
  }