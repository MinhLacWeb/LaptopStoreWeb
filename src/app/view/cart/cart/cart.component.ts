import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartList:any = [];
  total:any ;
  signinLink:string = "/signin"
  constructor(
    private _ls: LocalStoreService,
    private router: Router,
    private _apiService: ApiService,   
  ) { }

  ngOnInit(): void {
    this.getCartList();
    this.setSubTotal();
  }

  setSubTotal(){
    this.total = 0;
    if(this.cartList){
      JSON.parse(this._ls.getLocalItem('Cart')).forEach(item => {
        this.total += item.cartItem.price * item.amount;
      });
    }
  }

  plusQuantity(index){
    if(this.cartList[index].amount < this.cartList[index].cartItem.amount){   // kiểm tra số lượng sản phẩm 
      this.cartList[index].amount += 1
      this._ls.setLocalItem('Cart', JSON.stringify(this.cartList));
      this.setSubTotal();
    }
  }

  minusQuantity(index){
    if(this.cartList){
      if(this.cartList[index].amount > 1){
        this.cartList[index].amount -= 1
        this._ls.setLocalItem('Cart', JSON.stringify(this.cartList));
        this.setSubTotal();
      }
    }
    if(this.cartList.length === 0){
      this._ls.removeLocalItem('Cart');
    };
  }

  getCartList(){
    this.cartList = JSON.parse(this._ls.getLocalItem('Cart'));
  }

  
  deleteItem(index){
    this.cartList.splice(index, 1);
    this._ls.setLocalItem('Cart', JSON.stringify(this.cartList));
  }

  // async checkout(){
  //   if(!this._ls.getLocalItem("Customer")){
  //     this.router.navigate([this.signinLink]);
  //     return;
  //   } 

  //   await this._apiService
  //     .addNewRecordAsync(`products`)
  //     .then((res) => {
  //       console.log(res);
              
  //     })
  // }
}
