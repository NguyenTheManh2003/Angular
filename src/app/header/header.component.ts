import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../products';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
import { Cart } from '../carts';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productDetail: Products | undefined;
  cartList: Cart[] = [];
  InStock: number = 0;
  userInfo: any;

  constructor(
    private router: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartList = this.cartService.getCartAll();
    this.updateUserInfo(); // Update user info initially
    // Subscribe to changes in user authentication status or user info
    this.authService.authChanged.subscribe(() => {
      this.updateUserInfo();
    });
    let id = Number(this.router.snapshot.params['id']);
    this.productService.getProductId(id).subscribe(data => {
      this.productDetail = data;
      this.InStock = this.productDetail?.inStock!;
    });
  }

  updateUserInfo() {
    this.userInfo = this.authService.getUserInfo();
    console.log(this.userInfo);
  }

  ItemCount() {
    return this.cartService.totalItems();
  }

  ItemSum() {
    return this.cartService.Total();
  }

  Remove(index: number) {
    this.cartService.RemoveCart(index);
  }

  DeleteAll() {
    this.cartService.DeleteAllCart();
  }

  logout() {
    this.authService.logout();
  }
}
