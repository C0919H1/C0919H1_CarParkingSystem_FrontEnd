import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ParkingPositionService } from 'src/app/services/parking-position.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ParkingPosition } from 'src/app/models/parking-position';

@Component({
  selector: 'app-parking-position-edit',
  templateUrl: './parking-position-edit.component.html',
  styleUrls: ['./parking-position-edit.component.css']
})
export class ParkingPositionEditComponent implements OnInit {
private formEditPosition : FormGroup;
private floor : number = 2;
  constructor
  ( public dialogRef: MatDialogRef<ParkingPositionEditComponent>,
    @Inject(MAT_DIALOG_DATA) public  dataPosition : any, 
    public parkingPositionService : ParkingPositionService,
    public formBuider : FormBuilder,

    ) { 
  }

  ngOnInit() {
    this.formEditPosition = this.formBuider.group({
      nameOfPosition : ['', Validators.required],
      
    })
    this.formEditPosition.patchValue(this.dataPosition.data);
    console.log(this.floor)


  }
  chooseFloor(floor: number) {
   
    this.floor = floor;
    console.log(floor);
    // this.ngOnInit();
  }
  edit(): void {
  
     this.parkingPositionService.editParkingPositionById(this.dataPosition.data.idParkingPosition, this.formEditPosition.value,this.floor).subscribe(()=>{
       this.dialogRef.close()
       console.log(this.floor)
     });
   
    }

}
