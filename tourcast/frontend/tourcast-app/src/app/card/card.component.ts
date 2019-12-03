import { Component, OnInit, Input } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { Filters } from '../filters.enum';


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
  scrollOffsetTop: number = 0;
  subtitle: string; // should be generated from the below

  constructor(
    private filterService: FilterService
    ) { }

  ngOnInit() {
    this.generateSubtitle();
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


  generateSubtitle() {
    this.subtitle = '';
    if (this.cardInfo.attraction) {
      this.subtitle += 'Attraction';
    }
    if (this.cardInfo.lake) {
      this.subtitle.length === 0 ? this.subtitle += 'Lake' : this.subtitle += ', Lake';
    }
    if (this.cardInfo.mountain) {
      this.subtitle.length === 0 ? this.subtitle += 'Mountain' : this.subtitle += ', Mountain';
    }
    if (this.cardInfo.museum) {
      this.subtitle.length === 0 ? this.subtitle += 'Museum' : this.subtitle += ', Museum';
    }
    if (this.cardInfo.viewpoint) {
      this.subtitle.length === 0 ? this.subtitle += 'Viewpoint' : this.subtitle += ', Viewpoint';
    }
  }


  onCloseDetails(showDetails: boolean) {
    this.showDetails = showDetails;
  }

  onShowDetail() {
    this.showDetails = true;
    let doc = document.documentElement;
    this.scrollOffsetTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    console.log(this.scrollOffsetTop);
  }
}
