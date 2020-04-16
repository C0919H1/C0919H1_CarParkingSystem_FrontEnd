import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  public API: string = 'http://localhost:8080/revenue';
  constructor(
    public http: HttpClient

  ) {  }
  getRevenueAll():Observable<any>{
    return  this.http.get(this.API);
  }

  
}
