import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
export class BackendService {
    constructor(private httpClient: HttpClient) {
     }

    baseUrl = 'https://tourcast-backend.herokuapp.com/';
    cardsUrl = 'cards';
    url = 'https://jsonplaceholder.typicode.com';

    cards: any;

  public getCards() {
    return this.httpClient.get(this.baseUrl + this.cardsUrl);
  }

}