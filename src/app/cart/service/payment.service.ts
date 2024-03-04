import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private _httpClient: HttpClient) {}
  payment(cartId: string, shipingAdd: any): Observable<any> {
    return this._httpClient.post(
      `https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      shipingAdd,

      {
        headers: {
          token: `${localStorage.getItem('userToken')}`,
        },
      }
    );
  }
}
