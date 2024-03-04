import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators, error } from '@rxweb/reactive-form-validators';
import { AuthenticationService } from '../../servies/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  apiErr: string = '';
  isLoding: boolean = false;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _AuthenticationService: AuthenticationService,
    private _router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(3),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{3,8}$/)],
      ],
      rePassword: [
        null,
        [
          Validators.required,
          RxwebValidators.compare({ fieldName: 'password' }),
        ],
      ],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    });
  }

  submit(form: FormGroup) {
    this.apiErr = '';
    this.markAllTouched(form);
    if (this.registerForm.valid && !this.isLoding) {
      this.isLoding = true;
      this._AuthenticationService.sinUp(form.value).subscribe({
        next: (info) => {
          console.log(info);
          if (info.message == 'success') {
            this._router.navigate(['/signIn']);
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
  ngOnInit(): void {
    // You can keep ngOnInit logic here if needed
  }
}
