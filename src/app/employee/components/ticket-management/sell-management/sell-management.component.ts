import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { VehicleService } from 'src/app/services/vehicle.service'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehiclePickedComponent } from '../vehicle-picked/vehicle-picked.component'
import { from } from 'rxjs';

@Component({
  selector: 'app-sell-management',
  templateUrl: './sell-management.component.html',
  styleUrls: ['./sell-management.component.css']
})
export class SellManagementComponent implements OnInit {
  pageSizeOptions: number[] = [5, 10, 25, 100];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router, 
    private customerService: CustomerService,
    private vehicleService: VehicleService,
    private dialog: MatDialog,
    ) { }
  pageIndex:number = 0;
  pageSize:number = 5;
  length :number;
  pageEvent: PageEvent;
  filterValue: string = "";
  displayedColumns: string[] = ['idcustomer', 'fullname', 'dateOfBirth', 'gender', 'indentity', 'phoneNumber', 'email', 'address', 'action'];
  dataSource: MatTableDataSource<Customer>;

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

  ngOnInit() {
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customerService.getAllCustomer(this.pageIndex, this.pageSize, this.filterValue).subscribe(
      data => {
        this.dataSource = data.content;
        this.length = data.totalElements;
        console.log(data.totalElements)
        console.log(this.dataSource)
      },
      error => {
        if(error.status==401) {
          alert("Bạn không có quyền vào trang này.Mời bạn đăng nhập.")
          this.router.navigateByUrl('/login')
        }
      }
    );
  };

  openDialogPickVehicle(idCustomer): void {
    this.customerService.getCustomerById(idCustomer).subscribe(data =>{
      console.log(data);
      const dialogRef = this.dialog.open(VehiclePickedComponent, {
        width: '1000px',
        height: '700px',
        data: {customerData: data},
        disableClose: false
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    })
  }

}
