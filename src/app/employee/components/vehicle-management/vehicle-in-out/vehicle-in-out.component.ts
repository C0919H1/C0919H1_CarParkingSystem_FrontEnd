import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VehiclePickComponent } from '../vehicle-pick/vehicle-pick.component'

@Component({
  selector: 'app-vehicle-in-out',
  templateUrl: './vehicle-in-out.component.html',
  styleUrls: ['./vehicle-in-out.component.css']
})

export class VehicleInOutComponent implements OnInit {
  private convertDate;
  private formTicketDetail: FormGroup;
  private disabled = true;
  date = new FormControl(new Date());

  constructor(
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

  openDialogPickVehicle(): void {
    const dialogRef = this.dialog.open(VehiclePickComponent, {
      width: '1000px',
      height: '550px'
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log(data.data.endDate.slice(0 , 10));
      data.data.endDate = data.data.endDate.slice(0 , 10);
      data.data.startDate = data.data.startDate.slice(0 , 10);
        // this.convertDate = data.startDate.getDate() + "/" + data.startDate.getMonth()  + "/" + data.startDate.getFullYear();
        // data.startDate = this.convertDate;
        // this.convertDate = data.endDate.getDate() + "/" + data.endDate.getMonth()  + "/" + data.endDate.getFullYear();
        // data.endDate = this.convertDate;
      this.formTicketDetail.patchValue(data.data)
    });
  }
}
