// app-routing.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { ProductsComponent } from './pages/home/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignOutComponent } from './pages/sign-out/sign-out.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselCurrentData } from 'ngx-owl-carousel-o/lib/services/carousel.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SliderComponent } from './pages/home/slider/slider.component';
import { HomeCategoriesComponent } from './pages/home/home-categories/home-categories.component';
import { LooderComponent } from './pages/looder/looder.component';
import { HomeProductsComponent } from './pages/home-products/home-products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SearchPipePipe } from './pipe/search-pipe.pipe';
import { LoadingService } from './servies/looding.service';
import { PaymentComponent } from './pages/payment/payment.component';
import { AllordersComponent } from './pages/allorders/allorders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ListboxModule } from 'primeng/listbox';
import { SearchService } from './cart/service/search.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    SignInComponent,
    SignOutComponent,
    FooterComponent,
    NotfoundComponent,
    OrdersComponent,
    RegisterComponent,
    SliderComponent,
    HomeCategoriesComponent,
    LooderComponent,
    HomeProductsComponent,
    ProductDetailsComponent,
    SearchPipePipe,
    PaymentComponent,
    AllordersComponent,
    ForgetPasswordComponent,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RxReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    NgxPaginationModule,
    DropdownModule,
    ListboxModule,
    ToastModule,
  ],
  exports: [LooderComponent],
  providers: [LoadingService, SearchService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
