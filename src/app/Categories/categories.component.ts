import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { CategoryService } from '../Service/categories.service';
import { ProductService } from '../Service/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoryService, ProductService],
})

export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  selectCategory!: Category | null;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productService.getProducts(params["categoryId"]).subscribe(data => {
        console.log(data)
        this.categories = data;
      });
    });

    // this.categoryService.getCategories().subscribe(data => {
    //   console.log(data)
    //   this.categories = data;
    // });
  }

  selectedCategory(item: Category) {
    if (item) {
      this.selectCategory = item;
    } else {
      this.selectCategory = null;
    }
  }
}
