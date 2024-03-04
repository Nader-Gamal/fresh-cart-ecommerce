import { ActivatedRoute } from '@angular/router';
// payment.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CitesService } from 'src/app/cart/service/cites.service';
import { PaymentService } from 'src/app/cart/service/payment.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  cartId: string = '';
  constructor(
    private _CitesService: CitesService,
    private _paymentService: PaymentService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.cartId = params['cartId'];
      console.log(this.cartId);
    });
  }

  ngOnInit(): void {
    this.getCites('Egypt');
  }

  shippingAddress: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  });
  handleOnline() {
    this._paymentService
      .payment(this.cartId, this.shippingAddress.value)
      .subscribe({
        next: (data) => {
          window.location.href = data.session.url;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  cities: string[] = []; // Array to store cities

  getCites(country: string) {
    this._CitesService.getCites(country).subscribe({
      next: (response) => {
        this.cities = response.data || [];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

$(document).ready(function () {
  $('form');

  /*-------- focus in ---------*/
  $('.pwd').on('focusin', function () {
    $(this).siblings('.user,.city').css({
      'z-index': '1',
      background: '#fff',
    });
    $(this).css({
      'z-index': '2',
      background: '#fff',
    });
  });

  $('.user').on('focusin', function () {
    $(this).siblings('.pwd,.city').css({
      'z-index': '1',
      background: '#fff',
    });
    $(this).css({
      'z-index': '2',
      background: '#fff',
    });
  });
  $('.city').on('focusin', function () {
    $(this).siblings('.user,.pwd').css({
      'z-index': '1',
      background: '#fff',
    });
    $(this).css({
      'z-index': '2',
      background: '#fff',
    });
  });

  /*----------- focus out ---------*/
  $('.pwd').on('focusout', function () {
    $(this).siblings('.user,.city').css({
      'z-index': '1',
      background: '#fff',
    });
    $(this).css({
      'z-index': '2',
      background: '#fff',
    });
  });

  $('.user').on('focusout', function () {
    $(this).siblings('.pwd,.city').css({
      'z-index': '1',
      background: '#fff',
    });
    $(this).css({
      'z-index': '2',
      background: '#fff',
    });
  });
  $('.city').on('focusout', function () {
    $(this).siblings('.pwd,.user').css({
      'z-index': '1',
      background: '#fff',
    });
    $(this).css({
      'z-index': '2',
      background: '#fff',
    });
  });
});
