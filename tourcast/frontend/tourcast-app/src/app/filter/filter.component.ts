import { Component, OnInit } from '@angular/core';
import { Filters } from '../filters.enum';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  showAttractions = false;
  showLakes = false;
  showMountains = false;
  showMuseums = false;
  showViewpoints = false;
  priceValue = 100;
  onlyFree = false;
  showOpened = true;
  showClosed = true;
  subscription: Subscription;

  constructor(
    private messageService: MessageService
  ) {
    this.subscription = this.messageService.getHideFilter().subscribe( data => {
      if (data) {
        if (data.showAttractions && data.showLakes && data.showMountains && data.showMuseums && data.showViewpoints) {
          this.showAttractions = false;
          this.showLakes = false;
          this.showMountains = false;
          this.showMuseums = false;
          this.showViewpoints = false;
        } else {
          this.showAttractions = data.showAttractions;
          this.showLakes = data.showLakes;
          this.showMountains = data.showMountains;
          this.showMuseums = data.showMuseums;
          this.showViewpoints = data.showViewpoints;
        }
        this.priceValue = data.priceValue;
        this.onlyFree = data.onlyFree;
        this.showOpened = data.showOpened;
        this.showClosed = data.showClosed;
      }
    })
  }


  onHideFilter() {
    this.messageService.onSendHideFilter();
  }

  onFilter() {
        if (!this.showAttractions && !this.showLakes && !this.showMountains && !this.showMuseums && !this.showViewpoints) {
          this.showAttractions = true;
          this.showLakes = true;
          this.showMountains = true;
          this.showMuseums = true;
          this.showViewpoints = true;
        }
        let data = {
          showAttractions: this.showAttractions,
          showLakes: this.showLakes,
          showMountains: this.showMountains,
          showMuseums: this.showMuseums,
          showViewpoints: this.showViewpoints,
          priceValue: this.priceValue,
          onlyFree: this.onlyFree,
          showClosed: this.showClosed,
          showOpened: this.showOpened,
        };
        this.messageService.onSendHideFilter(data);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
