import { authGuard } from '../gurd/auth.guard';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/home/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignOutComponent } from './pages/sign-out/sign-out.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AllordersComponent } from './pages/allorders/allorders.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
    title: 'home',
  },
  {
    path: 'products',
    canActivate: [authGuard],
    component: ProductsComponent,
    title: 'products',
  },
  {
    path: 'productDetails/:id',
    canActivate: [authGuard],
    component: ProductDetailsComponent,
    title: 'productDetails',
  },
  {
    path: 'categories',
    canActivate: [authGuard],
    component: CategoriesComponent,
    title: 'categories',
  },
  {
    path: 'brands',
    canActivate: [authGuard],
    component: BrandsComponent,
    title: 'brands',
  },
  { path: 'register', component: RegisterComponent, title: 'register' },
  { path: 'signIn', component: SignInComponent, title: 'signIn' },
  {
    path: 'signOut',
    canActivate: [authGuard],
    component: SignOutComponent,
    title: 'signOut',
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'payment',
    canActivate: [authGuard],
    component: PaymentComponent,
    title: 'payment',
  },
  {
    path: 'allorders',
    canActivate: [authGuard],
    component: AllordersComponent,
    title: 'all orders',
  },
  {
    path: 'forgetpassword',
    component: ForgetPasswordComponent,
    title: 'forget password',
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    title: 'wish list',
  },
  { path: '**', component: NotfoundComponent, title: 'notFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
