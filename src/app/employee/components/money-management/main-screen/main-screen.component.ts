import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  public chartLegend = true;
  public chartLabels = ['Honda', 'Toyota', 'Mercedes', 'Mazda','Ford'];
  public chartData = [120, 150, 180, 90, 40];
  public chartType = 'doughnut';
  public chartColors: any[] = [{ backgroundColor:["#44FF07", "#FED60A", "#FB0007", "#3700FF","#FB13F3","#7CDDDD"] }];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
  };
  public pieChartPlugins = [{
    afterLayout: function (chart) {
      chart.legend.legendItems.forEach(
        (label) => {
          let value = chart.data.datasets[0].data[label.index];

          label.text += ' ' + value;
          return label;
        }
      )
    }
  }];
  ngOnInit() {}

}
