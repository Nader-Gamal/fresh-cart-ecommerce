import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/servies/brands.service';
import { LoadingService } from 'src/app/servies/looding.service';

export interface brands {
  name: string;
  image: string;
}

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  brands: brands[] = [];
  image: string = '';
  name: string = '';
  constructor(
    private _brandsService: BrandsService,
    private _loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this._loadingService.showLoader();
    this._brandsService.getBrands().subscribe({
      next: (response) => {
        console.log(response);
        this.brands = response.data;
        this._loadingService.hideLoader();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
