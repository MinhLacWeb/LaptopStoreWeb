import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinLink:string ="/home";
  customers:any = [];
  constructor(
    private _apiService: ApiService,      
    private httpc: HttpClient,
    private _ls: LocalStoreService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private async getData() {
    await this._apiService
        .getRecordAsync(`customers`)
        .then((res) => {
          console.log(res);
          
          this.customers = res;
        })
        .catch((err: HttpErrorResponse) => {
        });
  }
  
  onSubmit(value){
    let flag = false;
    this.customers.forEach(customer => {
      if (value.username === customer.username && value.password === customer.password){
          this._ls.setLocalItem("Customer",JSON.stringify(customer));
          flag = true;
          alert ("Login successfully");
          this.router.navigate([this.signinLink]); // Redirecting to home page.
      }
    });
    if(!flag){
      alert("Invalid Username or Password");
    }
      
  } 
}
