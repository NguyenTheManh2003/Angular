import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './auth/login/login.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductsComponent } from './products/products.component';



const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'product', component: ProductsComponent, title: 'Product' },
  { path: 'admin', component: ProductListComponent, title: 'Product List' },
  { path: 'product-details/:id', component: ProductDetailsComponent, title: 'Product Detail' },
  { path: 'cart/:id', component: CartComponent, title: 'Cart' },
  { path: 'login', component: LoginComponent, title: 'Login'},
  { path: 'register', component: RegisterComponent, title: 'Register'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
