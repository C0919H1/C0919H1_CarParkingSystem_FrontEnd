import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  public API: string = 'http://localhost:8080/tracking-time'

  constructor(
    public http: HttpClient
  ) { }

  getTrackingTimeIn(timeIn, timeOut): Observable<any> {
    return this.http.get(this.API+"/in"+"?timeIn="+timeIn+"&timeOut="+timeOut);
  }

  getTrackingTimeOut(timeIn, timeOut): Observable<any> {
    return this.http.get(this.API+"/out"+"?timeIn="+timeIn+"&timeOut="+timeOut);
  }

  getTrackingTime(licensePlate): Observable<any> {
    return this.http.get("http://localhost:8080/trackingTime/" + licensePlate);
  }
}
