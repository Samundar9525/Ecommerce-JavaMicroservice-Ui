import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
 private api = 'http://localhost:8081';

 constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    const url = `${this.api}/products`;
    return this.http.get(url);
  }

}
