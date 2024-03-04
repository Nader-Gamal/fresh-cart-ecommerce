import { ProductDetails } from './../../interfaces/product-details';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from 'src/app/servies/cart-service.service';
import { LoadingService } from 'src/app/servies/looding.service';
import { PrdouctDetailsService } from 'src/app/servies/prdouct-details.service';
import { SearchService } from 'src/app/cart/service/search.service';
import { Products } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/servies/products.service';
import { WishService } from 'src/app/servies/wish.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId: string = '';
  productItem: any;
  allProducts: Products[] = [];
  term: string = '';
  pageSize: number = 10;
  p: number = 1;
  totalItems: number = 0;
  message: string = '';
  wishListData: string[] = [];
  constructor(
    private _prdouctDetailsService: PrdouctDetailsService,
    private _ActivatedRoute: ActivatedRoute,
    private _loadingService: LoadingService,
    private _cartServices: CartServiceService,
    private _productsService: ProductsService,
    private _LoadingService: LoadingService,
    private searchService: SearchService,
    private _wishService: WishService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
    });
    this._loadingService.showLoader();
    this._prdouctDetailsService.getProductById(this.productId).subscribe({
      next: (response) => {
        this._loadingService.hideLoader();
        this.productItem = response.data;
        console.log(this.productItem);
      },
      error: (err) => {
        this._loadingService.hideLoader();
        console.log(err);
      },
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
  addToCart(id: string) {
    this._cartServices.addToCart(id).subscribe({
      next: (response) => {
        console.log(response);
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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
