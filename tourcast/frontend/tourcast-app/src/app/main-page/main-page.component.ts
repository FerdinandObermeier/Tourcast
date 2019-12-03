import { Component, AfterViewInit, SimpleChanges, ViewChild } from '@angular/core';
import { SwiperConfigInterface, SwiperScrollbarInterface, SwiperPaginationInterface, SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import {HttpClient} from '@angular/common/http';
import { async } from 'q';
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
  ipAddress;
  latitude;
  longitude;


  cards:any; 

  
  constructor(
    private backendService: BackendService,
    private http: HttpClient
  ) {
    this.currentDay = this.today.getDay();
    this.uebermorgen = this.getWeekday(this.currentDay, 2);
     // comment out to disable weather API calls
    this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
      
      console.log('th data', data);
      this.ipAddress = data.ip;
      this.http.get('http://api.ipstack.com/'+this.ipAddress+'?access_key=d05d3cc8c31a96eeb4b9e90881d94ec4')
      .subscribe( data=>{
        console.log(data);
        this.latitude = data.latitude;
        this.longitude= data.longitude;
        weatherBalloon(this.index, this.longitude, this.latitude);
      });
    });
    
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
    
    weatherBalloon(index,  this.longitude, this.latitude);
  }

  goToSlideNumber(slide: number){
    this.index = slide;
    this.onIndexChange(slide);
  }

  getWeekday(currentDay:number, offset:number){
    return this.days[(currentDay + offset) % 7];
  }

  
  weatherBalloon() {
    var key = '{yourkey}';
    var t = this.index;
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + 'Munich,de'+ '&appid=' + 'af1875e8d01249f1e639f3e308a0a892'+'&units=metric')  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
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



function weatherBalloon(t:number, long:number, lat:number) { 
  fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat+ '&lon='+long+ '&appid=' + 'af1875e8d01249f1e639f3e308a0a892'+'&units=metric')  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    var i;
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
    
    document.getElementsByClassName('fas')[0].classList.add(iconNameFA);
    return;
  }
 
 