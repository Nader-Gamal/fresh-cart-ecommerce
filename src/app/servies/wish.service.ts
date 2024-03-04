import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WishService {
  wishItems: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _httpClient: HttpClient) {}
  addToWish(id: string): Observable<any> {
    return this._httpClient.post(
      'https://route-ecommerce.onrender.com/api/v1/wishlist',
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
  getWishList(): Observable<any> {
    return this._httpClient.get(
      'https://route-ecommerce.onrender.com/api/v1/wishlist',
      {
        headers: {
          token: `${localStorage.getItem('userToken')}`,
        },
      }
    );
  }
  removeWishItem(id: string | undefined): Observable<any> {
    return this._httpClient.delete(
      `https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`,
      {
        headers: {
          token: `${localStorage.getItem('userToken')}`,
        },
      }
    );
  }
}
