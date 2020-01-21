import { Component, Input } from '@angular/core';
import { MessageService } from '../services/message.service';

/**
 * @ignore
 */
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  /**
   * cardInfo contains relevant information about the respective card
   */
  @Input() cardInfo;
  /**
   * If true, the detail-view will be shown
   */
  showDetails = false;
  /**
   * Frontend variables
   */
  showAttractions = true;
  showLakes = true;
  showMountains = true;
  showMuseums = true;
  showViewpoints = true;
  isOpen = false;

  constructor(
    private messageService: MessageService
    ) { }


  /**
   * 
   * This method sends the card info to the detail-view
   */
  onShowDetails() {
    this.messageService.onSendShowDetails({
      cardInfo: this.cardInfo
    });
  }

  onCloseDetails(showDetails: boolean) {
    this.showDetails = showDetails;
  }
}
