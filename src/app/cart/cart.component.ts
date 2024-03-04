import { Cart } from './../interfaces/cart';
import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/servies/cart-service.service';
import { LooderCartService } from './service/looder-cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carDetails: Cart = {} as Cart;
  isCartEmpty: boolean = true;
  constructor(
    private _cartServiceService: CartServiceService,
    private _LooderCartService: LooderCartService
  ) {}

  ngOnInit(): void {
    this.getCat();
  }

  getCat() {
    this._LooderCartService.showLoader();
    this._cartServiceService.getCart().subscribe({
      next: (response) => {
        console.log(response);
        this.carDetails = response;
        this.updateEmptyCartStatus();
        this._LooderCartService.hideLoader();
      },
      error: (err) => {
        console.log(err);
        this._LooderCartService.hideLoader();
      },
    });
  }

  updateCount(count: number, id: string) {
    this._LooderCartService.showLoader();
    this._cartServiceService.updateCart(count, id).subscribe({
      next: (response) => {
        console.log('Cart Details:', this.carDetails);
        this.carDetails = response;
        this.updateEmptyCartStatus();
        console.log('isCartEmpty:', this.isCartEmpty);
        this._LooderCartService.hideLoader();
      },
    });
  }

  deletItem(id: string) {
    this._LooderCartService.showLoader();
    this._cartServiceService.deletItem(id).subscribe({
      next: (response) => {
        console.log('Cart Details:', this.carDetails);
        this.carDetails = response;
        this.updateEmptyCartStatus();
        console.log('isCartEmpty:', this.isCartEmpty);
        this._LooderCartService.hideLoader();

        this._cartServiceService.cartNumber.next(response.numOfCartItems);
      },
    });
  }

  clearCart() {
    this._LooderCartService.showLoader();
    this._cartServiceService.clearCart().subscribe({
      next: (response) => {
        console.log('Cart Details:', this.carDetails);
        this.carDetails = response;
        this.updateEmptyCartStatus();
        console.log('isCartEmpty:', this.isCartEmpty);
        this._LooderCartService.hideLoader();
        this._cartServiceService.cartNumber.next((response.numOfCartItem = 0));
      },
    });
  }

  updateEmptyCartStatus() {
    this.isCartEmpty =
      !this.carDetails?.data?.products ||
      this.carDetails.data.products.length === 0;
  }
}
