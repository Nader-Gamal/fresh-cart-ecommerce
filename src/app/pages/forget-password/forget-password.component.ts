import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ForgetPasswordService } from 'src/app/servies/forget-password.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;
  email: String = '';
  message: string = '';
  constructor(
    private _forgetPasswordService: ForgetPasswordService,
    private messageService: MessageService
  ) {}

  forgetForm: FormGroup = new FormGroup({
    email: new FormControl(''),
  });
  resetCode: FormGroup = new FormGroup({
    resetCode: new FormControl(''),
  });
  newPassword: FormGroup = new FormGroup({
    newPassword: new FormControl(''),
  });

  forgetPassword(): void {
    let userEmail = this.forgetForm.value;
    this.email = userEmail.email;
    this._forgetPasswordService.forgwtPassword(userEmail).subscribe({
      next: (response) => {
        this.message = response.message;
        console.log(response);
        this.showSuccess();
        this.step1 = false;
        this.step2 = true;
      },
      error: (error) => {
        this.message = error.error.message;
        console.error(error);
        this.showError();
      },
    });
  }
  submitCode(): void {
    let code = this.resetCode.value;
    this._forgetPasswordService.resetCode(code).subscribe({
      next: (res) => {
        this.message = res.message;

        console.log(res);
        this.showSuccess();
        this.step2 = false;
        this.step3 = true;
      },
      error: (err) => {
        this.message = err.error.message;
        console.log('message', this.message);
        this.showError();
      },
    });
  }
  newpass(): void {
    let newPassword = this.newPassword.value;
    newPassword.email = this.email;
    this._forgetPasswordService.resetPassword(newPassword).subscribe({
      next: (response) => {
        console.log(response);
        this.step3 = false;
        this.step4 = true;
      },
      error: (err) => {
        this.message = err.error.message;
        console.log('message', this.message);
        this.showError();
      },
    });
  }
  handleButtonClick() {
    const conditionMet = true;

    if (conditionMet) {
      this.showSuccess();
    } else {
      this.showError();
    }
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: this.message,
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: this.message,
    });
  }
}
