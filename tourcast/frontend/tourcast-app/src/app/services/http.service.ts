import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
export class BackendService {
    constructor(private httpClient: HttpClient) {
     }

    // baseUrl = 'https://tourcast-backend.herokuapp.com/';
    baseUrl = 'http://localhost:8000/';

  public get(url) {
    return this.httpClient.get(this.baseUrl + url).toPromise().catch(err => console.log(err));
  }

  public patch(url, id, key, value) {
    const formData = new FormData();
    formData.set(key, value);
    return this.httpClient.patch(this.baseUrl + url + id + '/', formData).toPromise().catch(err => console.log(err));
  }
}
