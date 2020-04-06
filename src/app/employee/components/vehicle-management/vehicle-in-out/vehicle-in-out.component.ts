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
      indentity: new FormControl ({value:'',disabled: this.disabled}),
      typeOfVehicle: new FormControl ({value:'',disabled: this.disabled}),
      licensePlate: new FormControl ({value:'',disabled: this.disabled}),
      typeOfTicket: new FormControl({value:'',disabled: this.disabled}),
      parkingPosition: new FormControl({value:'',disabled: this.disabled}),
      dateBegin: new FormControl({value:new Date(),disabled: this.disabled}),
      dateEnd: new FormControl({value:new Date(),disabled: this.disabled}),
    });
  }

  openDialogPickVehicle(): void {
    const dialogRef = this.dialog.open(VehiclePickComponent, {
      width: '1000px',
      height: '550px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
