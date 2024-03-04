import { Component, OnInit } from '@angular/core';
import { error } from '@rxweb/reactive-form-validators';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Categories } from 'src/app/interfaces/categories';
import { CategoriesService } from 'src/app/servies/categories.service';
import { LoadingService } from 'src/app/servies/looding.service';

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.css'],
})
export class HomeCategoriesComponent implements OnInit {
  countdownValue: any = {
    days: 6,
    hours: 5,
    minutes: 59,
    seconds: 10,
  };
  countdownInterval: any;

  constructor(
    private _categoriesService: CategoriesService,
    private _LoadingService: LoadingService
  ) {}
  allCategories: Categories[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
  };
  ngOnInit(): void {
    this.getCategories();
    this.startCountdown();
  }
  getCategories() {
    this._LoadingService.showLoader();
    this._categoriesService.getCategories().subscribe({
      next: (data) => {
        this._LoadingService.hideLoader();
        console.log(data);
        this.allCategories = data.data;
      },
      error: (err) => {
        this._LoadingService.hideLoader();
      },
    });
  }
  startCountdown() {
    this.countdownInterval = setInterval(() => {
      if (this.countdownValue.seconds > 0) {
        this.countdownValue.seconds--;
      } else {
        if (this.countdownValue.minutes > 0) {
          this.countdownValue.minutes--;
          this.countdownValue.seconds = 59;
        } else {
          if (this.countdownValue.hours > 0) {
            this.countdownValue.hours--;
            this.countdownValue.minutes = 59;
            this.countdownValue.seconds = 59;
          } else {
            if (this.countdownValue.days > 0) {
              this.countdownValue.days--;
              this.countdownValue.hours = 23;
              this.countdownValue.minutes = 59;
              this.countdownValue.seconds = 59;
            } else {
              clearInterval(this.countdownInterval);
            }
          }
        }
      }
    }, 1000); // Update every second
  }
}
