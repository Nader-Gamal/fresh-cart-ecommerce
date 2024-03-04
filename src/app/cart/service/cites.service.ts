import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitesService {
  constructor(private _HttpClient: HttpClient) {}

  getCites(country: string): Observable<any> {
    return this._HttpClient.post(
      'https://countriesnow.space/api/v0.1/countries/cities',
      { country: country } // Include the country parameter in the request body
    );
  }
}
