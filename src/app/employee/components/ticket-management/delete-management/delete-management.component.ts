import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TicketService } from '../../../../services/ticket.service'


@Component({
  selector: 'app-delete-management',
  templateUrl: './delete-management.component.html',
  styleUrls: ['./delete-management.component.css']
})
export class DeleteManagementComponent implements OnInit {
  public licensePlate;
  public idTicket;
  constructor(
    public dialogRef: MatDialogRef<DeleteManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    public ticketService : TicketService) {}

  ngOnInit(): void {
    this.idTicket = this.data.data.idTicket;
    this.licensePlate = this.data.data.idVehicle;
    console.log(this.licensePlate)
    console.log(this.data.data)
  }
   
  deleteTicket(){
    this.ticketService.deleteTicketById(this.idTicket).subscribe(data=>{
      this.dialogRef.close()
    })
    this.ticketService.getPositionByName(this.data.data.nameOfPosition).subscribe(data =>{
      console.log(data)
      this.ticketService.unRegisterParkingPosition(data.idParkingPosition).subscribe(data => {
        
      })
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
