import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { MatDatepicker } from '@angular/material/datepicker';
import { TrackingService } from 'src/app/services/tracking.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrackingInfo } from '../../../../auth/tracking-info';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-car-statistic-days',
  templateUrl: './car-statistic-days.component.html',
  styleUrls: ['./car-statistic-days.component.css']
})
export class CarStatisticDaysComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{ ticks: { beginAtZero: true } }] },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public timeIn2: Date;
  public tempTimeIn: String = "";
  public timeOut2: Date;
  public tempTimeOut: String = "";
  private formTracking: FormGroup;
  private disabled = true;
  trackingInfo: TrackingInfo;
  submitted: boolean = false;
  listCarIn: any = [];
  listCarOut: any = [];
  public maxElement: any;
  public maxBar: number;
  public maxDate = new Date();
  public minDate2;

  listError: any = "";


  public barChartData: ChartDataSets[] = [
    { data: this.listCarIn, label: 'Xe Vào' },
    { data: this.listCarOut, label: 'Xe Ra' }
  ];

  constructor(
    private trackingService: TrackingService,
    public formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.formTracking = this.formBuilder.group({
      // timeIn : new FormControl({value:new Date(),disabled: this.disabled }),
      // timeOut : new FormControl({value:new Date(),disabled: this.disabled }),
      timeIn: ['', Validators.required],
      timeOut: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;
    this.trackingInfo = new TrackingInfo(this.timeIn.value, this.timeOut.value);
  }

  getTrackingTime() {
    this.getTrackingTimeIn();

    this.getTrackingTimeOut();
    let starDay = this.timeIn2.getDate();
    let endDay = this.timeOut2.getDate();
    for (let i = starDay; i <= endDay; i++) {
      if ((endDay - starDay) >= 7) {
        this.listError = "Không thể thống kê quá 7 ngày/tháng !!!";
        break;
      } else {

        this.barChartLabels.push("" + (this.timeIn2.getMonth() + 1) + "/" + i);
      }
    }
    // this.maxElement = this.listCarIn[1];
    // console.log(this.maxElement);
    // this.barChartData.push({data:this.listCarIn, label: 'Xe Vào'});
    // this.barChartData.push({data:this.listCarOut, label: 'Xe Ra'});

  }

  getTrackingTimeIn() {
    alert("Bạn chỉ nên nhập vào 7 ngày trong một tháng");
    this.timeIn2 = new Date(this.formTracking.value.timeIn);
    this.timeOut2 = new Date(this.formTracking.value.timeOut);
    this.tempTimeIn = (this.timeIn2.getMonth() + 1) + "-" + this.timeIn2.getDate() + "-" + this.timeIn2.getFullYear();
    this.tempTimeOut = (this.timeOut2.getMonth() + 1) + "-" + this.timeOut2.getDate() + "-" + this.timeOut2.getFullYear();
    this.trackingService.getTrackingTimeIn(this.tempTimeIn, this.tempTimeOut).subscribe(

      data => {
        data.forEach(element => {
          this.listCarIn.push(element);
        });
        this.maxElement = this.listCarIn[0];
        for (let i = 1; i <= this.listCarIn.length; i++) {
          if (this.listCarIn[i] > this.maxElement) {
            this.maxElement = this.listCarIn[i];
          }
        }
        console.log(this.maxElement);
        this.maxBar = this.maxElement + 2;
      },
      error => {
        console.log("Error ", error);
      }
    )
  }

  getTrackingTimeOut() {
    this.timeIn2 = new Date(this.formTracking.value.timeIn);
    this.timeOut2 = new Date(this.formTracking.value.timeOut);
    this.tempTimeIn = (this.timeIn2.getMonth() + 1) + "-" + this.timeIn2.getDate() + "-" + this.timeIn2.getFullYear();
    this.tempTimeOut = (this.timeOut2.getMonth() + 1) + "-" + this.timeOut2.getDate() + "-" + this.timeOut2.getFullYear();
    this.trackingService.getTrackingTimeOut(this.tempTimeIn, this.tempTimeOut).subscribe(

      data => {
        data.forEach(element => {
          this.listCarOut.push(element);
        });
        console.log(this.listCarOut)
      },
      error => {
        console.log("Error ", error);
      }
    )
  }

  get timeIn() {
    return this.formTracking.get('timeIn');
  }
  get timeOut() {
    return this.formTracking.get('timeIn');
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.minDate2 = event.value;
  }

}
