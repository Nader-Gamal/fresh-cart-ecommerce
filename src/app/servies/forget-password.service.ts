import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgetPasswordService {
  baseUr: string = 'https://ecommerce.routemisr.com/api/v1/auth/';
  constructor(private _httpClient: HttpClient) {}
  forgwtPassword(userEmail: object): Observable<any> {
    return this._httpClient.post(this.baseUr + 'forgotPasswords', userEmail);
  }
  resetCode(resetCode: object): Observable<any> {
    return this._httpClient.post(this.baseUr + 'verifyResetCode', resetCode);
  }
  resetPassword(password: object): Observable<any> {
    return this._httpClient.put(this.baseUr + 'resetPassword', password);
  }
}
