import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {

  @Output() onCloseDetails = new EventEmitter<boolean>();
  @Input() cardInfo;
  @Input() timeFrom;
  @Input() timeTo;

  priceTag: any;
  openingTime: any;
  rating: any;

  constructor() { }

  ngOnInit() {
    console.log(this.cardInfo);
    console.log(this.timeFrom);
    console.log(this.timeTo);
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
    console.log(this.rating);
  }

  onClose() {
    this.onCloseDetails.emit(false);
  }

  onOpenLink(link: string) {
    window.open(link);
  }
}
