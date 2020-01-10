import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private showDetails = new Subject();

  private hideFilter = new BehaviorSubject(null);

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
}
