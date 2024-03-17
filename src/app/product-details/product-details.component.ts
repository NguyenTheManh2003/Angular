  import { Component, OnInit } from '@angular/core';
  import { ProductsService } from '../products.service';
  import { ActivatedRoute } from '@angular/router';
  import { Products } from '../products';
  import { CartService } from '../cart.service';
  import { Cart } from '../carts';
  @Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
    
  })
  export class ProductDetailsComponent implements OnInit {
    productDetail: Products | undefined
    cartList: Cart[] = []
    InStock: number = 0

    
    constructor(private router: ActivatedRoute,
      private productService: ProductsService,
      private cartService: CartService) {
    }
    
    ngOnInit(): void {
      let id = Number(this.router.snapshot.params['id'])
     this.productService.getProductId(id).subscribe(data => {
        this.productDetail = data
     })
      this.InStock = this.productDetail?.inStock!
    }
    Add() {
      this.cartService.addCart(this.productDetail?.id!, this.productDetail)
      this.InStock = this.cartService.getInStock(this.productDetail?.id!)!
    }

  }
