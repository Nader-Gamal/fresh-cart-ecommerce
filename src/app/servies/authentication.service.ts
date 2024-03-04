import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userToken: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private _HttpClient: HttpClient, private _router: Router) {
    if (localStorage.getItem('userToken')) {
      this.userToken.next(JSON.stringify(localStorage.getItem('userToken')));
    }
  }
  setUserToken() {
    let token = JSON.stringify(localStorage.getItem('userToken'));
    this.userToken.next(token);
  }
  sinUp(info: User): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      info
    );
  }
  signIn(info: User): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      info
    );
  }
  signOut() {
    localStorage.removeItem('userToken');
    this.userToken.next('');
    this._router.navigate(['/signIn']);
  }
}
