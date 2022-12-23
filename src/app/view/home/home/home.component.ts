import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.services';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isSigned = false;
  constructor(
    private _apiService: ApiService,  
    private _ls: LocalStoreService,                                                                                   
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private async getData() {
    if(this._ls.getLocalItem("Customer")){
      this.isSigned = true;
    }
    await this._apiService
      .getRecordAsync(`products`)
      .then((res) => {
        console.log(res);
              
      })
    
  }

  logout(){
    this._ls.removeLocalItem("Customer");
    this.isSigned = false;
  }
  
}
