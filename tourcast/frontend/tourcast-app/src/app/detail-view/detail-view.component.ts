import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {

  showDetails = false;
  cardInfo;
  timeFrom;
  timeTo;

  priceTag: any;
  openingTime: any;
  rating: any;

  constructor(private messageService: MessageService) {
    this.messageService.getShowDetails().subscribe((data: any) => {
      this.cardInfo = data.cardInfo;
      this. timeFrom = data.timeFrom;
      this.timeTo = data.timeTo;
      this.onCalculateInformation();
      this.showDetails = true;
    });
  }

  ngOnInit() {
  }

  onCalculateInformation() {
    if (this.cardInfo.priceMax == '0.00') {
      this.priceTag = 'Free Entrance';
    } else {
      this.priceTag = this.cardInfo.priceMin.split('.') + ' - ' + this.cardInfo.priceMax.split('.') + ' €';
    }
    if (this.timeFrom == '00:00' && this.timeTo == '23:59') {
      this.openingTime = 'All Day';
    } else {
      this.openingTime = this.timeFrom + ' - ' + this.timeTo;
    }
    this.rating = +this.cardInfo.rating.slice(0,1);
  }

  onClose() {
    this.showDetails = false;
  }

  onOpenLink(link: string) {
    window.open(link);
  }
}
