import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProduct() {
    return this.httpClient.get('http://localhost:3000/products');
  }

  createProduct(products: any): Observable<any> {
    console.log('Products: ',products);
    let formData = new FormData();
    formData.append('name',products.name);
    formData.append('description', products.description);
    formData.append('productImage', products.productImage);
    formData.append('price', products.price);
    formData.append('rating', products.rating);
    console.log('Form Data: ', products.formData);
    
    return this.httpClient.post('http://localhost:3000/create/product', formData);
  }
}
