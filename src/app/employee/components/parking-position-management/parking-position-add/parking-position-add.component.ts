import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-parking-position-add',
  templateUrl: './parking-position-add.component.html',
  styleUrls: ['./parking-position-add.component.css']
})
export class ParkingPositionAddComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ParkingPositionAddComponent>
  ) { }

  ngOnInit() {
  }
  edit(): void {
    this.dialogRef.close();
 
  }

}
