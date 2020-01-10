import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
export class BackendService {
    constructor(private httpClient: HttpClient) {
     }

    baseUrl = 'https://tourcast-backend.herokuapp.com/';

  public get(url) {
    return this.httpClient.get(this.baseUrl + url).toPromise();
  }
}
