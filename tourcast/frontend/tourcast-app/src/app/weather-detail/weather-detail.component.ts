import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, Chart } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { MessageService } from '../services/message.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
    },
    plugins: {
      datalabels: {
        align: 'top',
        labels: {
          title: {
            font: {
              weight: "bold"
            }
          }
        }
      }
    },
    animation: {
      // onComplete: function() {
      //   var chartInstance = this.chart, ctx = chartInstance.ctx;
      //       ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
      //       ctx.textAlign = 'center';
      //       ctx.textBaseline = 'bottom';
      //       ctx.fillStyle = 'rgb(84, 84, 84)';
      //       ctx.fontWeight = 'bold';

      //       this.data.datasets.forEach(function (dataset, i) {
      //           var meta = chartInstance.controller.getDatasetMeta(i);
      //           meta.data.forEach(function (bar, index) {
      //               var data = dataset.data[index];
      //               ctx.fillText(data, bar._model.x, bar._model.y - 5);
      //           });
      //       });
      // }
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
  public lineChartPlugins = [ChartDataLabels];


  currentSlide = 0;
  icons = [];

  constructor(private messageService: MessageService) {
    this.messageService.getCurrentSlide().subscribe(index => this.currentSlide = index);
  }

  ngOnInit() {
    this.setChartData();
    
  }

  setChartData() {
    const weatherDataArrayCounter = this.currentSlide === 0 ? 8 : this.currentSlide === 1 ? 16 : 24;

    const chartData = [];
    const chartLabels = [];
    for (let i = weatherDataArrayCounter - 8; i < weatherDataArrayCounter; i++) {
      chartData.push(this.weatherData.list[i].main.temp);
      chartLabels.push(this.weatherData.list[i].dt_txt.substring(11, 16));
      this.icons.push(this.getIcon(this.weatherData.list[i].weather[0].main));
    }
    this.lineChartData[0].data = chartData;
    this.lineChartLabels = chartLabels;
  }

  getIcon(iconName: string) {
    if (iconName === 'Clear') {
      return 'fa-sun';
    } else if (iconName === 'Snow') {
      return 'fa-snowflake';
    } else if (iconName === 'Rain') {
      return 'fa-cloud-showers-heavy';
    } else if (iconName === 'Clouds') {
      return 'fa-cloud';
    } else if (iconName === 'Thunderstorm') {
      return 'fa-bolt';
    }
  }
}
