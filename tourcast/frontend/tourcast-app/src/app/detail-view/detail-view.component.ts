import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {

  @Output() onCloseDetails = new EventEmitter<boolean>();
  @Input() cardInfo;

  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.onCloseDetails.emit(false);
  }

  onOpenLink(link: string) {
    window.open(link);
  }
}
