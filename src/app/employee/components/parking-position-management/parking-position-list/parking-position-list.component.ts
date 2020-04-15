import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
import { ParkingPosition } from '../../../../models/parking-position';
import { MatDialog } from '@angular/material/dialog';
import { ParkingPositionService } from 'src/app/services/parking-position.service';
import { ParkingPositionEditComponent } from '../parking-position-edit/parking-position-edit.component';
import { PositionChartComponent } from '../position-chart/position-chart.component';
import { ParkingPositionDetailComponent } from '../parking-position-detail/parking-position-detail.component';
import { ParkingFloorService } from 'src/app/services/parking-floor.service';


@Component({
  selector: 'app-parking-position-list',
  templateUrl: './parking-position-list.component.html',
  styleUrls: ['./parking-position-list.component.css']
})
export class ParkingPositionListComponent implements OnInit {

  private floors;
  formParkingPosition: FormGroup;
  formFloor: FormGroup;
  public flag = false;
  public floor = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private parkingPositionService: ParkingPositionService,
    private parkingFloorService: ParkingFloorService
  ) { }
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;
  pageEvent: PageEvent;
  filterValue: string = "";
  displayedColumns: string[] = ['STT', 'position', 'floor', 'status', 'action'];
  dataSource: MatTableDataSource<ParkingPosition>;

  public handlePage(event?: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log(event.pageSize)
    this.ngOnInit();
  }

  applyFilter(filterValue: string) {
    this.filterValue = filterValue.trim();
    this.ngOnInit();
  }

  chooseFloor(floor) {
    this.flag = true;
    if (floor === 0) {
      this.floor = 0;
    } else {
      this.floor = floor.idParkingFloor;
    }
    console.log(floor);
    this.getAllParkingPosition();
  }

  ngOnInit() {
    this.getAllParkingPosition();
    this.formFloor = this.formBuilder.group({
      idParkingFloor: [''],
      nameFloor: [''],
      amount: ['']
    });
    this.activatedRoute.params.subscribe(data => {
      this.parkingFloorService.getAllFloor().subscribe(data => {
        this.floors = data;
      })
    });
  }


  addPosition() {
    console.log("thêm");
  }

  getAllParkingPosition() {
    if (!this.flag || this.floor === 0) {
      this.parkingPositionService.getAllParkingPosition(this.pageIndex, this.pageSize, this.filterValue).subscribe(
        data => {

          this.dataSource = data.content;
          console.log(this.dataSource)
          this.length = data.totalElements;
        },
        error => {
          if (error.status == 401) {
            alert("Bạn không có quyền vào trang này.Mời bạn đăng nhập.")
            this.router.navigateByUrl('/login')
          }
        }
      );
    } else {
      this.parkingPositionService.getAllParkingPositionByFloor(this.floor, this.pageIndex, this.pageSize, this.filterValue).subscribe(
        data => {
          this.dataSource = data.content;
          this.length = data.totalElements;
        },
        error => {
          if (error.status == 401) {
            alert("Bạn không có quyền vào trang này.Mời bạn đăng nhập.")
            this.router.navigateByUrl('/login')
          }
        }
      );
    }
  };
 
  openDialogParkingPosition(id : number) : void {
    this.parkingPositionService.getParkingPositionById(id).subscribe(dataParking=>{
      const dialogRef = this.dialog.open(ParkingPositionEditComponent, {
        width : '700px',
        data : {data : dataParking},
        disableClose : true
      });
   
      dialogRef.afterClosed().subscribe(()=>{
       this.getAllParkingPosition();
        });
    })
  }
  openDialogPositionChart(): void{
    const dialogRef = this.dialog.open(PositionChartComponent, {
      width : "900px",
      height : "700px"
      
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.getAllParkingPosition();
       });
  }

  openDialogDetailPosition(id): void {
    this.parkingPositionService.getParkingPositionById(id).subscribe(data =>{
      console.log(data);
      const dialogRef = this.dialog.open(ParkingPositionDetailComponent, {
        width: '1000px',
        height: '500px',
        data: {positionData: data},
        disableClose: false
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    })
  }
}
