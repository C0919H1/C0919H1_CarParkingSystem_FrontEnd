import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  httpOptions: any;
  
  public baseURL: string = 'http://localhost:8080/'

  constructor(public http: HttpClient) { 
    
  }
  
  getAllTicket(curentPage,size,search): Observable<any> {
    return this.http.get(this.baseURL + '?page=' + curentPage + '&size=' + size + '&search=' + search);
  }
  getTicketById(idTicket): Observable<any>{
    return this.http.get(this.baseURL + 'ticket/' + idTicket);
  }
  getTicketDTO3ById(idTicket): Observable<any>{
    return this.http.get(this.baseURL + 'ticketById/' + idTicket);
  }
  deleteTicketById(id:number): Observable<any> {
    return this.http.patch(this.baseURL+id,this.httpOptions);
  }
  getAllTicketType(): Observable<any> {
    return this.http.get(this.baseURL + 'tickettypes')
  }
  getAvailableVipPosition(): Observable<any> {
    return this.http.get(this.baseURL + 'parkingposition' + '/vip')
  }
  getAvailableNormalPosition(): Observable<any> {
    return this.http.get(this.baseURL + 'parkingposition' + '/normal')
  }
  registerParkingPosition(id): Observable<any> {
    return this.http.get(this.baseURL + 'settrue/' + id)
  }
  unRegisterParkingPosition(id): Observable<any> {
    return this.http.get(this.baseURL + 'setfalse/' + id)
  }
  registerTicket(ticket: any): Observable<any> {
    return this.http.post(this.baseURL + 'ticket' , ticket, this.httpOptions)
  }
  getPositionByName(namePosition): Observable<any> {
    return this.http.get(this.baseURL + '?name=' + namePosition)
  }
  getTicketByPositionId(id): Observable<any> {
    return this.http.get(this.baseURL + 'ticketByParkingPosition/' + id)
  }
}
