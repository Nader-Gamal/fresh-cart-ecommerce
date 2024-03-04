import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  baseURL: string = 'https://ecommerce.routemisr.com/api/v1/';
  constructor(private _httpClient: HttpClient) {}
  getBrands(limit: number = 1): Observable<any> {
    return this._httpClient.get(this.baseURL + `brands?page=${limit}`);
  }
}
