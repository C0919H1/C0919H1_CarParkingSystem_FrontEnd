import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CustomerService } from 'src/app/services/customer.service';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of, merge, fromEvent } from 'rxjs';
import { catchError, finalize, debounceTime, distinctUntilChanged, startWith, tap, delay } from "rxjs/operators";
import { CustomerDeletedComponent } from '../customer-deleted/customer-deleted.component';
import { Customer } from '../../../../models/customer';
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

// export class CustomerDataSource implements DataSource<Customer>{

//   private customersSubject = new BehaviorSubject<Customer[]>([]);

//   private loadingSubject = new BehaviorSubject<boolean>(false);

//   public loading$ = this.loadingSubject.asObservable();

//   constructor(private customerService: CustomerService) {
//   }

//   loadCustomers(sortDirection: string,
//     pageIndex: number,
//     pageSize: number) {

//     this.loadingSubject.next(true);

//     this.customerService.getAllCustomer(sortDirection,
//       pageIndex, pageSize).pipe(
//         catchError(() => of([])),
//         finalize(() => this.loadingSubject.next(false))
//       )
//       .subscribe(customers => {
//         this.customersSubject.next(customers);
//         console.log(customers);
//       });

//   }

//   connect(collectionViewer: CollectionViewer): Observable<Customer[]> {
//     console.log("Connecting data source");
//     return this.customersSubject.asObservable();
//   }

//   disconnect(collectionViewer: CollectionViewer): void {
//     this.customersSubject.complete();
//     this.loadingSubject.complete();
//   }
// }

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  public maxDate = new Date();
  public minDate = new Date(1900, 0, 1);
  customer: Customer;
  formCreateCustomer: FormGroup;
  idCustomer: number;
  public create = true;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  constructor(
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService) { }
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;
  pageEvent: PageEvent;
  filterValue: string = "";
  displayedColumns: string[] = ['idcustomer', 'fullname', 'dateOfBirth', 'gender', 'identify', 'phoneNumber', 'email', 'address', 'action'];
  dataSource: MatTableDataSource<Customer>;

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

  getAllCustomer() {
    this.customerService.getAllCustomer(this.pageIndex, this.pageSize, this.filterValue).subscribe(
      data => {
        for (let thanh of data.content) {
          thanh.create = false;
        }
        this.dataSource = data.content;
        this.customer = data.content;
        this.length = data.totalElements;
        console.log(this.customer);
        console.log(data.totalElements);
        console.log(this.dataSource);
      },
      error => {
        if (error.status == 401) {
          alert("Bạn không có quyền vào trang này.Mời bạn đăng nhập.")
          this.router.navigateByUrl('/login')
        }
      }
    );
  };
  ngOnInit() {
    this.openFormCreate();
    this.getAllCustomer();
  }

  openFormCreate(): void {
    this.formCreateCustomer = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^(090|091|([\(]84[\)][\+]90)|([\(]84[\)][\+]91))[0-9]{7}$')]],
      identify: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]]
    });
  }

  addCustomer(): void {
    this.customer[0].create = true;
    this.customer[0].isText = true;
  }

  save(id: number, index: number) {
    if (this.customer[0].isText) {
      this.customerService.addNewCustomer(this.formCreateCustomer.value).subscribe(data => {
        alert("Thêm thành công");
        location.reload();
      });
      console.log(this.formCreateCustomer);
    } else {
      this.updateCustomer(id, index);
    }
  }

  openDialog(id: number): void {
    this.customerService.getCustomerById(id).subscribe(dataCustomer => {
      console.log(dataCustomer);
      const dialogRef = this.dialog.open(CustomerDeletedComponent, {
        width: '500px',
        data: { data: dataCustomer },
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(() => {
        this.customerService.getAllCustomer(this.pageIndex, this.pageSize, this.filterValue).subscribe(data => {
          this.dataSource = data.content;
        })

      });
    })
  }

  openEdit(id: number, index: number): void {
    if (index == 0) {
      this.customer[0].isText = false;
    }
    this.customer[index].create = true;
    this.customerService.getCustomerById(id).subscribe(data => {
    
      this.formCreateCustomer.patchValue(data);
      console.log(this.formCreateCustomer.value)

      // String date = datepicker.getValue().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

    });
  }
  updateCustomer(id: number, index: number): void {
    console.log(this.formCreateCustomer.value)
    this.customer[index].create = false;
    this.customerService.editCustomer(this.formCreateCustomer.value, id).subscribe(data => {
      location.reload();
    });
  }

}
