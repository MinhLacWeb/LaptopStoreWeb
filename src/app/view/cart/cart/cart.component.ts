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
  isSigned = false;
  signinLink:string = "/signin"
  billID: any;
  constructor(
    private _ls: LocalStoreService,
    private router: Router,
    private _apiService: ApiService,   
    private httpc: HttpClient,
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
    if(this._ls.getLocalItem("Customer")){
      this.isSigned = true;
    }

    this.cartList = JSON.parse(this._ls.getLocalItem('Cart'));
  }

  
  deleteItem(index){
    this.cartList.splice(index, 1);
    this._ls.setLocalItem('Cart', JSON.stringify(this.cartList));
  }

  async checkout(){
    if(!this._ls.getLocalItem("Cart")){
      alert("No Item In Cart");
      return;
    }

    if(!this._ls.getLocalItem("Customer")){
      this.router.navigate([this.signinLink]);
      return;
    } 
    let customerID = JSON.parse(this._ls.getLocalItem('Customer')).customer_id;
    let totalPrice = this.total + 10;
    let date = new Date();
	  let current_date =  date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();  

    let bodyBill: any = {
      customerID: customerID.toString(),
      totalPrice: totalPrice.toString(),
      date: current_date
    };
  
    await this._apiService
      .addNewRecordAsync(bodyBill,`bill`)
      .then((res) => {
        this.billID = res.billID;
      });

    await this.cartList.forEach(cartItem => {
      this.addBilldetail(cartItem)
    });

    this._ls.removeLocalItem('Cart');
    this.cartList = [];
  }

  async addBilldetail(value){
    let bodyBilldetail: any = {
      billID: this.billID.toString(),
      productID: value.cartItem.productID.toString(),
      quantity: value.amount
    };

    let bodyProduct: any = {
      productID : value.cartItem.productID.toString(),
      amount:   (value.cartItem.amount - value.amount).toString(),
      categoryID: value.cartItem.categoryID.toString(),
      price:  value.cartItem.price.toString(),
      productName: value.cartItem.productName,
      productImg: value.cartItem.productImg,
    };

    await this._apiService
    .addNewRecordAsync(bodyBilldetail,`billdetail`)
    .then((res) => {
      console.log(res);
    });

    await this._apiService
      .updateRecordAsync(bodyProduct,`products/`+value.cartItem.productID.toString())
      .then((res) => {
        console.log(res);
      });
  }

  logout(){
    this._ls.removeLocalItem("Customer");
    this.isSigned = false;
  }
}
