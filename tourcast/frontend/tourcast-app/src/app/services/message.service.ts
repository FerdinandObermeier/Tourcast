import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private showDetails = new Subject();

  private hideFilter = new Subject();

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
