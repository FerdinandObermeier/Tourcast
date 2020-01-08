import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { Filters } from '../filters.enum';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  showAttractions = false;
  showLakes = false;
  showMountains = false;
  showMuseums = false;
  showViewpoints = false;
  priceValue = 100;
  onlyFree = false;
  showOpened = true;
  showClosed = true;

  constructor(
    private filterService: FilterService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    // this.filterService.filterChange.subscribe(({filterType, value}) => {
    //   switch (filterType) {
    //     case Filters.Attractions:
    //       this.showAttractions = value;
    //       break;
    //     case Filters.Lakes:
    //         this.showLakes = value;
    //       break;
    //     case Filters.Mountains:
    //         this.showMountains = value;
    //       break;
    //     case Filters.Museums:
    //       this.showMuseums = value;
    //       break;
    //     case Filters.Viewpoints:
    //       this.showViewpoints = value;
    //       break;
    //     default:
    //       break;
    //   }
    // });
    // this.filterService.getCurrentFilters();
  }

  toggleFilter(filterType: Filters) {
    this.filterService.toggle(filterType);
  }

  onHideFilter() {
    this.messageService.onSendHideFilter();
  }

  onFilter() {
    //if any value has been changed, create filter data
    if (this.showAttractions !== false ||
      this.showLakes !== false ||
      this.showMountains !== false ||
      this.showMuseums !== false ||
      this.showViewpoints !== false ||
      this.showClosed !== true ||
      this.showOpened !== true ||
      this.onlyFree !== false ||
      this.priceValue !== 100) {
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
    } else {
      this.messageService.onSendHideFilter();
    }
  }
}
