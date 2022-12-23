import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home/home.component';
import { CartComponent } from './view/cart/cart/cart.component';
import { SigninComponent } from './view/sign-in/signin/signin.component';
import { RegisterComponent } from './view/register/register/register.component';
import { ShopComponent } from './view/shop/shop/shop.component';
import { ApiService } from './shared/services/api.services';
import {
	HttpClient,
	HttpClientModule,
	HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    SigninComponent,
    RegisterComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
