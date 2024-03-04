import { Component, OnInit } from '@angular/core';
import { WishService } from 'src/app/servies/wish.service';
import { LoadingService } from 'src/app/servies/looding.service';
import { Products } from 'src/app/interfaces/products';
import { CartServiceService } from 'src/app/servies/cart-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  allProducts: Products[] = [];
  message: string = '';
  wishListData: string[] = [];

  constructor(
    private _wishService: WishService,
    private _loadingService: LoadingService,
    private _cartServices: CartServiceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getWishList();
    this._wishService.getWishList().subscribe({
      next: (response) => {
        this.wishListData = response.data;
        const newData = this.wishListData.map((item: any) => item.id);
        console.log('newData', newData);

        this.wishListData = newData;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getWishList() {
    this._loadingService.showLoader();
    this._wishService.getWishList().subscribe({
      next: (data) => {
        this._loadingService.hideLoader();
        console.log(data.data);
        this.allProducts = data.data;
      },
      error: (err) => {
        this._loadingService.hideLoader();
        console.log(err);
      },
    });
  }

  addToCart(id: string) {
    this._loadingService.showLoader();
    this._cartServices.addToCart(id).subscribe({
      next: (response) => {
        this._loadingService.hideLoader();
        this.message = response.message;
        console.log(response);
        this.showSuccess();

        this._cartServices.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToFav(id: string): void {
    this._loadingService.showLoader();
    this._wishService.addToWish(id).subscribe({
      next: (response) => {
        this._loadingService.hideLoader();
        this.message = response.message;
        this.wishListData = response.data;
        console.log(response);
        this.showSuccess();
      },
      error: (err) => {
        this._loadingService.hideLoader();
        console.log(err);
      },
    });
  }
  removeWishItem(id: string | undefined) {
    this._loadingService.showLoader();
    this._wishService.removeWishItem(id).subscribe({
      next: (response) => {
        this.wishListData = response.data;
        this._loadingService.hideLoader();
        this.message = response.message;
        const newData = this.allProducts.filter((item: any) =>
          this.wishListData.includes(item.id)
        );
        this.allProducts = newData;
        this.showSuccess();
      },
      error: (err) => {
        console.log(err);
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
