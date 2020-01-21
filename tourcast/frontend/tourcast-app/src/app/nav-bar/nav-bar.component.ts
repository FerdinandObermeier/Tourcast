import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';
import { BackendService } from '../services/http.service';

/**
 * @ignore
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  sunny = true;
  cloudy = false;
  showFilter = false;
  showWeatherDetail = false;
  weatherData;

  constructor(private messageService: MessageService, private backendService: BackendService) {
    this.messageService.getHideFilter().subscribe(() => this.showFilter = false);
    this.getWeather();
  }

  async getWeather() {
    this.backendService.get('weather').then(data => this.weatherData = data);
  }

  async onToggleWeatherDetail() {
    if (!this.showWeatherDetail) {
      await this.getWeather();
    }
    this.showWeatherDetail = !this.showWeatherDetail;
  }
}
