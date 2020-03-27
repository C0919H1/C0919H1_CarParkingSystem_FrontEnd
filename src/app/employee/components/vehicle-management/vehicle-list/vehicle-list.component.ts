import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl  } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material';
import { Vehicle } from '../../../../models/vehicle';

export class VehicleDataSource extends DataSource<any>{
  constructor(
    private vehicleService: VehicleService,
  ) {
    super();
  }

  connect(): Observable<any> {

    return this.vehicleService.getAllVehicle();
  }

  disconnect() { }
}

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  public converDate: string;
  public date;
  vehicle: Vehicle;
  formCreateVehicle: FormGroup;
  public create = true;
  public formCustomer: FormGroup;
  public customerOfId;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService) { }
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;
  pageEvent: PageEvent;
  filterValue: string = "";
  displayedColumns: string[] = ['STT', 'licensePlate', 'typeOfVehicle', 'ticketType', 'endDate', 'action'];
  dataSource: MatTableDataSource<Vehicle>;

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

  getAllVehicle() {
    this.activatedRoute.params.subscribe(data => {
      this.customerOfId = data.id;
      this.vehicleService.getAllVehicleByIdCustomer(this.customerOfId, this.pageIndex, this.pageSize, this.filterValue).subscribe(
        data => {
          this.dataSource = data.content;
          this.vehicle = data.content;
          this.length = data.totalElements;
          console.log(data.totalElements)
          console.log(this.dataSource)
        },
        error => {
          if (error.status == 401) {
            alert("Bạn không có quyền vào trang này.Mời bạn đăng nhập.")
            this.router.navigateByUrl('/login')
          }
        }
      );
    })

  };

  ngOnInit() {
    this.openFormCreate();
    this.formCustomer = this.formBuilder.group({
      fullName: [''],
      dateOfBirth: ['']
    });

    this.activatedRoute.params.subscribe(data => {
      this.customerOfId = data.id;
      this.customerService.getCustomerById(this.customerOfId).subscribe(data => {
        this.date = new Date(data.dateOfBirth);
        this.converDate = this.date.getDate() + "/" + (this.date.getMonth() + 1) + "/" +this.date.getFullYear();
        data.dateOfBirth = this.converDate;
        this.formCustomer.patchValue(data);
        console.log(data);
      })
    });
    this.getAllVehicle();

  }

  openFormCreate(): void {
    this.formCreateVehicle = this.formBuilder.group({
      typeOfVehicle: ['', [Validators.required]],
      licensePlate: ['', [Validators.required]],
      endDate: [''],
      ticketType: [''],
      idCustomer: ['']
    });
  }

  addVehicle(): void {
    this.vehicle[0].create = true;
  }

  save() {
    this.formCreateVehicle.value.idCustomer = this.customerOfId;
    console.log(this.formCreateVehicle.value);
    this.vehicleService.addNewVehicle(this.formCreateVehicle.value).subscribe(data => {
      alert("Thêm thành công");
      location.reload();
    });
  }

}
