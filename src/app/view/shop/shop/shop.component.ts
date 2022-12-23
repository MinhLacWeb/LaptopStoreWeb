import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: any = [];
  categorys: any = [];
  seachName: string = "";
  isData = false;
  isCartData = false;
  cartList: any [] = [];
  constructor(
    private _apiService: ApiService,      
    private httpc: HttpClient,
    private _ls: LocalStoreService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private async getData() {
    await this._apiService
        .getRecordAsync(`products`)
        .then((res) => {
          this.products = res;
        })
        .catch((err: HttpErrorResponse) => {
        });

  await this._apiService
        .getRecordAsync(`category`)
        .then((res) => {
          this.categorys = res;
        })
        .catch((err: HttpErrorResponse) => {
        });
  }

  addCart(cartItem: any){
    this.getCartList();
    if(this._ls.getLocalItem('Cart')){
      JSON.parse(this._ls.getLocalItem('Cart')).forEach((item, index) => {
        if(item.cartItem.productID === cartItem.productID){ //kiểm tra đã có trong giỏ hàng chưa
          this.isCartData = true;

          if(item.amount < cartItem.amount){    // kiểm tra số lượng
            this.cartList[index].amount += 1
          }
        }
      });
      if(!this.isCartData){ 
        this.cartList.push({cartItem:cartItem,amount:1});
      }
    }else{
      this.cartList = [{cartItem:cartItem,amount:1}]
    }
    this._ls.setLocalItem('Cart', JSON.stringify(this.cartList));
    this.isCartData = false;
  }

  getCartList(){
    this.cartList = JSON.parse(this._ls.getLocalItem('Cart'));
  }

  async onSearch(value: any){
    let searchData :any = [];
    let searchCategory :any = [];
    await this.getData();

    Object.getOwnPropertyNames(value).forEach((e) => {
      if(e.toLowerCase().includes("category") && value[e] === true){
        searchCategory.push(e.replace('category-', ''));
      }
    });

    this.products.forEach(e => {
      if(e.productName.toLowerCase().includes(value.seachName.toLowerCase()) || searchCategory.includes(e.categoryID.toString())){
        searchData.push(e);
      }
    });
    this.products = searchData;
  }
}
