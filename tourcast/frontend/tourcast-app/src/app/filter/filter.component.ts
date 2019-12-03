import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { Filters } from '../filters.enum';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  showAttractions = true;
  showLakes = true;
  showMountains = true;
  showMuseums = true;
  showViewpoints = true;

  constructor(
    private filterService: FilterService 
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
    this.filterService.getCurrentFilters();
  }

  toggleFilter(filterType: Filters) {
    this.filterService.toggle(filterType);
  }

}
