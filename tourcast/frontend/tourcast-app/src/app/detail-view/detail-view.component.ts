import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';
import { BackendService } from '../services/http.service';

/**
 * @ignore
 */
@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent {

  showDetails = false;
  closeDetail = false;
  cardInfo;
  priceTag: any;
  openingTime: any;
  rating: any;
  currentTime;
  numberOfVisitors = 1;
  alreadyVoted = false;

  constructor(private messageService: MessageService, private backendService: BackendService) {
    this.messageService.getShowDetails().subscribe((data: any) => {
      this.cardInfo = data.cardInfo;
      this.onCalculateInformation();
      this.showDetails = true;
      this.closeDetail = false;
      this.numberOfVisitors = parseInt(this.cardInfo.crowdedness0) + parseInt(this.cardInfo.crowdedness2) + parseInt(this.cardInfo.crowdedness4) + parseInt(this.cardInfo.crowdedness6)
      + parseInt(this.cardInfo.crowdedness8) + parseInt(this.cardInfo.crowdedness10) + parseInt(this.cardInfo.crowdedness12) + parseInt(this.cardInfo.crowdedness14) + parseInt(this.cardInfo.crowdedness16)
      + parseInt(this.cardInfo.crowdedness18) + parseInt(this.cardInfo.crowdedness20) + parseInt(this.cardInfo.crowdedness22);
     this.numberOfVisitors = this.numberOfVisitors !== 0 ? this.numberOfVisitors : 1;
    });

    this.currentTime = new Date().getHours();
  }

  /**
   * Parses card information into priceTag, openingTime and rating
   */
  onCalculateInformation() {
    if (this.cardInfo.priceMax == '0.00') {
      this.priceTag = 'Free Entrance';
    } else {
      this.priceTag = this.cardInfo.priceMin.split('.') + ' - ' + this.cardInfo.priceMax.split('.') + ' €';
    }
    if (this.cardInfo.timeFrom == '00:00' && this.cardInfo.timeTo == '23:59') {
      this.openingTime = 'All Day';
    } else {
      this.openingTime = this.cardInfo.timeFrom + ' - ' + this.cardInfo.timeTo;
    }
    this.rating = +this.cardInfo.rating.slice(0,1);
  }

  onClose() {
    this.closeDetail = true;
    setTimeout(() => this.showDetails = true, 200);
  }

  onGoThere() {
    if (this.alreadyVoted) {
      return;
    } else {
      this.alreadyVoted = true;
      let key;
      let value;
      if (this.currentTime >= 0 && this.currentTime < 2) {
        this.cardInfo.crowdedness0++;
        key = 'crowdedness0';
        value = this.cardInfo.crowdedness0;
      }
      if (this.currentTime >= 2 && this.currentTime < 4) {
        this.cardInfo.crowdedness2++;
        key = 'crowdedness2';
        value = this.cardInfo.crowdedness2;
      }
      if (this.currentTime >= 4 && this.currentTime < 6) {
        this.cardInfo.crowdedness4++;
        key = 'crowdedness4';
        value = this.cardInfo.crowdedness4;
      }
      if (this.currentTime >= 6 && this.currentTime < 8) {
        this.cardInfo.crowdedness6++;
        key = 'crowdedness6';
        value = this.cardInfo.crowdedness6;
      }
      if (this.currentTime >= 8 && this.currentTime < 10) {
        this.cardInfo.crowdedness8++;
        key = 'crowdedness8';
        value = this.cardInfo.crowdedness8;
      }
      if (this.currentTime >= 10 && this.currentTime < 12) {
        this.cardInfo.crowdedness10++;
        key = 'crowdedness10';
        value = this.cardInfo.crowdedness10;
      }
      if (this.currentTime >= 12 && this.currentTime < 14) {
        this.cardInfo.crowdedness12++;
        key = 'crowdedness12';
        value = this.cardInfo.crowdedness12;
      }
      if (this.currentTime >= 14 && this.currentTime < 16) {
        this.cardInfo.crowdedness14++;
        key = 'crowdedness14';
        value = this.cardInfo.crowdedness14;
      }
      if (this.currentTime >= 16 && this.currentTime < 18) {
        this.cardInfo.crowdedness16++;
        key = 'crowdedness16';
        value = this.cardInfo.crowdedness16;
      }
      if (this.currentTime >= 18 && this.currentTime < 20) {
        this.cardInfo.crowdedness18++;
        key = 'crowdedness18';
        value = this.cardInfo.crowdedness18;
      }
      if (this.currentTime >= 20 && this.currentTime < 22) {
        this.cardInfo.crowdedness20++;
        key = 'crowdedness20';
        value = this.cardInfo.crowdedness20;
      }
      if (this.currentTime >= 22 && this.currentTime < 24) {
        this.cardInfo.crowdedness22++;
        key = 'crowdedness22';
        value = this.cardInfo.crowdedness22;
      }
      this.backendService.post('cards/', this.cardInfo.id, key, value);
    }
  }

  onOpenLink(link: string) {
    window.open(link);
  }
}
