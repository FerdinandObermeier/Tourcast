import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { BackendService } from '../services/http.service';




@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  sunny = true;
  cloudy = false;
  showFilter = false;
  showWeatherDetail = false;
  weatherData;

  constructor(private messageService: MessageService, private backendService: BackendService) {
    this.messageService.getHideFilter().subscribe(() => this.showFilter = false);
    this.getWeather();
    //this.weatherBalloon();
  }

  ngOnInit() {
  }

  async getWeather() {
    this.backendService.get('weather').then(data => this.weatherData = data);
  }

  /*weatherBalloon() {
    var key = '{yourkey}';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + 'Munich,de'+ '&appid=' + 'af1875e8d01249f1e639f3e308a0a892'+'&units=metric')
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);

      var act=data.main.temp;
      document.getElementById('temperature').innerHTML=' '+act + '°C';
    })
    .catch(function() {
      // catch any errors
    });
  }*/

}
