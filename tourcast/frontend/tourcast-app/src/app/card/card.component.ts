import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { Filters } from '../filters.enum';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  showDetails: boolean = false;

  constructor(
    private filterService: FilterService
  ) { }

  // local_activity:boolean=true;
  // directions_boat:boolean=false;
  // landscape:boolean=false;
  // museum:boolean=false;
  // panorama:boolean=false;

  showAttractions = true;
  showLakes = true;
  showMountains = true;
  showMuseums = true;
  showViewpoints = true;

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

  onCloseDetails(showDetails: boolean) {
    this.showDetails = showDetails;
  }
}
