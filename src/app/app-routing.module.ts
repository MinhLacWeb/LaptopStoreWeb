import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home/home.component';
import { CartComponent } from './view/cart/cart/cart.component';
import { SigninComponent } from './view/sign-in/signin/signin.component';
import { RegisterComponent } from './view/register/register/register.component';
import { ShopComponent } from './view/shop/shop/shop.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shop', component: ShopComponent },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
