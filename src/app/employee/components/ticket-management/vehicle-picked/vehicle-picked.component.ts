import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VehicleService } from 'src/app/services/vehicle.service'
import { TicketService } from 'src/app/services/ticket.service'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
import { Vehicle } from '../../../../models/vehicle';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Ticket } from 'src/app/models/Ticket'
import { Router } from '@angular/router'

@Component({
  selector: 'app-vehicle-picked',
  templateUrl: './vehicle-picked.component.html',
  styleUrls: ['./vehicle-picked.component.css']
})
export class VehiclePickedComponent implements OnInit {
  private disabled = true;
  private ticket;
  private positions;
  private normalPosition;
  private ticketTypes;
  private idPosition;
  private idCustomer;
  private vehicleData;
  private date = new Date();
  public formCustomer: FormGroup;
  private formVehicle: FormGroup;
  private formTicketType: FormGroup;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;
  pageEvent: PageEvent;
  filterValue: string = "";
  displayedColumns: string[] = ['STT','licensePlate', 'typeOfVehicle', 'typeticket', 'date', 'action'];
  dataSource: MatTableDataSource<Vehicle>;

  ticktet = new Ticket(null,'','','','','','','','');

  constructor(
    public router : Router,
    public dialogRef: MatDialogRef<VehiclePickedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private vehicleService: VehicleService,
    private formBuilder: FormBuilder,
    private ticketService: TicketService
  ) { }

  ngOnInit() : void {
    this.formCustomer = this.formBuilder.group({
      fullName: new FormControl ({value:'',disabled: this.disabled}),
      indentity: new FormControl ({value:'',disabled: this.disabled}),
    });

    this.formVehicle = this.formBuilder.group({
      typeOfVehicle: new FormControl ({value:'',disabled: this.disabled}),
      licensePlate: new FormControl ({value:'',disabled: this.disabled}),
    });

    this.formTicketType = this.formBuilder.group({
      typeOfTicket: new FormControl('', [Validators.required]),
      parkingPosition: new FormControl('', [Validators.required]),
      dateBegin: new FormControl({value:new Date(),disabled: this.disabled}),
      dateEnd: new FormControl({value:new Date(),disabled: this.disabled}),
    });
    this.idCustomer = this.data.customerData.idCustomer;
    this.ticktet.fullName = this.data.customerData.fullName;
    this.getAllTicketType();
    this.formCustomer.patchValue(this.data.customerData); 
    this.getVehicleByIdCustomer();                     
  }

  // this.idTicket = idTicket;
  //       this.idVehicle = idVehicle;
  //       this.fullName = fullName;
  //       this.startDate = startDate;
  //       this.endDate = endDate;
  //       this.nameFloor = nameFloor;
  //       this.nameOfPosition = nameOfPosition;
  //       this.ticketType = ticketType;
  //       this.cost = cost;
  getVehicleByIdCustomer(){
    this.vehicleService.getAllVehicleByIdCustomer(this.idCustomer,this.pageIndex, this.pageSize, this.filterValue).subscribe(data =>{
      this.dataSource = data.content;
      this.vehicleData = data.content;
      this.length = data.totalElements;
      console.log(data)
    })
  }

  getAllTicketType(){
    this.ticketService.getAllTicketType().subscribe(data => {
      this.ticketTypes = data;
    })
  }


  getParkingPosition(value){
    if( value.nameTicketType === 'Vip(Tháng)' || value.nameTicketType === 'Vip(Năm)' ){
      this.ticketService.getAvailableVipPosition().subscribe(data => {
        this.positions = data;
      })
      if(value.nameTicketType === 'Vip(Tháng)'){
        this.date = new Date();
        this.date.setMonth(this.date.getMonth() + 1);
        this.formTicketType.patchValue({dateEnd:this.date})
      } else {
        this.date = new Date();
        this.date.setFullYear(this.date.getFullYear() + 1);
        this.formTicketType.patchValue({dateEnd:this.date})
      }
    } else {
      this.ticketService.getAvailableNormalPosition().subscribe(data => {
        this.positions = data;
      })
      if(value.nameTicketType === 'Thường(Tháng)'){
        this.date = new Date();
        this.date.setMonth(this.date.getMonth() + 1);
        this.formTicketType.patchValue({dateEnd:this.date})
      } else {
        this.date = new Date();
        this.date.setFullYear(this.date.getFullYear() + 1);
        this.formTicketType.patchValue({dateEnd:this.date})
      }
    }

    this.ticktet.ticketType = value.nameTicketType;
    this.ticktet.endDate = this.date.getTime().toString();
    this.ticktet.startDate = (new Date()).getTime().toString();
    this.ticktet.cost = value.cost;
  }

  getVehicleById(id) {
    this.formVehicle.patchValue(this.vehicleData.find(c => c.idVehicle === id))
    this.ticktet.idVehicle = this.vehicleData.find(c => c.idVehicle === id).licensePlate;
  }


  setParkingPosition(value){
    this.ticktet.nameOfPosition = value.nameOfPosition;
    this.idPosition = value.idParkingPosition;
    if(value.nameOfPosition.includes('A')){
      this.ticktet.nameFloor = 'Tầng 1'
    }
    if(value.nameOfPosition.includes('B')){
      this.ticktet.nameFloor = 'Tầng 2'
    }
    if(value.nameOfPosition.includes('C')){
      this.ticktet.nameFloor = 'Tầng 3'
    }
    if(value.nameOfPosition.includes('D')){
      this.ticktet.nameFloor = 'Tầng 4'
    }
    console.log(this.ticktet)
  }

  createTicket(){
    this.ticketService.registerTicket(this.ticktet).subscribe(data => {
      location.reload();
      alert('Success');
    })
    this.ticketService.registerParkingPosition(this.idPosition).subscribe(data => {
      
    })
    
  }
}
