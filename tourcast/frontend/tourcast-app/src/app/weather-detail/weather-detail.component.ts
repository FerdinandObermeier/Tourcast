import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit {

  @Input() weatherData;

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 50, 52, 56, 55, 40] },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: "test",
    layout: {
      padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20
      }
  }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#a64d79',
      backgroundColor: '#eddbe4',
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() {
  }

  ngOnInit() {
    console.log(this.weatherData);

    let chartData = [];
    let chartLabels = [];
    for(let i = 0; i < 8; i++) {
      chartData.push(this.weatherData.list[i].main.temp);
      chartLabels.push(this.weatherData.list[i].dt_txt.substring(11, 16));
    }
    this.lineChartData[0].data = chartData;
    this.lineChartLabels = chartLabels;
  }

}
