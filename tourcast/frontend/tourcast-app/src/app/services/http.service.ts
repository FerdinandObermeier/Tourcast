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
    return this.httpClient.get(this.baseUrl + url).toPromise().catch(err => console.log(err));
  }

  public post(url, data) {
    const formData = new FormData();
    console.log(data.name);
    formData.set('name', data.name);
    formData.set('attraction', data.attraction);
    formData.set('lake', data.lake);
    formData.set('mountain', data.mountain);
    formData.set('museum', data.museum);
    formData.set('viewpoint', data.viewpoint);
    formData.set('img', data.img);
    formData.set('crowdedness0', data.crowdedness0);
    formData.set('crowdedness2', data.crowdedness2);
    formData.set('crowdedness4', data.crowdedness4);
    formData.set('crowdedness6', data.crowdedness6);
    formData.set('crowdedness8', data.crowdedness8);
    formData.set('crowdedness10', data.crowdedness10);
    formData.set('crowdedness12', data.crowdedness12);
    formData.set('crowdedness14', data.crowdedness14);
    formData.set('crowdedness16', data.crowdedness16);
    formData.set('crowdedness18', data.crowdedness18);
    formData.set('crowdedness20', data.crowdedness20);
    formData.set('crowdedness22', data.crowdedness22);
    formData.set('rating', data.rating);
    formData.set('priceMin', data.priceMin);
    formData.set('priceMax', data.priceMax);
    formData.set('mapsURL', data.mapsURL);
    formData.set('openingHoursFrom', data.openingHoursFrom);
    formData.set('openingHoursTo', data.openingHoursTo);
    formData.set('description', data.description);
    // formData.set('weather', data.weatherIndex);
    formData.set('weather', '10');
    console.log(formData);
    return this.httpClient.post(this.baseUrl + url, formData).toPromise().catch(err => console.log(err));
  }
}
