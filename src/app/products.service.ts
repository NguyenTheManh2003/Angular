import { Injectable } from '@angular/core';
import { Products } from './products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http:HttpClient) {}


  productsList: Products[] = [

  ];

  private URL = `http://localhost:3000/products`
  getProduct(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.URL}`);
  }
  
  getProductId(id: number){
    return this.http.get<Products>(`${this.URL}/${id}`);
  }

  // getAllProductList(): Produsts[] {
  //   return this.productsList;
  // }
  getAutoId() {
    var max = 1;
    this.productsList.forEach((item) => {
      if (item.id > max)
      max = item.id;
    });
    return max+1;
  }
  AddProduct(frmProduct: any): Observable<Products[]> {
    return this.http.post<Products[]>(`${this.URL}`, frmProduct)
    // console.log(this.productsList);
  }
  EditProduct(index: number) {
    return this.productsList[index];
  }
  UpdateProduct(id: number, frmProduct: any) {

    return this.http.put<Products[]>(`${this.URL}/${id}`, frmProduct)

  }
  DeleteProduct(id: number) {
    return this.http.delete<Products[]>(`${this.URL}/${id}`)
  }
}
