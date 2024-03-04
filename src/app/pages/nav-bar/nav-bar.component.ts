import { WishService } from 'src/app/servies/wish.service';
import { CartServiceService } from 'src/app/servies/cart-service.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../servies/authentication.service';
import { SearchService } from 'src/app/cart/service/search.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isLogin: boolean = false;
  cartNum: number = 0;
  wishItems: number = 0;
  countries: any[] | undefined;
  selectedCountry: any;
  showOptions = false;
  term: string = '';

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _cartServiceService: CartServiceService,
    protected searchService: SearchService,
    private _wishService: WishService
  ) {
    _AuthenticationService.userToken.subscribe({
      next: () => {
        console.log(
          _AuthenticationService.userToken.getValue(),
          'hello from nav'
        );
        if (_AuthenticationService.userToken.getValue()) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
    });
  }
  ngOnInit(): void {
    this.searchService.currentSearchTerm.subscribe((term) => {
      this.searchService.changeSearchTerm(term);
    });
    this.searchService.changeSearchTerm(this.term);

    this._cartServiceService.cartNumber.subscribe({
      next: (data) => {
        this.cartNum = data;
        this._cartServiceService.getCart().subscribe({
          next: (data) => {
            this.cartNum = data.numOfCartItems;
          },
        });
      },
    });
    // this._wishService.wishItems.subscribe({
    //   next: (data) => {
    //     this.wishItems = data;
    //     this._wishService.getWishList().subscribe({
    //       next: (data) => {
    //         this.wishItems = data.count;
    //       },
    //     });
    //   },
    // });
    // Subscribe to wish list changes and update the count
    this._wishService.wishItems.subscribe({
      next: (data) => {
        this.wishItems = data;
      },
    });

    // Fetch the wish list initially when the component is loaded
    this._wishService.getWishList().subscribe({
      next: (data) => {
        this.wishItems = data.count;
      },
    });
    this.countries = [
      {
        name: 'Egypt',
        code: 'EG',
        img: 'assets/images/Flag_of_Egypt.svg',
        crr: 'EGP',
      },
      {
        name: 'UAE',
        code: 'UAE',
        img: 'assets/images/Flag_of_the_United_Arab_Emirates.svg',
        crr: 'DAR',
      },
      {
        name: 'Saudi Ariba',
        code: 'SUD',
        img: '/assets/images/Flag_of_Saudi_Arabia_(type_2).svg',
        crr: 'SAR',
      },
    ];
  }
  singnOut() {
    this._AuthenticationService.signOut();
  }
  toggleOptions() {
    this.showOptions = !this.showOptions;
  }
}
