import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private showDetails = new Subject();

  constructor() { }

  onSendShowDetails(data) {
    this.showDetails.next(data);
  }

  getShowDetails() {
     return this.showDetails.asObservable();
  }
}
