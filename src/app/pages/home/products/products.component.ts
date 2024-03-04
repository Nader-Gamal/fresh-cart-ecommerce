import { Component, OnInit } from '@angular/core';
import { contains } from '@rxweb/reactive-form-validators';
import { SearchService } from 'src/app/cart/service/search.service';
import { Products } from 'src/app/interfaces/products';
import { CartServiceService } from 'src/app/servies/cart-service.service';
import { LoadingService } from 'src/app/servies/looding.service';
import { ProductsService } from 'src/app/servies/products.service';
import { WishService } from 'src/app/servies/wish.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  allProducts: Products[] = [];
  term: string = '';
  pageSize: number = 10;
  p: number = 1;
  totalItems: number = 0;
  message: string = '';
  wishListData: string[] = [];

  constructor(
    private _productsService: ProductsService,
    private _LoadingService: LoadingService,
    private _cartServices: CartServiceService,
    private searchService: SearchService,
    private _wishService: WishService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getProducts();
    this.searchService.currentSearchTerm.subscribe((term) => {
      this.term = term;
      this.getProducts();
    });

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
  getProducts() {
    this._LoadingService.showLoader();
    this._productsService.getProducts().subscribe({
      next: (data) => {
        this._LoadingService.hideLoader();
        this.allProducts = data.data;
        this.pageSize = data.metadata.limit;
        this.p = data.metadata.currentPage;
        this.totalItems = data.results;
      },
      error: (err) => {
        this._LoadingService.hideLoader();
        console.log(err);
      },
    });
  }
  pageChanged(event: any): void {
    this._productsService.getProducts(event).subscribe({
      next: (data) => {
        this._LoadingService.hideLoader();
        console.log(data);
        this.allProducts = data.data;
        this.pageSize = data.metadata.limit;
        this.p = data.metadata.currentPage;
        this.totalItems = data.results;
      },
      error: (err) => {
        this._LoadingService.hideLoader();
        console.log(err);
      },
    });
  }
  addToCart(id: string) {
    this._LoadingService.showLoader();
    this._cartServices.addToCart(id).subscribe({
      next: (response) => {
        this._LoadingService.hideLoader();
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
    this._LoadingService.showLoader();
    this._wishService.addToWish(id).subscribe({
      next: (response) => {
        this._LoadingService.hideLoader();
        this.message = response.message;
        this.wishListData = response.data;
        console.log(response);
        this.showSuccess();
      },
      error: (err) => {
        this._LoadingService.hideLoader();
        console.log(err);
      },
    });
  }
  removeWishItem(id: string | undefined) {
    this._LoadingService.showLoader();
    this._wishService.removeWishItem(id).subscribe({
      next: (response) => {
        this._LoadingService.hideLoader();
        this.message = response.message;
        this.wishListData = response.data;

        console.log(response);
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
