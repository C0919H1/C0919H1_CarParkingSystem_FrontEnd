import { Component, OnInit } from '@angular/core';
import { ParkingPositionService } from 'src/app/services/parking-position.service';
import { MatTableDataSource } from '@angular/material';
import { ParkingPosition } from 'src/app/models/parking-position';

@Component({
  selector: 'app-position-chart',
  templateUrl: './position-chart.component.html',
  styleUrls: ['./position-chart.component.css']
})
export class PositionChartComponent implements OnInit {
  
private floor = 1;
displayedColumns: string[] = ['STT','position'];

dataSource: MatTableDataSource<ParkingPosition>;
  constructor(
    public parkingPositionService : ParkingPositionService,


    ) { }


  ngOnInit() {
    this.getParkingPositionSelfFloor();
  }
  chooseFloor(floor: number) {
    this.floor = floor;
    this.ngOnInit();
  }
  getParkingPositionSelfFloor(): void {
    this.parkingPositionService.getAllParkingByFloor(this.floor).subscribe(data=>{
      console.log(data);
      this.dataSource = data;
    })

  }

}
