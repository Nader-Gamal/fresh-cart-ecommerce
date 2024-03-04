import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseURL: string = 'https://ecommerce.routemisr.com/api/v1/';
  constructor(private _httpClient: HttpClient) {}
  getProducts(pageNum: number = 1): Observable<any> {
    return this._httpClient.get(this.baseURL + `products?page=${pageNum}`);
  }
}
