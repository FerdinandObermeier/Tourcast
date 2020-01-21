import { Component, OnDestroy } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs';

/**
 * @ignore
 */
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnDestroy {

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
  hideFilter = false;

  constructor(private messageService: MessageService) {
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
    });
  }


  /**
   * Sets a css class via ngStyle (compare HTML) and sends a message to hide the filter
   */
  onHideFilter() {
    this.hideFilter = true;
    setTimeout(() => this.messageService.onSendHideFilter(), 400);
  }

  /**
   * Sets the chosen filter values and sends the data to filter the shown attractions
   */
  onFilter() {
        if (!this.showAttractions && !this.showLakes && !this.showMountains && !this.showMuseums && !this.showViewpoints) {
          this.showAttractions = true;
          this.showLakes = true;
          this.showMountains = true;
          this.showMuseums = true;
          this.showViewpoints = true;
        }
        const data = {
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

  /**
   * Unsubscribes from services to avoid data leaks
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
