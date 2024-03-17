import { Component } from '@angular/core';
import { Products } from '../products';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searching: string = ''
  filterProductList: Products[] = []

  product: any[] = [];

  constructor(private prod: ProductsService) {
    this.prod.getProduct().subscribe(data => {
      this.filterProductList = data;
      this.product = data;
   
    });
  }
}
