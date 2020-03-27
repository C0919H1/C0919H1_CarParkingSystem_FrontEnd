import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { Employee } from '../../../../models/employee'
import { from } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employee: Employee;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  formCreateEmployee : FormGroup;
  public create = true;
  public maxDate = new Date();
  public minDate = new Date(1900, 0, 1);

  displayedColumns: string[] = ['idEmployee', 'fullname', 'dateOfBirth', 'gender', 'position', 'phoneNumber', 'email', 'address', 'action'];
  DataSource: MatTableDataSource<Employee>;
  filterValue: string = "";
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;
  pageEvent: PageEvent;

  applyFilter(filterValue: string) {
    this.filterValue = filterValue.trim();
    this.ngOnInit();
  }
  public handlePage(event?: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log(event.pageSize)
    this.ngOnInit();
  }

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {

  }
  ngOnInit() {
    this.openFormCreate();
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee(this.pageIndex, this.pageSize, this.filterValue).subscribe(
      data => {
        this.DataSource = data.content;
        this.employee = data.content;
        this.length = data.totalElements;

        console.log(data.totalElements);
        console.log('data:' + this.DataSource);
      },
      error => {
        if (error.status == 401) {
          alert("Bạn không có quyền vào trang này.Mời bạn đăng nhập.")
          this.router.navigateByUrl('/login')
        }
      }
    );

  }

  openFormCreate(): void {
    this.formCreateEmployee = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^(090|091|([\(]84[\)][\+]90)|([\(]84[\)][\+]91))[0-9]{7}$')]],
      position: ['', [Validators.required]]
    });
  }

  addEmployee(): void {
    this.employee[0].create = true;

  }

  save() {
    this.employeeService.addNewEmployee(this.formCreateEmployee.value).subscribe(data => {
      alert("Thêm thành công");
      location.reload();
    });
    console.log(this.formCreateEmployee);
  }

}