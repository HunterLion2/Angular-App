import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CategoryService } from '../Service/categories.service';
import { Category } from '../Categories/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css'],
  providers: [CategoryService]
})
export class CategoryAddComponent implements OnInit {

  model: any = {
    name: "",
  };

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  saveCategory() {

    const category = {
      name: this.model.name
    }

    this.categoryService.postCategories(category).subscribe((data) => {
      this.router.navigate(['/products'])
    })
  }

}
