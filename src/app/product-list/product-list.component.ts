import { Component, Input } from '@angular/core';
import { Products } from '../products';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  @Input() productList: Products[] = [];
  showRating(starRating: any) {
    alert(`${starRating}`);
  }
  formProduct = new FormGroup({
    id: new FormControl<string>(''), // Thêm trường id vào FormGroup
    productName: new FormControl<string>(''),
    productCode: new FormControl<string>(''),
    releaseDate: new FormControl<string>(''),
    price: new FormControl<number>(0),
    description: new FormControl<string>(''),
    starRating: new FormControl<number>(5),
    imageUrl: new FormControl<string>(''),
    inStock: new FormControl<number>(5)
  });


  constructor(private prod: ProductsService) {
    this.prod.getProduct().subscribe((data) => {
      this.productList = data;
    });
  }

  ngOnInit(): void {
    this.formProduct.controls['imageUrl'].setValue('./assets/images');
    this.prod.getProduct().subscribe((data) => {
      this.productList = data;
    });
  }

  file: string = '';
  IsAdd: Number = 1;
  IsUpdate: Number = 0;
  onChange(event: any) {
    var str = event.target.files[0].name;
    this.file = './assets/images/' + str;
  }

  Add() {
    this.formProduct.controls['imageUrl'].setValue(this.file);
    // Tạo ID ngẫu nhiên chỉ chứa số dạng chuỗi
    const randomId = Math.random().toString().substr(2, 5);
    this.formProduct.controls['id'].setValue(randomId);
    this.prod.AddProduct(this.formProduct.value).subscribe((res) => {
      this.ngOnInit();
    });
  }

  id: any;
  Edit(index: number) {
    this.id = this.productList[index].id
    this.formProduct.controls['productName'].setValue(this.productList[index].productName);
    this.formProduct.controls['productCode'].setValue(this.productList[index].productCode);
    this.formProduct.controls['releaseDate'].setValue(this.productList[index].releaseDate);
    this.formProduct.controls['price'].setValue(this.productList[index].price);
    this.formProduct.controls['description'].setValue(this.productList[index].description);
    this.formProduct.controls['imageUrl'].setValue(this.productList[index].imageUrl);
    this.formProduct.controls['inStock'].setValue(this.productList[index].inStock);
  }

  Update() {
    this.formProduct.controls['imageUrl'].setValue(this.file);
    this.prod.UpdateProduct(this.id, this.formProduct.value).subscribe(res => {
      this.ngOnInit()
    })
  }

  Delete(index: number) {
    this.id = this.productList[index].id
    this.prod.DeleteProduct(this.id).subscribe(res => {
      this.ngOnInit()
    })
  }
}