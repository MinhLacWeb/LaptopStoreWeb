import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from './../../../../src/environments/environment';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { FormGroup, FormArray } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';  


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    apiURL:string = "http://localhost:8080/";
    constructor(
        private httpc: HttpClient,
    ) { }
    
    public getRecordAsync(urlstr: string): Promise<any> {
        let req_url = this.apiURL + urlstr;
        return this.httpc.get<any>(req_url).toPromise();
    }

    public addNewRecordAsync<T>(body: T, urlstr: string): Promise<any> {
        console.log(typeof(body));
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        const finurl = this.apiURL + urlstr;
        return this.httpc.post<any>(finurl, body,{headers: headers}).toPromise();
    }

    public updateRecordAsync<T>(tentity: T, urlstr: string): Promise<any> {
        const finurl = this.apiURL + urlstr;
        return this.httpc.put<any>(finurl, tentity).toPromise();
    }

    public deleteRecordAsync(urlstr: string): Promise<any> {
        const finurl = this.apiURL + urlstr;
        return this.httpc.delete(finurl).toPromise();
    }

}