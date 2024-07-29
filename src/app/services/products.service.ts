import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // apiKey:string="e075aad29a4e76a0b32cf4a3e956ce9f"
    allProducts:Subject<Product[]> = new Subject()

  constructor(private http:HttpClient){}



  getAllProducts():Observable<any>{
    return this.http.get(`https://fakestoreapi.com/products`)
  }

  getProductById(id:number):Observable<any>{
    return this.http.get(`https://fakestoreapi.com/products/${id}`)

  }

}