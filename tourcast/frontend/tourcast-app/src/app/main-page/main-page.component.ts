import { Component, AfterViewInit, SimpleChanges, ViewChild, OnInit } from '@angular/core';
import { SwiperConfigInterface, SwiperScrollbarInterface, SwiperPaginationInterface, SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import {HttpClient} from '@angular/common/http';
import { async } from 'q';
import { BackendService } from '../services/http.service';
import { TestBed } from '@angular/core/testing';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{

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
    private http: HttpClient,
    private messageService: MessageService
  ) {

    this.messageService.getHideFilter().subscribe( (data:any) => {
      if(data) {
        let filteredCards = [];
        this.cards.filter(element => {
          if (data.showAttractions && element.attraction) {
            filteredCards.push(element);
          }
          if (data.showLakes && element.lake && !filteredCards.includes(element)) {
            filteredCards.push(element);
          }
          if (data.showMountains && element.mountain && !filteredCards.includes(element)) {
            filteredCards.push(element);
          }
          if (data.showMuseums && element.museum && !filteredCards.includes(element)) {
            filteredCards.push(element);
          }
          if (data.showViewpoints && element.viewpoint && !filteredCards.includes(element)) {
            filteredCards.push(element);
          }

          if (data.onlyFree) {
            filteredCards = filteredCards.filter(el => el.priceMax = "0.00")
          } else {
            filteredCards = filteredCards.filter(el => el.priceMax < data.priceValue);
          }
          if (data.showClosed && !data.showOpened) {
            filteredCards = filteredCards.filter(el => !el.isOpen);
          }
          if (data.showOpened && !data.showClosed) {
            filteredCards = filteredCards.filter(el => el.isOpen);
          }
        });
        this.cards = filteredCards;
      }
    })

    this.currentDay = this.today.getDay();
    this.uebermorgen = this.getWeekday(this.currentDay, 2);
     // comment out to disable weather API calls
    /*this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( (data) => {

      console.log('th data', data);
      this.ipAddress = data.ip;
      this.http.get('https://api.ipstack.com/'+this.ipAddress+'?access_key=d05d3cc8c31a96eeb4b9e90881d94ec4')
      .subscribe( (data: any)=>{
        console.log(data);
        this.latitude = data.latitude;
        this.longitude= data.longitude;

      });

    });*/
    weatherBalloon(this.index, this.longitude, this.latitude);
  }


  generateTime() {
    this.cards.forEach((card,index) => {
      let hoursFrom, minutesFrom, hoursTo, minutesTo, temp;
      let nowHours = new Date().getHours();
      let nowMinutes = new Date().getMinutes();

      temp = card.openingHoursFrom.substr(11);
      temp = temp.substr(0,5);
      this.cards[index].timeFrom = temp;
      temp = card.openingHoursTo.substr(11);
      temp = temp.substr(0,5);
      this.cards[index].timeTo = temp;

      hoursFrom = parseInt(this.cards[index].timeFrom.substr(0,2));
      minutesFrom = parseInt(this.cards[index].timeFrom.substr(3,4));
      hoursTo = parseInt(this.cards[index].timeTo.substr(0,2));
      minutesTo = parseInt(this.cards[index].timeTo.substr(3,4));

      if (hoursFrom < nowHours && nowHours < hoursTo) {
        this.cards[index].isOpen = true;
      }
      if (hoursFrom = nowHours) {
        if (minutesFrom < nowMinutes) {
          this.cards[index].isOpen = true;
        }
      }
      if (hoursTo = nowHours) {
        if (nowMinutes < minutesTo) {
          this.cards[index].isOpen = true;
        }
      }
    })
    console.log(this.cards);
  }

  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.backendService.getCards().subscribe((data) => {
      let temp: any = data;
      this.cards = temp.slice(0,9);
      this.generateTime();
    });
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


  /*weatherBalloon() {
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
  }+ lat+ '&lon='+long+
*/
}


function weatherBalloon(t:number, long:number, lat:number) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + 'Munich,de'+  '&appid=' + 'af1875e8d01249f1e639f3e308a0a892'+'&units=metric')
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
      iconNameFA='fa-cloud-showers-heavy'
    }
    else if(iconName==='Clouds'){
      iconNameFA='fa-cloud';
    }
    else if(iconName==='Thunderstorm'){
      iconNameFA='fa-bolt';
    }
    var elem =document.getElementsByClassName('fas')[0];
    if(elem.classList.length>1){
      elem.classList.remove(elem.classList[1]);
    }
    document.getElementsByClassName('fas')[0].classList.add(iconNameFA);

    return;
}
