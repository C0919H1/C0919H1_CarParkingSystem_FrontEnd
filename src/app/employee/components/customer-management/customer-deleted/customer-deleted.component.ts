import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-deleted',
  templateUrl: './customer-deleted.component.html',
  styleUrls: ['./customer-deleted.component.css']
})
export class CustomerDeletedComponent implements OnInit {
public idCustomer;
  constructor(
    public customerService : CustomerService,
    public dialogRef: MatDialogRef<CustomerDeletedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

  ngOnInit(): void {
    this.idCustomer = this.data.data.idCustomer;
  }
deleted(): void {
  this.customerService.deletedCustomerById(this.idCustomer).subscribe(()=>{
    this.dialogRef.close()});
 
  }

}