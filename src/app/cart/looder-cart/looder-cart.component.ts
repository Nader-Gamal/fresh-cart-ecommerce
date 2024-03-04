import { Component, OnInit } from '@angular/core';
import { LooderCartService } from '../service/looder-cart.service';
@Component({
  selector: 'app-looder-cart',
  templateUrl: './looder-cart.component.html',
  styleUrls: ['./looder-cart.component.css'],
})
export class LooderCartComponent implements OnInit {
  isLoading$ = this._LooderCartService.isLoading$;
  constructor(private _LooderCartService: LooderCartService) {}
  ngOnInit(): void {}
}
