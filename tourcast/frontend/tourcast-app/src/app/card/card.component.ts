import { Component, OnInit, Input } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { Filters } from '../filters.enum';
import { BackendService } from '../services/http.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() cardInfo;
  subtitle: string; // should be generated from the above

  generateSubtitle() {
    this.subtitle = '';
    this.cardInfo.touched = false;
    if (this.cardInfo.attraction) {
      this.subtitle += 'Attraction';
      this.cardInfo.touched = true;
    }
    if (this.cardInfo.lake) {
      if (this.cardInfo.touched) {
          this.subtitle += 'Lake';
        } else {
          this.subtitle += ' Lake';
          this.cardInfo.touched = true;
        }
    }
    if (this.cardInfo.mountain) {
      if (this.cardInfo.touched) {
        this.subtitle += 'Mountain';
      } else {
        this.subtitle += ' Mountain';
        this.cardInfo.touched = true;
      }
    }
    if (this.cardInfo.museum) {
      this.subtitle += 'Museum';
    } else {
      this.subtitle += ' Museum';
      this.cardInfo.touched = true;
    }
    if (this.cardInfo.viewpoint) {
      this.subtitle += 'Viewpoint';
    } else {
      this.subtitle += ' Viewpoint';
      this.cardInfo.touched = true;
    }
    console.log(this.subtitle);
  }
  
  
  showDetails: boolean = false;
  
  constructor(
    private filterService: FilterService,
    private backendService: BackendService
    ) { }

    showAttractions = true;
    showLakes = true;
    showMountains = true;
    showMuseums = true;
    showViewpoints = true;
    
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
  
  
  onCloseDetails(showDetails: boolean) {
    this.showDetails = showDetails;
  }
}
