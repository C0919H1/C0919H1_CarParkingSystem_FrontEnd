import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-parking-position-edit',
  templateUrl: './parking-position-edit.component.html',
  styleUrls: ['./parking-position-edit.component.css']
})
export class ParkingPositionEditComponent implements OnInit {

  constructor
  ( public dialogRef: MatDialogRef<ParkingPositionEditComponent>,
    ) { 
    
  }

  ngOnInit() {

  }
  edit(): void {
      this.dialogRef.close();
   
    }

}
