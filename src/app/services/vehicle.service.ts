import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  public API: string = 'http://localhost:8080/vehicles'

  constructor(
    public http: HttpClient
  ) { }

  getAllVehicle(): Observable<any> {
    return this.http.get(this.API);
  }

  getAllVehicleByIdCustomer(customerId,curentPage, size, search ): Observable<any>{
    return this.http.get(this.API + '/' + customerId + '?page=' + curentPage + '&size=' + size + '&search=' + search);
  }

  addNewVehicle(vehicle): Observable<any> {
    return this.http.post(this.API , vehicle);
  }
}
