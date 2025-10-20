import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private api = 'http://localhost:8084';

  constructor(private http: HttpClient) {}

  addProductTocart(cartId: string, productId: number, price: number, quantity: number): Observable<any> {
    const url = `${this.api}/cart/${cartId}`;
    const payload = {
      cartId: cartId,
      productId: productId,
      price: price,
      quantity: quantity
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, payload, { headers });
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

  deleteProductFromCart(cartId: string, productId: number): Observable<any> {
    const url = `${this.api}/cart/delete?cartId=${cartId}&productId=${productId}`;
    return this.http.delete(url);
  }

  updateProductQuantity(cartId: string, productId: number, price: number, quantity: number): Observable<any> {
    const url = `${this.api}/cart/${cartId}`;
    const payload = {
      cartId: cartId,
      productId: productId,
      price: price,
      quantity: quantity
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.patch(url, payload, { headers, responseType: 'text' });
  }

  placeOrder(cartId: string, productIds: number[]): Observable<any> {
    const url = `${this.api}/cart/${cartId}/placeOrder`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, productIds, { headers, responseType: 'text' });
  }
}
