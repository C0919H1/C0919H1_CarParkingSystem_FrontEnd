import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';

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
  getAllParkingByFloor(floor) : Observable<any> {
    console.log(floor)
    return this.http.get(this.API + '?floor=' + floor);

}
  getParkingPositionById(id) : Observable<any>{
    return this.http.get(this.API + '/' + id);
  }
  editParkingPositionById(id : number , parkingPosition,floor) : Observable<any>{
    return this.http.put(this.API + '/' + id,{'parkingPosition': parkingPosition,'floor':floor});
  }
}
