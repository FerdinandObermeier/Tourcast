import { Injectable, Output, EventEmitter } from '@angular/core';
import { Filters } from './../filters.enum';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  showAttractions: boolean;
  showLakes: boolean;
  showMountains: boolean;
  showMuseums: boolean;
  showViewpoints: boolean;

  constructor(){
    this.showAttractions = true;
    this.showLakes = true;
    this.showMountains = true;
    this.showMuseums = true;
    this.showViewpoints = true;
  }

  @Output() filterChange: EventEmitter<{ filterType: Filters, value: boolean}> = new EventEmitter();

  getCurrentFilters() {
    this.filterChange.emit({filterType: Filters.Attractions, value: this.showAttractions});
    this.filterChange.emit({filterType: Filters.Lakes, value: this.showLakes});
    this.filterChange.emit({filterType: Filters.Mountains, value: this.showMountains});
    this.filterChange.emit({filterType: Filters.Museums, value: this.showMuseums});
    this.filterChange.emit({filterType: Filters.Viewpoints, value: this.showViewpoints});
  }

  toggle(filterType: Filters) {
    switch (filterType) {
      case Filters.Attractions:
        this.showAttractions = !this.showAttractions;
        this.filterChange.emit({filterType: Filters.Attractions, value: this.showAttractions});
        break;
      case Filters.Lakes:
        this.showLakes = !this.showLakes;
        this.filterChange.emit({filterType: Filters.Lakes, value: this.showLakes});
        break;
      case Filters.Mountains:
        this.showMountains = !this.showMountains;
        this.filterChange.emit({filterType: Filters.Mountains, value: this.showMountains});
        break;
      case Filters.Museums:
        this.showMuseums = !this.showMuseums;
        this.filterChange.emit({filterType: Filters.Museums, value: this.showMuseums});
        break;
      case Filters.Viewpoints:
        this.showViewpoints = !this.showViewpoints;
        this.filterChange.emit({filterType: Filters.Viewpoints, value: this.showViewpoints});
        break;  
      default:
        break;
    }
  }
 
}
