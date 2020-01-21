import { Component, ViewChild, OnInit } from "@angular/core";
import {
  SwiperConfigInterface,
  SwiperComponent,
  SwiperDirective
} from "ngx-swiper-wrapper";
import { BackendService } from "../services/http.service";
import { MessageService } from "../services/message.service";

/**
 * @ignore
 */
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  currentSlide = 0;
  public disabled = false;
  index = 0;
  private today = new Date();
  private currentDay;
  uebermorgen;
  private days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  ipAddress;
  loading;
  allCards;
  cards: any;

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    pagination: false
  };


  constructor(
    private backendService: BackendService,
    private messageService: MessageService
  ) {
    this.loading = true;

    this.messageService.getHideFilter().subscribe((data: any) => {
      if (data) {
        this.filterCards(data);
      }
    });

    this.currentDay = this.today.getDay();
    this.uebermorgen = this.getWeekday(this.currentDay, 2);

    this.getWeather(this.index);
  }

  ngOnInit() {
    this.getCards();
  }

  /**
   * @param data The data to filter for
   * 
   * This function filters all cards for the selected filter criteria
   */
  filterCards(data: any) {
    this.cards = this.allCards;
    let filteredCards = [];
    this.cards.filter(element => {
      if (data.showAttractions && element.attraction) {
        filteredCards.push(element);
      }
      if (
        data.showLakes &&
        element.lake &&
        !filteredCards.includes(element)
      ) {
        filteredCards.push(element);
      }
      if (
        data.showMountains &&
        element.mountain &&
        !filteredCards.includes(element)
      ) {
        filteredCards.push(element);
      }
      if (
        data.showMuseums &&
        element.museum &&
        !filteredCards.includes(element)
      ) {
        filteredCards.push(element);
      }
      if (
        data.showViewpoints &&
        element.viewpoint &&
        !filteredCards.includes(element)
      ) {
        filteredCards.push(element);
      }

      if (data.onlyFree) {
        filteredCards = filteredCards.filter(el => el.priceMax == '0.00');
      } else {
        filteredCards = filteredCards.filter(el => {
          let price = parseInt(el.priceMax);
          return price < data.priceValue;
        });
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

  /**
   * This function parses the time to a better looking format
   */
  generateTime() {
    this.cards.forEach((card, index) => {
      let hoursFrom, minutesFrom, hoursTo, minutesTo, temp;
      let nowHours = new Date().getHours();
      let nowMinutes = new Date().getMinutes();

      temp = card.openingHoursFrom.substr(11);
      temp = temp.substr(0, 5);
      this.cards[index].timeFrom = temp;
      temp = card.openingHoursTo.substr(11);
      temp = temp.substr(0, 5);
      this.cards[index].timeTo = temp;

      hoursFrom = parseInt(this.cards[index].timeFrom.substr(0, 2));
      minutesFrom = parseInt(this.cards[index].timeFrom.substr(3, 4));
      hoursTo = parseInt(this.cards[index].timeTo.substr(0, 2));
      minutesTo = parseInt(this.cards[index].timeTo.substr(3, 4));

      if (hoursTo == '00' && minutesTo == '00') {
        hoursTo = '23';
        minutesTo = '59';
      }

      if (hoursFrom < nowHours && nowHours < hoursTo) {
        this.cards[index].isOpen = true;
      }
      if ((hoursFrom == nowHours)) {
        if (minutesFrom < nowMinutes) {
          this.cards[index].isOpen = true;
        }
      }
      if ((hoursTo == nowHours)) {
        if (nowMinutes < minutesTo) {
          this.cards[index].isOpen = true;
        }
      }
    });
  }

  /**
   * This function makes an asynchronous http get call to our backend to fetch all cards
   */
  async getCards() {
    this.backendService
      .get('cards')
      .then(data => {
        const temp: any = data;
        this.cards = temp;
        this.allCards = this.cards;
        this.generateTime();
        this.loading = false;
      })
      .catch(err => console.log(err));
  }

  /**
   * 
   * @param index The index of the selected day tab
   * 
   * Switches between weather tabs and triggers a new backend call to fetch the new weather data
   */
  public onIndexChange(index: number) {
    this.currentSlide = index;
    this.messageService.onSendCurrentSlide(this.currentSlide);

    this.getWeather(index);
  }

  goToSlideNumber(slide: number) {
    this.index = slide;
    this.onIndexChange(slide);
  }

  getWeekday(currentDay: number, offset: number) {
    return this.days[(currentDay + offset) % 7];
  }

  async getWeather(t: number) {
    this.backendService
      .get('weather')
      .then((data: any) => {
        let i;
        let iconName;

        if (t == 0) {
          i = data.list[0].main.temp;
          iconName = data.list[0].weather[0].main;
        } else if (t == 1) {
          i = data.list[8].main.temp;
          iconName = data.list[8].weather[0].main;
        } else {
          i = data.list[16].main.temp;
          iconName = data.list[16].weather[0].main;
        }
        document.getElementById('temperature').innerHTML = ' ' + i + '°C';
        this.setIcon(iconName);
      })
      .catch();
  }

  setIcon(iconName: string) {
    let iconNameFA;
    if (iconName === "Clear") {
      iconNameFA = "fa-sun";
    } else if (iconName === "Snow") {
      iconNameFA = "fa-snowflake";
    } else if (iconName === "Rain") {
      iconNameFA = "fa-cloud-showers-heavy";
    } else if (iconName === "Clouds") {
      iconNameFA = "fa-cloud";
    } else if (iconName === "Thunderstorm") {
      iconNameFA = "fa-bolt";
    }
    let elem = document.getElementsByClassName("fas")[0];
    if (elem.classList.length > 1) {
      elem.classList.remove(elem.classList[1]);
    }
    document.getElementsByClassName("fas")[0].classList.add(iconNameFA);

    return;
  }
}
