import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
HttpClient;
@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _httpClient: HttpClient) {}
  addToCart(id: string): Observable<any> {
    return this._httpClient.post(
      'https://route-ecommerce.onrender.com/api/v1/cart',
      {
        productId: id,
      },
      {
        headers: {
          token: `${localStorage.getItem('userToken')}`,
        },
      }
    );
  }
  getCart(): Observable<any> {
    return this._httpClient.get(
      'https://route-ecommerce.onrender.com/api/v1/cart',
      {
        headers: {
          token: `${localStorage.getItem('userToken')}`,
        },
      }
    );
  }
  updateCart(count: number, id: string): Observable<any> {
    return this._httpClient.put(
      `https://route-ecommerce.onrender.com/api/v1/cart/${id}`,
      {
        count: `${count}`,
      },
      {
        headers: {
          token: `${localStorage.getItem('userToken')}`,
        },
      }
    );
  }
  deletItem(id: string): Observable<any> {
    return this._httpClient.delete(
      `https://route-ecommerce.onrender.com/api/v1/cart/${id}`,

      {
        headers: {
          token: `${localStorage.getItem('userToken')}`,
        },
      }
    );
  }
  clearCart(): Observable<any> {
    return this._httpClient.delete(
      `https://route-ecommerce.onrender.com/api/v1/cart`,

      {
        headers: {
          token: `${localStorage.getItem('userToken')}`,
        },
      }
    );
  }
}
