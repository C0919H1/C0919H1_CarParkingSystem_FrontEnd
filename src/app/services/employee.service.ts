import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';


import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public API: string = 'http://localhost:8080/employees';
 
  constructor(
    public http: HttpClient) {
    }

  getAllEmployee(pageIndex,pageSize,search): Observable<any> {
    return this.http.get(this.API + '?page=' + pageIndex + '&size=' + pageSize + '&search=' + search );
  }
  getEmployeeById(employeeId): Observable<any> {
    return this.http.get(this.API + '/' + employeeId)
  }
  addNewEmployee(employee):Observable<any>{
    return this.http.post(this.API,employee);
  }
}
