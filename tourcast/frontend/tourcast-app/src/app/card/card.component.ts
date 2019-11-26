import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  showDetails: boolean = false;

  constructor() { }

  local_activity:boolean=true;
  directions_boat:boolean=false;
  landscape:boolean=false;
  museum:boolean=false;
  panorama:boolean=false;

  ngOnInit() {
  }

  onCloseDetails(showDetails: boolean) {
    this.showDetails = showDetails;
  }
}
