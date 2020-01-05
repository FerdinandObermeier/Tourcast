import { Component, OnInit, Input } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { Filters } from '../filters.enum';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() cardInfo;
  showDetails = false;
  showAttractions = true;
  showLakes = true;
  showMountains = true;
  showMuseums = true;
  showViewpoints = true;
  subtitle: string; // should be generated from the below
  timeFrom: string;
  timeTo: string;
  isOpen: boolean = false;

  constructor(
    private filterService: FilterService,
    private messageService: MessageService
    ) { }

  ngOnInit() {
    this.generateSubtitle();
    this.generateTime();
    this.filterService.filterChange.subscribe(({filterType, value}) => {
      switch (filterType) {
        case Filters.Attractions:
          this.showAttractions = value;
          break;
        case Filters.Lakes:
            this.showLakes = value;
          break;
        case Filters.Mountains:
            this.showMountains = value;
          break;
        case Filters.Museums:
          this.showMuseums = value;
          break;
        case Filters.Viewpoints:
          this.showViewpoints = value;
          break;
        default:
          break;
      }
    });
  }


  generateSubtitle() {
    this.subtitle = '';
    if (this.cardInfo.attraction) {
      this.subtitle += 'Attraction';
    }
    if (this.cardInfo.lake) {
      this.subtitle.length === 0 ? this.subtitle += 'Lake' : this.subtitle += ', Lake';
    }
    if (this.cardInfo.mountain) {
      this.subtitle.length === 0 ? this.subtitle += 'Mountain' : this.subtitle += ', Mountain';
    }
    if (this.cardInfo.museum) {
      this.subtitle.length === 0 ? this.subtitle += 'Museum' : this.subtitle += ', Museum';
    }
    if (this.cardInfo.viewpoint) {
      this.subtitle.length === 0 ? this.subtitle += 'Viewpoint' : this.subtitle += ', Viewpoint';
    }
  }

  onShowDetails() {
    this.messageService.onSendShowDetails({
      cardInfo: this.cardInfo,
      timeFrom: this.timeFrom,
      timeTo: this.timeTo
    });
  }

  onCloseDetails(showDetails: boolean) {
    this.showDetails = showDetails;
  }

  generateTime() {
    let hoursFrom, minutesFrom, hoursTo, minutesTo, temp;
    let nowHours = new Date().getHours();
    let nowMinutes = new Date().getMinutes();

    temp = this.cardInfo.openingHoursFrom.substr(11);
    temp = temp.substr(0,5);
    this.timeFrom = temp;
    temp = this.cardInfo.openingHoursTo.substr(11);
    temp = temp.substr(0,5);
    this.timeTo = temp;

    hoursFrom = parseInt(this.timeFrom.substr(0,2));
    minutesFrom = parseInt(this.timeFrom.substr(3,4));
    hoursTo = parseInt(this.timeTo.substr(0,2));
    minutesTo = parseInt(this.timeTo.substr(3,4));

    // console.log(hoursTo);
    // console.log(hoursFrom);
    // console.log(nowHours);

    if (hoursFrom < nowHours) {
      if (nowHours < hoursTo) {
        if (minutesFrom < nowMinutes) {
          if (nowMinutes < minutesTo) {
            this.isOpen = true;
          }
        }
      }
    }
  }
}
