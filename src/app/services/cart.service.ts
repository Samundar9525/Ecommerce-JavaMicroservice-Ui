import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private api = 'http://localhost:8084';

  constructor(private http: HttpClient) {}

  addProductTocart() {
    //    to be done
  }

  getCartDetails(cartId: String): Observable<any> {
    const url = `${this.api}/cart/${cartId}`;
    return this.http.get(url);
  }

  getActiveCartDetails(cartId: String): Observable<any> {
    const url = `${this.api}/cart/active/${cartId}`;
    return this.http.get(url);
  }


  getProductById(id: number): Observable<any> {
    return this.http.get(`http://localhost:8081/products/${id}`);
  }

  placeOrder() {
    //    to be done
  }
}
