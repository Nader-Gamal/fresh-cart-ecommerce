import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ListboxModule } from 'primeng/listbox';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  ngOnInit(): void {
    this.cities = [
      { name: 'Music', code: 'MC' },
      { name: "Men's Fashion", code: 'MN' },
      { name: "Women's Fashion", code: 'WN' },
      { name: 'SuperMarket', code: 'SUP' },
      { name: 'Baby & Toys', code: 'BAT' },
      { name: 'Home', code: 'HOM' },
      { name: 'Books', code: 'BOO' },
      { name: 'Beauty & Health', code: 'BAH' },
      { name: 'Mobiles & Electronics', code: 'ELC' },
    ];
  }
  cities!: City[];

  selectedCity!: City;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
  };
}
