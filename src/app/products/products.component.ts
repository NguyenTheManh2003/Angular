import { Component, Input } from '@angular/core';
import { Products } from '../products';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  @Input() productList: Products[] = [];
  searching: string = '';
  filterProductList: Products[] = [];

  constructor(private prod: ProductsService) {
    this.prod.getProduct().subscribe((data) => {
      this.productList = data;
      this.filterProductList = data; // Initially, set filterProductList to the full productList
      console.log("Data loaded successfully:", this.productList);
    });
  }

  filterResults() {
    console.log(this.searching);
    if (!this.searching) {
      this.filterProductList = this.productList; // Reset filter to full list when search input is empty
      return;
    }
    this.filterProductList = this.productList.filter(
      product => product.productName.toLowerCase().includes(this.searching.toLowerCase())
    );
  }
}
