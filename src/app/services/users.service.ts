import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private api = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  login(userData: { name: string; email: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.api}/login`, userData, { headers });
  }

  getCartData(): Observable<any> {
    return this.http.get(`${this.api}/profiles/cart`);
  }
}
