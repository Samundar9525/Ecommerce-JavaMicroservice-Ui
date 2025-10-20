import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 private api = 'http://localhost:8081';
  constructor(private http: HttpClient) {}

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.api}/products/${id}`);
  }


}
