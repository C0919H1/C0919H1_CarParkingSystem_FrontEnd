import { Component, OnInit,Inject } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service'
import { TicketService } from 'src/app/services/ticket.service'
import { ParkingPositionService } from 'src/app/services/parking-position.service'
import { Router } from '@angular/router'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-parking-position-detail',
  templateUrl: './parking-position-detail.component.html',
  styleUrls: ['./parking-position-detail.component.css']
})
export class ParkingPositionDetailComponent implements OnInit {
  private idPosition;
  private positon;
  private floor;
  private customerName;
  private dateOfBirth;
  private email;
  private phoneNumber;
  private vehicleType;
  private licensePlate;
  constructor(
    private vehicleService: VehicleService,
    private ticketService: TicketService,
    private parkingPositionService: ParkingPositionService,
    public router : Router,
    @Inject(MAT_DIALOG_DATA) public data: any ,
  ) { }

  ngOnInit() {
    this.idPosition = this.data.positionData.idParkingPosition;
    this.positon = this.data.positionData.nameOfPosition;
    this.floor = this.data.positionData.parkingFloor.nameFloor;
    this.getTicketByParkingPositionById(this.idPosition)
  }

  getTicketByParkingPositionById(id){
    this.ticketService.getTicketByPositionId(id).subscribe(data => {
      console.log(data)
      this.customerName = data.fullName;
      this.dateOfBirth = data.dateOfBirth;
      this.email = data.email;
      this.phoneNumber = data.phoneNumber;
      this.vehicleType = data.typeVehicle;
      this.licensePlate = data.idVehicle;
    })
  }
}
