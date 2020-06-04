import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VehiclePickComponent } from '../vehicle-pick/vehicle-pick.component'
import { TrackingService } from 'src/app/services/tracking.service'
import { TrackingTime } from 'src/app/models/trackingTime'

@Component({
  selector: 'app-vehicle-in-out',
  templateUrl: './vehicle-in-out.component.html',
  styleUrls: ['./vehicle-in-out.component.css']
})

export class VehicleInOutComponent implements OnInit {
  private convertDate;
  private timeIn = " ";
  private dayIn = " ";
  private timeOut = " ";
  private dayOut = " ";
  private formTicketDetail: FormGroup;
  private disabled = true;
  private filterValue;
  private date1 = new Date();
  private licensePlateIn = " ";
  private licensePlateOut = " ";
  trackingTime = new TrackingTime("","");
  date = new FormControl(new Date());

  constructor(
    private trackingService: TrackingService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit() {
    this.formTicketDetail = this.formBuilder.group({
      fullName: new FormControl ({value:'',disabled: this.disabled}),
      email: new FormControl ({value:'',disabled: this.disabled}),
      typeVehicle: new FormControl ({value:'',disabled: this.disabled}),
      idVehicle: new FormControl ({value:'',disabled: this.disabled}),
      ticketType: new FormControl({value:'',disabled: this.disabled}),
      nameOfPosition: new FormControl({value:'',disabled: this.disabled}),
      nameFloor: new FormControl({value:'',disabled: this.disabled}),
      startDate: new FormControl({value:'',disabled: this.disabled}),
      endDate: new FormControl({value:'',disabled: this.disabled}),
    });
  }


  applyFilter(filterValue: string) {
    this.filterValue = filterValue.trim();
    console.log(this.filterValue)
  }

  getTrackingTime(licensePlate){
    this.trackingService.getTrackingTime(licensePlate).subscribe(
      data => {
        console.log(data)
        this.date1 = new Date();
        this.dayIn = data.timeIn.slice(0 , 10);
        this.timeIn = data.timeIn.slice(14 , 19);
        this.timeOut = this.date1.toTimeString().split(' ')[0];
        this.dayOut = this.date1.getDate() + "/" + (this.date1.getMonth() + 1)  + "/" + this.date1.getFullYear();
      },
      error => {
        if(error.status==404) {
          this.timeIn = this.date1.toTimeString().split(' ')[0];
          this.dayIn = this.date1.getDate() + "/" + (this.date1.getMonth() + 1)  + "/" + this.date1.getFullYear();
          this.timeOut = " ";
          this.dayOut = " ";
          this.licensePlateOut = " ";
        }
      });
  }

  openDialogPickVehicle(): void {
    const dialogRef = this.dialog.open(VehiclePickComponent, {
      width: '1000px',
      height: '550px'
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log(data.data.endDate.slice(0 , 10));
      data.data.endDate = data.data.endDate.slice(0 , 10);
      data.data.startDate = data.data.startDate.slice(0 , 10);
      this.licensePlateIn = data.data.idVehicle;
      this.licensePlateOut = data.data.idVehicle;
        // this.convertDate = data.startDate.getDate() + "/" + data.startDate.getMonth()  + "/" + data.startDate.getFullYear();
        // data.startDate = this.convertDate;
        // this.convertDate = data.endDate.getDate() + "/" + data.endDate.getMonth()  + "/" + data.endDate.getFullYear();
        // data.endDate = this.convertDate;
      this.formTicketDetail.patchValue(data.data)
      this.getTrackingTime(data.data.idVehicle);
    });
  }
}
