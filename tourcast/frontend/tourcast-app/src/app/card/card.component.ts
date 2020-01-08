import { Component, OnInit, Input } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { Filters } from '../filters.enum';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() cardInfo;
  showDetails = false;
  showAttractions = true;
  showLakes = true;
  showMountains = true;
  showMuseums = true;
  showViewpoints = true;
  isOpen: boolean = false;

  constructor(
    private filterService: FilterService,
    private messageService: MessageService
    ) { }

  ngOnInit() {
    this.filterService.filterChange.subscribe(({filterType, value}) => {
      switch (filterType) {
        case Filters.Attractions:
          this.showAttractions = value;
          break;
        case Filters.Lakes:
            this.showLakes = value;
          break;
        case Filters.Mountains:
            this.showMountains = value;
          break;
        case Filters.Museums:
          this.showMuseums = value;
          break;
        case Filters.Viewpoints:
          this.showViewpoints = value;
          break;
        default:
          break;
      }
    });
  }

  onShowDetails() {
    this.messageService.onSendShowDetails({
      cardInfo: this.cardInfo
    });
  }

  onCloseDetails(showDetails: boolean) {
    this.showDetails = showDetails;
  }
}
