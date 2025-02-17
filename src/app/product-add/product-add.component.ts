import { ProductService } from './../Service/product.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../Categories/category.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../Service/categories.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  providers: [CategoryService, ProductService]
})
export class ProductAddComponent implements OnInit {

  categories: Category[] = []
  model: any = {
    name: "",
    price: 0,
    categoryId: "0"
  };
  error: String = ""

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data
    })
  }


  saveProduct(form: NgForm) {

    console.log(this.model)

    const Extensions = ["jpeg", "png", "jpg"];
    const extension = this.model.imageUrl.split(".").pop()

    const product = {
      id: 1,
      name: this.model.name,
      price: this.model.price,
      imageUrl: this.model.imageUrl,
      description: this.model.Description,
      isActive: this.model.isActive,
      categoryId: this.model.categoryId
    }

    if(Extensions.indexOf(extension) == -1) {
      this.error = "Lütfen sadece uzantı olarak jpeg, png, jpg uzantılarını kullanınız.";
      return
    }

    if(this.model.categoryId == "0") {
      this.error = "Kategori Değerini Seçiniz";
      return
    }

    if(form.valid) {
      this.productService.createProduct(product).subscribe( (data) => {
        this.router.navigate(['/products'])
      })
    }

    if(form.invalid) {
      this.error = "Formu Kontrol Ediniz"
    }

  }


}
