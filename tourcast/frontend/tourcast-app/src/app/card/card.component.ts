import { Component, OnInit, Input } from '@angular/core';
import { Filters } from '../filters.enum';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() cardInfo;
  showDetails = false;
  showAttractions = true;
  showLakes = true;
  showMountains = true;
  showMuseums = true;
  showViewpoints = true;
  isOpen: boolean = false;

  constructor(
    private messageService: MessageService
    ) { }

  onShowDetails() {
    this.messageService.onSendShowDetails({
      cardInfo: this.cardInfo
    });
  }

  onCloseDetails(showDetails: boolean) {
    this.showDetails = showDetails;
  }
}
