import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
import { Ticket } from 'src/app/models/Ticket';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../../../services/ticket.service'
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteManagementComponent } from '../delete-management/delete-management.component'
import { SellManagementComponent } from '../sell-management/sell-management.component'
import { CustomerService } from 'src/app/services/customer.service'
import { from } from 'rxjs';


@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.css']
})
export class TicketManagementComponent implements OnInit {

  displayedColumns = ['idTicket', 'idVehicle', 'fullName', 'startDate','endDate','nameFloor','nameOfPosition','ticketType','cost','action'];
  
  DataSource: MatTableDataSource<Ticket>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private ticketService: TicketService,
    private dialog: MatDialog,
    private customerService: CustomerService,
    ) { }

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
    this.ngOnInit();
  }

  applyFilter(filterValue: string) {
    this.filterValue = filterValue.trim();
    this.ngOnInit()
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

  ngOnInit() {
    this.getAllTicket();
  }

  openDialogDelete(idTicket): void {
    this.ticketService.getTicketById(idTicket).subscribe(data =>{
      console.log(data);
      const dialogRef = this.dialog.open(DeleteManagementComponent, {
        width: '300px',
        data: {data: data},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    })
  }

  openDialogAddNewTicket(): void {
    const dialogRef = this.dialog.open(SellManagementComponent, {
      width: '1000px',
      height: '550px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
