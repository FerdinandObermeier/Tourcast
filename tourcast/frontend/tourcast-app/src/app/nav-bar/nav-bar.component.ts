import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  sunny = true;
  cloudy = false;
  showFilter = false;

  constructor() { 
    //this.weatherBalloon();
  }

  ngOnInit() {
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
