import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-revenue-statistic',
  templateUrl: './revenue-statistic.component.html',
  styleUrls: ['./revenue-statistic.component.css']
})
export class RevenueStatisticComponent implements OnInit {

  myDate = undefined;
  isOpen = false;


  public data: Array<any> =[45, 37, 60, 34, 46, 45, 65, 45, 60, 45, 32, 65];


  constructor() { }

  ngOnInit() {
  }
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Năm 2009', 'Năm 2010', 'Năm 2011', 'Năm 2012', 'Năm 2013', 'Năm 2014', 'Năm 2015', 'Năm 2016', 'Năm 2017', 'Năm 2018', 'Năm 2019', 'Năm 2020'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: this.data, label: 'BIỂU ĐỒ THỐNG KÊ DOANH THU HẰNG NĂM (Tỷ)' }
  ];
  barChartColors: Color[] = [
    { backgroundColor: 'rgb(220,20,60)' }
  ]
}
