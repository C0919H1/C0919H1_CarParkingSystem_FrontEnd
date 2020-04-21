import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { RevenueService } from '../../../../services/revenue.service'
declare var $: any;

@Component({
  selector: 'app-revenue-statistic',
  templateUrl: './revenue-statistic.component.html',
  styleUrls: ['./revenue-statistic.component.css']
})
export class RevenueStatisticComponent implements OnInit {

  myDate = undefined;
  isOpen = false;


  public dataChart =[];
  public nameData = [];

  constructor(
    public formBuilder: FormBuilder,
    public revenueService: RevenueService
  ) { }

  ngOnInit() {

    // $(".datepickerFrom").datepicker({
    //   format: "yyyy",
    //   viewMode: "years",
    //   minViewMode: "years" 
    // });
    // $(".datepickerTo").datepicker({
    //   format: "yyyy",
    //   viewMode: "years",
    //   minViewMode: "years"
    // });
    this.getRevenueAll();

  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = this.nameData;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = []; 

  barChartData: ChartDataSets[] = [
    { data: this.dataChart, label: 'BIỂU ĐỒ THỐNG KÊ DOANH THU HẰNG NĂM (Triệu)' }
  ];
  barChartColors: Color[] = [
    { backgroundColor: 'rgb(220,20,60)' }
  ]
  getRevenueAll() { 
    this.revenueService.getRevenueAll().subscribe(
      data => {
        for(let element=0;element<data.length;element++) {
          this.dataChart.push(data[element][1]);
          this.nameData.push(data[element][0]);
          
        };
        console.log(this.dataChart)

      }
    )
  }
}
