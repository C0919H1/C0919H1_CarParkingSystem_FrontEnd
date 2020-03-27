import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Customer } from "src/app/models/customer"

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public API: string = 'http://localhost:8080/customers';
  private httpOptions: any;

  constructor(
    public http: HttpClient
  ) { 
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      ,'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getAllCustomer(curentPage,size, search): Observable<any> {
      return this.http.get(this.API + '?page=' + curentPage + '&size=' + size + '&search=' + search);
  }

  getCustomerById(customerId): Observable<any> {
    return this.http.get(this.API + '/' + customerId);
  }

  addNewCustomer(customer): Observable<any> {
    return this.http.post(this.API, customer);
  }

  deletedCustomerById(customerId : number) : Observable<any>{
    return this.http.patch(this.API + '/' + customerId, this.httpOptions);
  }
  editCustomer(customer : any , id : number): Observable<any>{
    return this.http.put(this.API + '/' + id, customer, this.httpOptions);
  }

}
