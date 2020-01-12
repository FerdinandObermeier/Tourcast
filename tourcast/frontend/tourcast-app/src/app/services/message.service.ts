import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private showDetails = new Subject();

  private hideFilter = new BehaviorSubject(null);

  private currentSlide = new BehaviorSubject(0);

  constructor() { }

  onSendShowDetails(data) {
    this.showDetails.next(data);
  }

  getShowDetails() {
     return this.showDetails.asObservable();
  }


  onSendHideFilter(data?) {
    this.hideFilter.next(data);
  }

  getHideFilter() {
    return this.hideFilter.asObservable();
  }


  onSendCurrentSlide(index: number) {
    this.currentSlide.next(index);
  }

  getCurrentSlide() {
    return this.currentSlide.asObservable();
  }
}
