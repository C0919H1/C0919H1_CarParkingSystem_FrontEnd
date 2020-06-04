import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
import { Ticket } from 'src/app/models/Ticket';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../../../services/ticket.service'
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service'
import { from } from 'rxjs';


@Component({
  selector: 'app-vehicle-pick',
  templateUrl: './vehicle-pick.component.html',
  styleUrls: ['./vehicle-pick.component.css']
})
export class VehiclePickComponent implements OnInit {

  displayedColumns = ['idTicket', 'idVehicle', 'fullName', 'startDate','endDate','nameFloor','nameOfPosition','ticketType','cost','action'];
  
  DataSource: MatTableDataSource<Ticket>;

  constructor(
    public dialogRef: MatDialogRef<VehiclePickComponent>,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private ticketService: TicketService,
    private dialog: MatDialog,
    private customerService: CustomerService,
    ) { }
  localData;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex:number = 0;
  pageSize:number = 5;
  length :number;
  pageEvent: PageEvent;
  filterValue: String = "";

  public handlePage(event?:PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log(event.pageSize)
    // this.ngOnInit();
  }

  applyFilter(filterValue: string) {
    this.filterValue = filterValue.trim();
    this.ngOnInit();
  }

  getAllTicket() {
    this.ticketService.getAllTicket(this.pageIndex, this.pageSize, this.filterValue).subscribe(
      data => {
        console.log(data)
        this.DataSource = data.content;
        this.length = data.totalElements;
        console.log(data.totalElements)
        console.log(this.DataSource)
      },
      error => {
        if(error.status==401) {
          alert("Bạn không có quyền vào trang này.Mời bạn đăng nhập.")
          this.router.navigateByUrl('/login')
        }
      }
    );
  };

  passData(element){
    this.ticketService.getTicketDTO3ById(element).subscribe(data => {
      console.log(data)
      this.localData = data;
      this.dialogRef.close({data:data});
    })
    console.log(element)
    console.log(this.localData + "day la local data");
  }
  
  doAction(){
  }

  ngOnInit() {
    this.getAllTicket();
  }

}
