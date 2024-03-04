import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { LoadingService } from '../servies/looding.service';
import { LooderCartComponent } from './looder-cart/looder-cart.component';
import { RemoveEmptyPipe } from './cart-pipe/remove-empty.pipe';

@NgModule({
  declarations: [CartComponent, LooderCartComponent, RemoveEmptyPipe],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDividerModule,
  ],
  providers: [LoadingService],
})
export class CartModule {}
