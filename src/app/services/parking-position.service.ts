import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingPositionService {
  public API: string = 'http://localhost:8080/parkingposition';

  constructor(
    public http: HttpClient
  ) { }

  getAllParkingPosition(curentPage, size, search): Observable<any> {
    return this.http.get(this.API + '?page=' + curentPage + '&size=' + size + '&search=' + search);
  }

  getAllParkingPositionByFloor(floor, curentPage, size, search): Observable<any> {
    return this.http.get(this.API + '?page=' + curentPage + '&size=' + size + '&search=' + search + '&floor=' + floor);
  }
}
