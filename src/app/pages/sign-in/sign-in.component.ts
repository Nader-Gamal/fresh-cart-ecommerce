import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators, error } from '@rxweb/reactive-form-validators';
import { AuthenticationService } from '../../servies/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  apiErr: string = '';
  isLoding: boolean = false;
  loginForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private _AuthenticationService: AuthenticationService,
    private _router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{3,8}$/)],
      ],
    });
  }

  login(form: FormGroup) {
    this.apiErr = '';
    this.markAllTouched(form);
    if (this.loginForm.valid && !this.isLoding) {
      this.isLoding = true;
      this._AuthenticationService.signIn(form.value).subscribe({
        next: (info) => {
          console.log(info);
          if (info.message == 'success') {
            localStorage.setItem('userToken', info.token);
            this._AuthenticationService.setUserToken();
            this._router.navigate(['/home']);
          }
        },
        error: (err) => {
          console.log(err);
          this.apiErr = err.error.message;
          this.isLoding = false;
        },
      });
    }
  }

  markAllTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markAllTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
