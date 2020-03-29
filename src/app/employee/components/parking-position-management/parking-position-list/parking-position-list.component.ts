import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl  } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';

export interface PeriodicElement {
  position: string;
  floor: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: "A-1", floor: 1},
  {position: "A-2", floor: 1},
  {position: "A-3", floor: 1},
  {position: "A-4", floor: 1},
  {position: "A-5", floor: 1},
  {position: "A-6", floor: 1},
]

@Component({
  selector: 'app-parking-position-list',
  templateUrl: './parking-position-list.component.html',
  styleUrls: ['./parking-position-list.component.css']
})
export class ParkingPositionListComponent implements OnInit {

  formParkingPosition: FormGroup;
  formFloor: FormGroup;
  displayedColumns: string[] = ['position', 'floor', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor() { }
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;
  pageEvent: PageEvent;
  filterValue: string = "";

  public handlePage(event?: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log(event.pageSize)
    this.ngOnInit();
  }

  applyFilter(filterValue: string) {
    this.filterValue = filterValue.trim();
    this.ngOnInit()
  }

  ngOnInit() {
  }

  addPosition(){
    console.log("thêm");
  }

}
